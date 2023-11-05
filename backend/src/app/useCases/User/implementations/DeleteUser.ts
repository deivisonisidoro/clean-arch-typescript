import { IUsersRepository } from '../../../repositories/User'
import { IDeleteUserUseCase } from '../DeleteUser'

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(userId: string) {
    const userAlreadyExists = await this.userRepository.findById(userId)

    if (!userAlreadyExists) {
      return { data: 'User does not exits!', success: false }
    }
    await this.userRepository.delete(userId)
    return { data: 'User deleted with success!', success: true }
  }
}