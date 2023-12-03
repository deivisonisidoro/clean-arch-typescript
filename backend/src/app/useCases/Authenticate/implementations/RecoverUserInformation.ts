import { ITokenManagerProvider } from "../../../providers/TokenManager";
import { IRefreshTokenRepository } from "../../../repositories/RefreshToken";
import { IUsersRepository } from "../../../repositories/User";
import { IRecoverUserInformationUseCase } from "../RecoverUserInformation";
import { IRefreshTokenUserDTO } from "../../../../domain/dtos/Authenticate/RefreshTokenUser";
import { ResponseDTO } from "../../../../domain/dtos/Response";
import { RefreshTokenDTO } from "../../../../domain/dtos/Authenticate/RefreshToken";
import { IUserInRequestDTO } from "../../../../domain/dtos/User/UserIn";
import { AuthMessages } from "../../../../domain/enums/Authenticate/AuthMessages";

export class RecoverUserInformationUserUseCase implements IRecoverUserInformationUseCase{
  constructor (
    private refreshTokenRepository: IRefreshTokenRepository,
    private userRepository: IUsersRepository,
    private tokenManager: ITokenManagerProvider
  ){}

  async execute({refreshTokenId}: IRefreshTokenUserDTO): Promise<ResponseDTO> {

    const refreshToken = await this.refreshTokenRepository.findById(refreshTokenId) as RefreshTokenDTO | null;

    if (!refreshToken) {
      return { data: { error: AuthMessages.TokenInvalidOrExpired}, success: false }
    }
    const refreshTokenExpired = this.tokenManager.validateTokenAge(refreshToken.expires_in);
    if (refreshTokenExpired) {
      return { data: { error: AuthMessages.TokenInvalidOrExpired}, success: false }
    }
    const user = await this.userRepository.findById(refreshToken.user_id) as IUserInRequestDTO | null;
    return {data: user, success: true}
  }
}
