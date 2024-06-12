import { UserEntity } from './User'

/**
 * Interface representing the structure of a refresh token.
 *
 * @interface
 */
export interface IRefreshTokenEntity {
  expires_in: number
  user_id: string
  user: UserEntity
  createdAt: Date
}

/**
 * Class representing a refresh token.
 *
 * @class
 */
export class RefreshTokenEntity {
  private _expires_in: number
  private _user_id: string
  private _user: UserEntity
  private _createdAt: Date

  /**
   * Gets the expiration time of the refresh token.
   *
   * @readonly
   */
  get expires_in(): number {
    return this._expires_in
  }

  /**
   * Gets the user ID associated with the refresh token.
   *
   * @readonly
   */
  get user_id(): string {
    return this._user_id
  }

  /**
   * Gets the user associated with the refresh token.
   *
   * @readonly
   */
  get user(): UserEntity {
    return this._user
  }

  /**
   * Gets the creation date of the refresh token.
   *
   * @readonly
   */
  get createdAt(): Date {
    return this._createdAt
  }

  /**
   * Creates an instance of RefreshToken.
   *
   * @constructor
   * @param {IRefreshTokenEntity} props - The properties of the refresh token.
   */
  constructor(props: IRefreshTokenEntity) {
    this._expires_in = props.expires_in
    this._user_id = props.user_id
    this._createdAt = props.createdAt
    this._user = props.user
  }
}
