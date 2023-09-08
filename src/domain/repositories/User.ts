import { PaginationDTO } from '../dtos/Pagination'
import { ICreateUserRequestDTO } from '../dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../dtos/User/UpdateUser'
import { IUserOutRequestDTO } from '../dtos/User/UserOut'

export interface IUsersRepository {
  create(data: ICreateUserRequestDTO): Promise<IUserOutRequestDTO>
  findByEmail(email: string): Promise<IUserOutRequestDTO | unknown>
  findById(id: string): Promise<IUserOutRequestDTO | null>
  findAll(pageNumber: number): Promise<PaginationDTO>
  update(
    user: IUserOutRequestDTO,
    data: IUpdateUserRequestDTO,
  ): Promise<IUserOutRequestDTO>
  delete(id: string): Promise<void>
}
