import { PrismaUserRepository } from '../../../infra/repositories/PrismaUser'
import { prismaClient } from '../../../infra/database/prisma/connection'
import { UpdateUserUseCase } from '../../../application/useCases/User/UpdateUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { IUpdateUserUseCase } from '../../../domain/useCases/User/UpdateUser'
import { UpdateUserController } from '../../../controllers/User/UpdateUser'
import { IController } from '../../../domain/controller'

export function updateUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IUpdateUserUseCase = new UpdateUserUseCase(repository)
  const controller: IController = new UpdateUserController(useCase)
  return controller
}
