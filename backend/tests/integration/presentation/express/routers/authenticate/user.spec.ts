import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { ICreateUserRequestDTO } from '../../../../../domain/dtos/User/CreateUser'
import { app } from '../../../../../../src/presentation/express/settings/app'
import { login } from '../../../../../helpers/auth/login'

describe('UserRouter', () => {
  const userData: ICreateUserRequestDTO = {
    password: '123456',
    email: 'testDelete@test.com.br',
    name: 'Test Integration Exist User',
  }
  let userId: string
  let authToken: any

  beforeEach(async ()=>{
    const responseUser = await request(app).post('/users').send(userData)
    userId = responseUser.body.id
    authToken = await login(userData)
  })

  it('Should be able to recover user information', async () => {
    const response = await request(app).get(`/authenticate/user?refreshTokenId=${authToken.refreshToken.id}`).set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(200)
  })

  it('Should return 400 response if refresh token id is invalid', async () => {
    const response = await request(app).get(`/authenticate/user?refreshTokenId=invalidTokenId`).set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(400)
  })

  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app).get(`/authenticate/user?invalidParameter=${authToken.refreshToken.id}`).set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(422)
  })

  it('should return 500 response if an internal server error occurs', async () => {
    const response = await request(app).get(`/authenticate/user`).set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(500)
  })
})
