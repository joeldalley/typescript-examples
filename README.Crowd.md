# [Crowd](https://github.com/joeldalley/typescript-examples/blob/master/src/lib/model/Crowd.ts)

## Design Goals

**(1)** Be able to construct a new instance of the class by spreading an existing instance into the constructor.

E.g.
```typescript
const first = new Crowd.Model({
  location: 'Saturn',
  persons: [
    new Person.Model({id: 0, emailAddr: '', firstName: 'Joel', lastName: ''})
  ]
})

const second = new Crowd.Model({
  ...first,
  persons: first.persons.concat(
    new Person.Model({id: 1, emailAddr: '', firstName: 'Alice', lastName: 'D'})
  )
})
```

## Namespaces

The Enum, Type and Class below are all part of the `Crowd` namespace.

## Enums

```typescript
export enum Size {
  Empty = 'empty',
  Solo = 'solo',
  Duo = 'duo',
  Trio = 'trio',
  Many = 'many'
}
```

## Types

```typescript
export type Constructable = Model | {location?: string, persons: Person.Model[]}
```

## Classes

```typescript
export class Model {
  readonly location: string = ''
  readonly persons: Person.Model[] = []
  readonly size: Size = Size.Empty

  constructor(json: Constructable = {persons: []}) {
    this.location = json.location || ''
    this.persons = json.persons
    this.size = ALL_SIZES[Math.min(4, this.persons.length)]
  }
}
```
