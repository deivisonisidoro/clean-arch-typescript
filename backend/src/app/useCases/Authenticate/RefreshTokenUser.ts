import { IRefreshTokenUserDTO } from '../../../domain/dtos/Authenticate/RefreshTokenUser'
import { ResponseDTO } from '../../../domain/dtos/Response'

export interface IRefreshTokenUserUseCase {
  execute(refreshTokenId: IRefreshTokenUserDTO): Promise<ResponseDTO>
}
