/**
 * Unit tests for the DeleteUserUseCase class using Vitest.
 * @module DeleteUserUseCaseTests
 */

import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IUsersRepository } from '../../../../src/app/repositories/User'
import { IDeleteUserUseCase } from '../../../../src/app/useCases/User/DeleteUser'
import { DeleteUserUseCase } from '../../../../src/app/useCases/User/implementations/DeleteUser'
import { UserErrorType } from '../../../../src/domain/enums/user/ErrorType'

/**
 * Test suite for the DeleteUserUseCase class.
 * @function
 * @name DeleteUserUseCaseTests
 */
describe('DeleteUser', () => {
  let deleteUserUseCase: IDeleteUserUseCase
  let userRepository: IUsersRepository

  /**
   * Set up before each test case.
   * @function
   * @name beforeEach
   */
  beforeEach(() => {
    userRepository = {
      update: vi.fn(),
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      delete: vi.fn(),
    }
    deleteUserUseCase = new DeleteUserUseCase(userRepository)
  })

  /**
   * Clean up after each test case.
   * @function
   * @name afterEach
   */
  afterEach(() => {
    vi.clearAllMocks()
  })

  /**
   * Test case to verify deleting a user.
   * @function
   * @name shouldDeleteUser
   */
  it('should delete a user', async () => {
    const userId = '123'
    const userData = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    }

    userRepository.findById = vi.fn().mockResolvedValueOnce(userData)
    userRepository.delete = vi.fn().mockResolvedValueOnce(null)

    const result = await deleteUserUseCase.execute(userId)

    expect(userRepository.delete).toHaveBeenCalledWith(userId)
    expect(result.data.error).toEqual('User deleted with success!')
  })

  /**
   * Test case to verify throwing an error if the user does not exist.
   * @function
   * @name shouldThrowErrorIfUserDoesNotExist
   */
  it('should throw an error if user does not exist', async () => {
    const userId = '123'

    userRepository.findById = vi.fn().mockResolvedValueOnce(null)

    const result = await deleteUserUseCase.execute(userId)
    expect(result.data.error).toEqual(UserErrorType.UserDoesNotExist)
  })
})
