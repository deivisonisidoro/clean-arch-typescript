import { ResponseDTO } from '../../dtos/Response'
import { IUpdateUserRequestDTO } from '../../dtos/User/UpdateUser'

export interface IUpdateUserUseCase {
  execute({ id, name, email, password }: IUpdateUserRequestDTO): Promise<ResponseDTO>
}
