import { IUsersRepository } from '../../../../app/repositories/User'
import { IGetAllUserUseCase } from '../../../../app/useCases/User/GetAllUser'
import { GetAllUserUseCase } from '../../../../app/useCases/User/implementations/GetAllUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GetUserController } from '../../../../presentation/http/controllers/User/implementations/GetUser'
import { prismaClient } from '../../../databases/prisma/connection'
import { UserRepository } from '../../../repositories/prisma/User'

/**
 * Composer function for creating and configuring the components required for retrieving user information.
 *
 * @function
 * @returns {IController} The configured user retrieval controller.
 */
export function getUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(prismaClient)
  const useCase: IGetAllUserUseCase = new GetAllUserUseCase(repository)
  const controller: IController = new GetUserController(useCase)
  return controller
}
