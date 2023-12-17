import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IUpdateUserRequestDTO } from '../../../../src/domain/dtos/User/UpdateUser'
import { IUsersRepository } from '../../../../src/app/repositories/User'
import { UpdateUserUseCase } from '../../../../src/app/useCases/User/implementations/UpdateUser'
import { IUpdateUserUseCase } from '../../../../src/app/useCases/User/UpdateUser'
import { UserErrorType } from '../../../../src/domain/enums/user/ErrorType'
import { EmailErrorType } from '../../../../src/domain/enums/email/ErrorType'
import { IPasswordHasher } from "../../../../src/app/providers/PasswordHasher";


describe('UpdateUserUseCase', () => {
  let updateUserUseCase: IUpdateUserUseCase
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
    updateUserUseCase = new UpdateUserUseCase(userRepository, passwordHasher)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should update a new user', async () => {
    const userId = '123'
    const existingUser = {
      id: '123',
      email: 'existing@example.com',
      name: 'Existing User',
      password: 'existingpassword',
    }

    const updateUserRequestDTO = {
      email: 'newuser@example.com',
      name: 'New User',
      password: 'newpassword',
    }
    userRepository.findById = vi
      .fn()
      .mockResolvedValueOnce(updateUserRequestDTO)
    userRepository.update = vi.fn().mockResolvedValueOnce(updateUserRequestDTO)
    passwordHasher.hashPassword = vi.fn().mockResolvedValueOnce(existingUser.password)

    await updateUserUseCase.execute(userId, existingUser)

    expect(userRepository.update).toHaveBeenCalledWith(updateUserRequestDTO, {
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
    })
  })

  it('should throw an error if user does not exists', async () => {
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
