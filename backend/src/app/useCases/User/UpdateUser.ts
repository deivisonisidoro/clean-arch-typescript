import { ResponseDTO } from '../../dtos/Response'
import { IUpdateUserRequestDTO } from '../../dtos/User/UpdateUser'

export interface IUpdateUserUseCase {
  execute(userId: string, data: IUpdateUserRequestDTO): Promise<ResponseDTO>
}
