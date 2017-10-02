import {Person} from './Person'

export namespace Crowd {
  export enum Size {
    Empty = 'empty',
    Solo = 'solo',
    Duo = 'duo',
    Trio = 'trio',
    Many = 'many'
  }
  const ALL_SIZES = [Size.Empty, Size.Solo, Size.Duo, Size.Trio, Size.Many]

  export type Constructable = Model | {
    location?: string,
    persons: Person.Model[]
  }

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
}
