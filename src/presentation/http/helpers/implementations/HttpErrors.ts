import { IHttpErrors } from '../IHttpErrors'
import { IHttpResponse } from '../IHttpResponse'

export class HttpErrors implements IHttpErrors {
  error_422(): IHttpResponse {
    return {
      statusCode: 422,
      body: { error: 'Unprocessable Entity' },
    }
  }

  error_400(): IHttpResponse {
    return {
      statusCode: 400,
      body: { error: 'Bad Request' },
    }
  }

  error_404(): IHttpResponse {
    return {
      statusCode: 404,
      body: { error: 'Not Found' },
    }
  }

  error_500(): IHttpResponse {
    return {
      statusCode: 500,
      body: { error: 'Internal Error' },
    }
  }
}
