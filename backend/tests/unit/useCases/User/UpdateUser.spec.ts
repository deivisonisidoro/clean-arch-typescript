/**
 * Unit tests for the UpdateUserUseCase class using Vitest.
 * @module UpdateUserUseCaseTests
 */

import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IPasswordHasher } from '../../../../src/app/providers/PasswordHasher'
import { IUsersRepository } from '../../../../src/app/repositories/User'
import { UpdateUserUseCase } from '../../../../src/app/useCases/User/implementations/UpdateUser'
import { IUpdateUserUseCase } from '../../../../src/app/useCases/User/UpdateUser'
import { IUpdateUserRequestDTO } from '../../../../src/domain/dtos/User/UpdateUser'
import { EmailErrorType } from '../../../../src/domain/enums/email/ErrorType'
import { UserErrorType } from '../../../../src/domain/enums/user/ErrorType'

/**
 * Test suite for the UpdateUserUseCase class.
 * @function
 * @name UpdateUserUseCaseTests
 */
describe('UpdateUserUseCase', () => {
  let updateUserUseCase: IUpdateUserUseCase
  let userRepository: IUsersRepository
  let passwordHasher: IPasswordHasher

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
    passwordHasher = {
      hashPassword: vi.fn(),
      comparePasswords: vi.fn(),
    }
    updateUserUseCase = new UpdateUserUseCase(userRepository, passwordHasher)
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
   * Test case to verify updating a new user.
   * @function
   * @name shouldUpdateNewUser
   */
  it('should update a new user', async () => {
    const userId = '123'
    const existingUser = {
      id: '123',
      email: 'existing@example.com',
      name: 'Existing User',
      password: 'existingpassword',
    }

    const updateUserRequestDTO: IUpdateUserRequestDTO = {
      email: 'newuser@example.com',
      name: 'New User',
      password: 'newpassword',
    }
    userRepository.findById = vi
      .fn()
      .mockResolvedValueOnce(updateUserRequestDTO)
    userRepository.update = vi.fn().mockResolvedValueOnce(updateUserRequestDTO)
    passwordHasher.hashPassword = vi
      .fn()
      .mockResolvedValueOnce(existingUser.password)

    await updateUserUseCase.execute(userId, existingUser)

    expect(userRepository.update).toHaveBeenCalledWith(updateUserRequestDTO, {
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
    })
  })

  /**
   * Test case to verify throwing an error if user does not exist.
   * @function
   * @name shouldThrowErrorIfUserDoesNotExist
   */
  it('should throw an error if user does not exist', async () => {
    const userId = '123'
    const updateUserRequestDTO: IUpdateUserRequestDTO = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    }

    userRepository.findById = vi.fn().mockResolvedValueOnce(null)

    const result = await updateUserUseCase.execute(userId, updateUserRequestDTO)
    expect(result.data.error).toEqual(UserErrorType.UserDoesNotExist)
  })

  /**
   * Test case to verify throwing an error if email is invalid.
   * @function
   * @name shouldThrowErrorIfEmailIsInvalid
   */
  it('should throw an error if email is invalid', async () => {
    const userId = '123'
    const existingUser = {
      id: '123',
      email: 'existing@example.com',
      name: 'Existing User',
      password: 'existingpassword',
    }
    const updateUserRequestDTO: IUpdateUserRequestDTO = {
      id: '123',
      email: 'invalid email',
      name: 'Test User',
      password: 'password',
    }

    userRepository.findById = vi.fn().mockResolvedValueOnce(existingUser)

    const result = await updateUserUseCase.execute(userId, updateUserRequestDTO)
    expect(result.data).toEqual({ error: EmailErrorType.InvalidEmail })
  })
})
