/**
 * Integration tests for the UserPrismaRepository class using Vitest.
 * @module UserPrismaRepositoryTests
 */

import { beforeAll, describe, expect, it } from 'vitest'

import { IUsersRepository } from '../../../../../src/app/repositories/User'
import { UserRepository } from '../../../../../src/infra/repositories/prisma/User'
import { prisma } from '../../../../helpers/db/prisma'

/**
 * Test suite for the UserPrismaRepository class.
 * @function
 * @name UserPrismaRepositoryTests
 */
describe('UserPrismaRepository', () => {
  let userRepository: IUsersRepository
  const userData = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password',
  }

  /**
   * Function to perform setup operations before running tests.
   * @function
   * @name beforeAllTests
   * @description This function initializes an instance of UserPrismaRepository before running tests.
   */
  beforeAll(async () => {
    userRepository = new UserRepository(prisma)
  })

  /**
   * Test case to verify that the create method creates a user.
   * @function
   * @name shouldCreateUser
   */
  it('create method should create a user', async () => {
    const createdUser = await userRepository.create(userData)
    expect(createdUser.email).toEqual(userData.email)
    expect(createdUser.name).toEqual(userData.name)
  })

  /**
   * Test case to verify that the findByEmail method finds a user by email.
   * @function
   * @name shouldFindUserByEmail
   */
  it('findByEmail method should find a user by email', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.findByEmail(createdUser.email)
    expect(user).not.toBeNull()
  })

  /**
   * Test case to verify that the findByEmail method does not find a user by email.
   * @function
   * @name shouldNotFindUserByEmail
   */
  it('findByEmail method should not find a user by email', async () => {
    const user = await userRepository.findByEmail('test@example.com')
    expect(user).toBeNull()
  })

  /**
   * Test case to verify that the findById method finds a user by ID.
   * @function
   * @name shouldFindUserById
   */
  it('findById method should find a user by id', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.findById(createdUser.id)
    expect(user).not.toBeNull()
  })

  /**
   * Test case to verify that the findById method does not find a user by ID.
   * @function
   * @name shouldNotFindUserById
   */
  it('findById method should not find a user by id', async () => {
    const user = await userRepository.findById('test')
    expect(user).toBeNull()
  })

  /**
   * Test case to verify that the findAll method finds all users.
   * @function
   * @name shouldFindAllUsers
   */
  it('findAll method should find all users', async () => {
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

  /**
   * Test case to verify that the update method updates a user by ID.
   * @function
   * @name shouldUpdateUserById
   */
  it('update method should update a user by id', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.update(createdUser, {
      name: 'New User',
      password: '123',
    })

    expect(user.name).toEqual('New User')
  })

  /**
   * Test case to verify that the delete method deletes the user by ID.
   * @function
   * @name shouldDeleteUserById
   */
  it('delete method should delete the user by id', async () => {
    const createdUser = await prisma.user.create({ data: userData })
    const user = await userRepository.delete(createdUser.id)

    expect(user).toBeUndefined()
  })
})
