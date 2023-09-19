import { ResponseDTO } from '../../application/dtos/Response'
import { IUpdateUserRequestDTO } from '../../application/dtos/User/UpdateUser'

export interface IUpdateUserUseCase {
  execute(userId: string, data: IUpdateUserRequestDTO): Promise<ResponseDTO>
}
