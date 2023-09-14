import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IDeleteUserUseCase } from '../../../../src/domain/useCases/User/DeleteUser'
import { DeleteUserController } from '../../../../src/controllers/User/DeleteUser'
import { IController } from '../../../../src/domain/controller'
import { IHttpRequest } from '../../../../src/helpers/http/IHttpRequest'
import { HttpErrors } from '../../../../src/helpers/http/implementations/HttpErrors'
import { HttpSuccess } from '../../../../src/helpers/http/implementations/HttpSuccess'

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
      data: 'User deleted with success!',
      success: true,
    })

    const httpResponse = await getUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_200().statusCode)
    expect(httpResponse.body).toEqual('User deleted with success!')
  })
  it('should return 400 response if users not was found', async () => {
    const id = '123'
    const httpRequest: IHttpRequest = {
      path: { id },
    }
    const httpError = new HttpErrors()
    deleteUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: 'Users not found',
      success: false,
    })

    const httpResponse = await getUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_400().statusCode)
    expect(httpResponse.body).toEqual('Users not found')
  })
})
