import { User } from '../../../../domain/entities/User'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUpdateUserRequestDTO } from '../../../../domain/dtos/User/UpdateUser'
import { IUsersRepository } from '../../../repositories/User'
import { IUpdateUserUseCase } from '../UpdateUser'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IPasswordHasher } from '../../../providers/PasswordHasher'
import { IUserInRequestDTO } from '../../../../domain/dtos/User/UserIn'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  async execute(
    userId: string,
    { name, email, password }: IUpdateUserRequestDTO,
  ): Promise<ResponseDTO> {
    try {
      const userAlreadyExists = await this.userRepository.findById(userId) as IUserInRequestDTO | null;

      if (!userAlreadyExists) {
        return { data: UserErrorType.UserDoesNotExist, success: false }
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
