import { IDeleteUserUseCase } from '../../../domain/useCases/User/DeleteUser'
import { IUsersRepository } from '../../../domain/repositories/User'

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(userId: string) {
    const userAlreadyExists = await this.userRepository.findById(userId)

    if (!userAlreadyExists) {
      throw new Error('User does not exits!')
    }
    await this.userRepository.delete(userId)
  }
}