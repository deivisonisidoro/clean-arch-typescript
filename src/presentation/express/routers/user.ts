import { Request, Response, Router } from 'express'
import { expressAdapter } from '../../adapters/express'
import { createUserComposer } from '../../composers/User/createUser'
import { deleteUserComposer } from '../../composers/User/deleteUser'
import { updateUserComposer } from '../../composers/User/updateUser'
import { getUserComposer } from '../../composers/User/getUser'

const userRoutes = Router()

userRoutes.post('/', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, createUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

userRoutes.get('/', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

userRoutes.patch('/:id', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, updateUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

userRoutes.delete('/:id', async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, deleteUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

export { userRoutes }
