import { PrismaUserRepository } from '../../../infra/repositories/PrismaUser'
import { prismaClient } from '../../../infra/database/prisma/connection'
import { CreateUserUseCase } from '../../../application/useCases/User/CreateUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { ICreateUserUseCase } from '../../../domain/useCases/User/CreateUser'
import { CreateUserController } from '../../../controllers/User/CreateUser'
import { IController } from '../../../domain/controller'

export function createUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: ICreateUserUseCase = new CreateUserUseCase(repository)
  const controller: IController = new CreateUserController(useCase)
  return controller
}
