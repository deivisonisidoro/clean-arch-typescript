import { PrismaUserRepository } from '../../repositories/PrismaUser'
import { prismaClient } from '../../databases/prisma/connection'
import { DeleteUserUseCase } from '../../../application/useCases/User/implementations/DeleteUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { IDeleteUserUseCase } from '../../../application/useCases/User/DeleteUser'
import { DeleteUserController } from '../../http/controllers/User/DeleteUser'
import { IController } from '../../../domain/controller'

export function deleteUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IDeleteUserUseCase = new DeleteUserUseCase(repository)
  const controller: IController = new DeleteUserController(useCase)
  return controller
}
