import dayjs from 'dayjs';
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ITokenManagerProvider } from '../../app/providers/TokenManager';

dotenv.config();

/**
 * Provider for managing and validating authentication tokens.
 *
 * @class
 * @implements {ITokenManagerProvider}
 */
export class TokenManagerProvider implements ITokenManagerProvider{
  /**
   * Validates whether a token has expired based on the provided expiration timestamp.
   *
   * @param {number} expires_in - The expiration timestamp of the token.
   * @returns {boolean} True if the token is expired, false otherwise.
   */
  validateTokenAge(expires_in: number): boolean {
    return dayjs().isAfter(dayjs.unix(expires_in));
  }

  /**
   * Validates the authenticity and integrity of a given token using the API secret.
   *
   * @param {string} token - The token to validate.
   * @returns {boolean} True if the token is valid, false otherwise.
   */
  validateToken(token: string): boolean {
    try {
      verify(token, process.env.API_SECRET || '');
      return true;
    } catch (error) {
      return false;
    }
  }
}
