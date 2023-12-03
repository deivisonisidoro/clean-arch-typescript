import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest';

import { IRefreshTokenRepository } from '../../../../src/app/repositories/RefreshToken';
import { ITokenManagerProvider } from '../../../../src/app/providers/TokenManager';
import { IUsersRepository } from "../../../../src/app/repositories/User";
import { RecoverUserInformationUserUseCase } from "../../../../src/app/useCases/Authenticate/implementations/RecoverUserInformation"
import { IRecoverUserInformationUseCase } from "../../../../src/app/useCases/Authenticate/RecoverUserInformation"
import { AuthMessages } from '../../../../src/domain/enums/Authenticate/AuthMessages';
import { ICreateUserRequestDTO } from '../../../../src/domain/dtos/User/CreateUser';

describe('RecoverUserInformation', () => {
  let recoverUserInformationUserUseCase: IRecoverUserInformationUseCase;
  let userRepository: IUsersRepository;
  let tokenManager: ITokenManagerProvider;
  let refreshTokenRepository: IRefreshTokenRepository
  const mockRefreshTokenId = {refreshTokenId: 'mockRefreshTokenId'};
  const mockRefreshToken = {
    user_id: 'mockUserId',
    expires_in: 'mockExpiresIn',
  };
  const mockUserRequestDTO= {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password',
  }

  beforeEach(() => {
    refreshTokenRepository ={
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
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should return an error response when the refresh token is invalid', async () => {
    refreshTokenRepository.findById = vi.fn().mockResolvedValueOnce(null)

    const result = await recoverUserInformationUserUseCase.execute(mockRefreshTokenId);

    expect(result).toEqual({ data: { error:  AuthMessages.TokenInvalidOrExpired }, success: false });
    expect(refreshTokenRepository.findById).toHaveBeenCalledWith(mockRefreshTokenId.refreshTokenId);
  });

  it('should return an error response when the refresh token is expired', async () => {
    refreshTokenRepository.findById = vi.fn().mockResolvedValueOnce(mockRefreshToken)
    tokenManager.validateTokenAge = vi.fn().mockResolvedValueOnce(true)

    const result = await recoverUserInformationUserUseCase.execute(mockRefreshTokenId);

    expect(result).toEqual({ data: { error:  AuthMessages.TokenInvalidOrExpired }, success: false });
    expect(tokenManager.validateTokenAge).toHaveBeenCalledWith(mockRefreshToken.expires_in);
  });

  it('it should be able to return user information',async () => {
    refreshTokenRepository.findById = vi.fn().mockResolvedValueOnce(mockRefreshToken)
    tokenManager.validateTokenAge = vi.fn().mockReturnValueOnce(false);
    userRepository.findById = vi.fn().mockReturnValue(mockUserRequestDTO)

    const result = await recoverUserInformationUserUseCase.execute(mockRefreshTokenId);

    expect(result).toEqual({ data:  mockUserRequestDTO, success: true });
    expect(userRepository.findById).toHaveBeenCalledWith(mockRefreshToken.user_id);
  })
})
