import { IHttpResponse } from '../main/helpers/http/IHttpResponse'
import { HttpRequest } from '../main/helpers/http/implementations/HttpRequest'

export interface IController {
  handle(httpRequest: HttpRequest): Promise<IHttpResponse>
}
