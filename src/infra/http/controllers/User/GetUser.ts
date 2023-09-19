import { IController } from '../../../../domain/controller'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IGetAllUserUseCase } from '../../../../domain/useCases/User/GetAllUser'
import { IHttpErrors } from '../../../http/helpers/IHttpErrors'
import { IHttpResponse } from '../../../http/helpers/IHttpResponse'
import { IHttpSuccess } from '../../../http/helpers/IHttpSuccess'
import { HttpErrors } from '../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../helpers/implementations/HttpSuccess'

export class GetUserController implements IController {
  constructor(
    private getAllUserUseCase: IGetAllUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO
    if (httpRequest.query && Object.keys(httpRequest.query).length > 0) {
      const queryStringParams = Object.keys(httpRequest.query)
      if (queryStringParams.includes('page')) {
        const page = (httpRequest.query as { page: string }).page
        response = await this.getAllUserUseCase.execute(Number(page))
      } else {
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }
      if (!response.success) {
        error = this.httpErrors.error_404()
        return new HttpResponse(error.statusCode, response.data)
      }
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
