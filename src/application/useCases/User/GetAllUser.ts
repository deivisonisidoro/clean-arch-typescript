import { IUsersRepository } from '../../../domain/repositories/User'

export class GetAllUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(page: number) {
    const users = await this.userRepository.findAll(page)
    return users
  }
}
