import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../../../../../src/presentation/express/settings/app'

describe('DocumentsRoutes', () => {
  it('should return the index.html file', async () => {
    const response = await request(app).get('/')

    expect(response.status).toEqual(200)
    expect(response.header['content-type']).to.contain('text/html')
  })

  it('should return the swagger.json file', async () => {
    const response = await request(app).get('/swagger')

    expect(response.status).to.equal(200)
    expect(response.header['content-type']).to.contain('application/json')
  })

  it('should return the swagger UI', async () => {
    const response = await request(app).get('/api-docs')

    expect(response.status).to.equal(301)
    expect(response.header['content-type']).to.contain('text/html')
  })
})
