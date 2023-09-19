import { PrismaUserRepository } from '../../../infra/repositories/PrismaUser'
import { prismaClient } from '../../../infra/databases/prisma/connection'
import { UpdateUserUseCase } from '../../../useCases/User/implementations/UpdateUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { IUpdateUserUseCase } from '../../../useCases/User/UpdateUser'
import { UpdateUserController } from '../../../applications/controllers/User/implementations/UpdateUser'
import { IController } from '../../../applications/controllers/IController'

export function updateUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IUpdateUserUseCase = new UpdateUserUseCase(repository)
  const controller: IController = new UpdateUserController(useCase)
  return controller
}
