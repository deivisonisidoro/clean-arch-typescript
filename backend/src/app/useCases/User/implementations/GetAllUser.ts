import { UserErrorType } from '../../../../domain/enums/user/ErrorType'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUsersRepository } from '../../../repositories/User'
import { IGetAllUserUseCase } from '../GetAllUser'

export class GetAllUserUseCase implements IGetAllUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(page: number): Promise<ResponseDTO> {
    const users = await this.userRepository.findAll(page)
    if (users.total === 0) {
      return { data: {error: UserErrorType.UserNotFound}, success: false }
    }
    return { data: users, success: true }
  }
}
