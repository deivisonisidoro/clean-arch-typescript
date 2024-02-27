/**
 * Interface for the provider responsible for generating refresh tokens.
 *
 * @interface
 */
export interface IGenerateRefreshTokenProvider {
  /**
   * Generates a new refresh token based on the provided token.
   *
   * @async
   * @param {string} token - The token used as a basis for generating the refresh token.
   * @returns {Promise<string>} The generated refresh token.
   */
  generateToken(token: string): Promise<string>
}
