/**
 * Unit tests for the AuthenticateUserUseCase class using Vitest.
 * @module AuthenticateUserUseCaseTests
 */

import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IGenerateRefreshTokenProvider } from '../../../../src/app/providers/GenerateRefreshToken'
import { IPasswordHasher } from '../../../../src/app/providers/PasswordHasher'
import { IRefreshTokenRepository } from '../../../../src/app/repositories/RefreshToken'
import { IUsersRepository } from '../../../../src/app/repositories/User'
import { AuthenticateUserUseCase } from '../../../../src/app/useCases/Authenticate/implementations/AuthenticateUser'
import { IAuthenticateUserDTO } from '../../../../src/domain/dtos/Authenticate/AuthenticateUser'
import { AuthenticateUserErrorType } from '../../../../src/domain/enums/Authenticate/AuthenticateUser/ErrorType'

/**
 * Test suite for the AuthenticateUserUseCase class.
 * @function
 * @name AuthenticateUserUseCaseTests
 */
describe('Authenticate user', () => {
  let userRepository: IUsersRepository
  let authenticateUserUseCase: AuthenticateUserUseCase
  let generateRefreshTokenProvider: IGenerateRefreshTokenProvider
  let passwordHasher: IPasswordHasher
  let refreshTokenRepository: IRefreshTokenRepository

  /**
   * Set up before each test case.
   * @function
   * @name beforeEach
   */
  beforeEach(() => {
    userRepository = {
      update: vi.fn(),
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      delete: vi.fn(),
    }
    passwordHasher = {
      hashPassword: vi.fn(),
      comparePasswords: vi.fn(),
    }
    refreshTokenRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findByUserId: vi.fn(),
      delete: vi.fn(),
    }
    generateRefreshTokenProvider = {
      generateToken: vi.fn(),
    }
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepository,
      passwordHasher,
      generateRefreshTokenProvider,
      refreshTokenRepository,
    )
  })

  /**
   * Clean up after each test case.
   * @function
   * @name afterEach
   */
  afterEach(() => {
    vi.clearAllMocks()
  })

  /**
   * Test case to verify successful authentication of an existing user.
   * @function
   * @name shouldAuthenticateExistingUser
   */
  it('should be able to authenticate an user', async () => {
    const userData: IAuthenticateUserDTO = {
      email: 'test@test.com.br',
      password: '123456',
    }

    userRepository.findByEmail = vi.fn().mockResolvedValueOnce(userData)
    passwordHasher.comparePasswords = vi.fn().mockResolvedValueOnce(true)
    const userAuthenticated = await authenticateUserUseCase.execute(userData)

    expect(userAuthenticated.data).toHaveProperty('token')
    expect(userAuthenticated.data).toHaveProperty('refreshToken')
  })

  /**
   * Test case to verify deletion of the refresh token after successful authentication.
   * @function
   * @name shouldDeleteRefreshToken
   */
  it('should be able delete token', async () => {
    const userData: IAuthenticateUserDTO = {
      email: 'test@test.com.br',
      password: '123456',
    }

    userRepository.findByEmail = vi.fn().mockResolvedValueOnce(userData)
    passwordHasher.comparePasswords = vi.fn().mockResolvedValueOnce(true)
    refreshTokenRepository.findByUserId = vi.fn().mockResolvedValueOnce('token')
    refreshTokenRepository.delete = vi.fn().mockResolvedValueOnce(null)
    const userAuthenticated = await authenticateUserUseCase.execute(userData)

    expect(userAuthenticated.data).toHaveProperty('token')
    expect(userAuthenticated.data).toHaveProperty('refreshToken')
  })

  /**
   * Test case to verify that it cannot authenticate an existing user with the wrong email.
   * @function
   * @name shouldNotAuthenticateExistingUserWithWrongEmail
   */
  it('should not be able to authenticate an existing user with wrong email', async () => {
    const userData: IAuthenticateUserDTO = {
      email: 'testexisting@test.com.br',
      password: 'testexisting',
    }
    userRepository.findByEmail = vi.fn().mockResolvedValueOnce(null)

    const result = await authenticateUserUseCase.execute(userData)
    expect(result.data).toEqual({
      error: AuthenticateUserErrorType.EmailOrPasswordWrong,
    })
  })

  /**
   * Test case to verify that it cannot authenticate an existing user with the wrong password.
   * @function
   * @name shouldNotAuthenticateExistingUserWithWrongPassword
   */
  it('should not be able to authenticate an existing user with wrong password', async () => {
    const userData: IAuthenticateUserDTO = {
      email: 'testexisting@test.com.br',
      password: 'testexisting',
    }
    userRepository.findByEmail = vi.fn().mockResolvedValueOnce(userData)
    passwordHasher.comparePasswords = vi.fn().mockResolvedValueOnce(false)

    const result = await authenticateUserUseCase.execute(userData)
    expect(result.data).toEqual({
      error: AuthenticateUserErrorType.EmailOrPasswordWrong,
    })
  })
})
