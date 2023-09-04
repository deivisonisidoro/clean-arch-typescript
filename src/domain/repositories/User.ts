import { PaginationDTO } from '../dtos/Pagination'
import { UserInterface } from '../entities/User'

export interface IUsersRepository {
  create(user: UserInterface): Promise<UserInterface>
  findByEmail(email: string): Promise<UserInterface>
  findById(id: string): Promise<UserInterface>
  findAll(pageNumber: number): Promise<PaginationDTO>
  update(user: UserInterface, data: object): Promise<UserInterface>
  delete(id: string): Promise<void>
  save(user: UserInterface): Promise<void>
}
