import { IUsersRepository } from '../../../../app/repositories/User'
import { UpdateUserUseCase } from '../../../../app/useCases/User/implementations/UpdateUser'
import { IUpdateUserUseCase } from '../../../../app/useCases/User/UpdateUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { UpdateUserController } from '../../../../presentation/http/controllers/User/implementations/UpdateUser'
import { prismaClient } from '../../../databases/prisma/connection'
import { PrismaUserRepository } from '../../../repositories/PrismaUser'

export function updateUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: IUpdateUserUseCase = new UpdateUserUseCase(repository)
  const controller: IController = new UpdateUserController(useCase)
  return controller
}
