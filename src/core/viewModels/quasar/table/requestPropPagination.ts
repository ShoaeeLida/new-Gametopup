export class RequestPropPagination {
  constructor(obj?: Partial<RequestPropPagination>) {
    Object.assign(this, obj);
  }
  /**
   * Column name (from column definition)
   */
  sortBy?: string;
  /**
   * Is sorting in descending order?
   */
  descending: boolean = false;
  /**
   * Page number (1-based)
   */
  page: number = 1;
  /**
   * How many rows per page? 0 means Infinite
   */
  rowsPerPage: number = 10;
}
