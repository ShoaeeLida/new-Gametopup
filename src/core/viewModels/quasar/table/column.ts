import { DdlVm } from "./../../common/ddlVm";
//import { LooseDictionary } from "quasar";


export interface Column {
  /**
   * Unique id, identifies column, (used by pagination.sortBy, 'body-cell-[name]' slot, ...)
   */
  name: string;
  /**
   * Label for header
   */
  label: string;
  /**
   * Row Object property to determine value for this column or function which maps to the required property
   */
  field: string | ((row: object) => unknown);
  /**
   * If we use visible-columns, this col will always be visible
   */
  required?: boolean;
  /**
   * Horizontal alignment of cells in this column
   * Default value: right
   */
  align?: "left" | "right" | "center";
  /**
   * Tell QTable you want this column sortable
   */
  sortable?: boolean;
  /**
   * Compare function if you have some custom data or want a specific way to compare two rows
   */
  sort?: (
    a: unknown,
    b: unknown,
    rowA: object,
    rowB: object
  ) => number;
  /**
   * Set column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending); Overrides the 'column-sort-order' prop
   * Default value: ad
   */
  sortOrder?: "ad" | "da";
  /**
   * Tell QTable you want this column filterable
   */
  filterable?: boolean;
  /**
   * Tell QTable you want this column filterType
   */
  fieldType?: "text" | "number" | "date" | "radio" | "select" ;
  /**
   * Tell QTable you want this column filterValue
   */
  fieldValues?: Array<DdlVm> | Promise<DdlVm[]> | Array<string>;
  /**
   * If the fieldType be 'select', then the 'selectField' will be pass to table filter
   */
   selectField?: string;

  /**
   * Function you can apply to format your data
   */
  format?: (val: unknown, row: object) => unknown;
  /**
   * Style to apply on normal cells of the column
   */
  style?: string | ((row: object) => string);
  /**
   * Classes to add on normal cells of the column
   */
  classes?: string | ((row: object) => string);
  /**
   * Style to apply on header cells of the column
   */
  headerStyle?: string;
  /**
   * Classes to add on header cells of the column
   */
  headerClasses?: string;

  value?:string;
}
