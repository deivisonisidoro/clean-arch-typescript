import { IRefreshTokenUserDTO } from 'src/domain/dtos/Authenticate/RefreshTokenUser'

import { RefreshTokenDTO } from '../../../../domain/dtos/Authenticate/RefreshToken'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IGenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken'
import { ITokenManagerProvider } from '../../../providers/TokenManager'
import { IRefreshTokenRepository } from '../../../repositories/RefreshToken'
import { IRefreshTokenUserUseCase } from '../RefreshTokenUser'

/**
 * Use case for refreshing a user's authentication token.
 *
 * @class
 * @implements {IRefreshTokenUserUseCase}
 */
export class RefreshTokenUserUseCase implements IRefreshTokenUserUseCase {
  /**
   * Creates an instance of RefreshTokenUserUseCase.
   *
   * @constructor
   * @param {IGenerateRefreshTokenProvider} generateRefreshTokenProvider - The refresh token generator provider.
   * @param {IRefreshTokenRepository} refreshTokenRepository - The repository for refresh tokens.
   * @param {ITokenManagerProvider} tokenManager - The token manager provider.
   */
  constructor(
    private generateRefreshTokenProvider: IGenerateRefreshTokenProvider,
    private refreshTokenRepository: IRefreshTokenRepository,
    private tokenManager: ITokenManagerProvider,
  ) {}

  /**
   * Executes the refresh token user use case.
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
        return { data: { error: 'Refresh token is invalid.' }, success: false }
      }

      const refreshTokenExpired = this.tokenManager.validateTokenAge(
        refreshToken.expires_in,
      )
      const token = await this.generateRefreshTokenProvider.generateToken(
        refreshToken.user_id,
      )

      if (refreshTokenExpired) {
        await this.refreshTokenRepository.delete(refreshToken.user_id)
        const newRefreshToken = await this.refreshTokenRepository.create(
          refreshToken.user_id,
        )
        return { data: { refreshToken: newRefreshToken, token }, success: true }
      }

      return { data: { token }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
