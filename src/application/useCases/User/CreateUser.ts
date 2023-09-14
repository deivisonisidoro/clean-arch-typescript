import { IUsersRepository } from '../../../domain/repositories/User'
import { ICreateUserRequestDTO } from '../../../domain/dtos/User/CreateUser'
import { ICreateUserUseCase } from '../../../domain/useCases/User/CreateUser'
import { ResponseDTO } from '../../../domain/dtos/Response'
import { User } from '../../../domain/entities/User'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<ResponseDTO> {
   try {
    const userEntity = User.create({
      email,
      name,
      password,
    })

    const userAlreadyExists = await this.userRepository.findByEmail(userEntity.email.address)

    if (userAlreadyExists) {
      return { data: {error: 'User already exists!'}, success: false }
    }

    const user = await this.userRepository.create({
      email: userEntity.email.address,
      name: userEntity.name,
      password: userEntity.password,
    })

    return { data: user, success: true }
   } catch (error: any) {
      return { data: {error: error.message}, success: false }
   }
  }
}
