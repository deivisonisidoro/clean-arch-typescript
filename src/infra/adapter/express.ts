import { HttpRequest } from '../http/helpers/implementations/HttpRequest'
import { IHttpRequest } from '../http/helpers/IHttpRequest'
import { IController } from '../../domain/controller'
import { Request } from 'express'
import { IHttpResponse } from '../http/helpers/IHttpResponse'

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
