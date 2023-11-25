import { Request, Response, Router } from 'express'

import { createUserComposer } from '../../../infra/services/composers/User/createUser'
import { deleteUserComposer } from '../../../infra/services/composers/User/deleteUser'
import { getUserComposer } from '../../../infra/services/composers/User/getUser'
import { updateUserComposer } from '../../../infra/services/composers/User/updateUser'
import { expressAdapter } from '../../adapters/express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const userRoutes = Router()

userRoutes.post('/', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, createUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

userRoutes.get('/', ensureAuthenticated, async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

userRoutes.patch('/:id', ensureAuthenticated, async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, updateUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

userRoutes.delete('/:id', ensureAuthenticated, async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, deleteUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

export { userRoutes }
