import { IUpdateUserUseCase } from '../../../../../app/useCases/User/UpdateUser'
import { IHttpErrors } from '../../../helpers/IHttpErrors'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { IHttpSuccess } from '../../../helpers/IHttpSuccess'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

/**
 * Controller for handling user update requests.
 */
export class UpdateUserController implements IController {
  /**
   * Creates an instance of UpdateUserController.
   * @param updateUserUseCase The use case for updating a user.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private updateUserUseCase: IUpdateUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to update a user.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validate path and body parameters
    if (
      httpRequest.path &&
      httpRequest.body &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const pathStringParams = Object.keys(httpRequest.path)
      const bodyParams = Object.keys(httpRequest.body)

      if (
        pathStringParams.includes('id') &&
        (bodyParams.includes('name') ||
          bodyParams.includes('email') ||
          bodyParams.includes('password'))
      ) {
        const id = (httpRequest.path as { id: string }).id
        const data = httpRequest.body as {
          name: string
          email: string
          password: string
        }

        // Execute the update user use case
        response = await this.updateUserUseCase.execute(id, data)
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Update user failed, return a 400 Bad Request error
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Update user succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
