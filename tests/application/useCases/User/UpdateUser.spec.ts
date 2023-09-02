import { IUsersRepository } from '../../../../src/domain/repositories/User'
import { IUpdateUserUseCase } from '../../../../src/domain/useCases/User/UpdateUser'
import { UpdateUserUseCase } from '../../../../src/application/useCases/User/UpdateUser'
import { IUpdateUserRequestDTO } from 'src/domain/dtos/User/UpdateUser'

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: IUpdateUserUseCase
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
    updateUserUseCase = new UpdateUserUseCase(userRepository)
  })
  afterEach(() => {
    jest.clearAllMocks()
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
    ;(userRepository.findById as jest.Mock).mockResolvedValueOnce(
      updateUserRequestDTO,
    )
    ;(userRepository.update as jest.Mock).mockResolvedValueOnce(
      updateUserRequestDTO,
    )
    ;(userRepository.save as jest.Mock).mockResolvedValueOnce(
      updateUserRequestDTO,
    )

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

    ;(userRepository.findById as jest.Mock).mockResolvedValueOnce(null)

    const result = await updateUserUseCase.execute(updateUserRequestDTO)
    expect(result.data).toEqual('User does not exits!')
  })
})
