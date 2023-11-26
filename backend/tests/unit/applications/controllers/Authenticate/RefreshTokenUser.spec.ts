import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { RefreshTokenUserController } from '../../../../../src/presentation/http/controllers/Authenticate/RefreshTokenUser';
import { IRefreshTokenUserUseCase } from '../../../../../src/app/useCases/Authenticate/RefreshTokenUser';
import { IController } from '../../../../../src/presentation/http/controllers/IController'
import { HttpErrors } from '../../../../../src/presentation/http/helpers/implementations/HttpErrors';
import { IHttpRequest } from '../../../../../src/presentation/http/helpers/IHttpRequest';
import { HttpSuccess } from '../../../../../src/presentation/http/helpers/implementations/HttpSuccess';

describe('RefreshTokenUserController', () => {
  let refreshTokenUserUseCase: IRefreshTokenUserUseCase;
  let refreshTokenUserController: IController;

  beforeEach(() => {
    refreshTokenUserUseCase = {
      execute: vi.fn(),
    }
    refreshTokenUserController = new RefreshTokenUserController(refreshTokenUserUseCase)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should return 500 response if body is missing', async () => {
    const httpError = new HttpErrors()
    const httpResponse = await refreshTokenUserController.handle({})

    expect(httpResponse.statusCode).toBe(httpError.error_500().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_500().body)
  })

  it('should return 400 response if email or password is wrong', async () => {
    const httpRequest: IHttpRequest = {
      body: {refreshTokenId: "token"},
    }
    const httpError = new HttpErrors()
    refreshTokenUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: "Refresh token is invalid.",
      success: false,
    })

    const httpResponse = await refreshTokenUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_400().statusCode)
    expect(httpResponse.body).toEqual("Refresh token is invalid.")
  })
  it('should return 422 response if body parameters are missing', async () => {

    const httpRequest: IHttpRequest = {
      body: {token: "token"},
    }
    const httpError = new HttpErrors()
    const httpResponse = await refreshTokenUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_422().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_422().body)
  })
  it('should return 200 response on successful', async () => {

    const httpRequest: IHttpRequest = {
      body: {refreshTokenId: "token"},
    }
    const httpSuccess = new HttpSuccess()
    refreshTokenUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: {
          token: "token",
          refreshToken: "refreshToken",
      },
      success: true,
    })

    const httpResponse = await refreshTokenUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_200().statusCode)
  })
});
