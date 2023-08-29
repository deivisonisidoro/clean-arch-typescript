import { User } from '../../../domain/entities/User'
import { IUsersRepository } from '../../../domain/repositories/User'
import { v4 as uuid } from 'uuid'

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async create(user: User): Promise<User> {
    Object.assign(user, {
      id: uuid(),
    })

    this.users.push(user)
    return user
  }

  async findByEmail(email: string): Promise<User | unknown> {
    const user = this.users.find((user) => user.email === email)
    return user
  }

  async findById(id: string): Promise<User | unknown> {
    const user = this.users.find((user) => user.id === id)

    return user
  }

  async findAll(pageNumber: number): Promise<object> {
    const userArray = this.users
    const page = pageNumber || 1
    const perPage = 4
    const total = userArray.length
    const user = {
      body: userArray,
      total,
      page,
      last_page: Math.ceil(total / perPage),
    }
    return user
  }

  async delete(id: string): Promise<void> {
    const user = this.users.findIndex((user) => user.id === id)
    this.users.slice(user)
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}

export { UsersRepositoryInMemory }
