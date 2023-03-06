export class DdlVm {
  constructor(obj?: Partial<DdlVm>) {
    Object.assign(this, obj);
  }
  key: string = "";
  value!: string | number;
}
