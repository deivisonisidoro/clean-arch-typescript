/**
 * Integration tests for DeleteUserRouter using Vitest and Supertest.
 * @module DeleteUserRouterTests
 */

import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { app } from '../../../../../../src/presentation/express/settings/app'
import { ICreateUserRequestDTO } from '../../../../../domain/dtos/User/CreateUser'
import { login } from '../../../../../helpers/auth/login'

/**
 * Test suite for DeleteUserRouter.
 * @function
 * @name DeleteUserRouterTests
 */
describe('DeleteUserRouter', () => {
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
      email: 'testDelete@test.com.br',
      name: 'Test Integration Exist User',
    }

    const responseUser = await request(app).post('/users').send(userData)
    userId = responseUser.body.id
    authToken = await login(userData)
  })

  /**
   * Test case to verify the ability to delete an existing user.
   * @function
   * @name shouldDeleteExistingUser
   */
  it('Should be able to delete an existing user', async () => {
    const response = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken.token}`)

    expect(response.status).toBe(200)
  })

  /**
   * Test case to verify that it's not possible to delete an existing user when userId is wrong.
   * @function
   * @name shouldNotDeleteUserWithWrongUserId
   */
  it('Should not be able to delete an existing user when userId is wrong', async () => {
    const response = await request(app)
      .delete('/users/testID')
      .set('Authorization', `Bearer ${authToken.token}`)

    expect(response.status).toBe(400)
  })

  /**
   * Test case to verify that it's not possible to delete an existing user when the user is not authenticated.
   * @function
   * @name shouldNotDeleteUserWithoutAuthentication
   */
  it('Should not be able to delete an existing user when user is not authenticated', async () => {
    const response = await request(app)
      .delete('/users/testID')
      .set('Authorization', `Bearer invalidToken`)

    expect(response.status).toBe(401)
  })
})
