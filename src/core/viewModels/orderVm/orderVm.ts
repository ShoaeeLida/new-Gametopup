import { Transform } from "class-transformer";

export class OrderVm {
  id: string = "";
  productId: number = 4;
  productTitle: string = "";
  code: string = "";
  accountUsername: string = "";
  accountPassword: string = "";
  accountName: string = "";
  accountPlatform: string = "";
  customerName:string = "";

  @Transform(({ value }) => {
    try {
      return new Date(value).toLocaleString();
    } catch (e) {
      return "";
    }
  })
  createdDateTime: string = "";
}
