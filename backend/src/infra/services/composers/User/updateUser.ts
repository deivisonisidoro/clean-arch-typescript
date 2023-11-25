import { IPasswordHasher } from '../../../../app/providers/PasswordHasher'
import { PasswordHasher } from '../../../../infra/providers/PasswordHasher'
import { IUsersRepository } from '../../../../app/repositories/User'
import { UpdateUserUseCase } from '../../../../app/useCases/User/implementations/UpdateUser'
import { IUpdateUserUseCase } from '../../../../app/useCases/User/UpdateUser'
import { IController } from '../../../../presentation/http/controllers/IController'
import { UpdateUserController } from '../../../../presentation/http/controllers/User/implementations/UpdateUser'
import { prismaClient } from '../../../databases/prisma/connection'
import { UserRepository } from '../../../repositories/prisma/User'

export function updateUserComposer() {
  const repository: IUsersRepository = new UserRepository(prismaClient)
  const passwordHasher: IPasswordHasher = new PasswordHasher()
  const useCase: IUpdateUserUseCase = new UpdateUserUseCase(repository, passwordHasher)
  const controller: IController = new UpdateUserController(useCase)
  return controller
}
