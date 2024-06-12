import { ICreateUserRequestDTO } from '../dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../dtos/User/UpdateUser'
import { Email } from '../valueObjects/Email'

/**
 * Interface representing the structure of a user.
 *
 * @interface
 */
export interface UserInterface {
  name: string
  email: Email
  password: string
}

/**
 * Class representing a user.
 *
 * @class
 */
export class UserEntity {
  private _name: string
  private _email: Email
  private _password: string

  /**
   * Creates a new user instance based on the provided data.
   *
   * @static
   * @param {ICreateUserRequestDTO} data - The data to create a user.
   * @returns {UserEntity} The created user instance.
   */
  static create({ email, name, password }: ICreateUserRequestDTO): UserEntity {
    const newEmail = new Email({ address: email })
    return new UserEntity({ name, email: newEmail, password })
  }

  /**
   * Updates the user instance with the provided data.
   *
   * @static
   * @param {IUpdateUserRequestDTO} updatedUser - The data to update the user.
   * @returns {IUpdateUserRequestDTO} The updated user data.
   */
  static update(updatedUser: IUpdateUserRequestDTO): IUpdateUserRequestDTO {
    if (updatedUser.email) {
      updatedUser.email = new Email({ address: updatedUser.email }).address
    }
    return updatedUser
  }

  /**
   * Gets the user's name.
   *
   * @readonly
   */
  get name(): string {
    return this._name
  }

  /**
   * Gets the user's email.
   *
   * @readonly
   */
  get email(): Email {
    return this._email
  }

  /**
   * Gets the user's password.
   *
   * @readonly
   */
  get password(): string {
    return this._password
  }

  /**
   * Creates an instance of UserEntity.
   *
   * @constructor
   * @param {UserInterface} props - The properties of the user.
   */
  constructor(props: UserInterface) {
    this._name = props.name
    this._password = props.password
    this._email = props.email
  }
}
