import { useVuelidate } from "@vuelidate/core";
import { required,helpers } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class ProductCreateVm  {
  productTitle: string = "";
  isActive: boolean = true;
  categoryName: string = "";
  price: string = "0";

  v$(ref: Ref<ProductCreateVm>) {
    const rules = {
      productTitle: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      price: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
    };
    return useVuelidate(rules, ref);
  }

}
