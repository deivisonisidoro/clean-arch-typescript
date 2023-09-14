import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IUpdateUserUseCase } from '../../../../src/domain/useCases/User/UpdateUser'
import { UpdateUserController } from '../../../../src/main/controllers/User/UpdateUser'
import { IController } from '../../../../src/domain/controller'
import { IHttpRequest } from '../../../../src/main/helpers/http/IHttpRequest'
import { HttpErrors } from '../../../../src/main/helpers/http/implementations/HttpErrors'
import { HttpSuccess } from '../../../../src/main/helpers/http/implementations/HttpSuccess'

describe('UpdateUserController', () => {
  let updateUserUseCase: IUpdateUserUseCase
  let updateUserController: IController
  const existingUser = {
    id: '123',
    email: 'existing@example.com',
    name: 'Existing User',
    password: 'existingpassword',
  }

  beforeEach(() => {
    updateUserUseCase = {
      execute: vi.fn(),
    }
    updateUserController = new UpdateUserController(updateUserUseCase)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should update the name of user selected', async () => {
    const updateUserRequestDTO = {
      name: 'New User',
    }
    const httpRequest: IHttpRequest = {
      path: { id: existingUser.id },
      body: updateUserRequestDTO,
    }
    const httpSuccess = new HttpSuccess()
    updateUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: updateUserRequestDTO,
      success: true,
    })

    const httpResponse = await updateUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_200().statusCode)
    expect(httpResponse.body).toEqual(updateUserRequestDTO)
  })
  it('should update the email of user selected', async () => {
    const updateUserRequestDTO = {
      email: 'newuser@example.com',
    }
    const httpRequest: IHttpRequest = {
      path: { id: existingUser.id },
      body: updateUserRequestDTO,
    }
    const httpSuccess = new HttpSuccess()
    updateUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: updateUserRequestDTO,
      success: true,
    })

    const httpResponse = await updateUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_200().statusCode)
    expect(httpResponse.body).toEqual(updateUserRequestDTO)
  })

  it('should update the password of user selected', async () => {
    const updateUserRequestDTO = {
      password: 'newpassword',
    }
    const httpRequest: IHttpRequest = {
      path: { id: existingUser.id },
      body: updateUserRequestDTO,
    }
    const httpSuccess = new HttpSuccess()
    updateUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: updateUserRequestDTO,
      success: true,
    })

    const httpResponse = await updateUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_200().statusCode)
    expect(httpResponse.body).toEqual(updateUserRequestDTO)
  })

  it('should return 422 response if body, and path parameters are missing', async () => {
    const httpRequest: IHttpRequest = {
      path: { test: 'Testing' },
      body: { test: 'Testing' },
    }
    const httpError = new HttpErrors()
    const httpResponse = await updateUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_422().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_422().body)
  })

  it('should return 400 response if users not was found', async () => {
    const updateUserRequestDTO = {
      email: 'newuser@example.com',
      name: 'New User',
      password: 'newpassword',
    }
    const httpRequest: IHttpRequest = {
      path: { id: existingUser.id },
      body: updateUserRequestDTO,
    }
    const httpError = new HttpErrors()
    updateUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: 'User does not exits!',
      success: false,
    })

    const httpResponse = await updateUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_400().statusCode)
    expect(httpResponse.body).toEqual('User does not exits!')
  })
  it('should return 500 response if body and path are missing', async () => {
    const httpError = new HttpErrors()
    const httpResponse = await updateUserController.handle({})

    expect(httpResponse.statusCode).toBe(httpError.error_500().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_500().body)
  })
})
