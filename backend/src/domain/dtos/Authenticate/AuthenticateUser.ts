/**
 * Data Transfer Object (DTO) representing user authentication data.
 *
 * @interface
 */
export interface IAuthenticateUserDTO {
  /**
   * The email address of the user for authentication.
   */
  email: string

  /**
   * The password of the user for authentication.
   */
  password: string
}
