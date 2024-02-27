import { Request } from 'express'

import { IController } from '../http/controllers/IController'
import { IHttpRequest } from '../http/helpers/IHttpRequest'
import { IHttpResponse } from '../http/helpers/IHttpResponse'
import { HttpRequest } from '../http/helpers/implementations/HttpRequest'

/**
 * Adapts Express request to the application's request format and calls the provided controller.
 *
 * @async
 * @param {Request} request - The Express request object.
 * @param {IController} apiRoute - The controller to handle the request.
 * @returns {Promise<IHttpResponse>} The response from the controller.
 */
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
