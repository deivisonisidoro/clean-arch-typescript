import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../../../../../../src/main/express/settings/app'
import { ICreateUserRequestDTO } from '../../../../../../src/domain/dtos/User/CreateUser'
import { prisma } from '../../../../../helpers/prisma'

describe('Update User Controller', () => {
  const userData: ICreateUserRequestDTO = {
    password: '123456',
    email: 'testUpdate@test.com.br',
    name: 'Test Integration Exist User',
  }
  it('Should be able to update an existing user', async () => {
    const user = await prisma.user.create({ data: userData })

    const response = await request(app).patch(`/users/${user.id}`).send({
      password: '123456',
      email: 'testUpdated@test.com.br',
      name: 'Test Integration',
    })

    expect(response.status).toBe(200)
  })

  it('Should not be able to update an existing user', async () => {
    const response = await request(app).patch('/users/:id').send({
      password: '123456',
      email: 'testUpdatedExisting@test.com.br',
      name: 'Test Integration Exist User',
    })

    expect(response.status).toBe(400)
  })
})
