import { Request, Response, Router } from 'express'

const documentsRoutes = Router()

documentsRoutes.get('/swagger', (request: Request, response: Response) => {
  return response.sendFile(
    process.cwd() + '/src/main/express/docs/swagger.json',
  )
})

documentsRoutes.get('/', (request: Request, response: Response) => {
  return response.sendFile(process.cwd() + '/src/main/express/docs/index.html')
})

export { documentsRoutes }
