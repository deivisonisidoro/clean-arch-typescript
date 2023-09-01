import { IGetAllUserUseCase } from '../../../domain/useCases/User/GetAllUser'
import { IUsersRepository } from '../../../domain/repositories/User'
import { ResponseDTO } from '../../../domain/dtos/Response'

export class GetAllUserUseCase implements IGetAllUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(page: number): Promise<ResponseDTO> {
    const users = await this.userRepository.findAll(page)
    if (users.total === 0) {
      return { data: 'Users not found', success: false }
    }
    return { data: users, success: true }
  }
}
