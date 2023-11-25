import { beforeAll, describe, expect, it } from 'vitest'

import { IRefreshTokenRepository } from '../../../../../src/app/repositories/RefreshToken'
import { IUsersRepository } from '../../../../../src/app/repositories/User'
import { UserRepository } from '../../../../../src/infra/repositories/prisma/User'
import { RefreshTokenPrismaRepository } from '../../../../../src/infra/repositories/prisma/RefreshToken'
import { prisma } from '../../../../helpers/prisma'

describe('RefreshTokenPrismaRepository', () => {
  let refreshTokenPrismaRepository: IRefreshTokenRepository
  let userRepository: IUsersRepository

  const userData = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password',
  }
  beforeAll(async () => {
    refreshTokenPrismaRepository = new RefreshTokenPrismaRepository(prisma)
    userRepository = new UserRepository(prisma)
  })

  it('create method should create a refresh token', async () => {
    const userCreated = await userRepository.create(userData)
    const result = await refreshTokenPrismaRepository.create(userCreated.id)
    expect(result).toBeDefined();
  })

  it('finds a refresh token by id', async () => {
    const userCreated = await userRepository.create(userData)
    const refreshToken = await refreshTokenPrismaRepository.create(userCreated.id)

    const result = await refreshTokenPrismaRepository.findById(refreshToken.id);

    expect(result).toBeDefined();
  });
  it('returns null if the refresh token is not found', async () => {

    const refreshTokenId = 'nonExistentRefreshTokenId';
    const result = await refreshTokenPrismaRepository.findById(refreshTokenId);

    expect(result).toBeNull();
  });

  it('finds a refresh token by user id', async () => {
    const userCreated = await userRepository.create(userData)
    await refreshTokenPrismaRepository.create(userCreated.id)

    const result = await refreshTokenPrismaRepository.findByUserId(userCreated.id);

    expect(result).toBeDefined();
  });

  it('deletes a refresh token by user ID', async () => {

    const userCreated = await userRepository.create(userData)
    const refreshToken = await refreshTokenPrismaRepository.create(userCreated.id)

    await refreshTokenPrismaRepository.delete(userCreated.id);

    const result = await refreshTokenPrismaRepository.findById(refreshToken.id);
    expect(result).toBeDefined();
  });
})
