import { IController } from '../../IController'
import { ResponseDTO } from '../../../dtos/Response'
import { IUpdateUserUseCase } from '../../../../useCases/User/UpdateUser'
import { IHttpErrors } from '../../helpers/IHttpErrors'
import { IHttpResponse } from '../../helpers/IHttpResponse'
import { IHttpSuccess } from '../../helpers/IHttpSuccess'
import { HttpErrors } from '../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../helpers/implementations/HttpSuccess'

export class UpdateUserController implements IController {
  constructor(
    private updateUserUseCase: IUpdateUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO
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
        response = await this.updateUserUseCase.execute(id, data)
      } else {
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }
      if (!response.success) {
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
