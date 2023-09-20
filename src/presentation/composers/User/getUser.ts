import { PrismaUserRepository } from '../../../infra/repositories/PrismaUser'
import { prismaClient } from '../../../infra/databases/prisma/connection'
import { GetAllUserUseCase } from '../../../useCases/User/implementations/GetAllUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { IGetAllUserUseCase } from '../../../useCases/User/GetAllUser'
import { GetUserController } from '../../../app/controllers/User/implementations/GetUser'
import { IController } from '../../../app/controllers/IController'

export function getUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IGetAllUserUseCase = new GetAllUserUseCase(repository)
  const controller: IController = new GetUserController(useCase)
  return controller
}
