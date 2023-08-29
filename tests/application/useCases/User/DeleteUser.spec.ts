import { IDeleteUserUseCase } from '../../../../src/domain/useCases/User/DeleteUser'
import { DeleteUserUseCase } from '../../../../src/application/useCases/User/DeleteUser'
import { IUsersRepository } from '../../../../src/domain/repositories/User'

describe('DeleteUser', () => {
  let deleteUserUseCase: IDeleteUserUseCase
  let userRepository: IUsersRepository

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    }
    deleteUserUseCase = new DeleteUserUseCase(userRepository)
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
    expect(result).toEqual(undefined)
  })

  it('should throw an error if user does not exists', async () => {
    const userId = '123'

    ;(userRepository.findById as jest.Mock).mockResolvedValueOnce(null)

    await expect(deleteUserUseCase.execute(userId)).rejects.toThrowError(
      'User does not exits!',
    )
  })
})
