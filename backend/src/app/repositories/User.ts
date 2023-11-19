import { PaginationDTO } from '../../domain/dtos/Pagination'
import { ICreateUserRequestDTO } from '../../domain/dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../../domain/dtos/User/UpdateUser'
import { IUserInRequestDTO } from '../../domain/dtos/User/UserIn'
import { IUserOutRequestDTO } from '../../domain/dtos/User/UserOut'

export interface IUsersRepository {
  create(data: ICreateUserRequestDTO): Promise<IUserOutRequestDTO>
  findByEmail(email: string): Promise<IUserOutRequestDTO | unknown>
  findById(id: string): Promise<IUserOutRequestDTO | null>
  findAll(pageNumber: number): Promise<PaginationDTO>
  update(
    user: IUpdateUserRequestDTO,
    data: IUpdateUserRequestDTO,
  ): Promise<IUserInRequestDTO>
  delete(id: string): Promise<void>
}
