import { useVuelidate } from "@vuelidate/core";
import { required,helpers,email } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class UserEmailVm{
  email:string="";
  v$(ref: Ref<UserEmailVm>) {
    const rules = {
      email: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
        email:helpers.withMessage($t(L.VALIDATION.INVALID_EMAIL), email),
      },
    };
    return useVuelidate(rules, ref);
  }
}
