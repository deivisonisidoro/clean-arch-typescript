import { GetAllUserUseCase } from '../../../../src/application/useCases/User/GetAllUser'
import { IUsersRepository } from '../../../../src/domain/repositories/User'
import { IGetAllUserUseCase } from '../../../../src/domain/useCases/User/GetAllUser'
import { User } from '../../../domain/entities/User'

describe('GetAllUserUseCase', () => {
  let getAllUserUseCase: IGetAllUserUseCase
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
    getAllUserUseCase = new GetAllUserUseCase(userRepository)
  })

  it('should return all users', async () => {
    const page = 1
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

    ;(userRepository.findAll as jest.Mock).mockResolvedValueOnce(users)

    const result = await getAllUserUseCase.execute(page)

    expect(userRepository.findAll).toHaveBeenCalledWith(page)
    expect(result).toEqual(users)
  })
})
