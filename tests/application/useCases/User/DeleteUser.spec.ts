import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IDeleteUserUseCase } from '../../../../src/domain/useCases/User/DeleteUser'
import { DeleteUserUseCase } from '../../../../src/application/useCases/User/DeleteUser'
import { IUsersRepository } from '../../../../src/domain/repositories/User'

describe('DeleteUser', () => {
  let deleteUserUseCase: IDeleteUserUseCase
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
    deleteUserUseCase = new DeleteUserUseCase(userRepository)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should delete a new user', async () => {
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
    expect(result.data).toEqual(`User deleted with success!`)
  })

  it('should throw an error if user does not exists', async () => {
    const userId = '123'

    userRepository.findById = vi.fn().mockResolvedValueOnce(null)

    const result = await deleteUserUseCase.execute(userId)
    expect(result.data).toEqual('User does not exits!')
  })
})
