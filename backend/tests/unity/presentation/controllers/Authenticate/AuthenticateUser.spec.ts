/**
 * Unit tests for AuthenticateUserController using Vitest.
 * @module AuthenticateUserControllerTests
 */

import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IAuthenticateUserUserUseCase } from '../../../../../src/app/useCases/Authenticate/AuthenticateUser'
import { IAuthenticateUserDTO } from '../../../../../src/domain/dtos/Authenticate/AuthenticateUser'
import { AuthenticateUserErrorType } from '../../../../../src/domain/enums/Authenticate/AuthenticateUser/ErrorType'
import { AuthenticateUserController } from '../../../../../src/presentation/http/controllers/Authenticate/AuthenticateUser'
import { IController } from '../../../../../src/presentation/http/controllers/IController'
import { IHttpRequest } from '../../../../../src/presentation/http/helpers/IHttpRequest'
import { HttpErrors } from '../../../../../src/presentation/http/helpers/implementations/HttpErrors'
import { HttpSuccess } from '../../../../../src/presentation/http/helpers/implementations/HttpSuccess'

/**
 * Test suite for AuthenticateUserController.
 * @function
 * @name AuthenticateUserControllerTests
 */
describe('AuthenticateUserController', () => {
  let authenticateUserUseCase: IAuthenticateUserUserUseCase
  let authenticateUserController: IController

  /**
   * Setup before each test.
   * @function
   * @name beforeEach
   */
  beforeEach(() => {
    authenticateUserUseCase = {
      execute: vi.fn(),
    }
    authenticateUserController = new AuthenticateUserController(
      authenticateUserUseCase,
    )
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
   * Test case to verify that it returns a 200 response on successful user authentication.
   * @function
   * @name shouldReturn200OnSuccessfulAuthentication
   */
  it('should return 200 response on successful user authentication', async () => {
    const authenticateUserRequestDTO: IAuthenticateUserDTO = {
      email: 'test@example.com',
      password: 'password',
    }
    const httpRequest: IHttpRequest = {
      body: authenticateUserRequestDTO,
    }
    const httpSuccess = new HttpSuccess()
    authenticateUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: {
        token: 'token',
        refreshToken: 'refreshToken',
      },
      success: true,
    })

    const httpResponse = await authenticateUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_200().statusCode)
  })

  /**
   * Test case to verify that it returns a 422 response if body parameters are missing.
   * @function
   * @name shouldReturn422ForMissingBodyParameters
   */
  it('should return 422 response if body parameters are missing', async () => {
    const authenticateUserRequestDTO = {
      password: 'password',
    }
    const httpRequest: IHttpRequest = {
      body: authenticateUserRequestDTO,
    }
    const httpError = new HttpErrors()
    const httpResponse = await authenticateUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_422().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_422().body)
  })

  /**
   * Test case to verify that it returns a 400 response if email or password is wrong.
   * @function
   * @name shouldReturn400ForWrongEmailOrPassword
   */
  it('should return 400 response if email or password is wrong', async () => {
    const authenticateUserRequestDTO: IAuthenticateUserDTO = {
      email: 'test@example.com',
      password: 'password',
    }
    const httpRequest: IHttpRequest = {
      body: authenticateUserRequestDTO,
    }
    const httpError = new HttpErrors()
    authenticateUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: AuthenticateUserErrorType.EmailOrPasswordWrong,
      success: false,
    })

    const httpResponse = await authenticateUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_400().statusCode)
    expect(httpResponse.body).toEqual(
      AuthenticateUserErrorType.EmailOrPasswordWrong,
    )
  })

  /**
   * Test case to verify that it returns a 500 response if the body is missing.
   * @function
   * @name shouldReturn500ForMissingBody
   */
  it('should return 500 response if body is missing', async () => {
    const httpError = new HttpErrors()
    const httpResponse = await authenticateUserController.handle({})

    expect(httpResponse.statusCode).toBe(httpError.error_500().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_500().body)
  })
})
