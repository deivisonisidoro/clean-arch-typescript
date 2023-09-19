import { PrismaUserRepository } from '../../repositories/PrismaUser'
import { prismaClient } from '../../databases/prisma/connection'
import { CreateUserUseCase } from '../../../useCases/User/implementations/CreateUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { ICreateUserUseCase } from '../../../useCases/User/CreateUser'
import { CreateUserController } from '../../../applications/controllers/User/implementations/CreateUser'
import { IController } from '../../../applications/controllers/IController'

export function createUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: ICreateUserUseCase = new CreateUserUseCase(repository)
  const controller: IController = new CreateUserController(useCase)
  return controller
}