import { IRefreshTokenUserUseCase } from '../../../../app/useCases/Authenticate/RefreshTokenUser'
import { IRefreshTokenUserDTO } from '../../../../domain/dtos/Authenticate/RefreshTokenUser'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IHttpErrors } from '../../helpers/IHttpErrors'
import { IHttpRequest } from '../../helpers/IHttpRequest'
import { IHttpResponse } from '../../helpers/IHttpResponse'
import { IHttpSuccess } from '../../helpers/IHttpSuccess'
import { HttpErrors } from '../../helpers/implementations/HttpErrors'
import { HttpResponse } from '../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../helpers/implementations/HttpSuccess'
import { IController } from '../IController'

/**
 * Controller for handling requests to refresh authentication tokens.
 */
export class RefreshTokenUserController implements IController {
  /**
   * Creates an instance of RefreshTokenUserController.
   * @param refreshTokenUserUserCase The use case for refreshing authentication tokens.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private refreshTokenUserUserCase: IRefreshTokenUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to refresh authentication tokens.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)

      if (bodyParams.includes('refreshTokenId')) {
        // Extract refresh token ID from the request body
        const refreshTokenId = httpRequest.body as IRefreshTokenUserDTO

        // Execute the refresh token use case
        response = await this.refreshTokenUserUserCase.execute(refreshTokenId)
      } else {
        // Invalid request body, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Token refresh failed, return a 400 Bad Request error
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Token refresh succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request body, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
