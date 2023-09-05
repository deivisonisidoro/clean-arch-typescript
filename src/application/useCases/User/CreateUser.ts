import { IUsersRepository } from '../../../domain/repositories/User'
import { ICreateUserRequestDTO } from '../../../domain/dtos/User/CreateUser'
import { ICreateUserUseCase } from '../../../domain/useCases/User/CreateUser'
import { ResponseDTO } from '../../../domain/dtos/Response'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<ResponseDTO> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      return { data: 'User already exists!', success: false }
    }

    const user = await this.userRepository.create({
      email,
      name,
      password,
    })

    return { data: user, success: true }
  }
}
