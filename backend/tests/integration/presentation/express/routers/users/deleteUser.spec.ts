import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { ICreateUserRequestDTO } from '../../../../../domain/dtos/User/CreateUser'
import { app } from '../../../../../../src/presentation/express/settings/app'
import { login } from '../../../../../helpers/auth/login'


describe('DeleteUserRouter', () => {
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
  it('Should be able to delete an existing user', async () => {
    const response = await request(app).delete(`/users/${userId}`).set('Authorization', `Bearer ${authToken.token}`)

    expect(response.status).toBe(200)
  })

  it('Should not be able to delete an existing user when userId is wrong', async () => {
    const response = await request(app).delete('/users/testID').set('Authorization', `Bearer ${authToken.token}`)

    expect(response.status).toBe(400)
  })
  it('Should not be able to delete an existing user when user is not authenticated', async () => {
    const response = await request(app).delete('/users/testID').set('Authorization', `Bearer invalidToken`)

    expect(response.status).toBe(401)
  })
})
