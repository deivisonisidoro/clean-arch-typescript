/**
 * Unit tests for the RecoverUserInformationUserUseCase class using Vitest.
 * @module RecoverUserInformationUserUseCaseTests
 */

import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { ITokenManagerProvider } from '../../../../src/app/providers/TokenManager'
import { IRefreshTokenRepository } from '../../../../src/app/repositories/RefreshToken'
import { IUsersRepository } from '../../../../src/app/repositories/User'
import { RecoverUserInformationUserUseCase } from '../../../../src/app/useCases/Authenticate/implementations/RecoverUserInformation'
import { AuthMessages } from '../../../../src/domain/enums/Authenticate/AuthMessages'

/**
 * Test suite for the RecoverUserInformationUserUseCase class.
 * @function
 * @name RecoverUserInformationUserUseCaseTests
 */
describe('RecoverUserInformation', () => {
  let recoverUserInformationUserUseCase: RecoverUserInformationUserUseCase
  let userRepository: IUsersRepository
  let tokenManager: ITokenManagerProvider
  let refreshTokenRepository: IRefreshTokenRepository
  const mockRefreshTokenId = { refreshTokenId: 'mockRefreshTokenId' }
  const mockRefreshToken = {
    user_id: 'mockUserId',
    expires_in: 'mockExpiresIn',
  }
  const mockUserRequestDTO = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password',
  }

  /**
   * Set up before each test case.
   * @function
   * @name beforeEach
   */
  beforeEach(() => {
    refreshTokenRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findByUserId: vi.fn(),
      delete: vi.fn(),
    }
    userRepository = {
      update: vi.fn(),
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      delete: vi.fn(),
    }
    tokenManager = {
      validateToken: vi.fn(),
      validateTokenAge: vi.fn(),
    }
    recoverUserInformationUserUseCase = new RecoverUserInformationUserUseCase(
      refreshTokenRepository,
      userRepository,
      tokenManager,
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
   * Test case to verify an error response when the refresh token is invalid.
   * @function
   * @name shouldReturnErrorWhenRefreshTokenIsInvalid
   */
  it('should return an error response when the refresh token is invalid', async () => {
    refreshTokenRepository.findById = vi.fn().mockResolvedValueOnce(null)

    const result =
      await recoverUserInformationUserUseCase.execute(mockRefreshTokenId)

    expect(result).toEqual({
      data: { error: AuthMessages.TokenInvalidOrExpired },
      success: false,
    })
    expect(refreshTokenRepository.findById).toHaveBeenCalledWith(
      mockRefreshTokenId.refreshTokenId,
    )
  })

  /**
   * Test case to verify an error response when the refresh token is expired.
   * @function
   * @name shouldReturnErrorWhenRefreshTokenIsExpired
   */
  it('should return an error response when the refresh token is expired', async () => {
    refreshTokenRepository.findById = vi
      .fn()
      .mockResolvedValueOnce(mockRefreshToken)
    tokenManager.validateTokenAge = vi.fn().mockResolvedValueOnce(true)

    const result =
      await recoverUserInformationUserUseCase.execute(mockRefreshTokenId)

    expect(result).toEqual({
      data: { error: AuthMessages.TokenInvalidOrExpired },
      success: false,
    })
    expect(tokenManager.validateTokenAge).toHaveBeenCalledWith(
      mockRefreshToken.expires_in,
    )
  })

  /**
   * Test case to verify successful retrieval of user information.
   * @function
   * @name shouldReturnUserInformation
   */
  it('it should be able to return user information', async () => {
    refreshTokenRepository.findById = vi
      .fn()
      .mockResolvedValueOnce(mockRefreshToken)
    tokenManager.validateTokenAge = vi.fn().mockReturnValueOnce(false)
    userRepository.findById = vi.fn().mockReturnValueOnce(mockUserRequestDTO)

    const result =
      await recoverUserInformationUserUseCase.execute(mockRefreshTokenId)

    expect(result).toEqual({ data: mockUserRequestDTO, success: true })
    expect(userRepository.findById).toHaveBeenCalledWith(
      mockRefreshToken.user_id,
    )
  })
})
