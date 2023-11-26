
import dayjs from 'dayjs'
import { PrismaClient } from '@prisma/client'
import { IRefreshTokenRepository } from "../../../app/repositories/RefreshToken";
import { RefreshTokenDTO } from "../../../domain/dtos/Authenticate/RefreshToken";




export class RefreshTokenPrismaRepository implements IRefreshTokenRepository{
  constructor(private prisma: PrismaClient) {}

  async create(user_id: string): Promise<RefreshTokenDTO> {
    const expiresIn = dayjs().add(150, "second").unix();

    const generateRefreshToken =  await this.prisma.refreshToken.create({
      data: {
        user_id,
        expires_in: expiresIn,
      }
    });
    return generateRefreshToken;
  }

  async findById(refresh_token: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findUnique(
      {
        where: {
          id: refresh_token
        }
      }
    )
    return token
  }

  async findByUserId(user_id: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findUnique(
      {
        where: {
          user_id
        }
      }
    )
    return token
  }

  async delete(user_id: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: {
        user_id,
      },
    })

  }
}
