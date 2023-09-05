import { hash } from 'bcryptjs'

import { UserInterface } from '../../domain/entities/User'
import { ICreateUserRequestDTO } from '../../domain/dtos/User/CreateUser'
import { IUsersRepository } from '../../domain/repositories/User'
import { prismaClient } from '../database/prisma/connection'
import { PaginationDTO } from '../../domain/dtos/Pagination'
import { IUpdateUserRequestDTO } from '../../domain/dtos/User/UpdateUser'

export class PrismaUserRepository implements IUsersRepository {
  async create({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<UserInterface> {
    if (password) {
      password = await hash(password, 8)
    }
    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        password,
      },
    })
    return user
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    })
    return user
  }

  async findById(id: string): Promise<UserInterface | null> {
    const user = await prismaClient.user.findUnique({
      where: { id },
    })
    return user
  }

  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4
    const user = await prismaClient.user.findMany({
      take: perPage,
      orderBy: {
        name: 'asc',
      },
    })
    const page = pageNumber || 1
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
    const userUpdated = await prismaClient.user.update({
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
    await prismaClient.user.delete({
      where: {
        id,
      },
    })
  }
}
