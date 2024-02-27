/**
 * Integration tests for GetUserRouters using Vitest and Supertest.
 * @module GetUserRoutersTests
 */

import request from 'supertest'
import { login } from 'tests/helpers/auth/login'
import { beforeEach, describe, expect, it } from 'vitest'

import { app } from '../../../../../../src/presentation/express/settings/app'
import { ICreateUserRequestDTO } from '../../../../../domain/dtos/User/CreateUser'

/**
 * Test suite for GetUserRouters.
 * @function
 * @name GetUserRoutersTests
 */
describe('GetUserRouters', () => {
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
      email: 'testGet@test.com.br',
      name: 'Test Integration Exist User',
    }

    const responseUser = await request(app).post('/users').send(userData)
    userId = responseUser.body.id
    authToken = await login(userData)
  })

  /**
   * Test case to verify the ability to get a list of users.
   * @function
   * @name shouldGetListOfUsers
   */
  it('Should be able to get a list of users', async () => {
    const response = await request(app)
      .get('/users/?page=1')
      .set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(200)
  })

  /**
   * Test case to verify that it's not possible to get a list of users after deleting a user.
   * @function
   * @name shouldNotGetListOfUsersAfterDelete
   */
  it('Should not be able to get a list of users after deletion', async () => {
    await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken.token}`)

    const response = await request(app)
      .get('/users/?page=1')
      .set('Authorization', `Bearer ${authToken.token}`)

    expect(response.status).toBe(404)
  })

  /**
   * Test case to verify that it returns a 422 response if body parameters are invalid.
   * @function
   * @name shouldReturn422ForInvalidParameters
   */
  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app)
      .get('/users?test=1')
      .set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(422)
  })

  /**
   * Test case to verify that it returns a 500 response if an internal server error occurs.
   * @function
   * @name shouldReturn500ForInternalServerError
   */
  it('should return 500 response if an internal server error occurs', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(500)
  })

  /**
   * Test case to verify that it's not possible to get an existing user when the user is not authenticated.
   * @function
   * @name shouldNotGetUserWithoutAuthentication
   */
  it('Should not be able to get an existing user when user is not authenticated', async () => {
    const response = await request(app).get('/users?test=1')

    expect(response.status).toBe(401)
  })
})
