import { Router } from 'express'

import { authenticateUserComposer } from '../../../infra/services/composers/Authenticate/authenticateUser'
import { recoverUserInformationUserComposer } from '../../../infra/services/composers/Authenticate/recoverUserInformation'
import { refreshTokenUserComposer } from '../../../infra/services/composers/Authenticate/refreshTokenUser'
import { expressAdapter } from '../../adapters/express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

/**
 * Express Router for authentication-related routes.
 */
const authenticateRoutes = Router()

/**
 * Endpoint to handle user login.
 */
authenticateRoutes.post('/login', async (request, response) => {
  const adapter = await expressAdapter(request, authenticateUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

/**
 * Endpoint to handle refreshing user tokens.
 */
authenticateRoutes.post('/refresh-token', async (request, response) => {
  const adapter = await expressAdapter(request, refreshTokenUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
})

/**
 * Endpoint to retrieve user information, requires authentication.
 */
authenticateRoutes.get(
  '/user',
  ensureAuthenticated,
  async (request, response) => {
    const adapter = await expressAdapter(
      request,
      recoverUserInformationUserComposer(),
    )
    return response.status(adapter.statusCode).json(adapter.body)
  },
)

export { authenticateRoutes }
