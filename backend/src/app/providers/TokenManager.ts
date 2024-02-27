/**
 * Interface for the provider responsible for managing and validating tokens.
 *
 * @interface
 */
export interface ITokenManagerProvider {
  /**
   * Validates the age of a token based on its expiration time.
   *
   * @param {number} expires_in - The expiration time of the token in seconds.
   * @returns {boolean} A boolean indicating whether the token is still valid based on its age.
   */
  validateTokenAge(expires_in: number): boolean

  /**
   * Validates the integrity and format of a token.
   *
   * @param {string} token - The token to be validated.
   * @returns {boolean} A boolean indicating whether the token is valid.
   */
  validateToken(token: string): boolean
}
