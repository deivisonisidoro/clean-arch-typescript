import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { ICreateUserRequestDTO } from '../../../../../../src/domain/dtos/User/CreateUser'
import { app } from '../../../../../../src/main/express/settings/app'
import { prisma } from '../../../../../helpers/prisma'

describe('GetUserRouters', () => {
  const userData: ICreateUserRequestDTO = {
    password: '123456',
    email: 'testGet@test.com.br',
    name: 'Test Integration Exist User',
  }
  it('Should be able to get a list of users ', async () => {
    await prisma.user.create({ data: userData })
    const response = await request(app).get('/users/?page=1')

    expect(response.status).toBe(200)
  })

  it('Should not be able to get a list of users ', async () => {
    const response = await request(app).get('/users/?page=1')
    expect(response.status).toBe(404)
  })

  it('should return 422 response if body parameters are invalid', async () => {
    const response = await request(app).get('/users?test=1')
    expect(response.status).toBe(422)
  })

  it('should return 500 response if an internal server error occurs', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(500);
  });

  it('Should not be able to get a list of users ', async () => {
    const response = await request(app).get('/users/?page=1')
    expect(response.status).toBe(404)
  })
})
