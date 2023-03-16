import { BaseVm } from "./../common/baseVm";

export class CustomerVm extends BaseVm {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  field: string = "";
  isActive: boolean = false;
  teleAuthCode: string = "";
  isPayFirst: boolean = false;
  maxDebt: number = 0;
}
