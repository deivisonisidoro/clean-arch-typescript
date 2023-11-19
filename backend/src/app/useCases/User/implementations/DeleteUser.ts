import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IUsersRepository } from '../../../repositories/User'
import { IDeleteUserUseCase } from '../DeleteUser'
import { UserSuccessType } from '../../../../domain/enums/user/SuccessType'

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(userId: string) {
    const userAlreadyExists = await this.userRepository.findById(userId)

    if (!userAlreadyExists) {
      return { data: {error: UserErrorType.UserDoesNotExist }, success: false }
    }
    await this.userRepository.delete(userId)
    return { data: {error: UserSuccessType.UserDeleted}, success: true }
  }
}
