import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

import { IRefreshTokenRepository } from '../../../app/repositories/RefreshToken'
import { RefreshTokenDTO } from '../../../domain/dtos/Authenticate/RefreshToken'

/**
 * Prisma implementation of the refresh token repository.
 *
 * @class
 * @implements {IRefreshTokenRepository}
 */
export class RefreshTokenPrismaRepository implements IRefreshTokenRepository {
  /**
   * Creates an instance of RefreshTokenPrismaRepository.
   *
   * @constructor
   * @param {PrismaClient} prisma - The Prisma client instance.
   */
  constructor(private prisma: PrismaClient) {}

  /**
   * Creates a new refresh token for the specified user.
   *
   * @async
   * @param {string} userId - The ID of the user for whom the refresh token is created.
   * @returns {Promise<RefreshTokenDTO>} The generated refresh token.
   */
  async create(userId: string): Promise<RefreshTokenDTO> {
    const expiresIn = dayjs().add(2, 'hour').unix()

    const generateRefreshToken = await this.prisma.refreshToken.create({
      data: {
        user_id: userId,
        expires_in: expiresIn,
      },
    })

    return generateRefreshToken
  }

  /**
   * Finds a refresh token by its ID.
   *
   * @async
   * @param {string} refreshToken - The ID of the refresh token to find.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token or undefined.
   */
  async findById(refreshToken: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        id: refreshToken,
      },
    })

    return token
  }

  /**
   * Finds a refresh token by user ID.
   *
   * @async
   * @param {string} userId - The ID of the user for whom to find the refresh token.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token or undefined.
   */
  async findByUserId(userId: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        user_id: userId,
      },
    })

    return token
  }

  /**
   * Deletes a refresh token associated with the specified user ID.
   *
   * @async
   * @param {string} userId - The ID of the user for whom to delete the refresh token.
   * @returns {Promise<void>} A Promise that resolves once the refresh token is deleted.
   */
  async delete(userId: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: {
        user_id: userId,
      },
    })
  }
}
