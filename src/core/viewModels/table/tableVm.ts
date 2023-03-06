import { RequestProp } from "./../quasar/table/requestProp";
import { Expose } from "class-transformer";
import { FilterVm, SortVm } from "./";


export class TableVm {
  constructor(obj?: Partial<TableVm>) {
    Object.assign(this, obj);
  }
  currentPage: number = 1;
  limit: number = 10;
  sorts: Array<SortVm> = [];
  filter: FilterVm = new FilterVm();

  @Expose()
  get offset() {
    return (this.currentPage - 1) * this.limit;
  }

  static toTable(props: RequestProp) {
    const sortList = new Array<SortVm>();
    const sort = new SortVm({
      field: props.pagination.sortBy,
      dir: props.pagination.descending ? "desc" : "asc",
    });

    sortList.push(sort);
    const table = new TableVm({
      limit: props.pagination.rowsPerPage,
      currentPage: props.pagination.page,
      sorts: sortList,
      filter: props.filterHeader,
    });
    return table;
  }

 
}
