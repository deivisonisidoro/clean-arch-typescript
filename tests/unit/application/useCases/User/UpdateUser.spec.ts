import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IUsersRepository } from '../../../../../src/domain/repositories/User'
import { IUpdateUserUseCase } from '../../../../../src/domain/useCases/User/UpdateUser'
import { UpdateUserUseCase } from '../../../../../src/application/User/UpdateUser'
import { IUpdateUserRequestDTO } from '../../../../../src/domain/dtos/User/UpdateUser'

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: IUpdateUserUseCase
  let userRepository: IUsersRepository
  beforeEach(() => {
    userRepository = {
      update: vi.fn(),
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      delete: vi.fn(),
    }
    updateUserUseCase = new UpdateUserUseCase(userRepository)
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

    const result = await updateUserUseCase.execute(userId, existingUser)

    expect(userRepository.update).toHaveBeenCalledWith(updateUserRequestDTO, {
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
    })
    expect(result.data).toEqual(updateUserRequestDTO)
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
    expect(result.data).toEqual('User does not exits!')
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
    expect(result.data).toEqual({ error: 'Invalid Email Address' })
  })
})
