import { Request, Response, Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerDocument from '../docs/swagger.json'

const documentsRoutes = Router()

documentsRoutes.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
)

documentsRoutes.get('/', (request: Request, response: Response) => {
  return response.sendFile(
    process.cwd() + '/src/presentation/express/docs/index.html',
  )
})

documentsRoutes.get('/swagger', (request: Request, response: Response) => {
  return response.sendFile(
    process.cwd() + '/src/presentation/express/docs/swagger.json',
  )
})

export { documentsRoutes }
