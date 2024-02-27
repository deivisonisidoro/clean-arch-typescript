import { IRefreshTokenUserDTO } from '../../../domain/dtos/Authenticate/RefreshTokenUser'
import { ResponseDTO } from '../../../domain/dtos/Response'

/**
 * Interface for the use case of recovering user information.
 *
 * This interface defines the contract for a use case responsible for recovering
 * user information based on a provided refresh token identifier.
 *
 * @interface
 */
export interface IRecoverUserInformationUseCase {
  /**
   * Executes the recover user information use case.
   *
   * @async
   * @param {IRefreshTokenUserDTO} refreshTokenId - The refresh token information.
   * @returns {Promise<ResponseDTO>} The response data.
   *
   * @remarks
   * This method is responsible for handling the logic of recovering user information
   * based on the provided refresh token identifier.
   */
  execute(refreshTokenId: IRefreshTokenUserDTO): Promise<ResponseDTO>
}
