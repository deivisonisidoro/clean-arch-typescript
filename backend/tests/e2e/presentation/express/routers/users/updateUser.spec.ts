/**
 * Integration tests for UpdateUserRouter using Vitest and Supertest.
 * @module UpdateUserRouterTests
 */

import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { app } from '../../../../../../src/presentation/express/settings/app'
import { HttpErrors } from '../../../../../../src/presentation/http/helpers/implementations/HttpErrors'
import { ICreateUserRequestDTO } from '../../../../../domain/dtos/User/CreateUser'
import { login } from '../../../../../helpers/auth/login'

const httpError = new HttpErrors()

/**
 * Test suite for UpdateUserRouter.
 * @function
 * @name UpdateUserRouterTests
 */
describe('UpdateUserRouter', () => {
  let userData: ICreateUserRequestDTO
  let userId: string
  let authToken: any

  /**
   * Setup before each test.
   * @function
   * @name beforeEach
   */
  beforeEach(async () => {
    userData = {
      password: '123456',
      email: 'testUpdate@test.com.br',
      name: 'Test Integration Exist User',
    }

    const responseUser = await request(app).post('/users').send(userData)
    userId = responseUser.body.id
    authToken = await login(userData)
  })

  /**
   * Test case to verify the ability to update the password of an existing user.
   * @function
   * @name shouldUpdatePassword
   */
  it('Should be able to update password of an existing user', async () => {
    const response = await request(app)
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken.token}`)
      .send({
        password: '123',
      })

    expect(response.status).toBe(200)
    expect(response.body.password).not.toBe(userData.password)
  })

  /**
   * Test case to verify the ability to update the email of an existing user.
   * @function
   * @name shouldUpdateEmail
   */
  it('Should be able to update email of an existing user', async () => {
    const response = await request(app)
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken.token}`)
      .send({
        email: 'testUpdated@test.com.br',
      })

    expect(response.status).toBe(200)
    expect(response.body.email).toBe('testUpdated@test.com.br')
  })

  /**
   * Test case to verify the ability to update the name of an existing user.
   * @function
   * @name shouldUpdateName
   */
  it('Should be able to update name of an existing user', async () => {
    const response = await request(app)
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken.token}`)
      .send({
        name: 'Test Integration',
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Test Integration')
  })

  /**
   * Test case to verify that it's not possible to update a non-existing user.
   * @function
   * @name shouldNotUpdateNonExistingUser
   */
  it('Should not be able to update an not existing user', async () => {
    const response = await request(app)
      .patch('/users/:id')
      .set('Authorization', `Bearer ${authToken.token}`)
      .send({
        email: 'testUpdatedExisting@test.com.br',
      })

    expect(response.status).toBe(httpError.error_400().statusCode)
  })

  /**
   * Test case to verify that it's not possible to update an existing user with an invalid email.
   * @function
   * @name shouldNotUpdateExistingUserWithInvalidEmail
   */
  it('Should not be able to update an existing user with invalid email', async () => {
    const response = await request(app)
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken.token}`)
      .send({
        email: 'invalid email',
      })

    expect(response.status).toBe(httpError.error_400().statusCode)
  })

  /**
   * Test case to verify that it returns a 422 response if body parameters are invalid.
   * @function
   * @name shouldReturn422ForInvalidParameters
   */
  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app)
      .patch('/users/:id')
      .set('Authorization', `Bearer ${authToken.token}`)
      .send({ test: 'Test' })

    expect(response.status).toBe(httpError.error_422().statusCode)
  })

  /**
   * Test case to verify that it returns a 500 response if an internal server error occurs.
   * @function
   * @name shouldReturn500ForInternalServerError
   */
  it('should return 500 response if an internal server error occurs', async () => {
    const response = await request(app)
      .patch('/users/:id')
      .set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(httpError.error_500().statusCode)
  })
})
