import { Transform } from "class-transformer";
import { BaseVm } from "./../common/baseVm";
export class ProductVm extends BaseVm {
  productTitle: string = "";
  isActive: boolean = true;
  categoryName: string = "";
  code: string = "";
  productId: string = "";

  @Transform(({ value }) => {
    return parseFloat(value).toFixed(2);
  })
  price: string = "0";
}
