import { IGenerateRefreshTokenProvider } from "../../../providers/GenerateRefreshToken";
import { IRefreshTokenUserUseCase } from "../RefreshTokenUser";
import { IRefreshTokenRepository } from "../../../repositories/RefreshToken"
import { RefreshTokenDTO } from "../../../../domain/dtos/Authenticate/RefreshToken";
import { ResponseDTO } from "../../../../domain/dtos/Response";
import { ITokenManagerProvider } from "../../../providers/TokenManager";
import { IRefreshTokenUserDTO } from "src/domain/dtos/Authenticate/RefreshTokenUser";


export class RefreshTokenUserUseCase implements IRefreshTokenUserUseCase{
  constructor(
    private generateRefreshTokenProvider: IGenerateRefreshTokenProvider,
    private refreshTokenRepository: IRefreshTokenRepository,
    private tokenManager: ITokenManagerProvider
  ){}

  async execute({ refreshTokenId }: IRefreshTokenUserDTO): Promise<ResponseDTO>{
    const refreshToken = await this.refreshTokenRepository.findById(refreshTokenId) as RefreshTokenDTO | null;

    if (!refreshToken) {
      return { data: { error:"Refresh token is invalid."}, success: false }
    }

    const refreshTokenExpired = this.tokenManager.validateTokenAge(refreshToken.expires_in);

    const token = await this.generateRefreshTokenProvider.generateToken(refreshToken.user_id);

    if (refreshTokenExpired) {
      await this.refreshTokenRepository.delete(refreshToken.user_id)
      const newRefreshToken = await this.refreshTokenRepository.create(refreshToken.user_id)
      return { data: {refreshToken: newRefreshToken, token}, success: true }
    }
    return  { data: {token}, success: true }
  }
}
