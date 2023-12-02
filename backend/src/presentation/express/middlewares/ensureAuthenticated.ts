import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthMessages } from '../../../domain/enums/Authenticate/AuthMessages';
import { TokenManagerProvider } from '../../../infra/providers/TokenManager';


export const ensureAuthenticated: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: AuthMessages.AuthorizationHeaderMissing,
    });
  }

  const [, token] = authToken.split(" ");

  const tokenManager = new TokenManagerProvider()
  if (!tokenManager.validateToken(token)) {
    return response.status(401).json({
      message: AuthMessages.TokenInvalidOrExpired,
    });
  }

  return next();
};
