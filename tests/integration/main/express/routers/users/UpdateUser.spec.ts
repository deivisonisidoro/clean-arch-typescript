import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../../../../../../src/main/express/settings/app'
import { ICreateUserRequestDTO } from '../../../../../../src/domain/dtos/User/CreateUser'
import { prisma } from '../../../../../helpers/prisma'
import { HttpErrors } from '../../../../../../src/infra/http/helpers/implementations/HttpErrors'

describe('Update User Controller', () => {
  const userData: ICreateUserRequestDTO = {
    password: '123456',
    email: 'testUpdate@test.com.br',
    name: 'Test Integration Exist User',
  }
  const httpError = new HttpErrors()
  it('Should be able to update password of an existing user', async () => {
    const user = await prisma.user.create({ data: userData })

    const response = await request(app).patch(`/users/${user.id}`).send({
      password: '123',
    })

    expect(response.status).toBe(200)
    expect(response.body.password).not.toBe(userData.password)
  })

  it('Should be able to update email of an existing user', async () => {
    const user = await prisma.user.create({ data: userData })

    const response = await request(app).patch(`/users/${user.id}`).send({
      email: 'testUpdated@test.com.br',
    })

    expect(response.status).toBe(200)
    expect(response.body.email).toBe('testUpdated@test.com.br')
  })

  it('Should be able to update name of an existing user', async () => {
    const user = await prisma.user.create({ data: userData })

    const response = await request(app).patch(`/users/${user.id}`).send({
      name: 'Test Integration',
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Test Integration')
  })

  it('Should not be able to update an not existing user', async () => {
    const response = await request(app).patch('/users/:id').send({
      email: 'testUpdatedExisting@test.com.br',
    })

    expect(response.status).toBe(httpError.error_400().statusCode)
  })

  it('Should not be able to update an existing user with invalid email', async () => {
    const user = await prisma.user.create({ data: userData })

    const response = await request(app).patch(`/users/${user.id}`).send({
      email: 'invalid email',
    })
    expect(response.status).toBe(httpError.error_400().statusCode)
  })

  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app)
      .patch('/users/:id')
      .send({ test: 'Test' })

    expect(response.status).toBe(httpError.error_422().statusCode)
  })
  it('should return 500 response if an internal server error occurs', async () => {
    const response = await request(app).patch('/users/:id')

    expect(response.status).toBe(httpError.error_500().statusCode)
  })
})
