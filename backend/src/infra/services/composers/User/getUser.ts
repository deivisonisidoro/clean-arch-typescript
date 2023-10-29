import { IUsersRepository } from '../../../../app/repositories/User'
import { IGetAllUserUseCase } from '../../../../app/useCases/User/GetAllUser'
import { GetAllUserUseCase } from '../../../../app/useCases/User/implementations/GetAllUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { GetUserController } from '../../../../presentation/http/controllers/User/implementations/GetUser'
import { prismaClient } from '../../../databases/prisma/connection'
import { PrismaUserRepository } from '../../../repositories/PrismaUser'

export function getUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IGetAllUserUseCase = new GetAllUserUseCase(repository)
  const controller: IController = new GetUserController(useCase)
  return controller
}
