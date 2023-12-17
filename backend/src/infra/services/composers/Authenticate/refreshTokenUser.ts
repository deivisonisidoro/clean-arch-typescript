import { IRefreshTokenRepository } from '../../../../app/repositories/RefreshToken';
import { IGenerateRefreshTokenProvider } from '../../../../app/providers/GenerateRefreshToken';
import { IRefreshTokenUserUseCase } from '../../../../app/useCases/Authenticate/RefreshTokenUser';
import { ITokenManagerProvider } from '../../../../app/providers/TokenManager';
import { RefreshTokenUserUseCase } from '../../../../app/useCases/Authenticate/implementations/RefreshTokenUser';
import { IController } from '../../../../presentation/http/controllers/IController';
import { RefreshTokenUserController } from '../../../../presentation/http/controllers/Authenticate/RefreshTokenUser';
import { prismaClient } from '../../../databases/prisma/connection';
import { RefreshTokenPrismaRepository } from '../../../repositories/prisma/RefreshToken';
import { GenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken';
import { TokenManagerProvider } from '../../../providers/TokenManager';

/**
 * Composer function for creating and configuring the components required for refreshing authentication tokens.
 *
 * @function
 * @returns {IController} The configured refresh token controller.
 */
export function refreshTokenUserComposer(): IController {
  const refreshTokenRepository: IRefreshTokenRepository = new RefreshTokenPrismaRepository(prismaClient);
  const generateRefreshTokenProvider: IGenerateRefreshTokenProvider = new GenerateRefreshTokenProvider();
  const tokenManagerProvider: ITokenManagerProvider = new TokenManagerProvider();
  const useCase: IRefreshTokenUserUseCase = new RefreshTokenUserUseCase(
    generateRefreshTokenProvider,
    refreshTokenRepository,
    tokenManagerProvider
  );
  const controller: IController = new RefreshTokenUserController(useCase);
  return controller;
}
