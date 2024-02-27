import { IHttpRequest } from '../IHttpRequest'

/**
 * Implementation of IHttpRequest representing an HTTP request.
 */
export class HttpRequest implements IHttpRequest {
  /**
   * Represents the headers of the HTTP request.
   */
  header?: unknown

  /**
   * Represents the body of the HTTP request.
   */
  body?: unknown

  /**
   * Represents the query parameters of the HTTP request.
   */
  query?: unknown

  /**
   * Represents the path parameters of the HTTP request.
   */
  path?: unknown

  /**
   * Initializes a new instance of the `HttpRequest` class.
   * @param init - An optional object containing properties to initialize the instance.
   */
  constructor(init?: HttpRequest) {
    Object.assign(this, init)
  }
}
