import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { ICreateUserRequestDTO } from '../../../../../domain/dtos/User/CreateUser'
import { app } from '../../../../../../src/presentation/express/settings/app'
import { HttpErrors } from '../../../../../../src/presentation/http/helpers/implementations/HttpErrors'
import { login } from '../../../../../helpers/auth/login'

describe('UpdateUserRouter', () => {
  const userData: ICreateUserRequestDTO = {
    password: '123456',
    email: 'testUpdate@test.com.br',
    name: 'Test Integration Exist User',
  }
  const httpError = new HttpErrors()
  let userId: string
  let authToken: any

  beforeEach(async ()=>{
    const responseUser = await request(app).post('/users').send(userData)
    userId = responseUser.body.id
    authToken = await login(userData)
  })
  it('Should be able to update password of an existing user', async () => {
    const response = await request(app).patch(`/users/${userId}`)
    .set('Authorization', `Bearer ${authToken.token}`)
    .send({
      password: '123',
    })

    expect(response.status).toBe(200)
    expect(response.body.password).not.toBe(userData.password)
  })

  it('Should be able to update email of an existing user', async () => {
    const response = await request(app).patch(`/users/${userId}`)
    .set('Authorization', `Bearer ${authToken.token}`)
    .send({
      email: 'testUpdated@test.com.br',
    })

    expect(response.status).toBe(200)
    expect(response.body.email).toBe('testUpdated@test.com.br')
  })

  it('Should be able to update name of an existing user', async () => {
    const response = await request(app).patch(`/users/${userId}`)
    .set('Authorization', `Bearer ${authToken.token}`)
    .send({
      name: 'Test Integration',
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Test Integration')
  })

  it('Should not be able to update an not existing user', async () => {
    const response = await request(app).patch('/users/:id')
    .set('Authorization', `Bearer ${authToken.token}`)
    .send({
      email: 'testUpdatedExisting@test.com.br',
    })

    expect(response.status).toBe(httpError.error_400().statusCode)
  })

  it('Should not be able to update an existing user with invalid email', async () => {
    const response = await request(app).patch(`/users/${userId}`)
    .set('Authorization', `Bearer ${authToken.token}`)
    .send({
      email: 'invalid email',
    })
    expect(response.status).toBe(httpError.error_400().statusCode)
  })

  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app)
      .patch('/users/:id')
      .set('Authorization', `Bearer ${authToken.token}`)
      .send({ test: 'Test' })

    expect(response.status).toBe(httpError.error_422().statusCode)
  })
  it('should return 500 response if an internal server error occurs', async () => {
    const response = await request(app).patch('/users/:id')
    .set('Authorization', `Bearer ${authToken.token}`)
    expect(response.status).toBe(httpError.error_500().statusCode)
  })
})
