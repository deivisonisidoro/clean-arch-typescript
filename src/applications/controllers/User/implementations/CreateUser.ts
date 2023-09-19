import { HttpResponse } from '../../helpers/implementations/HttpResponse'
import { ICreateUserUseCase } from '../../../../useCases/User/CreateUser'
import { HttpErrors } from '../../helpers/implementations/HttpErrors'
import { IHttpErrors } from '../../helpers/IHttpErrors'
import { IHttpResponse } from '../../helpers/IHttpResponse'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { HttpSuccess } from '../../helpers/implementations/HttpSuccess'
import { IHttpSuccess } from '../../helpers/IHttpSuccess'
import { IController } from '../../IController'
import { IHttpRequest } from '../../helpers/IHttpRequest'

export class CreateUserController implements IController {
  constructor(
    private createUserCase: ICreateUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)
      if (
        bodyParams.includes('name') &&
        bodyParams.includes('email') &&
        bodyParams.includes('password')
      ) {
        const createUserRequestDTO =
          httpRequest.body as { name: string; email: string; password: string }
        response = await this.createUserCase.execute(createUserRequestDTO)
      } else {
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }
      if (!response.success) {
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }
      const success = this.httpSuccess.success_201(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
