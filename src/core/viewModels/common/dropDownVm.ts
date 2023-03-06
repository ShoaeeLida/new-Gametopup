export class DropDownVm {
    constructor(obj?: Partial<DropDownVm>) {
      Object.assign(this, obj);
    }
    label: string = "";
    value!: string | number;
  }
