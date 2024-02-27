import request from 'supertest'

import { ICreateUserRequestDTO } from '../../../src/domain/dtos/User/CreateUser'
import { app } from '../../../src/presentation/express/settings/app'

/**
 * Function to simulate user login using Supertest.
 * @param userData User data including email and password for login.
 * @returns The response body from the login request.
 */
export async function login(userData: ICreateUserRequestDTO) {
  const response = await request(app).post('/authenticate/login').send({
    password: userData.password,
    email: userData.email,
  })

  return response.body
}
