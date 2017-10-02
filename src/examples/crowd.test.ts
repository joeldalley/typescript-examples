import {Crowd} from '../lib/model/Crowd'
import {Person} from '../lib/model/Person'

test('Crowd of many', () => {
  const crowd = new Crowd.Model({
    location: 'Jupiter',
    persons: [
      new Person.Model({list: [{ID: 1, FirstName: 'Alice', LastName: 'D'}]}),
      new Person.Model({list: [{AlternateID: 2, Name: {First: 'Bob', Last: ''}}]}),
      new Person.Model({id: 3, emailAddr: '', firstName: 'Charlie', lastName: ''}),
      new Person.Model({id: 4, emailAddr: '', firstName: 'David', lastName: ''}),
      new Person.Model({id: 5, emailAddr: '', firstName: 'Edward', lastName: ''})
    ]
  })
  expect(crowd.location).toBe('Jupiter')
  expect(crowd.persons[0].firstName).toBe('Alice')
  expect(crowd.persons[4].id).toBe(5)
  expect(crowd.size).toBe(Crowd.Size.Many)
})

test('Crowd of two', () => {
  const crowd = new Crowd.Model({
    ...new Crowd.Model({
      persons: [
        new Person.Model({id: 1, emailAddr: '', firstName: 'Alice', lastName: 'D'}),
        new Person.Model({list: [{ID: 2, Name: {First: 'Bob', Last: ''}}]})
      ]
    }),
    size: Crowd.Size.Many // becomes Crowd.Size.Duo
  })
  expect(crowd.size).toBe(Crowd.Size.Duo)
  crowd.persons.forEach(person => expect(person.emailAddr).toBe(''))
})

test('Crowd generated from Crowd', () => {
  const bob = new Person.Model({
    id: 0,
    emailAddr: '',
    firstName: 'Bob',
    lastName: ''
  })
  const first = new Crowd.Model({location: 'Neptune', persons: [bob]})
  const second = new Crowd.Model({
    ...first,
    persons: first.persons.concat(
      new Person.Model({id: 1, emailAddr: '', firstName: 'Alice', lastName: 'D'})
    )
  })
  expect(second.persons.length).toBe(2)
  expect(second.location).toBe('Neptune')
  expect(second.persons.map(_ => _.firstName).join(' ')).toBe('Bob Alice')
})

test('Crowd of one Person', () => {
  const crowd = new Crowd.Model({persons: [
    new Person.Model({
      id: 1,
      emailAddr: '',
      firstName: 'Alice',
      lastName: 'D'
    })
  ]})
  expect(crowd.size).toBe(Crowd.Size.Solo)
  expect(crowd.persons.length).toBe(1)
  expect(crowd.persons[0].id).toBe(1)
  expect(crowd.persons[0].firstName).toBe('Alice')
  expect(crowd.persons[0].lastName).toBe('D')
})

test('Crowd of one -- the empty Person', () => {
  const crowd = new Crowd.Model({persons: [new Person.Model()]})
  expect(crowd.size).toBe(Crowd.Size.Solo)
  expect(crowd.persons.length).toBe(1)
  expect(crowd.persons[0].id).toBe(0)
  expect(crowd.persons[0].firstName).toBe('')
  expect(crowd.persons[0].lastName).toBe('')
})

test('Undefined JSON', () => {
  const crowd = new Crowd.Model(undefined)
  expect(crowd.size).toBe(Crowd.Size.Empty)
  expect(crowd.persons.length).toBe(0)
})
