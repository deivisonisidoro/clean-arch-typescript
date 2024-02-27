/**
 * Unit tests for the PasswordHasher class using Vitest.
 * @module PasswordHasherTests
 */

import { beforeEach, describe, expect, it } from 'vitest'

import { IPasswordHasher } from '../../../../src/app/providers/PasswordHasher'
import { PasswordHasher } from '../../../../src/infra/providers/PasswordHasher'

/**
 * Test suite for the PasswordHasher class.
 * @function
 * @name PasswordHasherTests
 */
describe('PasswordHasher', () => {
  let passwordHasher: IPasswordHasher

  /**
   * Function to perform setup operations before each test.
   * @function
   * @name beforeEachTest
   * @description This function initializes the PasswordHasher instance before each test.
   */
  beforeEach(() => {
    passwordHasher = new PasswordHasher()
  })

  /**
   * Test case to verify that the hashPassword method returns a string.
   * @function
   * @name shouldHashPassword
   */
  it('should hash the password', async () => {
    const originalPassword = 'mySecurePassword123'

    const hashedPassword = await passwordHasher.hashPassword(originalPassword)

    expect(typeof hashedPassword).toBe('string')
  })

  /**
   * Test case to verify that the comparePasswords method returns true for correct passwords.
   * @function
   * @name shouldReturnTrueForCorrectPassword
   */
  it('should compare passwords and return true for correct password', async () => {
    const originalPassword = 'mySecurePassword123'

    const hashedPassword = await passwordHasher.hashPassword(originalPassword)

    const passwordMatch = await passwordHasher.comparePasswords(
      originalPassword,
      hashedPassword,
    )

    expect(passwordMatch).toBe(true)
  })

  /**
   * Test case to verify that the comparePasswords method returns false for incorrect passwords.
   * @function
   * @name shouldReturnFalseForIncorrectPassword
   */
  it('should compare passwords and return false for incorrect password', async () => {
    const originalPassword = 'mySecurePassword123'
    const incorrectPassword = 'wrongPassword'

    const hashedPassword = await passwordHasher.hashPassword(originalPassword)

    const passwordMatch = await passwordHasher.comparePasswords(
      incorrectPassword,
      hashedPassword,
    )

    expect(passwordMatch).toBe(false)
  })
})
