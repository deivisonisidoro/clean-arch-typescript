/**
 * Unit tests for the RefreshTokenUserUseCase class using Vitest.
 * @module RefreshTokenUserUseCaseTests
 */

import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IGenerateRefreshTokenProvider } from '../../../../src/app/providers/GenerateRefreshToken'
import { ITokenManagerProvider } from '../../../../src/app/providers/TokenManager'
import { IRefreshTokenRepository } from '../../../../src/app/repositories/RefreshToken'
import { RefreshTokenUserUseCase } from '../../../../src/app/useCases/Authenticate/implementations/RefreshTokenUser'

/**
 * Test suite for the RefreshTokenUserUseCase class.
 * @function
 * @name RefreshTokenUserUseCaseTests
 */
describe('RefreshTokenUserUseCase', () => {
  let refreshTokenUserUseCase: RefreshTokenUserUseCase
  let generateRefreshTokenProvider: IGenerateRefreshTokenProvider
  let refreshTokenRepository: IRefreshTokenRepository
  let tokenManager: ITokenManagerProvider
  const mockRefreshTokenId = { refreshTokenId: 'mockRefreshTokenId' }
  const mockRefreshToken = {
    user_id: 'mockUserId',
    expires_in: 'mockExpiresIn',
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
    generateRefreshTokenProvider = {
      generateToken: vi.fn(),
    }
    tokenManager = {
      validateToken: vi.fn(),
      validateTokenAge: vi.fn(),
    }
    refreshTokenUserUseCase = new RefreshTokenUserUseCase(
      generateRefreshTokenProvider,
      refreshTokenRepository,
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
   * Test suite for the execute method of RefreshTokenUserUseCase.
   * @function
   * @name execute
   */
  describe('execute', () => {
    /**
     * Test case to verify an error response when the refresh token is invalid.
     * @function
     * @name shouldReturnErrorWhenRefreshTokenIsInvalid
     */
    it('should return an error response when the refresh token is invalid', async () => {
      refreshTokenRepository.findById = vi.fn().mockResolvedValueOnce(null)

      const result = await refreshTokenUserUseCase.execute(mockRefreshTokenId)

      expect(result).toEqual({
        data: { error: 'Refresh token is invalid.' },
        success: false,
      })
      expect(refreshTokenRepository.findById).toHaveBeenCalledWith(
        mockRefreshTokenId.refreshTokenId,
      )
    })

    /**
     * Test case to verify a new refresh token and token are returned when the refresh token has expired.
     * @function
     * @name shouldReturnNewRefreshTokenWhenExpired
     */
    it('should return a new refresh token and token when the refresh token has expired', async () => {
      refreshTokenRepository.findById = vi
        .fn()
        .mockResolvedValueOnce(mockRefreshToken)
      tokenManager.validateTokenAge = vi.fn().mockReturnValueOnce(true)
      generateRefreshTokenProvider.generateToken = vi
        .fn()
        .mockResolvedValueOnce('newMockRefreshToken')

      const result = await refreshTokenUserUseCase.execute(mockRefreshTokenId)

      expect(result.data).toHaveProperty('token')
      expect(result.data).toHaveProperty('refreshToken')
      expect(refreshTokenRepository.delete).toHaveBeenCalledWith(
        mockRefreshToken.user_id,
      )
      expect(generateRefreshTokenProvider.generateToken).toHaveBeenCalledWith(
        mockRefreshToken.user_id,
      )
    })

    /**
     * Test case to verify only a token is returned when the refresh token is valid and has not expired.
     * @function
     * @name shouldReturnTokenWhenValidAndNotExpired
     */
    it('should return a token when the refresh token is valid and has not expired', async () => {
      refreshTokenRepository.findById = vi
        .fn()
        .mockResolvedValueOnce(mockRefreshToken)
      tokenManager.validateTokenAge = vi.fn().mockReturnValueOnce(false)
      generateRefreshTokenProvider.generateToken = vi
        .fn()
        .mockResolvedValueOnce('mockGeneratedToken')

      const result = await refreshTokenUserUseCase.execute(mockRefreshTokenId)

      expect(result).toEqual({
        data: { token: 'mockGeneratedToken' },
        success: true,
      })
      expect(refreshTokenRepository.delete).not.toHaveBeenCalled()
    })
  })
})
