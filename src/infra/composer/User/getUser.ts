import { PrismaUserRepository } from '../../repositories/PrismaUser'
import { prismaClient } from '../../databases/prisma/connection'
import { GetAllUserUseCase } from '../../../application/useCases/User/implementations/GetAllUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { IGetAllUserUseCase } from '../../../application/useCases/User/GetAllUser'
import { GetUserController } from '../../http/controllers/User/GetUser'
import { IController } from '../../../domain/controller'

export function getUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IGetAllUserUseCase = new GetAllUserUseCase(repository)
  const controller: IController = new GetUserController(useCase)
  return controller
}
