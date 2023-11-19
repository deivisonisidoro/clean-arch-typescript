import { IUpdateUserRequestDTO } from '../dtos/User/UpdateUser'
import { Email } from '../valueObjects/Email'
import { ICreateUserRequestDTO } from '../dtos/User/CreateUser'

export interface UserInterface {
  name: string
  email: Email
  password: string
}

export class User {
  private _name: string
  private _email: Email
  private _password: string

  static create({ email, name, password }: ICreateUserRequestDTO) {
    const newEmail = new Email({ address: email })
    return new User({ name, email: newEmail, password })
  }

  static update(updatedUser: IUpdateUserRequestDTO) {
    if (updatedUser.email) {
      updatedUser.email = new Email({ address: updatedUser.email }).address
    }
    return updatedUser
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

  constructor(props: UserInterface) {
    this._name = props.name
    this._password = props.password
    this._email = props.email
  }
}
