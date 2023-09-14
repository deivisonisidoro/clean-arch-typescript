import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '../../../../../../src/main/express/settings/app'
import { ICreateUserRequestDTO } from '../../../../../../src/domain/dtos/User/CreateUser'
import { prisma } from '../../../../../helpers/prisma'

describe('DeleteUserRouter', () => {
  const userData: ICreateUserRequestDTO = {
    password: '123456',
    email: 'testDelete@test.com.br',
    name: 'Test Integration Exist User',
  }

  it('Should be able to delete an existing user', async () => {
    const user = await prisma.user.create({ data: userData })

    const response = await request(app).delete(`/users/${user.id}`)

    expect(response.status).toBe(200)
  })

  it('Should not be able to delete an existing user', async () => {
    await prisma.user.create({ data: userData })

    const response = await request(app).delete('/users/testID')

    expect(response.status).toBe(400)
  })
})