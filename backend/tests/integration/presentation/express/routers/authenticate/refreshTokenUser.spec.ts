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
  let refreshTokenId: string

  /**
   * Before each test, create a new user, authenticate, and obtain a refresh token.
   * @function
   * @name beforeEachCreateUserAndAuthenticate
   */
  beforeEach(async () => {
    await request(app).post('/users').send({
      password: '123456',
      email: 'AuthenticateUserRouter@test.com.br',
      name: 'Test Integration Exist User',
    })

    const response = await request(app).post('/authenticate/login').send({
      password: '123456',
      email: 'AuthenticateUserRouter@test.com.br',
    })

    refreshTokenId = response.body.refreshToken.id
  })

  /**
   * Test case to verify successful token refresh.
   * @function
   * @name shouldRefreshToken
   */
  it('should be able to refresh a new token', async () => {
    const response = await request(app)
      .post('/authenticate/refresh-token')
      .send({
        refreshTokenId,
      })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  /**
   * Test case to verify unsuccessful token refresh with wrong token.
   * @function
   * @name shouldNotRefreshTokenWithWrongToken
   */
  it('should not be able to refresh a new token with wrong token', async () => {
    const response = await request(app)
      .post('/authenticate/refresh-token')
      .send({
        refreshTokenId: 'token',
      })
    expect(response.status).toBe(400)
  })

  /**
   * Test case to verify 422 response if body parameters are invalid.
   * @function
   * @name shouldReturn422ForInvalidBodyParameters
   */
  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app)
      .post('/authenticate/refresh-token')
      .send({
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
    const response = await request(app).post('/authenticate/refresh-token')
    expect(response.status).toBe(500)
  })
})
