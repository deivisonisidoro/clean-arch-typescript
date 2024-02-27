/**
 * Unit tests for the GenerateRefreshTokenProvider class using Vitest.
 * @module GenerateRefreshTokenProviderTests
 */

import { test, describe, expect, beforeEach } from 'vitest'

import { IGenerateRefreshTokenProvider } from '../../../../src/app/providers/GenerateRefreshToken'
import { GenerateRefreshTokenProvider } from '../../../../src/infra/providers/GenerateRefreshToken'

/**
 * Test suite for the GenerateRefreshTokenProvider class.
 * @function
 * @name GenerateRefreshTokenProviderTests
 */
describe('GenerateRefreshTokenProvider', () => {
  let generateRefreshTokenProvider: IGenerateRefreshTokenProvider

  /**
   * Function to perform setup operations before each test.
   * @function
   * @name beforeEachTest
   * @description This function initializes the GenerateRefreshTokenProvider instance before each test.
   */
  beforeEach(() => {
    generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
  })

  /**
   * Test case to verify the generateToken method returns a string.
   * @function
   * @name generateTokenShouldReturnString
   */
  test('generateToken should return a string', async () => {
    const token = 'yourToken'

    const generatedToken =
      await generateRefreshTokenProvider.generateToken(token)
    expect(generatedToken).toBeTypeOf('string')
  })
})
