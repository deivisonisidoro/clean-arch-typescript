/**
 * Integration tests for UserRouter using Vitest and Supertest.
 * @module UserRouterTests
 */

import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { app } from '../../../../../../src/presentation/express/settings/app'
import { ICreateUserRequestDTO } from '../../../../../domain/dtos/User/CreateUser'
import { login } from '../../../../../helpers/auth/login'

/**
 * Test suite for UserRouter.
 * @function
 * @name UserRouterTests
 */
describe('UserRouter', () => {
  const userData: ICreateUserRequestDTO = {
    password: '123456',
    email: 'testDelete@test.com.br',
    name: 'Test Integration Exist User',
  }
  let authToken: any

  /**
   * Before each test, create a new user, obtain user ID, and login to get the authentication token.
   * @function
   * @name beforeEachCreateUserAndLogin
   */
  beforeEach(async () => {
    await request(app).post('/users').send(userData)
    authToken = await login(userData)
  })

  /**
   * Test case to verify successful recovery of user information.
   * @function
   * @name shouldRecoverUserInformation
   */
  it('Should be able to recover user information', async () => {
    const response = await request(app)
      .get(`/authenticate/user?refreshTokenId=${authToken.refreshToken.id}`)
      .set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(200)
  })

  /**
   * Test case to verify 400 response if refresh token id is invalid.
   * @function
   * @name shouldReturn400ForInvalidRefreshTokenId
   */
  it('Should return 400 response if refresh token id is invalid', async () => {
    const response = await request(app)
      .get(`/authenticate/user?refreshTokenId=invalidTokenId`)
      .set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(400)
  })

  /**
   * Test case to verify 422 response if body parameters are invalid.
   * @function
   * @name shouldReturn422ForInvalidBodyParameters
   */
  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app)
      .get(`/authenticate/user?invalidParameter=${authToken.refreshToken.id}`)
      .set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(422)
  })

  /**
   * Test case to verify 500 response if an internal server error occurs.
   * @function
   * @name shouldReturn500ForInternalServerError
   */
  it('should return 500 response if an internal server error occurs', async () => {
    const response = await request(app)
      .get(`/authenticate/user`)
      .set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(500)
  })
})
