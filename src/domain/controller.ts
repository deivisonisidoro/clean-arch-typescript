import { IHttpResponse } from '../helpers/http/IHttpResponse'
import { HttpRequest } from '../helpers/http/implementations/HttpRequest'

export interface IController {
  handle(httpRequest: HttpRequest): Promise<IHttpResponse>
}
