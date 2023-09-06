import { PrismaUserRepository } from '../../../infra/repositories/PrismaUser'
import { prismaClient } from '../../../infra/database/prisma/connection'
import { DeleteUserUseCase } from '../../../application/useCases/User/DeleteUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { IDeleteUserUseCase } from '../../../domain/useCases/User/DeleteUser'
import { DeleteUserController } from '../../../controllers/User/DeleteUser'
import { IController } from '../../../domain/controller'

export function deleteUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IDeleteUserUseCase = new DeleteUserUseCase(repository)
  const controller: IController = new DeleteUserController(useCase)
  return controller
}
