import { PrismaClient } from '@prisma/client'
import { IUsersRepository } from '../../../src/domain/repositories/User'
import { PrismaUserRepository } from '../../../src/infra/repositories/PrismaUser'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

describe('PrismaUserRepository', () => {
  let prismaClient: PrismaClient
  let userRepository: IUsersRepository
  const userData = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password',
  }
  beforeAll(async () => {
    prismaClient = new PrismaClient()
    userRepository = new PrismaUserRepository(prismaClient)
  })

  beforeEach(async () => {
    await prismaClient.$connect()
  })

  afterEach(async () => {
    const deleteUser = prismaClient.user.deleteMany()
    await prismaClient.$transaction([deleteUser])
  })

  afterAll(async () => {
    await prismaClient.$disconnect()
  })

  it('create method should create a user', async () => {
    const createdUser = await userRepository.create(userData)
    expect(createdUser.email).toEqual(userData.email)
    expect(createdUser.name).toEqual(userData.name)
    expect(createdUser.password).not.toEqual(userData.password)
  })

  it('findByEmail method should find a user by email', async () => {
    const createdUser = await prismaClient.user.create({ data: userData })
    const user = await userRepository.findByEmail(createdUser.email)
    expect(user).not.toBeNull()
  })

  it('findByEmail method should not find a user by email', async () => {
    const user = await userRepository.findByEmail('test@example.com')
    expect(user).toBeNull()
  })

  it('findById method should  find a user by id', async () => {
    const createdUser = await prismaClient.user.create({ data: userData })
    const user = await userRepository.findById(createdUser.id)
    expect(user).not.toBeNull()
  })

  it('findById method should not find a user by id', async () => {
    const user = await userRepository.findById('test')
    expect(user).toBeNull()
  })

  it('findAll method should not find all users', async () => {
    const createdUser = await prismaClient.user.create({ data: userData })
    const paginatedData = await userRepository.findAll(1)

    expect(paginatedData.last_page).toEqual(1)
    expect(paginatedData.page).toEqual(1)
    expect(paginatedData.total).toEqual(1)
    expect(paginatedData.body).toEqual([createdUser])
  })

  it('update method should update a user by id', async () => {
    const createdUser = await prismaClient.user.create({ data: userData })
    const user = await userRepository.update(createdUser, {
      name: 'New User',
      password: '123',
    })

    expect(user.name).toEqual('New User')
    expect(user.password).not.toEqual('123')
  })

  it('update method should not change the password', async () => {
    const createdUser = await prismaClient.user.create({ data: userData })
    const user = await userRepository.update(createdUser, { name: 'New User' })

    expect(user.name).toEqual('New User')
    expect(user.password).toEqual(createdUser.password)
  })

  it('delete method should delete the user by id', async () => {
    const createdUser = await prismaClient.user.create({ data: userData })
    const user = await userRepository.delete(createdUser.id)

    expect(user).toBeUndefined()
  })
})
