import { ICreateUserRequestDTO } from '../dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../dtos/User/UpdateUser'
import { Email } from '../entities/Email'

export interface UserInterface {
  id?: string
  name: string
  email: Email
  password: string
  createdAt?: Date
}

export class User {
  private readonly _id: string
  private _name: string
  private _email: Email
  private _password: string
  protected _createdAt: Date

  static create({ email, name, password }: ICreateUserRequestDTO): User {
    const newEmail = new Email({ address: email })
    return new User({ name, email: newEmail, password })
  }

  static update(updatedUser: IUpdateUserRequestDTO): IUpdateUserRequestDTO {
    if (updatedUser.email) {
      updatedUser.email = new Email({ address: updatedUser.email }).address
    }
    return updatedUser
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get email(): Email {
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

  set email(newEmail: Email) {
    this._email = newEmail
  }

  set password(newPassword: string) {
    this._password = newPassword
  }

  constructor(props: UserInterface) {
    this._name = props.name
    this._password = props.password
    this._email = props.email
    this._createdAt = props.createdAt || new Date()
    this._id = props.id || ''
  }
}
