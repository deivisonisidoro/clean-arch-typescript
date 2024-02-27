import { IRefreshTokenUserDTO } from '../../../domain/dtos/Authenticate/RefreshTokenUser'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of refreshing a user's authentication token.
 *
 * This interface defines the contract for a use case responsible for refreshing
 * a user's authentication token using a provided refresh token identifier.
 *
 * @interface
 */
export interface IRefreshTokenUserUseCase {
  /**
   * Executes the refresh token user use case.
   *
   * @async
   * @param {IRefreshTokenUserDTO} refreshTokenId - The refresh token information.
   * @returns {Promise<ResponseDTO>} The response data.
   *
   * @remarks
   * This method is responsible for handling the logic of refreshing a user's
   * authentication token based on the provided refresh token identifier.
   */
  execute(refreshTokenId: IRefreshTokenUserDTO): Promise<ResponseDTO>
}
