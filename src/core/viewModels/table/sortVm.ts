import { Expose } from "class-transformer";

type DirType = "asc" | "desc";

export class SortVm {
  constructor(obj?: Partial<SortVm>) {
    Object.assign(this, obj);
  }

  set field(val: string) {
    if (!val) {
      val = "createDateTime";
    }
    this._field = val;
  }

  @Expose()
  get field() {
    if (!this._field) {
      return "createDateTime";
    }

    return this._field;
  }

  _field: string = "";
  dir: DirType = "asc";
}
