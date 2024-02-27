/**
 * Integration tests for AuthenticateUserRouter using Vitest and Supertest.
 * @module AuthenticateUserRouterTests
 */

import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { app } from '../../../../../../src/presentation/express/settings/app'

/**
 * Test suite for AuthenticateUserRouter.
 * @function
 * @name AuthenticateUserRouterTests
 */
describe('AuthenticateUserRouter', () => {
  /**
   * Before each test, create a new user for authentication.
   * @function
   * @name beforeEachCreateUser
   */
  beforeEach(async () => {
    await request(app).post('/users').send({
      password: '123456',
      email: 'testIntegrationExisting@test.com.br',
      name: 'Test Integration Exist User',
    })
  })

  /**
   * Test case to verify successful authentication for a new user.
   * @function
   * @name shouldAuthenticateNewUser
   */
  it('should be able to authenticate a new user', async () => {
    const response = await request(app).post('/authenticate/login').send({
      password: '123456',
      email: 'testIntegrationExisting@test.com.br',
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  /**
   * Test case to verify successful re-authentication for an already authenticated user.
   * @function
   * @name shouldReAuthenticateUser
   */
  it('should be able to re-authenticate a user that already did authenticated', async () => {
    await request(app).post('/authenticate/login').send({
      password: '123456',
      email: 'testIntegrationExisting@test.com.br',
    })
    const response = await request(app).post('/authenticate/login').send({
      password: '123456',
      email: 'testIntegrationExisting@test.com.br',
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  /**
   * Test case to verify unsuccessful authentication with wrong password.
   * @function
   * @name shouldNotAuthenticateWithWrongPassword
   */
  it('should not be able to authenticate an user with wrong password', async () => {
    const response = await request(app).post('/authenticate/login').send({
      password: 'wrong password',
      email: 'testIntegrationExisting@test.com.br',
    })
    expect(response.status).toBe(400)
  })

  /**
   * Test case to verify unsuccessful authentication with wrong email.
   * @function
   * @name shouldNotAuthenticateWithWrongEmail
   */
  it('should not be able to authenticate an user with wrong email', async () => {
    const response = await request(app).post('/authenticate/login').send({
      password: '123456',
      email: 'wrongemail@test.com.br',
    })
    expect(response.status).toBe(400)
  })

  /**
   * Test case to verify 422 response if body parameters are invalid.
   * @function
   * @name shouldReturn422ForInvalidBodyParameters
   */
  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app).post('/authenticate/login').send({
      invalidKey: 'invalidValue',
    })
    expect(response.status).toBe(422)
  })

  /**
   * Test case to verify 500 response if an internal server error occurs.
   * @function
   * @name shouldReturn500ForInternalServerError
   */
  it('should return 500 response if an internal server error occurs', async () => {
    const response = await request(app).post('/authenticate/login')
    expect(response.status).toBe(500)
  })
})
