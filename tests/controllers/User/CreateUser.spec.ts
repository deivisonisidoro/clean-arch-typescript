import { ICreateUserUseCase } from '../../../src/domain/useCases/User/CreateUser'
import { CreateUserController } from '../../../src/controllers/User/CreateUser'
import { ICreateUserRequestDTO } from '../../../src/domain/dtos/User/CreateUser'
import { IController } from '../../../src/domain/controller'
import { IHttpRequest } from '../../../src/helpers/IHttpRequest'
import { HttpErrors } from '../../../src/helpers/implementations/HttpErrors'
import { HttpSuccess } from '../../../src/helpers/implementations/HttpSuccess'

describe('CreateUserController', () => {
  let createUserUseCase: ICreateUserUseCase
  let createUserController: IController
  beforeEach(() => {
    createUserUseCase = {
      execute: jest.fn(),
    }
    createUserController = new CreateUserController(createUserUseCase)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should return 201 response on successful user creation', async () => {
    const createUserRequestDTO: ICreateUserRequestDTO = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    }
    const httpRequest: IHttpRequest = {
      body: createUserRequestDTO,
    }
    const httpSuccess = new HttpSuccess()
    ;(createUserUseCase.execute as jest.Mock).mockResolvedValueOnce({
      data: {
        id: '123',
        ...createUserRequestDTO,
      },
      success: true,
    })

    const httpResponse = await createUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_201().statusCode)
    expect(httpResponse.body).toEqual({
      id: '123',
      ...createUserRequestDTO,
    })
  })
  it('should return 422 response if body parameters are missing', async () => {
    const createUserRequestDTO = {
      name: 'Test User',
      password: 'password',
    }
    const httpRequest: IHttpRequest = {
      body: createUserRequestDTO,
    }
    const httpError = new HttpErrors()
    const httpResponse = await createUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_422().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_422().body)
  })

  it('should return 400 response if user creation encounters duplicate user', async () => {
    const createUserRequestDTO: ICreateUserRequestDTO = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    }
    const httpRequest: IHttpRequest = {
      body: createUserRequestDTO,
    }
    const httpError = new HttpErrors()
    ;(createUserUseCase.execute as jest.Mock).mockResolvedValueOnce({
      data: 'User already exists!',
      success: false,
    })

    const httpResponse = await createUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_400().statusCode)
    expect(httpResponse.body).toEqual('User already exists!')
  })
  it('should return 500 response if body is missing', async () => {
    const httpError = new HttpErrors()
    const httpResponse = await createUserController.handle({})

    expect(httpResponse.statusCode).toBe(httpError.error_500().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_500().body)
  })
})
