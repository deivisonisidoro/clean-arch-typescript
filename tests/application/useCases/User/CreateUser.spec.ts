import { CreateUserUseCase } from '../../../../src/application/useCases/User/CreateUser'
import { ICreateUserRequestDTO } from '../../../../src/application/dtos/User/CreateUser'
import { IUsersRepository } from '../../../../src/domain/repositories/User'
import { UsersRepositoryInMemory } from '../../../../src/infra/repositories/InMemory/User'

describe('Create user', () => {
  let usersRepository: IUsersRepository
  let createUserUseCase: CreateUserUseCase

  beforeAll(async () => {
    usersRepository = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })
  afterAll(async () => {})

  it('should be able to create a new user', async () => {
    const userData: ICreateUserRequestDTO = {
      name: 'Test Name',
      email: 'test@test.com.br',
      password: '123456',
    }

    const user = await createUserUseCase.execute(userData)

    expect(user).toHaveProperty('id')
    expect(user.name).toBe('Test Name')
  })
  it('should not be able to create an existing user', async () => {
    const userData: ICreateUserRequestDTO = {
      name: 'Test Existing Name',
      email: 'testexisting@test.com.br',
      password: 'testexisting',
    }

    await createUserUseCase.execute(userData)

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new Error('User already exists!'),
    )
  })
})
