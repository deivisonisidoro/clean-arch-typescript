/**
 * Data Transfer Object (DTO) representing pagination information.
 *
 * @interface
 */
export interface PaginationDTO {
  /**
   * The body of the response, representing the paginated data.
   */
  body: unknown[]

  /**
   * The total number of items in the dataset.
   */
  total: number

  /**
   * The current page number.
   */
  page: number

  /**
   * The last page number in the pagination.
   */
  last_page: number
}
