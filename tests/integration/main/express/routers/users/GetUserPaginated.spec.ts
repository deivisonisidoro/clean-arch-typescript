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
    const response = await request(app).get('/users/1')

    expect(response.status).toBe(200)
  })

  it('Should not be able to get a list of users ', async () => {
    const response = await request(app).get('/users/1')
    expect(response.status).toBe(404)
  })
})
