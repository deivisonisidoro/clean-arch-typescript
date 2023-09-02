import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IUsersRepository } from '../../../../src/domain/repositories/User'
import { IUpdateUserUseCase } from '../../../../src/domain/useCases/User/UpdateUser'
import { UpdateUserUseCase } from '../../../../src/application/useCases/User/UpdateUser'
import { IUpdateUserRequestDTO } from 'src/domain/dtos/User/UpdateUser'

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: IUpdateUserUseCase
  let userRepository: IUsersRepository
  beforeEach(() => {
    userRepository = {
      update: vi.fn(),
      findByEmail: vi.fn(),
      create: vi.fn(),
      save: vi.fn(),
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
    userRepository.save = vi.fn().mockResolvedValueOnce(updateUserRequestDTO)

    const result = await updateUserUseCase.execute(existingUser)

    expect(userRepository.save).toHaveBeenCalledWith(updateUserRequestDTO)
    expect(userRepository.update).toHaveBeenCalledWith(updateUserRequestDTO, {
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
    })
    expect(result.data).toEqual(updateUserRequestDTO)
  })

  it('should throw an error if user does not exists', async () => {
    const updateUserRequestDTO: IUpdateUserRequestDTO = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    }

    userRepository.findById = vi.fn().mockResolvedValueOnce(null)

    const result = await updateUserUseCase.execute(updateUserRequestDTO)
    expect(result.data).toEqual('User does not exits!')
  })
})
