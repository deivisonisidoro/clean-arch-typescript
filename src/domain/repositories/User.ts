import { PaginationDTO } from '../../applications/dtos/Pagination'
import { ICreateUserRequestDTO } from '../../applications/dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../../applications/dtos/User/UpdateUser'
import { IUserOutRequestDTO } from '../../applications/dtos/User/UserOut'

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
