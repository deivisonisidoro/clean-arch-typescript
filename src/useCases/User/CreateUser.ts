import { ResponseDTO } from '../../application/dtos/Response'
import { ICreateUserRequestDTO } from '../../application/dtos/User/CreateUser'

export interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO): Promise<ResponseDTO>
}
