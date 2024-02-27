import { config } from 'dotenv'
import { sign } from 'jsonwebtoken'

import { IGenerateRefreshTokenProvider } from '../../app/providers/GenerateRefreshToken'

config()

/**
 * Implementation of the refresh token generation provider.
 *
 * @class
 * @implements {IGenerateRefreshTokenProvider}
 */
export class GenerateRefreshTokenProvider
  implements IGenerateRefreshTokenProvider
{
  /**
   * Generates a new refresh token based on the provided token.
   *
   * @async
   * @param {string} token - The token to use as a basis for the refresh token.
   * @returns {Promise<string>} The generated refresh token.
   * @throws {Error} Throws an error if the API_SECRET is missing in the environment variables.
   */
  async generateToken(token: string): Promise<string> {
    const secretKey = process.env.API_SECRET

    if (!secretKey) {
      throw new Error('API_SECRET is missing in the environment variables.')
    }

    const generatedToken = sign({}, secretKey, {
      subject: token,
      expiresIn: '1h',
    })

    return generatedToken
  }
}
