import { Request } from 'express'
import { HttpRequest } from '../../applications/controllers/helpers/implementations/HttpRequest'
import { IHttpRequest } from '../../applications/controllers/helpers/IHttpRequest'
import { IController } from '../../applications/controllers/IController'
import { IHttpResponse } from '../../applications/controllers/helpers/IHttpResponse'

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
