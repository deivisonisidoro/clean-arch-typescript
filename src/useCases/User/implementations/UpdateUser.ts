import { IUpdateUserRequestDTO } from '../../../applications/dtos/User/UpdateUser'
import { ResponseDTO } from '../../../applications/dtos/Response'
import { IUpdateUserUseCase } from '../UpdateUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { User } from '../../../domain/entities/User'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(
    userId: string,
    { name, email, password }: IUpdateUserRequestDTO,
  ): Promise<ResponseDTO> {
    try {
      const userAlreadyExists = await this.userRepository.findById(userId)

      if (!userAlreadyExists) {
        return { data: 'User does not exits!', success: false }
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
