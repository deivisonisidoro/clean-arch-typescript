import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { IUserOutRequestDTO } from '../../../domain/dtos/User/UserOut'
import { IUsersRepository } from '../../../../src/app/repositories/User'
import { IGetAllUserUseCase } from '../../../../src/app/useCases/User/GetAllUser'
import { GetAllUserUseCase } from '../../../../src/app/useCases/User/implementations/GetAllUser'
import { UserErrorType } from '../../../../src/domain/enums/user/ErrorType'

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
    const users: IUserOutRequestDTO[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        createdAt: new Date(),
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
    const users: IUserOutRequestDTO[] = []
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
    expect(result.data.error).toEqual(UserErrorType.UserNotFound)
  })
})
