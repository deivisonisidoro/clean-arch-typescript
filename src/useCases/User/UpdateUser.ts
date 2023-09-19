import { ResponseDTO } from '../../applications/dtos/Response'
import { IUpdateUserRequestDTO } from '../../applications/dtos/User/UpdateUser'

export interface IUpdateUserUseCase {
  execute(userId: string, data: IUpdateUserRequestDTO): Promise<ResponseDTO>
}
