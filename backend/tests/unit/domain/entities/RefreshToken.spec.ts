/**
 * Unit tests for the RefreshToken entity using Vitest.
 * @module RefreshTokenEntityTests
 */

import { it, describe, expect } from 'vitest'

import { RefreshToken } from '../../../../src/domain/entities/RefreshToken'
import { User } from '../../../../src/domain/entities/User'
import { Email } from '../../../../src/domain/valueObjects/Email'

/**
 * Test suite for the RefreshToken entity.
 * @function
 * @name RefreshTokenEntityTests
 */
describe('RefreshToken', () => {
  // Create a user instance for testing
  const user = new User({
    name: 'John Doe',
    email: new Email({ address: 'john@example.com' }),
    password: 'password123',
  })

  // Properties for the RefreshToken instance
  const refreshTokenProps = {
    expires_in: 3600,
    user_id: 'user123',
    createdAt: new Date(),
    user,
  }

  // Create a RefreshToken instance for testing
  const refreshToken = new RefreshToken(refreshTokenProps)

  /**
   * Test case to verify that it has the correct expires_in property.
   * @function
   * @name shouldHaveCorrectExpiresIn
   */
  it('should have correct expires_in', () => {
    expect(refreshToken.expires_in).toBe(3600)
  })

  /**
   * Test case to verify that it has the correct user_id property.
   * @function
   * @name shouldHaveCorrectUserId
   */
  it('should have correct user_id', () => {
    expect(refreshToken.user_id).toBe('user123')
  })

  /**
   * Test case to verify that it has the correct user property.
   * @function
   * @name shouldHaveCorrectUser
   */
  it('should have correct user', () => {
    expect(refreshToken.user).toBe(user)
  })

  /**
   * Test case to verify that it has the correct createdAt property.
   * @function
   * @name shouldHaveCorrectCreatedAt
   */
  it('should have correct createdAt', () => {
    expect(refreshToken.createdAt).toBe(refreshTokenProps.createdAt)
  })
})
