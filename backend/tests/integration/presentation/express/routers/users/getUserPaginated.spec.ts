import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { ICreateUserRequestDTO } from '../../../../../domain/dtos/User/CreateUser'
import { app } from '../../../../../../src/presentation/express/settings/app'
import { prisma } from '../../../../../helpers/db/prisma'
import { login } from 'tests/helpers/auth/login'

describe('GetUserRouters', () => {
  const userData: ICreateUserRequestDTO = {
    password: '123456',
    email: 'testGet@test.com.br',
    name: 'Test Integration Exist User',
  }
  let userId: string
  let authToken: string
  beforeEach(async ()=>{
    const responseUser = await request(app).post('/users').send(userData)
    userId = responseUser.body.id
    authToken = await login(userData)
  })

  it('Should be able to get a list of users ', async () => {
    const response = await request(app).get('/users/?page=1').set('Authorization', `Bearer ${authToken}`)
    expect(response.status).toBe(200)
  })

  it('Should not be able to get a list of users ', async () => {
    await request(app).delete(`/users/${userId}`)
    .set('Authorization', `Bearer ${authToken}`)

    const response = await request(app).get('/users/?page=1')
    .set('Authorization', `Bearer ${authToken}`)

    expect(response.status).toBe(404)
  })

  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app).get('/users?test=1').set('Authorization', `Bearer ${authToken}`)
    expect(response.status).toBe(422)
  })

  it('should return 500 response if an internal server error occurs', async () => {
    const response = await request(app).get('/users').set('Authorization', `Bearer ${authToken}`)
    expect(response.status).toBe(500)
  })
  it('Should not be able to get an existing user when user is not authenticated', async () => {
    const response = await request(app).get('/users?test=1')

    expect(response.status).toBe(401)
  })
})
