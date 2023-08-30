import { User } from '../entities/User'

export interface IUsersRepository {
  create(user: User): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  findAll(pageNumber: number): Promise<object>
  update(user: User, data: object): Promise<User>
  delete(id: string): Promise<void>
  save(user: User): Promise<void>
}
