import { useVuelidate } from "@vuelidate/core";
import { required,helpers } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class TransactionCreateVm {
  customerId: string = "";
  price: number = 0;
  description: string = "";

  v$(ref: Ref<TransactionCreateVm>) {
    const rules = {
      customerId: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      price: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },

    };
    return useVuelidate(rules, ref);
  }

}
