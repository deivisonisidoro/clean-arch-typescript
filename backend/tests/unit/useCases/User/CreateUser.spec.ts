import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { ICreateUserRequestDTO } from '../../../../src/domain/dtos/User/CreateUser'
import { IUsersRepository } from '../../../../src/app/repositories/User'
import { ICreateUserUseCase } from '../../../../src/app/useCases/User/CreateUser'
import { CreateUserUseCase } from '../../../../src/app/useCases/User/implementations/CreateUser'
import { UserErrorType } from '../../../../src/domain/enums/user/ErrorType'
import { EmailErrorType } from '../../../../src/domain/enums/email/ErrorType'
import { IPasswordHasher } from "../../../../src/app/providers/PasswordHasher";

describe('CreateUserUseCase', () => {
  let createUserUseCase: ICreateUserUseCase
  let userRepository: IUsersRepository
  let passwordHasher: IPasswordHasher

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
      comparePasswords: vi.fn()
    }
    createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
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
    passwordHasher.hashPassword = vi.fn().mockResolvedValueOnce(createUserRequestDTO.password)
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
