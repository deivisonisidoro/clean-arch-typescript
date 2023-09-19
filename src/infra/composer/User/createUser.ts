import { PrismaUserRepository } from '../../repositories/PrismaUser'
import { prismaClient } from '../../databases/prisma/connection'
import { CreateUserUseCase } from '../../../application/useCases/User/implementations/CreateUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { ICreateUserUseCase } from '../../../application/useCases/User/CreateUser'
import { CreateUserController } from '../../http/controllers/User/CreateUser'
import { IController } from '../../../domain/controller'

export function createUserComposer() {
  const repository: IUsersRepository = new PrismaUserRepository(prismaClient)
  const useCase: ICreateUserUseCase = new CreateUserUseCase(repository)
  const controller: IController = new CreateUserController(useCase)
  return controller
}
