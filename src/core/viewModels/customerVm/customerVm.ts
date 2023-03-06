import { BaseVm } from "./../common/baseVm";

export class CustomerVm extends BaseVm {
  name: string = "";
  //teleUserId:string="";
  teleAuthCode: string = "";
  isPayFirst: boolean = false;
  maxDebt: number = 0;
}
