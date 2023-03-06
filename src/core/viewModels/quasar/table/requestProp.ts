
import { RequestPropPagination } from ".";
import { FilterVm } from "../../table";

export class RequestProp {
  /**
   * Pagination object
   */
  pagination: RequestPropPagination = new RequestPropPagination();
  /**
   * Filter method (the 'filter-method' prop)
   */
  filter!: (
    rows: unknown[],
    terms: string | object,
    cols: unknown[],
    getCellValue: (col: object, row: object) => unknown
  ) => unknown[];
  /**
   * Filtered data
   */
  filterHeader: FilterVm | undefined;
  /**
   * Optional function to get a cell value
   */
  getCellValue!: (col: object, row: object) => unknown;

  // setByQueryString(queryString: string) {
  //   const requestPropObj = Utility.queryStringToObject(queryString);
  //   if (!Utility.isEmptyObject(requestPropObj)) {
  //     const requestProp = plainToInstance(RequestProp, requestPropObj);
  //     this.filters = requestProp.filters;
  //     this.pagination = requestProp.pagination;
  //   } else {
  //     this.setToFirstPage();
  //   }
  // }

  setData(requestProp: RequestProp) {
    const pagination = requestProp.pagination
      ? requestProp.pagination
      : new RequestPropPagination();

    this.pagination.descending = pagination.descending;
    this.pagination.page = pagination.page;
    this.pagination.rowsPerPage = pagination.rowsPerPage;
    this.pagination.sortBy = pagination.sortBy;

    if (requestProp.filterHeader) {
      this.filterHeader = requestProp.filterHeader;
    }
  }

  setToFirstPage(
    descending: boolean = true,
    sortBy: string = "id"
  ) {
    this.pagination.page = 1;
    this.pagination.descending = descending;
    this.pagination.sortBy = sortBy;
    this.filterHeader = undefined;
  }
}
