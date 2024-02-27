import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { UserSuccessType } from '../../../../domain/enums/user/SuccessType'
import { IUsersRepository } from '../../../repositories/User'
import { IDeleteUserUseCase } from '../DeleteUser'

/**
 * Use case for deleting a user.
 *
 * @class
 * @implements {IDeleteUserUseCase}
 */
export class DeleteUserUseCase implements IDeleteUserUseCase {
  /**
   * Creates an instance of DeleteUserUseCase.
   *
   * @constructor
   * @param {IUsersRepository} userRepository - The repository for user data.
   */
  constructor(private userRepository: IUsersRepository) {}

  /**
   * Executes the delete user use case.
   *
   * @async
   * @param {string} userId - The ID of the user to be deleted.
   * @returns {Promise<{ data: { error?: UserErrorType | UserSuccessType }, success: boolean }>} The response data.
   */
  async execute(userId: string): Promise<{
    data: { error?: UserErrorType | UserSuccessType }
    success: boolean
  }> {
    try {
      const userAlreadyExists = await this.userRepository.findById(userId)

      if (!userAlreadyExists) {
        return {
          data: { error: UserErrorType.UserDoesNotExist },
          success: false,
        }
      }

      await this.userRepository.delete(userId)
      return { data: { error: UserSuccessType.UserDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
