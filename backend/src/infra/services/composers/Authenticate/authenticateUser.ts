import { PasswordHasher } from '../../../providers/PasswordHasher';
import { IPasswordHasher } from '../../../../app/providers/PasswordHasher';
import { IUsersRepository } from '../../../../app/repositories/User';
import { IRefreshTokenRepository } from '../../../../app/repositories/RefreshToken';
import { IGenerateRefreshTokenProvider } from '../../../../app/providers/GenerateRefreshToken';
import { IAuthenticateUserUserUseCase } from '../../../../app/useCases/Authenticate/AuthenticateUser';
import { AuthenticateUserUseCase } from '../../../../app/useCases/Authenticate/implementations/AuthenticateUser';
import { IController } from '../../../../presentation/http/controllers/IController';
import { AuthenticateUserController } from '../../../../presentation/http/controllers/Authenticate/AuthenticateUser';
import { prismaClient } from '../../../databases/prisma/connection';
import { UserRepository } from '../../../repositories/prisma/User';
import { RefreshTokenPrismaRepository } from '../../../repositories/prisma/RefreshToken';
import { GenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken';

/**
 * Composer function for creating and configuring the components required for the user authentication flow.
 *
 * @function
 * @returns {IController} The configured authentication controller.
 */
export function authenticateUserComposer(): IController {
  const userRepository: IUsersRepository = new UserRepository(prismaClient);
  const refreshTokenRepository: IRefreshTokenRepository = new RefreshTokenPrismaRepository(prismaClient);
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const generateRefreshTokenProvider: IGenerateRefreshTokenProvider = new GenerateRefreshTokenProvider();
  const useCase: IAuthenticateUserUserUseCase = new AuthenticateUserUseCase(
    userRepository,
    passwordHasher,
    generateRefreshTokenProvider,
    refreshTokenRepository
  );
  const controller: IController = new AuthenticateUserController(useCase);
  return controller;
}
