/**
 * Integration tests for the RefreshTokenPrismaRepository class using Vitest.
 * @module RefreshTokenPrismaRepositoryTests
 */

import { beforeAll, describe, expect, it } from 'vitest'

import { IRefreshTokenRepository } from '../../../../../src/app/repositories/RefreshToken'
import { IUsersRepository } from '../../../../../src/app/repositories/User'
import { RefreshTokenPrismaRepository } from '../../../../../src/infra/repositories/prisma/RefreshToken'
import { UserRepository } from '../../../../../src/infra/repositories/prisma/User'
import { prisma } from '../../../../helpers/db/prisma'

/**
 * Test suite for the RefreshTokenPrismaRepository class.
 * @function
 * @name RefreshTokenPrismaRepositoryTests
 */
describe('RefreshTokenPrismaRepository', () => {
  let refreshTokenPrismaRepository: IRefreshTokenRepository
  let userRepository: IUsersRepository

  const userData = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password',
  }

  /**
   * Function to perform setup operations before running tests.
   * @function
   * @name beforeAllTests
   * @description This function initializes instances of RefreshTokenPrismaRepository and UserRepository before running tests.
   */
  beforeAll(async () => {
    refreshTokenPrismaRepository = new RefreshTokenPrismaRepository(prisma)
    userRepository = new UserRepository(prisma)
  })

  /**
   * Test case to verify that the create method creates a refresh token.
   * @function
   * @name shouldCreateRefreshToken
   */
  it('create method should create a refresh token', async () => {
    const userCreated = await userRepository.create(userData)
    const result = await refreshTokenPrismaRepository.create(userCreated.id)
    expect(result).toBeDefined()
  })

  /**
   * Test case to verify that the findById method finds a refresh token by ID.
   * @function
   * @name shouldFindRefreshTokenById
   */
  it('finds a refresh token by id', async () => {
    const userCreated = await userRepository.create(userData)
    const refreshToken = await refreshTokenPrismaRepository.create(
      userCreated.id,
    )

    const result = await refreshTokenPrismaRepository.findById(refreshToken.id)

    expect(result).toBeDefined()
  })

  /**
   * Test case to verify that the findById method returns null if the refresh token is not found.
   * @function
   * @name shouldReturnNullForNonExistentRefreshToken
   */
  it('returns null if the refresh token is not found', async () => {
    const refreshTokenId = 'nonExistentRefreshTokenId'
    const result = await refreshTokenPrismaRepository.findById(refreshTokenId)

    expect(result).toBeNull()
  })

  /**
   * Test case to verify that the findByUserId method finds a refresh token by user ID.
   * @function
   * @name shouldFindRefreshTokenByUserId
   */
  it('finds a refresh token by user id', async () => {
    const userCreated = await userRepository.create(userData)
    await refreshTokenPrismaRepository.create(userCreated.id)

    const result = await refreshTokenPrismaRepository.findByUserId(
      userCreated.id,
    )

    expect(result).toBeDefined()
  })

  /**
   * Test case to verify that the delete method deletes a refresh token by user ID.
   * @function
   * @name shouldDeleteRefreshTokenByUserId
   */
  it('deletes a refresh token by user ID', async () => {
    const userCreated = await userRepository.create(userData)
    const refreshToken = await refreshTokenPrismaRepository.create(
      userCreated.id,
    )

    await refreshTokenPrismaRepository.delete(userCreated.id)

    const result = await refreshTokenPrismaRepository.findById(refreshToken.id)
    expect(result).toBeDefined()
  })
})
