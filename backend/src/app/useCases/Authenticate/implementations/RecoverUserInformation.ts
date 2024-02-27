import { RefreshTokenDTO } from '../../../../domain/dtos/Authenticate/RefreshToken'
import { IRefreshTokenUserDTO } from '../../../../domain/dtos/Authenticate/RefreshTokenUser'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUserInRequestDTO } from '../../../../domain/dtos/User/UserIn'
import { AuthMessages } from '../../../../domain/enums/Authenticate/AuthMessages'
import { ITokenManagerProvider } from '../../../providers/TokenManager'
import { IRefreshTokenRepository } from '../../../repositories/RefreshToken'
import { IUsersRepository } from '../../../repositories/User'
import { IRecoverUserInformationUseCase } from '../RecoverUserInformation'

/**
 * Use case for recovering user information based on a refresh token.
 *
 * @class
 * @implements {IRecoverUserInformationUseCase}
 */
export class RecoverUserInformationUserUseCase
  implements IRecoverUserInformationUseCase
{
  /**
   * Creates an instance of RecoverUserInformationUserUseCase.
   *
   * @constructor
   * @param {IRefreshTokenRepository} refreshTokenRepository - The repository for refresh tokens.
   * @param {IUsersRepository} userRepository - The repository for user data.
   * @param {ITokenManagerProvider} tokenManager - The token manager provider.
   */
  constructor(
    private refreshTokenRepository: IRefreshTokenRepository,
    private userRepository: IUsersRepository,
    private tokenManager: ITokenManagerProvider,
  ) {}

  /**
   * Executes the recover user information use case.
   *
   * @async
   * @param {IRefreshTokenUserDTO} refreshTokenId - The refresh token information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    refreshTokenId,
  }: IRefreshTokenUserDTO): Promise<ResponseDTO> {
    try {
      const refreshToken = (await this.refreshTokenRepository.findById(
        refreshTokenId,
      )) as RefreshTokenDTO | null

      if (!refreshToken) {
        return {
          data: { error: AuthMessages.TokenInvalidOrExpired },
          success: false,
        }
      }

      const refreshTokenExpired = this.tokenManager.validateTokenAge(
        refreshToken.expires_in,
      )

      if (refreshTokenExpired) {
        return {
          data: { error: AuthMessages.TokenInvalidOrExpired },
          success: false,
        }
      }

      const user = (await this.userRepository.findById(
        refreshToken.user_id,
      )) as IUserInRequestDTO | null

      return { data: user, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
