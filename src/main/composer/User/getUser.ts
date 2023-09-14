import { PrismaUserRepository } from '../../../infra/repositories/PrismaUser'
import { prismaClient } from '../../../infra/database/prisma/connection'
import { GetAllUserUseCase } from '../../../application/useCases/User/GetAllUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { IGetAllUserUseCase } from '../../../domain/useCases/User/GetAllUser'
import { GetUserController } from '../../controllers/User/GetUser'
import { IController } from '../../../domain/controller'

export function getUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IGetAllUserUseCase = new GetAllUserUseCase(repository)
  const controller: IController = new GetUserController(useCase)
  return controller
}
