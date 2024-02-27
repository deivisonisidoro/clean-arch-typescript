import { RefreshTokenDTO } from '../../domain/dtos/Authenticate/RefreshToken'

/**
 * Interface for the repository handling refresh tokens.
 *
 * @interface
 */
export interface IRefreshTokenRepository {
  /**
   * Creates a new refresh token for the specified user.
   *
   * @async
   * @param {string} user_id - The ID of the user.
   * @returns {Promise<RefreshTokenDTO>} The created refresh token.
   */
  create(user_id: string): Promise<RefreshTokenDTO>

  /**
   * Finds a refresh token by its identifier.
   *
   * @async
   * @param {string} refreshToken - The refresh token identifier.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token, or undefined if not found.
   */
  findById(refreshToken: string): Promise<RefreshTokenDTO | unknown>

  /**
   * Finds a refresh token by the user's ID.
   *
   * @async
   * @param {string} user_id - The ID of the user.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token, or undefined if not found.
   */
  findByUserId(user_id: string): Promise<RefreshTokenDTO | unknown>

  /**
   * Deletes a refresh token associated with the specified user.
   *
   * @async
   * @param {string} user_id - The ID of the user.
   * @returns {Promise<void>} A promise that resolves when the refresh token is deleted.
   */
  delete(user_id: string): Promise<void>
}
