import { IDeleteUserUseCase } from '../../../../src/domain/useCases/User/DeleteUser'
import { DeleteUserUseCase } from '../../../../src/application/useCases/User/DeleteUser'
import { IUsersRepository } from '../../../../src/domain/repositories/User'

describe('DeleteUser', () => {
  let deleteUserUseCase: IDeleteUserUseCase
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
    deleteUserUseCase = new DeleteUserUseCase(userRepository)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should delete a new user', async () => {
    const userId = '123'
    const userData = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    }

    ;(userRepository.findById as jest.Mock).mockResolvedValueOnce(userData)
    ;(userRepository.delete as jest.Mock).mockResolvedValueOnce(null)

    const result = await deleteUserUseCase.execute(userId)

    expect(userRepository.delete).toHaveBeenCalledWith(userId)
    expect(result.data).toEqual(`User deleted with success!`)
  })

  it('should throw an error if user does not exists', async () => {
    const userId = '123'

    ;(userRepository.findById as jest.Mock).mockResolvedValueOnce(null)

    const result = await deleteUserUseCase.execute(userId)
    expect(result.data).toEqual('User does not exits!')
  })
})
