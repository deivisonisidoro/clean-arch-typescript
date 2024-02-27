/**
 * Data Transfer Object (DTO) representing a response from the application.
 *
 * @interface
 */
export interface ResponseDTO {
  /**
   * A boolean indicating the success or failure of the operation.
   */
  success: boolean

  /**
   * The data associated with the response.
   */
  data: any

  /**
   * The HTTP status code (optional).
   */
  statusCode?: number
}
