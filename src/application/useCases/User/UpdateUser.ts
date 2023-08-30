// import { hash } from "bcryptjs";
import { IUsersRepository } from '../../../domain/repositories/User'
import { IUpdateUserRequestDTO } from '../../../domain/dtos/User/UpdateUser'
import { IUpdateUserUseCase } from '../../../domain/useCases/User/UpdateUser'

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ id, name, email, password }: IUpdateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findById(id)
    if (!userAlreadyExists) {
      throw new Error('User does not exits!')
    }
    // const passwordHash = await hash(password, 8)
    const userUpdated = await this.userRepository.update(userAlreadyExists, {
      name,
      email,
      password,
    })

    await this.userRepository.save(userUpdated)
    return userUpdated
  }
}
