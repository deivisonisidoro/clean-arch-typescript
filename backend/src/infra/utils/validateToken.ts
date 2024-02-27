import dotenv from 'dotenv'
import { verify } from 'jsonwebtoken'

dotenv.config()

/**
 * Validates the integrity and format of a JSON Web Token (JWT).
 *
 * @param {string} token - The JWT to be validated.
 * @returns {boolean} A boolean indicating whether the JWT is valid.
 */
export function validateToken(token: string): boolean {
  try {
    verify(token, process.env.API_SECRET || '')
    return true
  } catch (error) {
    return false
  }
}
