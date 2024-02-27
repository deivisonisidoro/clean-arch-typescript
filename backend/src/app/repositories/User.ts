import { PaginationDTO } from '../../domain/dtos/Pagination'
import { ICreateUserRequestDTO } from '../../domain/dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../../domain/dtos/User/UpdateUser'
import { IUserInRequestDTO } from '../../domain/dtos/User/UserIn'
import { IUserOutRequestDTO } from '../../domain/dtos/User/UserOut'

/**
 * Interface for the repository handling user data.
 *
 * @interface
 */
export interface IUsersRepository {
  /**
   * Creates a new user with the provided data.
   *
   * @async
   * @param {ICreateUserRequestDTO} data - The user data to be created.
   * @returns {Promise<IUserOutRequestDTO>} The created user data.
   */
  create(data: ICreateUserRequestDTO): Promise<IUserOutRequestDTO>

  /**
   * Finds a user by their email address.
   *
   * @async
   * @param {string} email - The email address of the user.
   * @returns {Promise<IUserInRequestDTO | unknown>} The found user data, or undefined if not found.
   */
  findByEmail(email: string): Promise<IUserInRequestDTO | unknown>

  /**
   * Finds a user by their ID.
   *
   * @async
   * @param {string} id - The ID of the user.
   * @returns {Promise<IUserInRequestDTO | unknown>} The found user data, or undefined if not found.
   */
  findById(id: string): Promise<IUserInRequestDTO | unknown>

  /**
   * Retrieves a paginated list of users.
   *
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated list of users.
   */
  findAll(pageNumber: number): Promise<PaginationDTO>

  /**
   * Updates the user data with the provided information.
   *
   * @async
   * @param {IUserOutRequestDTO} user - The user to be updated.
   * @param {IUpdateUserRequestDTO} data - The updated user data.
   * @returns {Promise<IUserOutRequestDTO>} The updated user data.
   */
  update(
    user: IUserOutRequestDTO,
    data: IUpdateUserRequestDTO,
  ): Promise<IUserOutRequestDTO>

  /**
   * Deletes a user by their ID.
   *
   * @async
   * @param {string} id - The ID of the user to be deleted.
   * @returns {Promise<void>} A promise that resolves when the user is deleted.
   */
  delete(id: string): Promise<void>
}
