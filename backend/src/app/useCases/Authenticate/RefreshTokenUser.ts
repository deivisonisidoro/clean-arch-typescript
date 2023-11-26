import { ResponseDTO } from '../../../domain/dtos/Response'

export interface IRefreshTokenUserUseCase {
  execute(refreshTokenId: string): Promise<ResponseDTO>
}
