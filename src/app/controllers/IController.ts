import { IHttpResponse } from '../controllers/helpers/IHttpResponse'
import { HttpRequest } from '../controllers/helpers/implementations/HttpRequest'

export interface IController {
  handle(httpRequest: HttpRequest): Promise<IHttpResponse>
}
