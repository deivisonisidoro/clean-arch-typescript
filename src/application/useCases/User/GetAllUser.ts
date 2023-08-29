import { IGetAllUserUseCase } from '../../../domain/useCases/User/GetAllUser'
import { IUsersRepository } from '../../../domain/repositories/User'

export class GetAllUserUseCase implements IGetAllUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(page: number): Promise<object> {
    const users = await this.userRepository.findAll(page)
    return users
  }
}
