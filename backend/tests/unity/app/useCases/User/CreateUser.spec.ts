/**
 * Unit tests for the CreateUserUseCase class using Vitest.
 * @module CreateUserUseCaseTests
 */

import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IPasswordHasher } from '../../../../../src/app/providers/PasswordHasher'
import { IUsersRepository } from '../../../../../src/app/repositories/User'
import { ICreateUserUseCase } from '../../../../../src/app/useCases/User/CreateUser'
import { CreateUserUseCase } from '../../../../../src/app/useCases/User/implementations/CreateUser'
import { ICreateUserRequestDTO } from '../../../../../src/domain/dtos/User/CreateUser'
import { EmailErrorType } from '../../../../../src/domain/enums/email/ErrorType'
import { UserErrorType } from '../../../../../src/domain/enums/user/ErrorType'

/**
 * Test suite for the CreateUserUseCase class.
 * @function
 * @name CreateUserUseCaseTests
 */
describe('CreateUserUseCase', () => {
  let createUserUseCase: ICreateUserUseCase
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
    createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher)
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
   * Test case to verify creating a new user.
   * @function
   * @name shouldCreateNewUser
   */
  it('should create a new user', async () => {
    const createUserRequestDTO: ICreateUserRequestDTO = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    }

    userRepository.findByEmail = vi.fn().mockResolvedValueOnce(null)
    userRepository.create = vi.fn().mockResolvedValueOnce({
      id: '123',
      ...createUserRequestDTO,
    })
    passwordHasher.hashPassword = vi
      .fn()
      .mockResolvedValueOnce(createUserRequestDTO.password)
    const result = await createUserUseCase.execute(createUserRequestDTO)

    expect(userRepository.findByEmail).toHaveBeenCalledWith(
      createUserRequestDTO.email,
    )
    expect(userRepository.create).toHaveBeenCalledWith({
      ...createUserRequestDTO,
      password: expect.any(String),
    })
    expect(result.data).toEqual({
      id: '123',
      ...createUserRequestDTO,
    })
  })

  /**
   * Test case to verify throwing an error if the user already exists.
   * @function
   * @name shouldThrowErrorIfUserAlreadyExists
   */
  it('should throw an error if user already exists', async () => {
    const createUserRequestDTO: ICreateUserRequestDTO = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    }

    userRepository.findByEmail = vi
      .fn()
      .mockResolvedValueOnce(createUserRequestDTO)
    const result = await createUserUseCase.execute(createUserRequestDTO)
    expect(result.data).toEqual({ error: UserErrorType.UserAlreadyExists })
  })

  /**
   * Test case to verify throwing an error if the email is invalid.
   * @function
   * @name shouldThrowErrorIfEmailIsInvalid
   */
  it('should throw an error if email is invalid', async () => {
    const createUserRequestDTO: ICreateUserRequestDTO = {
      email: 'invalid email',
      name: 'Test User',
      password: 'password',
    }

    userRepository.findByEmail = vi
      .fn()
      .mockResolvedValueOnce(createUserRequestDTO)
    const result = await createUserUseCase.execute(createUserRequestDTO)
    expect(result.data).toEqual({ error: EmailErrorType.InvalidEmail })
  })
})
