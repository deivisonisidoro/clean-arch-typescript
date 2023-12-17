import { Request, Response, Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerDocument from '../docs/swagger.json'

/**
 * Router for handling API documentation routes.
 */
const documentsRoutes = Router()

/**
 * Middleware to serve Swagger UI for API documentation.
 */
documentsRoutes.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
)

/**
 * Endpoint to serve the HTML documentation page.
 */
documentsRoutes.get('/', (request: Request, response: Response) => {
  return response.sendFile(
    process.cwd() + '/src/presentation/express/docs/index.html',
  )
})

/**
 * Endpoint to serve the Swagger JSON file.
 */
documentsRoutes.get('/swagger', (request: Request, response: Response) => {
  return response.sendFile(
    process.cwd() + '/src/presentation/express/docs/swagger.json',
  )
})

export { documentsRoutes }
