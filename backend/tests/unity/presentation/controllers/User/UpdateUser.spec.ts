/**
 * Unit tests for UpdateUserController using Vitest.
 * @module UpdateUserControllerTests
 */

import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { IUpdateUserUseCase } from '../../../../../src/app/useCases/User/UpdateUser'
import { UserErrorType } from '../../../../../src/domain/enums/user/ErrorType'
import { IController } from '../../../../../src/presentation/http/controllers/IController'
import { UpdateUserController } from '../../../../../src/presentation/http/controllers/User/implementations/UpdateUser'
import { IHttpRequest } from '../../../../../src/presentation/http/helpers/IHttpRequest'
import { HttpErrors } from '../../../../../src/presentation/http/helpers/implementations/HttpErrors'
import { HttpSuccess } from '../../../../../src/presentation/http/helpers/implementations/HttpSuccess'

/**
 * Test suite for UpdateUserController.
 * @function
 * @name UpdateUserControllerTests
 */
describe('UpdateUserController', () => {
  let updateUserUseCase: IUpdateUserUseCase
  let updateUserController: IController
  const existingUser = {
    id: '123',
    email: 'existing@example.com',
    name: 'Existing User',
    password: 'existingpassword',
  }

  /**
   * Setup before each test.
   * @function
   * @name beforeEach
   */
  beforeEach(() => {
    updateUserUseCase = {
      execute: vi.fn(),
    }
    updateUserController = new UpdateUserController(updateUserUseCase)
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
   * Test case to verify that it updates the name of the selected user.
   * @function
   * @name shouldUpdateNameOfSelectedUser
   */
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

  /**
   * Test case to verify that it updates the email of the selected user.
   * @function
   * @name shouldUpdateEmailOfSelectedUser
   */
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

  /**
   * Test case to verify that it updates the password of the selected user.
   * @function
   * @name shouldUpdatePasswordOfSelectedUser
   */
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

  /**
   * Test case to verify that it returns a 422 response if both body and path parameters are missing.
   * @function
   * @name shouldReturn422IfBodyAndPathParametersMissing
   */
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

  /**
   * Test case to verify that it returns a 400 response if the user is not found.
   * @function
   * @name shouldReturn400IfUserNotFound
   */
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
      data: UserErrorType.UserDoesNotExist,
      success: false,
    })

    const httpResponse = await updateUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_400().statusCode)
    expect(httpResponse.body).toEqual(UserErrorType.UserDoesNotExist)
  })

  /**
   * Test case to verify that it returns a 500 response if both body and path are missing.
   * @function
   * @name shouldReturn500IfBodyAndPathMissing
   */
  it('should return 500 response if body and path are missing', async () => {
    const httpError = new HttpErrors()
    const httpResponse = await updateUserController.handle({})

    expect(httpResponse.statusCode).toBe(httpError.error_500().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_500().body)
  })
})
