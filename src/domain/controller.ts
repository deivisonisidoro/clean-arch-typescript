import { IHttpResponse } from '../infra/http/helpers/http/IHttpResponse'
import { HttpRequest } from '../infra/http/helpers/implementations/HttpRequest'

export interface IController {
  handle(httpRequest: HttpRequest): Promise<IHttpResponse>
}
