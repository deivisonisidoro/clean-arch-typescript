import { GetAllUserUseCase } from '../../../../src/application/useCases/User/GetAllUser'
import { IUsersRepository } from '../../../../src/domain/repositories/User'
import { CreateUserUseCase } from '../../../../src/application/useCases/User/CreateUser'
import { ICreateUserRequestDTO } from '../../../../src/domain/dtos/User/CreateUser'
import { UsersRepositoryInMemory } from '../../../../src/infra/repositories/InMemory/User'

describe('Get all users', () => {
  let usersRepository: IUsersRepository
  let getAllUserUseCase: GetAllUserUseCase
  let createUserUseCase: CreateUserUseCase
  beforeAll(async () => {
    usersRepository = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    getAllUserUseCase = new GetAllUserUseCase(usersRepository)
  })

  afterAll(async () => {})

  it('should be able to get all users', async () => {
    const userData: ICreateUserRequestDTO = {
      name: 'Test Name',
      email: 'test@test.com.br',
      password: '123456',
    }
    const page: number = 1

    await createUserUseCase.execute(userData)

    const users = await getAllUserUseCase.execute(page)

    expect(users).toHaveProperty('body')
  })
})
