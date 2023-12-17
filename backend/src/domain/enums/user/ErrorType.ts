/**
 * Enum representing error types related to user operations.
 *
 * @enum
 */
export enum UserErrorType {
  /**
   * Error type indicating that the user already exists.
   */
  UserAlreadyExists = 'User already exists!',

  /**
   * Error type indicating that the user does not exist.
   */
  UserDoesNotExist = 'User does not exist!',

  /**
   * Error type indicating that no users were found.
   */
  UserNotFound = 'Users not found',
}
