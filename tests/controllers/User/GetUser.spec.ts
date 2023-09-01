import { IGetAllUserUseCase } from '../../../src/domain/useCases/User/GetAllUser'
import { GetUserController } from '../../../src/controllers/User/GetUser'
import { IController } from '../../../src/domain/controller'
import { IHttpRequest } from '../../../src/helpers/http/IHttpRequest'
import { HttpErrors } from '../../../src/helpers/http/implementations/HttpErrors'
import { HttpSuccess } from '../../../src/helpers/http/implementations/HttpSuccess'
import { PaginationDTO } from '../../../src/domain/dtos/Pagination'
import { User } from '../../../src/domain/entities/User'

describe('GetUserController', () => {
  let getAllUserUseCase: IGetAllUserUseCase
  let getUserController: IController
  const pageNumber = 1
  const page = pageNumber || 1
  const perPage = 4

  beforeEach(() => {
    getAllUserUseCase = {
      execute: jest.fn(),
    }
    getUserController = new GetUserController(getAllUserUseCase)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should return all users paginated', async () => {
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
    const total = users.length
    const pagination: PaginationDTO = {
      body: users,
      total,
      page,
      last_page: Math.ceil(total / perPage),
    }

    const httpRequest: IHttpRequest = {
      path: { page: String(page) },
    }
    const httpSuccess = new HttpSuccess()
    ;(getAllUserUseCase.execute as jest.Mock).mockResolvedValueOnce({
      data: pagination,
      success: true,
    })

    const httpResponse = await getUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_200().statusCode)
    expect(httpResponse.body).toEqual(pagination)
  })
  it('should return 422 response if body parameters are missing', async () => {
    const httpRequest: IHttpRequest = {
      path: { test: 'Testing' },
    }
    const httpError = new HttpErrors()
    const httpResponse = await getUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_422().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_422().body)
  })

  it('should return 404 response if users not was found', async () => {
    const httpRequest: IHttpRequest = {
      path: { page: String(page) },
    }
    const httpError = new HttpErrors()
    ;(getAllUserUseCase.execute as jest.Mock).mockResolvedValueOnce({
      data: 'Users not found',
      success: false,
    })

    const httpResponse = await getUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_404().statusCode)
    expect(httpResponse.body).toEqual('Users not found')
  })
  it('should return 500 response if body is missing', async () => {
    const httpError = new HttpErrors()
    const httpResponse = await getUserController.handle({})

    expect(httpResponse.statusCode).toBe(httpError.error_500().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_500().body)
  })
})
