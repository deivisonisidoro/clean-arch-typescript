import { IUsersRepository } from '../../../../app/repositories/User'
import { ICreateUserUseCase } from '../../../../app/useCases/User/CreateUser'
import { CreateUserUseCase } from '../../../../app/useCases/User/implementations/CreateUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { CreateUserController } from '../../../../presentation/http/controllers/User/implementations/CreateUser'
import { prismaClient } from '../../../databases/prisma/connection'
import { PrismaUserRepository } from '../../../repositories/PrismaUser'

export function createUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: ICreateUserUseCase = new CreateUserUseCase(repository)
  const controller: IController = new CreateUserController(useCase)
  return controller
}
