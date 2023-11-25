import { beforeAll, describe, expect, it } from 'vitest'

import { IUsersRepository } from '../../../../../src/app/repositories/User'
import { UserRepository } from '../../../../../src/infra/repositories/prisma/User'
import { prisma } from '../../../../helpers/prisma'

describe('UserPrismaRepository', () => {
  let userRepository: IUsersRepository
  const userData = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password',
  }
  beforeAll(async () => {
    userRepository = new UserRepository(prisma)
  })

  it('create method should create a user', async () => {
    const createdUser = await userRepository.create(userData)
    expect(createdUser.email).toEqual(userData.email)
    expect(createdUser.name).toEqual(userData.name)
  })

  it('findByEmail method should find a user by email', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.findByEmail(createdUser.email)
    expect(user).not.toBeNull()
  })

  it('findByEmail method should not find a user by email', async () => {
    const user = await userRepository.findByEmail('test@example.com')
    expect(user).toBeNull()
  })

  it('findById method should  find a user by id', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.findById(createdUser.id)
    expect(user).not.toBeNull()
  })

  it('findById method should not find a user by id', async () => {
    const user = await userRepository.findById('test')
    expect(user).toBeNull()
  })

  it('findAll method should not find all users', async () => {
    const createdUser = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })
    const paginatedData = await userRepository.findAll(1)

    expect(paginatedData.last_page).toEqual(1)
    expect(paginatedData.page).toEqual(1)
    expect(paginatedData.total).toEqual(1)
    expect(paginatedData.body).toEqual([createdUser])
  })

  it('update method should update a user by id', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.update(createdUser, {
      name: 'New User',
      password: '123',
    })

    expect(user.name).toEqual('New User')
  })


  it('delete method should delete the user by id', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.delete(createdUser.id)

    expect(user).toBeUndefined()
  })
})
