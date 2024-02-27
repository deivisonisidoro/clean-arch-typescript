/**
 * Unit tests for GetUserController using Vitest.
 * @module GetUserControllerTests
 */

import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IGetAllUserUseCase } from '../../../../../src/app/useCases/User/GetAllUser'
import { PaginationDTO } from '../../../../../src/domain/dtos/Pagination'
import { IUserOutRequestDTO } from '../../../../../src/domain/dtos/User/UserOut'
import { UserErrorType } from '../../../../../src/domain/enums/user/ErrorType'
import { IController } from '../../../../../src/presentation/http/controllers/IController'
import { GetUserController } from '../../../../../src/presentation/http/controllers/User/implementations/GetUser'
import { IHttpRequest } from '../../../../../src/presentation/http/helpers/IHttpRequest'
import { HttpErrors } from '../../../../../src/presentation/http/helpers/implementations/HttpErrors'
import { HttpSuccess } from '../../../../../src/presentation/http/helpers/implementations/HttpSuccess'

/**
 * Test suite for GetUserController.
 * @function
 * @name GetUserControllerTests
 */
describe('GetUserController', () => {
  let getAllUserUseCase: IGetAllUserUseCase
  let getUserController: IController
  const pageNumber = 1
  const page = pageNumber || 1
  const perPage = 4

  /**
   * Setup before each test.
   * @function
   * @name beforeEach
   */
  beforeEach(() => {
    getAllUserUseCase = {
      execute: vi.fn(),
    }
    getUserController = new GetUserController(getAllUserUseCase)
  })

  /**
   * Cleanup after each test.
   * @function
   * @name afterEach
   */
  afterEach(() => {
    vi.clearAllMocks()
  })

  /**
   * Test case to verify that it returns all users paginated.
   * @function
   * @name shouldReturnAllUsersPaginated
   */
  it('should return all users paginated', async () => {
    const users: IUserOutRequestDTO[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        createdAt: new Date(),
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
      query: { page: String(page) },
    }
    const httpSuccess = new HttpSuccess()
    getAllUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: pagination,
      success: true,
    })

    const httpResponse = await getUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_200().statusCode)
    expect(httpResponse.body).toEqual(pagination)
  })

  /**
   * Test case to verify that it returns a 422 response if query parameters are missing.
   * @function
   * @name shouldReturn422IfQueryParametersMissing
   */
  it('should return 422 response if query parameters are missing', async () => {
    const httpRequest: IHttpRequest = {
      query: { test: 'Testing' },
    }
    const httpError = new HttpErrors()
    const httpResponse = await getUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_422().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_422().body)
  })

  /**
   * Test case to verify that it returns a 404 response if users were not found.
   * @function
   * @name shouldReturn404IfUsersNotFound
   */
  it('should return 404 response if users not was found', async () => {
    const httpRequest: IHttpRequest = {
      query: { page: String(page) },
    }
    const httpError = new HttpErrors()
    getAllUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: UserErrorType.UserNotFound,
      success: false,
    })

    const httpResponse = await getUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_404().statusCode)
    expect(httpResponse.body).toEqual(UserErrorType.UserNotFound)
  })

  /**
   * Test case to verify that it returns a 500 response if the query is missing.
   * @function
   * @name shouldReturn500IfQueryMissing
   */
  it('should return 500 response if query is missing', async () => {
    const httpError = new HttpErrors()
    const httpResponse = await getUserController.handle({})

    expect(httpResponse.statusCode).toBe(httpError.error_500().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_500().body)
  })
})
