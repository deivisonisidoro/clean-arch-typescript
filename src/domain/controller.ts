import { IHttpResponse } from '../helpers/IHttpResponse'
import { HttpRequest } from '../helpers/implementations/HttpRequest'

export interface IController {
  route(httpRequest: HttpRequest): Promise<IHttpResponse>
}
