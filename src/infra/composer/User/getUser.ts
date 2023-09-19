import { PrismaUserRepository } from '../../repositories/PrismaUser'
import { prismaClient } from '../../databases/prisma/connection'
import { GetAllUserUseCase } from '../../../useCases/User/implementations/GetAllUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { IGetAllUserUseCase } from '../../../useCases/User/GetAllUser'
import { GetUserController } from '../../../application/controllers/User/implementations/GetUser'
import { IController } from '../../../application/controllers/IController'

export function getUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IGetAllUserUseCase = new GetAllUserUseCase(repository)
  const controller: IController = new GetUserController(useCase)
  return controller
}
