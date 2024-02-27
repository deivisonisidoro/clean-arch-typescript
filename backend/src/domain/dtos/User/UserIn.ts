/**
 * Data Transfer Object (DTO) representing the input user data.
 *
 * @interface
 */
export interface IUserInRequestDTO {
  /**
   * The ID of the user.
   */
  id: string

  /**
   * The name of the user.
   */
  name: string

  /**
   * The email address of the user.
   */
  email: string

  /**
   * The creation date of the user account.
   */
  createdAt: Date

  /**
   * The hashed password of the user.
   */
  password: string
}
