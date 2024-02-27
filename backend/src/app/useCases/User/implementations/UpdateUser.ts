import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUpdateUserRequestDTO } from '../../../../domain/dtos/User/UpdateUser'
import { IUserInRequestDTO } from '../../../../domain/dtos/User/UserIn'
import { User } from '../../../../domain/entities/User'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IPasswordHasher } from '../../../providers/PasswordHasher'
import { IUsersRepository } from '../../../repositories/User'
import { IUpdateUserUseCase } from '../UpdateUser'

/**
 * Use case for updating user information.
 *
 * @class
 * @implements {IUpdateUserUseCase}
 */
export class UpdateUserUseCase implements IUpdateUserUseCase {
  /**
   * Creates an instance of UpdateUserUseCase.
   *
   * @constructor
   * @param {IUsersRepository} userRepository - The repository for user data.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  /**
   * Executes the update user use case.
   *
   * @async
   * @param {string} userId - The ID of the user to be updated.
   * @param {IUpdateUserRequestDTO} requestData - The updated user information.
   * @returns {Promise<ResponseDTO>} The response data containing the updated user information.
   */
  async execute(
    userId: string,
    { name, email, password }: IUpdateUserRequestDTO,
  ): Promise<ResponseDTO> {
    try {
      const userAlreadyExists = (await this.userRepository.findById(
        userId,
      )) as IUserInRequestDTO | null

      if (!userAlreadyExists) {
        return {
          data: { error: UserErrorType.UserDoesNotExist },
          success: false,
        }
      }

      if (password) {
        password = await this.passwordHasher.hashPassword(password)
      }

      const userEntity = User.update({ name, email, password })
      const userUpdated = await this.userRepository.update(userAlreadyExists, {
        name: userEntity.name,
        email: userEntity.email,
        password: userEntity.password,
      })

      return { data: userUpdated, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
