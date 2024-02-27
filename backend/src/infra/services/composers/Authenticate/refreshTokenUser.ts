import { IGenerateRefreshTokenProvider } from '../../../../app/providers/GenerateRefreshToken'
import { ITokenManagerProvider } from '../../../../app/providers/TokenManager'
import { IRefreshTokenRepository } from '../../../../app/repositories/RefreshToken'
import { RefreshTokenUserUseCase } from '../../../../app/useCases/Authenticate/implementations/RefreshTokenUser'
import { IRefreshTokenUserUseCase } from '../../../../app/useCases/Authenticate/RefreshTokenUser'
import { RefreshTokenUserController } from '../../../../presentation/http/controllers/Authenticate/RefreshTokenUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { prismaClient } from '../../../databases/prisma/connection'
import { GenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken'
import { TokenManagerProvider } from '../../../providers/TokenManager'
import { RefreshTokenPrismaRepository } from '../../../repositories/prisma/RefreshToken'

/**
 * Composer function for creating and configuring the components required for refreshing authentication tokens.
 *
 * @function
 * @returns {IController} The configured refresh token controller.
 */
export function refreshTokenUserComposer(): IController {
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenPrismaRepository(prismaClient)
  const generateRefreshTokenProvider: IGenerateRefreshTokenProvider =
    new GenerateRefreshTokenProvider()
  const tokenManagerProvider: ITokenManagerProvider = new TokenManagerProvider()
  const useCase: IRefreshTokenUserUseCase = new RefreshTokenUserUseCase(
    generateRefreshTokenProvider,
    refreshTokenRepository,
    tokenManagerProvider,
  )
  const controller: IController = new RefreshTokenUserController(useCase)
  return controller
}
