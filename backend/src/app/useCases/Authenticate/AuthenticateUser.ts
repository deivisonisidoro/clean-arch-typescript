import { ResponseDTO } from '../../../domain/dtos/Response'
import { IAuthenticateUserDTO } from '../../../domain/dtos/User/Authenticate'

export interface IAuthenticateUserUserUseCase {
  execute({email, password}: IAuthenticateUserDTO): Promise<ResponseDTO>
}
