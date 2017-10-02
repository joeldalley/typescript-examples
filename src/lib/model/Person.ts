import getOrElse from '../getOrElse'

export namespace Person {
  interface Json {Email?: string, [index: number]: any, [index: string]: any}
  interface Id {ID: number}
  interface AlternateId {AlternateID: number}
  interface Name {Name: {First: string, Last: string}}
  interface AlternateName {FirstName: string, LastName: string}

  export type JsonWithIdAndName = Json & (Id | AlternateId) & (Name | AlternateName)
  export type Constructable = Person.Model | {list: JsonWithIdAndName[]}

  export class Model {
    [index: string]: number | string
    id = 0
    emailAddr = ''
    firstName = ''
    lastName = ''

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
}

////////////////////////////////////////////////////////////////
// Helpers.

const get = (m: Person.Model, c: Person.Constructable, f: string, p: string[]) =>
  getOrElse(c, p.concat(f), m[f])
