import { Request } from 'express'

import { IController } from '../controllers/IController'
import { IHttpRequest } from '../helpers/IHttpRequest'
import { IHttpResponse } from '../helpers/IHttpResponse'
import { HttpRequest } from '../helpers/implementations/HttpRequest'

export async function expressAdapter(
  request: Request,
  apiRoute: IController,
): Promise<IHttpResponse> {
  const httpRequest: IHttpRequest = new HttpRequest({
    header: request.header,
    body: request.body,
    path: request.params,
    query: request.query,
  })
  const response: IHttpResponse = await apiRoute.handle(httpRequest)
  return response
}
