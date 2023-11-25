import { PrismaClient } from '@prisma/client'

import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { ICreateUserRequestDTO } from '../../../domain/dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../../../domain/dtos/User/UpdateUser'
import { IUserOutRequestDTO } from '../../../domain/dtos/User/UserOut'
import { IUsersRepository } from '../../../app/repositories/User'
import { IUserInRequestDTO } from '../../../domain/dtos/User/UserIn'


export class UserRepository implements IUsersRepository {
  constructor(private prisma: PrismaClient) {}

  async create({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<IUserOutRequestDTO> {
    const user = this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })
    return user
  }

  async findByEmail(email: string): Promise<IUserInRequestDTO | unknown> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        createdAt: true,
      },
    })
    return user
  }

  async findById(id: string): Promise<IUserInRequestDTO | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        createdAt: true,
      },
    })
    return user
  }

  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4
    const user: IUserOutRequestDTO[] = await this.prisma.user.findMany({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })
    const total = await this.prisma.user.count()
    return {
      body: user,
      total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }

  async update(
    user: IUserOutRequestDTO,
    { email, name, password }: IUpdateUserRequestDTO,
  ): Promise<IUserOutRequestDTO> {
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
