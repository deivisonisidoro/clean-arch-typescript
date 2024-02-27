/**
 * Data Transfer Object (DTO) representing a refresh token.
 *
 * @interface
 */
export interface RefreshTokenDTO {
  /**
   * The unique identifier for the refresh token.
   */
  id: string

  /**
   * The expiration time of the refresh token (in seconds).
   */
  expires_in: number

  /**
   * The user ID associated with the refresh token.
   */
  user_id: string

  /**
   * The creation timestamp of the refresh token.
   */
  createdAt: Date
}
