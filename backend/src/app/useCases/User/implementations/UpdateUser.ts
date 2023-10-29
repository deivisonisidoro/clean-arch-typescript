import { User } from '../../../../domain/entities/User'
import { ResponseDTO } from '../../../dtos/Response'
import { IUpdateUserRequestDTO } from '../../../dtos/User/UpdateUser'
import { IUsersRepository } from '../../../repositories/User'
import { IUpdateUserUseCase } from '../UpdateUser'

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
