import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { app } from '../../../../../../src/presentation/express/settings/app'

describe('AuthenticateUserRouter', () => {
  beforeEach( async ()=>{
    await request(app).post('/users').send({
      password: '123456',
      email: 'testIntegrationExisting@test.com.br',
      name: 'Test Integration Exist User',
    })
  })
  it('should be able to authenticate a new user', async () => {
    const response = await request(app).post('/authenticate/login').send({
      password: '123456',
      email: 'testIntegrationExisting@test.com.br',
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should be able to authenticate a new user that already did authenticated', async () => {
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

  it('should not be able to authenticate an user with wrong password', async () => {

    const response = await request(app).post('/authenticate/login').send({
      password: 'wrong password',
      email: 'testIntegrationExisting@test.com.br',
    })

    expect(response.status).toBe(400)
  })

  it('should not be able to authenticate an user with wrong email', async () => {

    const response = await request(app).post('/authenticate/login').send({
      password: '123456',
      email: 'wrongemail@test.com.br',
    })

    expect(response.status).toBe(400)
  })

  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app).post('/authenticate/login').send({
      invalidKey: 'invalidValue',
    })

    expect(response.status).toBe(422)
  })
  it('should return 500 response if an internal server error occurs', async () => {
    const response = await request(app).post('/authenticate/login')

    expect(response.status).toBe(500)
  })
})
