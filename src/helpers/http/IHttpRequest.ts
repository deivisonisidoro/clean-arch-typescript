export interface IHttpRequest {
  header?: Record<string, string>
  body?: Record<string, any>
  query?: Record<string, string | string[]>
  path?: Record<string, string>
}
