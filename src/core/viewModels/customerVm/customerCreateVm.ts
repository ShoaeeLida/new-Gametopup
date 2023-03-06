import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class CustomerCreateVm {
  name: string = "";
  teleAuthCode: string = "";
  isPayFirst: boolean = false;
  maxDebt: number = 0;

  v$(ref: Ref<CustomerCreateVm>) {
    const rules = {
      name: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      teleAuthCode: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
    };
    return useVuelidate(rules, ref);
  }
}
