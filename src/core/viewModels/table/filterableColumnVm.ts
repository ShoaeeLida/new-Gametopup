import { FilterVm } from "./filterVm";
import { DdlVm } from "../common/ddlVm";

export class FilterableColumn {
  filter: FilterVm = new FilterVm();
  classes: string = "";
  fieldValues: Array<DdlVm> = [];
}
