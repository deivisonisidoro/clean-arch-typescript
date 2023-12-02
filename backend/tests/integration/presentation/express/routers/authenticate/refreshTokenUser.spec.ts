import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { app } from '../../../../../../src/presentation/express/settings/app'

describe('AuthenticateUserRouter', () => {
  let refreshTokenId: string
  beforeEach( async ()=>{
    await request(app).post('/users').send({
      password: '123456',
      email: 'AuthenticateUserRouter@test.com.br',
      name: 'Test Integration Exist User',
    })
    const response = await request(app).post('/authenticate/login').send({
      password: '123456',
      email: 'AuthenticateUserRouter@test.com.br',
    })

    refreshTokenId  = response.body.refreshToken.id
  })

  it('should be able to refresh a new token', async () => {
    const response = await request(app).post('/authenticate/refresh-token').send({
      refreshTokenId,
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should be able to refresh a new token', async () => {
    const response = await request(app).post('/authenticate/refresh-token').send({
      refreshTokenId,
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should not be able to  refresh a new token with wrong token', async () => {

    const response = await request(app).post('/authenticate/refresh-token').send({
      refreshTokenId: "token",
    })

    expect(response.status).toBe(400)
  })


  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app).post('/authenticate/refresh-token').send({
      invalidKey: 'invalidValue',
    })

    expect(response.status).toBe(422)
  })
  it('should return 500 response if an internal server error occurs', async () => {
    const response = await request(app).post('/authenticate/refresh-token')

    expect(response.status).toBe(500)
  })
})
