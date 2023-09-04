import { v4 as uuid } from 'uuid'

export interface UserInterface {
  id?: string
  name: string
  email: string
  password: string
  createdAt?: Date
}

export class User {
  private readonly _id: string
  private _name: string
  private _email: string
  private _password: string
  protected _createdAt: Date

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get email(): string {
    return this._email
  }

  get password(): string {
    return this._password
  }

  get createdAt(): Date {
    return this._createdAt
  }

  set name(newName: string) {
    this._name = newName
  }

  set email(newEmail: string) {
    this._email = newEmail
  }

  set password(newPassword: string) {
    this._password = newPassword
  }

  set createdAt(newDate: Date) {
    this._createdAt = newDate
  }

  constructor(props: UserInterface) {
    this._name = props.name
    this._password = props.password
    this._email = props.email
    this._createdAt = props.createdAt || new Date()
    this._id = props.id || uuid()
  }
}
