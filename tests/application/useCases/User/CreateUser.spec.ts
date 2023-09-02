import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { ICreateUserUseCase } from '../../../../src/domain/useCases/User/CreateUser'
import { CreateUserUseCase } from '../../../../src/application/useCases/User/CreateUser'
import { ICreateUserRequestDTO } from '../../../../src/domain/dtos/User/CreateUser'
import { IUsersRepository } from '../../../../src/domain/repositories/User'

describe('CreateUserUseCase', () => {
  let createUserUseCase: ICreateUserUseCase
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
    createUserUseCase = new CreateUserUseCase(userRepository)
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

    const result = await createUserUseCase.execute(createUserRequestDTO)

    expect(userRepository.findByEmail).toHaveBeenCalledWith(
      createUserRequestDTO.email,
    )
    expect(userRepository.create).toHaveBeenCalledWith({
      ...createUserRequestDTO,
      password: expect.any(String),
    })
    expect(userRepository.save).toHaveBeenCalledWith({
      id: '123',
      ...createUserRequestDTO,
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
    expect(result.data).toEqual('User already exists!')
  })
})
