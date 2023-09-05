import { IUsersRepository } from '../../../domain/repositories/User'
import { IUpdateUserRequestDTO } from '../../../domain/dtos/User/UpdateUser'
import { IUpdateUserUseCase } from '../../../domain/useCases/User/UpdateUser'
import { ResponseDTO } from '../../../domain/dtos/Response'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(
    userId: string,
    { name, email, password }: IUpdateUserRequestDTO,
  ): Promise<ResponseDTO> {
    const userAlreadyExists = await this.userRepository.findById(userId)
    if (!userAlreadyExists) {
      return { data: 'User does not exits!', success: false }
    }
    const userUpdated = await this.userRepository.update(userAlreadyExists, {
      name,
      email,
      password,
    })
    return { data: userUpdated, success: true }
  }
}
