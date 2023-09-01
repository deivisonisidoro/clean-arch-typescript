// import { hash } from "bcryptjs";
import { IUsersRepository } from '../../../domain/repositories/User'
import { IUpdateUserRequestDTO } from '../../../domain/dtos/User/UpdateUser'
import { IUpdateUserUseCase } from '../../../domain/useCases/User/UpdateUser'
import { ResponseDTO } from '../../../domain/dtos/Response'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    id,
    name,
    email,
    password,
  }: IUpdateUserRequestDTO): Promise<ResponseDTO> {
    const userAlreadyExists = await this.userRepository.findById(id)
    if (!userAlreadyExists) {
      return { data: 'User does not exits!', success: false }
    }
    // const passwordHash = await hash(password, 8)
    const userUpdated = await this.userRepository.update(userAlreadyExists, {
      name,
      email,
      password,
    })

    await this.userRepository.save(userUpdated)
    return { data: userUpdated, success: true }
  }
}
