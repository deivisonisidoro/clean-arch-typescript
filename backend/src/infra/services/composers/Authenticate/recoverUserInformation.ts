import { prismaClient } from '../../../databases/prisma/connection';
import { IRefreshTokenRepository } from '../../../../app/repositories/RefreshToken';
import { IUsersRepository } from '../../../../app/repositories/User';
import { IRecoverUserInformationUseCase } from '../../../../app/useCases/Authenticate/RecoverUserInformation';
import { ITokenManagerProvider } from '../../../../app/providers/TokenManager';
import { RecoverUserInformationUserUseCase } from '../../../../app/useCases/Authenticate/implementations/RecoverUserInformation';
import { IController } from '../../../../presentation/http/controllers/IController';
import { RecoverUserInformationUserController } from '../../../../presentation/http/controllers/Authenticate/RecoverUserInformation';
import { RefreshTokenPrismaRepository } from '../../../repositories/prisma/RefreshToken';
import { UserRepository } from '../../../repositories/prisma/User';
import { TokenManagerProvider } from '../../../providers/TokenManager';

/**
 * Composer function for creating and configuring the components required for recovering user information.
 *
 * @function
 * @returns {IController} The configured user information recovery controller.
 */
export function recoverUserInformationUserComposer(): IController {
  const userRepository: IUsersRepository = new UserRepository(prismaClient);
  const refreshTokenRepository: IRefreshTokenRepository = new RefreshTokenPrismaRepository(prismaClient);
  const tokenManagerProvider: ITokenManagerProvider = new TokenManagerProvider();
  const useCase: IRecoverUserInformationUseCase = new RecoverUserInformationUserUseCase(
    refreshTokenRepository,
    userRepository,
    tokenManagerProvider
  );
  const controller: IController = new RecoverUserInformationUserController(useCase);
  return controller;
}
