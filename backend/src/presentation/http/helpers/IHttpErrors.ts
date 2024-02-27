import { IHttpResponse } from './IHttpResponse'

/**
 * Interface representing HTTP error responses.
 */
export interface IHttpErrors {
  /**
   * Creates an HTTP response with status code 422 (Unprocessable Entity).
   * @returns An HTTP response with status code 422.
   */
  error_422(): IHttpResponse

  /**
   * Creates an HTTP response with status code 400 (Bad Request).
   * @returns An HTTP response with status code 400.
   */
  error_400(): IHttpResponse

  /**
   * Creates an HTTP response with status code 404 (Not Found).
   * @returns An HTTP response with status code 404.
   */
  error_404(): IHttpResponse

  /**
   * Creates an HTTP response with status code 500 (Internal Server Error).
   * @returns An HTTP response with status code 500.
   */
  error_500(): IHttpResponse
}
