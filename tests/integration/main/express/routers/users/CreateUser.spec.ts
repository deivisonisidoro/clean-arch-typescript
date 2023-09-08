import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../../../../../../src/main/express/settings/app'

describe('CreateUserRouter', () => {
  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      password: '123456',
      email: 'testIntegration@test.com.br',
      name: 'Test Integration',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should not be able to create an existing user', async () => {
    await request(app).post('/users').send({
      password: '123456',
      email: 'testIntegrationExisting@test.com.br',
      name: 'Test Integration Exist User',
    })

    const response = await request(app).post('/users').send({
      password: '123456',
      email: 'testIntegrationExisting@test.com.br',
      name: 'Test Integration Exist User',
    })

    expect(response.status).toBe(400)
  })
})
