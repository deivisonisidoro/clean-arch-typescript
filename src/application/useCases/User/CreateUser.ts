// import { hash } from 'bcryptjs'
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

    // const passwordHash = await hash(password, 8)
    const user = await this.userRepository.create({
      email,
      name,
      password,
    })

    await this.userRepository.save(user)
    return { data: user, success: true }
  }
}
