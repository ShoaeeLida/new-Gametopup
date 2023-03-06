import { BaseVm } from "./../common/baseVm";
import { Transform } from "class-transformer";

export class TransactionVm extends BaseVm {
  orderCode: string = "";
  customerName: string = "";
  customerId: string = "";
  price: number = 0;
  description: string = "";
  status: string = "";

  @Transform(({ value }) => {
    try {
      return new Date(value).toLocaleString();
    } catch (e) {
      return "";
    }
  })
  createDateTime: string = "";
}
