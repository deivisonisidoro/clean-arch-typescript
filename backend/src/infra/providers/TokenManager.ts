import dayjs from 'dayjs'
import dotenv from 'dotenv'
import { verify } from 'jsonwebtoken'

import { ITokenManagerProvider } from '../../app/providers/TokenManager'

dotenv.config()

/**
 * Provider for managing and validating authentication tokens.
 *
 * @class
 * @implements {ITokenManagerProvider}
 */
export class TokenManagerProvider implements ITokenManagerProvider {
  /**
   * Validates whether a token has expired based on the provided expiration timestamp.
   *
   * @param {number} expiresIn - The expiration timestamp of the token.
   * @returns {boolean} True if the token is expired, false otherwise.
   */
  validateTokenAge(expiresIn: number): boolean {
    return dayjs().isAfter(dayjs.unix(expiresIn))
  }

  /**
   * Validates the authenticity and integrity of a given token using the API secret.
   *
   * @param {string} token - The token to validate.
   * @returns {boolean} True if the token is valid, false otherwise.
   */
  validateToken(token: string): boolean {
    try {
      verify(token, process.env.API_SECRET || '')
      return true
    } catch (error) {
      return false
    }
  }
}
