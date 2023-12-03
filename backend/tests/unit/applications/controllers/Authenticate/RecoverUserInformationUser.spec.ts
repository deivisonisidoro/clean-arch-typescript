import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { RecoverUserInformationUserController } from '../../../../../src/presentation/http/controllers/Authenticate/RecoverUserInformation';
import { IRecoverUserInformationUseCase } from '../../../../../src/app/useCases/Authenticate/RecoverUserInformation';
import { IController } from '../../../../../src/presentation/http/controllers/IController'
import { HttpErrors } from '../../../../../src/presentation/http/helpers/implementations/HttpErrors';
import { IHttpRequest } from '../../../../../src/presentation/http/helpers/IHttpRequest';
import { HttpSuccess } from '../../../../../src/presentation/http/helpers/implementations/HttpSuccess';
import { AuthMessages } from '../../../../../src/domain/enums/Authenticate/AuthMessages';

describe('RecoverUserInformationUserController', () => {
  let recoverUserInformationUseCase: IRecoverUserInformationUseCase;
  let recoverUserInformationController: IController;
  const mockUserRequestDTO= {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password',
  }
  beforeEach(() => {
    recoverUserInformationUseCase = {
      execute: vi.fn(),
    }
    recoverUserInformationController = new RecoverUserInformationUserController(recoverUserInformationUseCase)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should return 500 response if body is missing', async () => {
    const httpError = new HttpErrors()
    const httpResponse = await recoverUserInformationController.handle({})

    expect(httpResponse.statusCode).toBe(httpError.error_500().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_500().body)
  })

  it('should return 400 response if token is invalid or expired', async () => {
    const httpRequest: IHttpRequest = {
      query: {refreshTokenId: "token"},
    }
    const httpError = new HttpErrors()
    recoverUserInformationUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: AuthMessages.TokenInvalidOrExpired,
      success: false,
    })

    const httpResponse = await recoverUserInformationController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_400().statusCode)
    expect(httpResponse.body).toEqual(AuthMessages.TokenInvalidOrExpired)
  })
  it('should return 422 response if body parameters are missing', async () => {

    const httpRequest: IHttpRequest = {
      query: {token: "token"},
    }
    const httpError = new HttpErrors()
    const httpResponse = await recoverUserInformationController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_422().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_422().body)
  })
  it('should return 200 response on successful', async () => {

    const httpRequest: IHttpRequest = {
      query: {refreshTokenId: "token"},
    }
    const httpSuccess = new HttpSuccess()
    recoverUserInformationUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: {
        mockUserRequestDTO
      },
      success: true,
    })

    const httpResponse = await recoverUserInformationController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_200().statusCode)
    expect(httpResponse.body).toEqual({mockUserRequestDTO})

  })
});
