import { IController } from '../../domain/controller'
import { ResponseDTO } from '../../domain/dtos/Response'
import { IDeleteUserUseCase } from '../../domain/useCases/User/DeleteUser'
import { IHttpErrors } from '../../helpers/http/IHttpErrors'
import { IHttpResponse } from '../../helpers/http/IHttpResponse'
import { IHttpSuccess } from '../../helpers/http/IHttpSuccess'
import { HttpErrors } from '../../helpers/http/implementations/HttpErrors'
import { HttpRequest } from '../../helpers/http/implementations/HttpRequest'
import { HttpResponse } from '../../helpers/http/implementations/HttpResponse'
import { HttpSuccess } from '../../helpers/http/implementations/HttpSuccess'

export class DeleteUserController implements IController {
  constructor(
    private deleteUserUseCase: IDeleteUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO
    const id = (httpRequest.path as { id: string }).id
    response = await this.deleteUserUseCase.execute(id)
    if (!response.success) {
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
