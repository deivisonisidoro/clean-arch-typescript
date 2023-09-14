import { Request, Response, Router } from 'express'
import { expressAdapter } from '../../adapter/express'
import { createUserComposer } from '../../composer/User/createUser'
import { deleteUserComposer } from '../../composer/User/deleteUser'
import { updateUserComposer } from '../../composer/User/updateUser'
import { getUserComposer } from '../../composer/User/getUser'

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
