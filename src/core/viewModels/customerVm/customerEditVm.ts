import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class CustomerEditVm {
  id: string = "";
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  field: string = "";
  isActive: boolean = false;
  teleAuthCode: string = "";
  isPayFirst: boolean = false;
  maxDebt: number = 0;

  v$(ref: Ref<CustomerEditVm>) {
    const rules = {
      firstName: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      lastName: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      email: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      teleAuthCode: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
    };
    return useVuelidate(rules, ref);
  }
}
