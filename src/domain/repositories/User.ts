import { User } from '../entities/User'

interface IUsersRepository {
  create(user: User): Promise<User>
  findByEmail(email: string): Promise<User | unknown>
  findById(id: string): Promise<User | unknown>
  findAll(pageNumber: number): Promise<object>
  delete(id: string): Promise<void>
  save(user: User): Promise<void>
}

export { IUsersRepository }
