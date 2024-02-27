import { IHttpResponse } from './IHttpResponse'

/**
 * Interface representing HTTP success responses.
 */
export interface IHttpSuccess {
  /**
   * Generates a success response with a status code of 200.
   * @param data Optional data to include in the response body.
   * @returns An HTTP response object.
   */
  success_200(data?: any): IHttpResponse

  /**
   * Generates a success response with a status code of 201.
   * @param data Optional data to include in the response body.
   * @returns An HTTP response object.
   */
  success_201(data?: any): IHttpResponse
}
