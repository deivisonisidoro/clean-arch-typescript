import { PrismaClient } from '@prisma/client'

import { IUsersRepository } from '../../../app/repositories/User'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { ICreateUserRequestDTO } from '../../../domain/dtos/User/CreateUser'
import { IUpdateUserRequestDTO } from '../../../domain/dtos/User/UpdateUser'
import { IUserInRequestDTO } from '../../../domain/dtos/User/UserIn'
import { IUserOutRequestDTO } from '../../../domain/dtos/User/UserOut'

/**
 * Prisma implementation of the user repository.
 *
 * @class
 * @implements {IUsersRepository}
 */
export class UserRepository implements IUsersRepository {
  /**
   * Creates an instance of UserRepository.
   *
   * @constructor
   * @param {PrismaClient} prisma - The Prisma client instance.
   */
  constructor(private prisma: PrismaClient) {}

  /**
   * Creates a new user.
   *
   * @async
   * @param {ICreateUserRequestDTO} data - The user data.
   * @returns {Promise<IUserOutRequestDTO>} The created user.
   */
  async create({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<IUserOutRequestDTO> {
    const user = await this.prisma.user.create({
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

  /**
   * Finds a user by email.
   *
   * @async
   * @param {string} email - The email to search for.
   * @returns {Promise<IUserInRequestDTO | unknown>} The found user or undefined.
   */
  async findByEmail(email: string): Promise<IUserInRequestDTO | unknown> {
    const user = await this.prisma.user.findFirst({
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

  /**
   * Finds a user by ID.
   *
   * @async
   * @param {string} id - The ID of the user to find.
   * @returns {Promise<IUserInRequestDTO | null>} The found user or null.
   */
  async findById(id: string): Promise<IUserInRequestDTO | null> {
    const user = await this.prisma.user.findFirst({
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

  /**
   * Retrieves a paginated list of users.
   *
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of users.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4
    const users: IUserOutRequestDTO[] = await this.prisma.user.findMany({
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
      body: users,
      total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }

  /**
   * Updates a user with new data.
   *
   * @async
   * @param {IUserOutRequestDTO} user - The user to update.
   * @param {IUpdateUserRequestDTO} data - The updated user data.
   * @returns {Promise<IUserOutRequestDTO>} The updated user.
   */
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

  /**
   * Deletes a user by ID.
   *
   * @async
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} A Promise that resolves once the user is deleted.
   */
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
