/**
 * Unit tests for CreateUserController using Vitest.
 * @module CreateUserControllerTests
 */

import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'

import { ICreateUserUseCase } from '../../../../../src/app/useCases/User/CreateUser'
import { ICreateUserRequestDTO } from '../../../../../src/domain/dtos/User/CreateUser'
import { UserErrorType } from '../../../../../src/domain/enums/user/ErrorType'
import { IController } from '../../../../../src/presentation/http/controllers/IController'
import { CreateUserController } from '../../../../../src/presentation/http/controllers/User/implementations/CreateUser'
import { IHttpRequest } from '../../../../../src/presentation/http/helpers/IHttpRequest'
import { HttpErrors } from '../../../../../src/presentation/http/helpers/implementations/HttpErrors'
import { HttpSuccess } from '../../../../../src/presentation/http/helpers/implementations/HttpSuccess'

/**
 * Test suite for CreateUserController.
 * @function
 * @name CreateUserControllerTests
 */
describe('CreateUserController', () => {
  let createUserUseCase: ICreateUserUseCase
  let createUserController: IController

  /**
   * Setup before each test.
   * @function
   * @name beforeEach
   */
  beforeEach(() => {
    createUserUseCase = {
      execute: vi.fn(),
    }
    createUserController = new CreateUserController(createUserUseCase)
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
   * Test case to verify that it returns a 201 response on successful user creation.
   * @function
   * @name shouldReturn201OnSuccess
   */
  it('should return 201 response on successful user creation', async () => {
    const createUserRequestDTO: ICreateUserRequestDTO = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    }
    const httpRequest: IHttpRequest = {
      body: createUserRequestDTO,
    }
    const httpSuccess = new HttpSuccess()
    createUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: {
        id: '123',
        ...createUserRequestDTO,
      },
      success: true,
    })

    const httpResponse = await createUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpSuccess.success_201().statusCode)
    expect(httpResponse.body).toEqual({
      id: '123',
      ...createUserRequestDTO,
    })
  })

  /**
   * Test case to verify that it returns a 422 response if body parameters are missing.
   * @function
   * @name shouldReturn422ForMissingBodyParameters
   */
  it('should return 422 response if body parameters are missing', async () => {
    const createUserRequestDTO = {
      name: 'Test User',
      password: 'password',
    }
    const httpRequest: IHttpRequest = {
      body: createUserRequestDTO,
    }
    const httpError = new HttpErrors()
    const httpResponse = await createUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_422().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_422().body)
  })

  /**
   * Test case to verify that it returns a 400 response if user creation encounters duplicate user.
   * @function
   * @name shouldReturn400ForDuplicateUser
   */
  it('should return 400 response if user creation encounters duplicate user', async () => {
    const createUserRequestDTO: ICreateUserRequestDTO = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    }
    const httpRequest: IHttpRequest = {
      body: createUserRequestDTO,
    }
    const httpError = new HttpErrors()
    createUserUseCase.execute = vi.fn().mockResolvedValueOnce({
      data: UserErrorType.UserAlreadyExists,
      success: false,
    })

    const httpResponse = await createUserController.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(httpError.error_400().statusCode)
    expect(httpResponse.body).toEqual(UserErrorType.UserAlreadyExists)
  })

  /**
   * Test case to verify that it returns a 500 response if the body is missing.
   * @function
   * @name shouldReturn500ForMissingBody
   */
  it('should return 500 response if body is missing', async () => {
    const httpError = new HttpErrors()
    const httpResponse = await createUserController.handle({})

    expect(httpResponse.statusCode).toBe(httpError.error_500().statusCode)
    expect(httpResponse.body).toEqual(httpError.error_500().body)
  })
})
