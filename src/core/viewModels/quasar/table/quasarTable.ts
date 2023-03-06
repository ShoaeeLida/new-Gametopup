import { FilterVm } from "../../table";
import { Column, Pagination, RequestPropPagination } from "./";

export class QuasarTable {
  pagination = new Pagination();
  columns: Array<Column> = [];
  rows: Array<unknown> = [];
  filter = "";
  filters: Array<FilterVm> = [];
  loading = false;

  setData(
    rows: Array<unknown>,
    totalItems: number,
    requestPropPagination: RequestPropPagination
  ) {
    this.rows = rows;

    this.pagination.rowsNumber = totalItems;
    this.pagination.page = requestPropPagination.page;
    this.pagination.rowsPerPage = requestPropPagination.rowsPerPage;
    this.pagination.sortBy = requestPropPagination.sortBy;
    this.pagination.descending = requestPropPagination.descending;    
  }
}
