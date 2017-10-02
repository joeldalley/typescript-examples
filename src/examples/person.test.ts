import {Person} from '../lib/model/Person'

test('Person #1', () => {
  const person = new Person.Model({
    list: [{AlternateID: 1, FirstName: 'Joel', LastName: 'Dalley'}]
  })
  expect(person.id).toBe(1)
  expect(person.firstName).toBe('Joel')
  expect(person.lastName).toBe('Dalley')
})

test('Person #2', () => {
  const person = new Person.Model({
    ...new Person.Model({
      list: [{AlternateID: 1, Email: 'a@b.c', Name: {First: 'Joel', Last: 'D'}}]
    }),
    emailAddr: 'joel-at-dot-com'
  })
  expect(person.id).toBe(1)
  expect(person.emailAddr).toBe('joel-at-dot-com')
})

test('Empty-Valued Person', () => {
  const person = new Person.Model({
    list: [
      {
        ID: 0,
        Email: undefined,
        FirstName: '',
        LastName: '',
        Name: {First: '', Last: ''},
        ThisIsIgnored: 'Ignored'
      }
    ]
  })
  expect(person.id).toBe(0)
  expect(person.emailAddr).toBe('')
  expect(person.ThisIsIgnored).toBe(undefined)
})

test('Two IDs & two first and last names', () => {
  const person = new Person.Model({
    list: [
      {
        AlternateID: 1,
        ID: 2,
        ExtraField: {MoreExtra: 0, MoreExtra2: 1},
        FirstName: 'Robert',
        LastName: 'N/A',
        Name: {
          First: 'Bob',
          Last: ''
        }
      }
    ]
  })
  expect(person.id).toBe(2)
  expect(person.firstName).toBe('Robert')
  expect(person.lastName).toBe('N/A')
})
