/**
 * Data Transfer Object (DTO) representing the request to update a user.
 *
 * @interface
 */
export interface IUpdateUserRequestDTO {
  /**
   * The ID of the user to be updated.
   */
  id?: string

  /**
   * The updated name of the user.
   */
  name?: string

  /**
   * The updated email address of the user.
   */
  email?: string

  /**
   * The updated password of the user.
   */
  password?: string
}
