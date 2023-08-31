import { IHttpRequest } from '../IHttpRequest'

export class HttpRequest implements IHttpRequest {
  header?: Record<string, string>
  body?: Record<string, any>
  query?: Record<string, string | string[]>
  path?: Record<string, string>

  constructor(init?: HttpRequest) {
    Object.assign(this, init)
  }
}
