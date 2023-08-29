import { hash } from 'bcryptjs'
import { IUsersRepository } from '../../../domain/repositories/User'
import { ICreateUserRequestDTO } from '../../../domain/dtos/User/CreateUser'

export class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ email, name, password }: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const passwordHash = await hash(password, 8)
    const user = await this.userRepository.create({
      email,
      name,
      password: passwordHash,
    })

    await this.userRepository.save(user)
    return user
  }
}
