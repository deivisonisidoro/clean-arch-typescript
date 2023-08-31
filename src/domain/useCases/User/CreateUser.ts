import { ResponseDTO } from '../../dtos/Response'
import { ICreateUserRequestDTO } from '../../dtos/User/CreateUser'

export interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO): Promise<ResponseDTO>
}
