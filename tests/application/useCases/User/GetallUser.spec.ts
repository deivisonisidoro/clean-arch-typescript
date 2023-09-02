import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { PaginationDTO } from '../../../../src/domain/dtos/Pagination'
import { GetAllUserUseCase } from '../../../../src/application/useCases/User/GetAllUser'
import { IUsersRepository } from '../../../../src/domain/repositories/User'
import { IGetAllUserUseCase } from '../../../../src/domain/useCases/User/GetAllUser'
import { User } from '../../../domain/entities/User'

describe('GetAllUserUseCase', () => {
  let getAllUserUseCase: IGetAllUserUseCase
  let userRepository: IUsersRepository
  const pageNumber = 1
  const page = pageNumber || 1
  const perPage = 4

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
    getAllUserUseCase = new GetAllUserUseCase(userRepository)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should return all users paginated', async () => {
    const users: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: 'password',
      },
    ]
    const total = users.length
    const pagination: PaginationDTO = {
      body: users,
      total,
      page,
      last_page: Math.ceil(total / perPage),
    }

    userRepository.findAll = vi.fn().mockResolvedValueOnce(pagination)

    const result = await getAllUserUseCase.execute(pageNumber)

    expect(userRepository.findAll).toHaveBeenCalledWith(pageNumber)
    expect(result.data).toEqual(pagination)
  })
  it('should return a error message', async () => {
    const users: User[] = []
    const total = users.length
    const pagination: PaginationDTO = {
      body: users,
      total,
      page,
      last_page: Math.ceil(total / perPage),
    }

    userRepository.findAll = vi.fn().mockResolvedValueOnce(pagination)

    const result = await getAllUserUseCase.execute(pageNumber)

    expect(userRepository.findAll).toHaveBeenCalledWith(pageNumber)
    expect(result.data).toEqual('Users not found')
  })
})
