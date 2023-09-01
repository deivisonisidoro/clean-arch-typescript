import { IHttpResponse } from '../helpers/IHttpResponse'
import { HttpRequest } from '../helpers/implementations/HttpRequest'

export interface IController {
  handle(httpRequest: HttpRequest): Promise<IHttpResponse>
}
