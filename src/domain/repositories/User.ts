import { PaginationDTO } from '../dtos/Pagination'
import { User } from '../entities/User'

export interface IUsersRepository {
  create(user: User): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  findAll(pageNumber: number): Promise<PaginationDTO>
  update(user: User, data: object): Promise<User>
  delete(id: string): Promise<void>
  save(user: User): Promise<void>
}
