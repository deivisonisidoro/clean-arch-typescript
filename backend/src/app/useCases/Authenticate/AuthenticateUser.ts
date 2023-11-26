import { ResponseDTO } from '../../../domain/dtos/Response'
import { IAuthenticateUserDTO } from '../../../domain/dtos/Authenticate/AuthenticateUser'

export interface IAuthenticateUserUserUseCase {
  execute({email, password}: IAuthenticateUserDTO): Promise<ResponseDTO>
}
