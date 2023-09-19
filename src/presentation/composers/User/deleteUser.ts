import { PrismaUserRepository } from '../../../infra/repositories/PrismaUser'
import { prismaClient } from '../../../infra/databases/prisma/connection'
import { DeleteUserUseCase } from '../../../useCases/User/implementations/DeleteUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { IDeleteUserUseCase } from '../../../useCases/User/DeleteUser'
import { DeleteUserController } from '../../../applications/controllers/User/implementations/DeleteUser'
import { IController } from '../../../applications/controllers/IController'

export function deleteUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IDeleteUserUseCase = new DeleteUserUseCase(repository)
  const controller: IController = new DeleteUserController(useCase)
  return controller
}
