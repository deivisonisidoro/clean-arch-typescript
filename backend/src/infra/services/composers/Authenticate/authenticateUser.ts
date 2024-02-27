import { IGenerateRefreshTokenProvider } from '../../../../app/providers/GenerateRefreshToken'
import { IPasswordHasher } from '../../../../app/providers/PasswordHasher'
import { IRefreshTokenRepository } from '../../../../app/repositories/RefreshToken'
import { IUsersRepository } from '../../../../app/repositories/User'
import { IAuthenticateUserUserUseCase } from '../../../../app/useCases/Authenticate/AuthenticateUser'
import { AuthenticateUserUseCase } from '../../../../app/useCases/Authenticate/implementations/AuthenticateUser'
import { AuthenticateUserController } from '../../../../presentation/http/controllers/Authenticate/AuthenticateUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { prismaClient } from '../../../databases/prisma/connection'
import { GenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken'
import { PasswordHasher } from '../../../providers/PasswordHasher'
import { RefreshTokenPrismaRepository } from '../../../repositories/prisma/RefreshToken'
import { UserRepository } from '../../../repositories/prisma/User'

/**
 * Composer function for creating and configuring the components required for the user authentication flow.
 *
 * @function
 * @returns {IController} The configured authentication controller.
 */
export function authenticateUserComposer(): IController {
  const userRepository: IUsersRepository = new UserRepository(prismaClient)
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenPrismaRepository(prismaClient)
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const generateRefreshTokenProvider: IGenerateRefreshTokenProvider =
    new GenerateRefreshTokenProvider()
  const useCase: IAuthenticateUserUserUseCase = new AuthenticateUserUseCase(
    userRepository,
    passwordHasher,
    generateRefreshTokenProvider,
    refreshTokenRepository,
  )
  const controller: IController = new AuthenticateUserController(useCase)
  return controller
}
