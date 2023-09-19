import { ResponseDTO } from '../../applications/dtos/Response'
import { ICreateUserRequestDTO } from '../../applications/dtos/User/CreateUser'

export interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO): Promise<ResponseDTO>
}
