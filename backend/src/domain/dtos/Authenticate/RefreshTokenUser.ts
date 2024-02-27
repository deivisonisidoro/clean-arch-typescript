/**
 * Data Transfer Object (DTO) representing the input for refreshing a user's authentication token.
 *
 * @interface
 */
export interface IRefreshTokenUserDTO {
  /**
   * The identifier of the refresh token used for authentication token refresh.
   */
  refreshTokenId: string
}
