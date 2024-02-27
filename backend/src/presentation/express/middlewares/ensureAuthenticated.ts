import { NextFunction, Request, RequestHandler, Response } from 'express'

import { AuthMessages } from '../../../domain/enums/Authenticate/AuthMessages'
import { TokenManagerProvider } from '../../../infra/providers/TokenManager'

/**
 * Middleware to ensure that the incoming request is authenticated.
 * Checks for the presence of an authorization token and its validity.
 *
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Response | void} Returns a response with an error message or proceeds to the next middleware.
 */
export const ensureAuthenticated: RequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      message: AuthMessages.AuthorizationHeaderMissing,
    })
  }

  const [, token] = authToken.split(' ')

  const tokenManager = new TokenManagerProvider()
  if (!tokenManager.validateToken(token)) {
    return response.status(401).json({
      message: AuthMessages.TokenInvalidOrExpired,
    })
  }

  return next()
}
