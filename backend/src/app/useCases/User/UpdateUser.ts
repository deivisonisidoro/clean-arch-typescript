import { ResponseDTO } from '../../../domain/dtos/Response'
import { IUpdateUserRequestDTO } from '../../../domain/dtos/User/UpdateUser'

export interface IUpdateUserUseCase {
  execute(userId: string, data: IUpdateUserRequestDTO): Promise<ResponseDTO>
}
