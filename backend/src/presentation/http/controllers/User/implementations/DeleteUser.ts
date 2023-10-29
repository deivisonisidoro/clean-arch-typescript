import { IDeleteUserUseCase } from '../../../../../app/useCases/User/DeleteUser'
import { IHttpErrors } from '../../../helpers/IHttpErrors'
import { IHttpResponse } from '../../../helpers/IHttpResponse'
import { IHttpSuccess } from '../../../helpers/IHttpSuccess'
import { HttpErrors } from '../../../helpers/implementations/HttpErrors'
import { HttpRequest } from '../../../helpers/implementations/HttpRequest'
import { HttpResponse } from '../../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../../helpers/implementations/HttpSuccess'
import { IController } from '../../IController'

export class DeleteUserController implements IController {
  constructor(
    private deleteUserUseCase: IDeleteUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    const id = (httpRequest.path as { id: string }).id
    const response = await this.deleteUserUseCase.execute(id)
    if (!response.success) {
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
