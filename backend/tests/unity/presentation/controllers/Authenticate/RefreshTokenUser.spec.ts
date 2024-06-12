/**
 * Unit tests for RefreshTokenUserController using Vitest.
 * @module RefreshTokenUserControllerTests
 */

import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IRefreshTokenUserUseCase } from '../../../../../src/app/useCases/Authenticate/RefreshTokenUser'
import { RefreshTokenUserController } from '../../../../../src/presentation/http/controllers/Authenticate/RefreshTokenUser'
import { IController } from '../../../../../src/presentation/http/controllers/IController'
import { IHttpRequest } from '../../../../../src/presentation/http/helpers/IHttpRequest'
import { HttpErrors } from '../../../../../src/presentation/http/helpers/implementations/HttpErrors'
import { HttpSuccess } from '../../../../../src/presentation/http/helpers/implementations/HttpSuccess'

/**
 * Test suite for RefreshTokenUserController.
 * @function
 * @name RefreshTokenUserControllerTests
 */
describe('RefreshTokenUserController', () => {
  let refreshTokenUserUseCase: IRefreshTokenUserUseCase
  let refreshTokenUserController: IController

  /**
   * Setup before each test.
   * @function
   * @name beforeEach
   */
  beforeEach(() => {
    refreshTokenUserUseCase = {
      execute: vi.fn(),
    }
    refreshTokenUserController = new RefreshTokenUserController(
      refreshTokenUserUseCase,
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
   * Test case to verify that it returns a 500 response if the body is missing.
   * @function
   * @name shouldReturn500ForMissingBody
   */
  it('should return 500 response if body is missing', async () => {
    const httpError = new HttpErrors()
    const httpResponse = await refreshTokenUserController.handle({})

    expect(httpResponse.statusCode).toBe(httpError.error_500().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_500().body)
  })

  /**
   * Test case to verify that it returns a 400 response if the refresh token is invalid.
   * @function
   * @name shouldReturn400ForInvalidRefreshToken
   */
  it('should return 400 response if refresh token is invalid', async () => {
    const httpRequest: IHttpRequest = {
      body: { refreshTokenId: 'token' },
    }
    const httpError = new HttpErrors()
    refreshTokenUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: 'Refresh token is invalid.',
      success: false,
    })

    const httpResponse = await refreshTokenUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_400().statusCode)
    expect(httpResponse.body).toEqual('Refresh token is invalid.')
  })

  /**
   * Test case to verify that it returns a 422 response if body parameters are missing.
   * @function
   * @name shouldReturn422ForMissingBodyParameters
   */
  it('should return 422 response if body parameters are missing', async () => {
    const httpRequest: IHttpRequest = {
      body: { token: 'token' },
    }
    const httpError = new HttpErrors()
    const httpResponse = await refreshTokenUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_422().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_422().body)
  })

  /**
   * Test case to verify that it returns a 200 response on success.
   * @function
   * @name shouldReturn200OnSuccess
   */
  it('should return 200 response on successful', async () => {
    const httpRequest: IHttpRequest = {
      body: { refreshTokenId: 'token' },
    }
    const httpSuccess = new HttpSuccess()
    refreshTokenUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: {
        token: 'token',
        refreshToken: 'refreshToken',
      },
      success: true,
    })

    const httpResponse = await refreshTokenUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_200().statusCode)
  })
})
