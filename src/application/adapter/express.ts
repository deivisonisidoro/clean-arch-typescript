import { Request } from 'express'
import { HttpRequest } from '../../application/controllers/helpers/implementations/HttpRequest'
import { IHttpRequest } from '../../application/controllers/helpers/IHttpRequest'
import { IController } from '../controllers/IController'
import { IHttpResponse } from '../controllers/helpers/IHttpResponse'

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
