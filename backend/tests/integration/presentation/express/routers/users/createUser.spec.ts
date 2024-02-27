/**
 * Integration tests for CreateUserRouter using Vitest and Supertest.
 * @module CreateUserRouterTests
 */

import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../../../../../../src/presentation/express/settings/app'

/**
 * Test suite for CreateUserRouter.
 * @function
 * @name CreateUserRouterTests
 */
describe('CreateUserRouter', () => {
  /**
   * Test case to verify the ability to create a new user.
   * @function
   * @name shouldCreateNewUser
   */
  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      password: '123456',
      email: 'testIntegration@test.com.br',
      name: 'Test Integration',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  /**
   * Test case to verify that it's not possible to create an existing user.
   * @function
   * @name shouldNotCreateExistingUser
   */
  it('should not be able to create an existing user', async () => {
    await request(app).post('/users').send({
      password: '123456',
      email: 'testIntegrationExisting@test.com.br',
      name: 'Test Integration Exist User',
    })

    const response = await request(app).post('/users').send({
      password: '123456',
      email: 'testIntegrationExisting@test.com.br',
      name: 'Test Integration Exist User',
    })

    expect(response.status).toBe(400)
  })

  /**
   * Test case to verify that it's not possible to create a user with an invalid email.
   * @function
   * @name shouldNotCreateUserWithInvalidEmail
   */
  it('should not be able to create an user with an invalid email', async () => {
    const response = await request(app).post('/users').send({
      password: '123456',
      email: 'Invalid email',
      name: 'Test Integration Exist User',
    })

    expect(response.status).toBe(400)
  })

  /**
   * Test case to verify 422 response if body parameters are invalid.
   * @function
   * @name shouldReturn422ForInvalidBodyParameters
   */
  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app).post('/users').send({
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
    const response = await request(app).post('/users')

    expect(response.status).toBe(500)
  })
})
