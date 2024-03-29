import { useVuelidate } from "@vuelidate/core";
import { required,helpers, minValue } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class ProductCreateVm  {
  title: string = "";
  isActive: boolean = true;
  categoryName: string = "";
  price: string = "0";
  productCategoryId:string = "";
  code: string = "";
  guestPrice : string = "0";

  v$(ref: Ref<ProductCreateVm>) {
    const rules = {
      title: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      price: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
        minVal: helpers.withMessage($t(L.VALIDATION.REQUIRED), minValue(0.01)),
      },
      productCategoryId: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      code:{
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      }
    };
    return useVuelidate(rules, ref);
  }

}
