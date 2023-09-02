import { ICreateUserUseCase } from '../../../../src/domain/useCases/User/CreateUser'
import { CreateUserUseCase } from '../../../../src/application/useCases/User/CreateUser'
import { ICreateUserRequestDTO } from '../../../../src/domain/dtos/User/CreateUser'
import { IUsersRepository } from '../../../../src/domain/repositories/User'

describe('CreateUserUseCase', () => {
  let createUserUseCase: ICreateUserUseCase
  let userRepository: IUsersRepository

  beforeEach(() => {
    userRepository = {
      update: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    }
    createUserUseCase = new CreateUserUseCase(userRepository)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should create a new user', async () => {
    const createUserRequestDTO: ICreateUserRequestDTO = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    }

    ;(userRepository.findByEmail as jest.Mock).mockResolvedValueOnce(null)
    ;(userRepository.create as jest.Mock).mockResolvedValueOnce({
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

    ;(userRepository.findByEmail as jest.Mock).mockResolvedValueOnce(
      createUserRequestDTO,
    )
    const result = await createUserUseCase.execute(createUserRequestDTO)
    expect(result.data).toEqual('User already exists!')
  })
})
