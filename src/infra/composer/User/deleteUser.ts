import { PrismaUserRepository } from '../../repositories/PrismaUser'
import { prismaClient } from '../../databases/prisma/connection'
import { DeleteUserUseCase } from '../../../useCases/User/implementations/DeleteUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { IDeleteUserUseCase } from '../../../useCases/User/DeleteUser'
import { DeleteUserController } from '../../../application/controllers/User/implementations/DeleteUser'
import { IController } from '../../../application/controllers/IController'

export function deleteUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IDeleteUserUseCase = new DeleteUserUseCase(repository)
  const controller: IController = new DeleteUserController(useCase)
  return controller
}
