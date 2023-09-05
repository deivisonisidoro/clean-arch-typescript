import { PaginationDTO } from '../dtos/Pagination'
import { ICreateUserRequestDTO } from '../dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../dtos/User/UpdateUser'
import { UserInterface } from '../entities/User'

export interface IUsersRepository {
  create(data: ICreateUserRequestDTO): Promise<UserInterface>
  findByEmail(email: string): Promise<UserInterface | null>
  findById(id: string): Promise<UserInterface | null>
  findAll(pageNumber: number): Promise<PaginationDTO>
  update(
    user: UserInterface,
    data: IUpdateUserRequestDTO,
  ): Promise<UserInterface>
  delete(id: string): Promise<void>
}
