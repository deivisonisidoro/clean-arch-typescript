import { IController } from '../../../domain/controller'
import { ResponseDTO } from '../../../domain/dtos/Response'
import { IUpdateUserUseCase } from '../../../domain/useCases/User/UpdateUser'
import { IHttpErrors } from '../../helpers/http/IHttpErrors'
import { IHttpResponse } from '../../helpers/http/IHttpResponse'
import { IHttpSuccess } from '../../helpers/http/IHttpSuccess'
import { HttpErrors } from '../../helpers/http/implementations/HttpErrors'
import { HttpRequest } from '../../helpers/http/implementations/HttpRequest'
import { HttpResponse } from '../../helpers/http/implementations/HttpResponse'
import { HttpSuccess } from '../../helpers/http/implementations/HttpSuccess'

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
