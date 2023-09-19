import { IHttpResponse } from '../IHttpResponse'

export class HttpResponse implements IHttpResponse {
  statusCode: number
  body: Record<string, string>

  constructor(statusCode: number, body: any) {
    this.statusCode = statusCode
    this.body = body
  }
}
