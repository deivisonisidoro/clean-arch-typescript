import { hash } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

import { UserInterface } from '../../domain/entities/User'
import { ICreateUserRequestDTO } from '../../domain/dtos/User/CreateUser'
import { IUsersRepository } from '../../domain/repositories/User'
import { PaginationDTO } from '../../domain/dtos/Pagination'
import { IUpdateUserRequestDTO } from '../../domain/dtos/User/UpdateUser'

export class PrismaUserRepository implements IUsersRepository {
  constructor(private prisma: PrismaClient) {}
  async create({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<UserInterface> {
    password = await hash(password, 8)
    const user = this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })
    return user
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })
    return user
  }

  async findById(id: string): Promise<UserInterface | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })
    return user
  }

  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4
    const user = await this.prisma.user.findMany({
      take: perPage,
      orderBy: {
        name: 'asc',
      },
    })
    const page = pageNumber
    const total = user.length
    return { body: user, total, page, last_page: Math.ceil(total / perPage) }
  }

  async update(
    user: UserInterface,
    { email, name, password }: IUpdateUserRequestDTO,
  ): Promise<UserInterface> {
    if (password) {
      password = await hash(password, 8)
    }
    const userUpdated = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email,
        name,
        password,
      },
    })
    return userUpdated
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
