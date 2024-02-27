/**
 * Enum representing messages related to authentication.
 *
 * @enum
 */
export enum AuthMessages {
  /**
   * Message indicating that the Authorization header is missing in the request.
   */
  AuthorizationHeaderMissing = 'Authorization header missing',

  /**
   * Message indicating that the authentication token is either invalid or expired.
   */
  TokenInvalidOrExpired = 'Token invalid or expired',
}
