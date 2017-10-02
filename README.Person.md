# [Person](https://github.com/joeldalley/typescript-examples/blob/master/src/lib/model/Person.ts)

## Design Goals

**(1)**
  Create a class whose constructor argument can be either of:
> an object of the class, or
>
> some RESTful endpoint JSON that we're expecting

We should be able to instantiate the class equally well with either constructor argument.

**(2)** Be able to construct a new instance of the class by spreading an existing instance into the constructor.

E.g.
```typescript
const first = new Person.Model({id: 1, firstName: 'Joel', lastName: 'Dalley'})
const second = new Person.Model({...first, id: 2})
```

## Namespaces

The Interfaces, Types and Classes below are all part of the `Person` namespace.

## Interfaces

```typescript
interface Json {Email?: string, [index: number]: any, [index: string]: any}
interface Id {ID: number}
interface AlternateId {AlternateID: number}
interface Name {Name: {First: string, Last: string}}
interface AlternateName {FirstName: string, LastName: string}
```

#### Json: the base interface
The base interface is `Json`, which features the [index signature](https://www.typescriptlang.org/docs/handbook/interfaces.html) properties, `[index: string]: any`
 and `[index: number]: any`. Those properties mean that all of the following objects implement the `Json` interface:

 ```typescript
 const jsonOne = {}
 const jsonTwo = {thisWillBeIgnored: 'does not matter'}
 const jsonThree = {Email: 'email', thisWillBeIgnored: 'does not matter'}
 ```

 And the following do not implement the `Json` interface:

 ```typescript
 // Type error - Json.Email is a string or undefined
 const invalidOne = {Email: 0}
 // Type error - Json.Email is a string or undefined
 const invalidTwo = {Email: null, ignored: 'This field gets ignored'}
 ```

## Types

```typescript
export type JsonWithIdAndName = Json & (Id | AlternateId) & (Name | AlternateName)
export type Constructable = Person.Model | {list: JsonWithIdAndName[]}
```

#### JsonWithIdAndName

This type is constructed by combining [intersection types and union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html), and can be read as a type that implements the `Json` interface and implements one of `(Id, AlternateId)` interfaces and implements one of `(Name, AlternateName)` interfaces.

All of the following objects are of type `JsonWithIdAndName`:

```typescript
{ID: 0, FirstName: '', LastName: ''}

{
  ID: 1,
  Email: 'bob@dot.com',
  FirstName: 'Bob',
  LastName: ''
}

{
  AlternateID: 1,
  ExtraField: undefined,
  Name: {
    First: 'Alice',
    Last: ''
  }

  {
    AlternateID: 1,
    ID: 2,
    ExtraField: {
      MoreExtra: 0,
      MoreExtra2: 1
    },
    FirstName: 'Robert',
    LastName: 'N/A',
    Name: {
      First: 'Bob',
      Last: ''
    }
  }
}
```

#### Constructable

This is the type of argument that the `Person.Model` constructor will accept.
A `Constructable` is either:

**(1)** `Person.Model`, which is an object with the following properties:
```typescript
{
  id: number,
  emailAddr: string,
  firstName: string,
  lastName: string
}
```
or **(2)** an object of the following shape:
```typescript
{list: JsonWithIdAndName[]}
```

In the case of **(1)**, this allows us to construct a `Person.Model` by constructing it with an existing `Person.Model`. Examples:

```typescript
const personOne = new Person.Model({
  id: 1,
  emailAddr: 'joel@dot.com',
  firstName: 'Joel',
  lastName: 'Dalley'
})

const personTwo = new Person.Model({
  ...personOne,
  emailAddr: 'joel@updated.address'
})
```

And in the case of **(2)**, we mock the shape of JSON from one or more RESTful endpoints. In particular, a `Person.Model` is robust enough to find the appropriate `id` value from one of two places--and likewise for `firstName` and `lastName`.

## Classes

```typescript
export class Model {
  // Properties
  [index: string]: number | string
  id = 0
  emailAddr = ''
  firstName = ''
  lastName = ''

  // Methods
  constructor(json: Constructable = {list: []}) {
    this.id = get(this, json, 'id', ['list.0.ID', 'list.0.AlternateID'])
    this.emailAddr = get(this, json, 'emailAddr', ['list.0.Email'])
    this.firstName = get(this, json, 'firstName', [
      'list.0.FirstName',
      'list.0.Name.First'
    ])
    this.lastName = get(this, json, 'lastName', [
      'list.0.LastName',
      'list.0.Name.Last'
    ])
  }
}
```

For our purposes, it is important that a `Person.Model` object can be spread into any other object, and so the class only has one method: the constructor.

It also has an index signature of

```typescript
[index: string]: number | string
```
which allows us index into properties of a `Person.Model`. Example:

```typescript
const person = new Person({list: [ID: 1, FirstName: 'Bob', LastName: '']})
console.log(person['firstName']) // Bob
```

In particular, we index into properties in the helper function, `get`.

## Helpers

```typescript
const get = (m: Person.Model, c: Person.Constructable, f: string, p: string[]) =>
  getOrElse(c, p.concat(f), m[f])
```

The helper function, `get`, wraps a specific use of the `lib` function, `getOrElse`. `get` narrows the types that `getOrElse` will see, and `m[f]` is where a `Person.Model`, `m` in this function, gets indexed into with a string index, `f` in this function, and is why we need the index signature on the `Person.Model` class.

`get` makes it easy to assign values to fields in an object constructor, by considering a list of possible locations within the given `Constructable` object where a value might be found, for each field we need to set in the constructor. Examples:

```typescript
new Person.Model({list: [{ID: 1, FirstName: '', LastName: ''}]}).id // 1
new Person.Model({list: [{AlternateID: 1, FirstName: '', LastName: ''}]}).id // 1
new Person.Model({
  ...new Person.Model({id: 0, emailAddr: '', firstName: '', lastName: ''}),
  id: 1
}).id // 1
new Person.Model({id: 1, emailAddr: '', firstName: '', lastName: ''}).id // 1
```
