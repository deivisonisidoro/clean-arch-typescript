import { IHttpResponse } from './IHttpResponse'

export interface IHttpErrors {
  error_422(): IHttpResponse
  error_400(): IHttpResponse
  error_404(): IHttpResponse
  error_500(): IHttpResponse
}
