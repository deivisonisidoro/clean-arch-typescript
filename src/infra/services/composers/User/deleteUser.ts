import { IUsersRepository } from '../../../../app/repositories/User'
import { IDeleteUserUseCase } from '../../../../app/useCases/User/DeleteUser'
import { DeleteUserUseCase } from '../../../../app/useCases/User/implementations/DeleteUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { DeleteUserController } from '../../../../presentation/http/controllers/User/implementations/DeleteUser'
import { prismaClient } from '../../../databases/prisma/connection'
import { PrismaUserRepository } from '../../../repositories/PrismaUser'

export function deleteUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IDeleteUserUseCase = new DeleteUserUseCase(repository)
  const controller: IController = new DeleteUserController(useCase)
  return controller
}
