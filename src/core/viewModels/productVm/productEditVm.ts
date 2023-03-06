import { useVuelidate } from "@vuelidate/core";
import { required,helpers } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class ProductEditVm  {
    title: string = "";
    productType: number = 1;
    productCategoryId: string = "";
    id: string = "0";
    price: string = "0";

    v$(ref: Ref<ProductEditVm>) {
        const rules = {
          title: {
            required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
          },
          productCategoryId: {
            required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
          },
          price: {
            required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
          },
        };
        return useVuelidate(rules, ref);
      }
}
