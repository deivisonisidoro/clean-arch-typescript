import { ResponseDTO } from '../../domain/dtos/Response'
import { ICreateUserRequestDTO } from '../../domain/dtos/User/CreateUser'

export interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO): Promise<ResponseDTO>
}
