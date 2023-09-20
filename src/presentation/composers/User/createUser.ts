import { PrismaUserRepository } from '../../../infra/repositories/PrismaUser'
import { prismaClient } from '../../../infra/databases/prisma/connection'
import { CreateUserUseCase } from '../../../useCases/User/implementations/CreateUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { ICreateUserUseCase } from '../../../useCases/User/CreateUser'
import { CreateUserController } from '../../../app/controllers/User/implementations/CreateUser'
import { IController } from '../../../app/controllers/IController'

export function createUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: ICreateUserUseCase = new CreateUserUseCase(repository)
  const controller: IController = new CreateUserController(useCase)
  return controller
}
