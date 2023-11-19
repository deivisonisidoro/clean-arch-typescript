import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IDeleteUserUseCase } from '../../../../../src/app/useCases/User/DeleteUser'
import { IController } from '../../../../../src/presentation/http/controllers/IController'
import { DeleteUserController } from '../../../../../src/presentation/http/controllers/User/implementations/DeleteUser'
import { IHttpRequest } from '../../../../../src/presentation/http/helpers/IHttpRequest'
import { HttpErrors } from '../../../../../src/presentation/http/helpers/implementations/HttpErrors'
import { HttpSuccess } from '../../../../../src/presentation/http/helpers/implementations/HttpSuccess'
import { UserErrorType } from '../../../../../src/domain/enums/user/ErrorType'
import { UserSuccessType } from '../../../../../src/domain/enums/user/SuccessType'

describe('DeleteUserController', () => {
  let deleteUserUseCase: IDeleteUserUseCase
  let getUserController: IController

  beforeEach(() => {
    deleteUserUseCase = {
      execute: vi.fn(),
    }
    getUserController = new DeleteUserController(deleteUserUseCase)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should return 200 response, and success message', async () => {
    const id = '123'

    const httpRequest: IHttpRequest = {
      path: { id },
    }
    const httpSuccess = new HttpSuccess()
    deleteUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: UserSuccessType.UserDeleted,
      success: true,
    })

    const httpResponse = await getUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_200().statusCode)
    expect(httpResponse.body).toEqual(UserSuccessType.UserDeleted)
  })
  it('should return 400 response if users not was found', async () => {
    const id = '123'
    const httpRequest: IHttpRequest = {
      path: { id },
    }
    const httpError = new HttpErrors()
    deleteUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: UserErrorType.UserDoesNotExist,
      success: false,
    })

    const httpResponse = await getUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_400().statusCode)
    expect(httpResponse.body).toEqual(UserErrorType.UserDoesNotExist)
  })
})
