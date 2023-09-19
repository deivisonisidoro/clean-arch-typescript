import { PrismaUserRepository } from '../../repositories/PrismaUser'
import { prismaClient } from '../../databases/prisma/connection'
import { UpdateUserUseCase } from '../../../application/useCases/User/implementations/UpdateUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { IUpdateUserUseCase } from '../../../application/useCases/User/UpdateUser'
import { UpdateUserController } from '../../http/controllers/User/UpdateUser'
import { IController } from '../../../domain/controller'

export function updateUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IUpdateUserUseCase = new UpdateUserUseCase(repository)
  const controller: IController = new UpdateUserController(useCase)
  return controller
}
