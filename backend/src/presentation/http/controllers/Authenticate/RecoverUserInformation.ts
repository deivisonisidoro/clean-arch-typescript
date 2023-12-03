import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IRecoverUserInformationUseCase } from '../../../../app/useCases/Authenticate/RecoverUserInformation'
import { IHttpErrors } from '../../helpers/IHttpErrors'
import { IHttpRequest } from '../../helpers/IHttpRequest'
import { IHttpResponse } from '../../helpers/IHttpResponse'
import { IHttpSuccess } from '../../helpers/IHttpSuccess'
import { HttpErrors } from '../../helpers/implementations/HttpErrors'
import { HttpResponse } from '../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../helpers/implementations/HttpSuccess'
import { IController } from '../IController'
import { IRefreshTokenUserDTO } from '../../../../domain/dtos/Authenticate/RefreshTokenUser'

export class RecoverUserInformationUserController implements IController {
  constructor(
    private recoverUserInformationUserUserCase: IRecoverUserInformationUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)
      if (
        bodyParams.includes('refreshTokenId')
      ) {
        const refreshTokenId = httpRequest.body as IRefreshTokenUserDTO;

        response = await this.recoverUserInformationUserUserCase.execute(refreshTokenId)
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
