import { User } from '../../../../domain/entities/User'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { ICreateUserRequestDTO } from '../../../../domain/dtos/User/CreateUser'
import { IUsersRepository } from '../../../repositories/User'
import { ICreateUserUseCase } from '../CreateUser'
import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { IPasswordHasher } from '../../../providers/PasswordHasher'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher : IPasswordHasher,
  ) {}

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

      const userAlreadyExists = await this.userRepository.findByEmail(
        userEntity.email.address,
      )

      if (userAlreadyExists) {
        return { data: { error: UserErrorType.UserAlreadyExists }, success: false }
      }
      const passwordHashed = await this.passwordHasher.hashPassword(password)
      const user = await this.userRepository.create({
        email: userEntity.email.address,
        name: userEntity.name,
        password: passwordHashed,
      })

      return { data: user, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
