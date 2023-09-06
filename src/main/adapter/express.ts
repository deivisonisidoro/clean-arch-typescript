import { HttpRequest } from '../../helpers/http/implementations/HttpRequest'
import { IHttpRequest } from '../../helpers/http/IHttpRequest'
import { IController } from '../../domain/controller'
import { Request } from 'express'
import { IHttpResponse } from '../../helpers/http/IHttpResponse'

export function expressAdapter(request: Request, apiRoute: IController) {
  const httpRequest: IHttpRequest = new HttpRequest({
    header: request.header,
    body: request.body,
    path: request.path,
    query: request.query,
  })
  const response: Promise<IHttpResponse> = apiRoute.handle(httpRequest)
  return response
}
