/**
 * Data Transfer Object (DTO) representing the request to create a new user.
 *
 * @interface
 */
export interface ICreateUserRequestDTO {
  /**
   * The name of the user.
   */
  name: string

  /**
   * The email address of the user.
   */
  email: string

  /**
   * The password of the user.
   */
  password: string
}
