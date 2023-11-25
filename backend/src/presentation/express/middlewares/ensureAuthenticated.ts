import { NextFunction, Request, RequestHandler, Response } from 'express';
import { validateToken } from '../../../infra/utils/validateToken';
import { AuthMessages } from '../../../domain/enums/Authenticate/AuthMessages';


export const ensureAuthenticated: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: AuthMessages.AuthorizationHeaderMissing,
    });
  }

  const [, token] = authToken.split(" ");


  if (!validateToken(token)) {
    return response.status(401).json({
      message: AuthMessages.TokenInvalidOrExpired,
    });
  }

  return next();
};
