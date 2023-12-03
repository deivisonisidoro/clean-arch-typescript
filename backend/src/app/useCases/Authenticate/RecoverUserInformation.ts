import { IRefreshTokenUserDTO } from '../../../domain/dtos/Authenticate/RefreshTokenUser'
import { ResponseDTO } from '../../../domain/dtos/Response'

export interface IRecoverUserInformationUseCase {
  execute(refreshTokenId: IRefreshTokenUserDTO): Promise<ResponseDTO>
}
