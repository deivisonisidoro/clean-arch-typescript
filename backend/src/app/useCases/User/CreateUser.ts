import { ResponseDTO } from '../../../domain/dtos/Response'
import { ICreateUserRequestDTO } from '../../../domain/dtos/User/CreateUser'

/**
 * Interface for the use case of creating a new user.
 *
 * @interface
 */
export interface ICreateUserUseCase {
  /**
   * Executes the create user use case.
   *
   * @async
   * @param {ICreateUserRequestDTO} data - The data for creating a new user.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateUserRequestDTO): Promise<ResponseDTO>
}
