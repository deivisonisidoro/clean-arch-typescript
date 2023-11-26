import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest';

import { IGenerateRefreshTokenProvider } from "../../../../src/app/providers/GenerateRefreshToken";
import { RefreshTokenUserUseCase } from "../../../../src/app/useCases/Authenticate/implementations/RefreshTokenUser"
import { IRefreshTokenRepository } from '../../../../src/app/repositories/RefreshToken';
import { ITokenManagerProvider } from '../../../../src/app/providers/TokenManager';



describe('RefreshTokenUserUseCase', () => {
  let refreshTokenUserUseCase: RefreshTokenUserUseCase;
  let generateRefreshTokenProvider: IGenerateRefreshTokenProvider;
  let refreshTokenRepository: IRefreshTokenRepository
  let tokenManager: ITokenManagerProvider
  const mockRefreshTokenId = 'mockRefreshTokenId';
  const mockRefreshToken = {
    user_id: 'mockUserId',
    expires_in: 'mockExpiresIn',
  };

  beforeEach(() => {
    refreshTokenRepository ={
      create: vi.fn(),
      findById: vi.fn(),
      findByUserId: vi.fn(),
      delete: vi.fn(),
    }
    generateRefreshTokenProvider = {
      generateToken: vi.fn()
    }
    tokenManager = {
      validateToken: vi.fn(),
      validateTokenAge: vi.fn(),
    }
    refreshTokenUserUseCase = new RefreshTokenUserUseCase(
      generateRefreshTokenProvider,
      refreshTokenRepository,
      tokenManager
    )
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('execute', () => {
    it('should return an error response when the refresh token is invalid', async () => {
      refreshTokenRepository.findById = vi.fn().mockResolvedValueOnce(null)

      const result = await refreshTokenUserUseCase.execute(mockRefreshTokenId);

      expect(result).toEqual({ data: { error: 'Refresh token is invalid.' }, success: false });
      expect(refreshTokenRepository.findById).toHaveBeenCalledWith(mockRefreshTokenId);
    });

    it('should return a new refresh token and token when the refresh token has expired', async () => {
      refreshTokenRepository.findById = vi.fn().mockResolvedValueOnce(mockRefreshToken);
      tokenManager.validateTokenAge = vi.fn().mockReturnValueOnce(true);
      generateRefreshTokenProvider.generateToken = vi.fn().mockResolvedValueOnce('newMockRefreshToken');

      const result = await refreshTokenUserUseCase.execute(mockRefreshTokenId);

      expect(result.data).toHaveProperty("token");
      expect(result.data).toHaveProperty("refreshToken");
      expect(refreshTokenRepository.delete).toHaveBeenCalledWith(mockRefreshToken.user_id);
      expect(generateRefreshTokenProvider.generateToken).toHaveBeenCalledWith(mockRefreshToken.user_id);
    });

    it('should return a token when the refresh token is valid and has not expired', async () => {
      refreshTokenRepository.findById = vi.fn().mockResolvedValueOnce(mockRefreshToken);
      tokenManager.validateTokenAge = vi.fn().mockReturnValueOnce(false);
      generateRefreshTokenProvider.generateToken = vi.fn().mockResolvedValueOnce('mockGeneratedToken');

      const result = await refreshTokenUserUseCase.execute(mockRefreshTokenId);

      expect(result).toEqual({ data: { token: 'mockGeneratedToken' }, success: true });
      expect(refreshTokenRepository.delete).not.toHaveBeenCalled();
    });
  });
})
