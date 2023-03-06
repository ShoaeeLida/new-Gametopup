import { useVuelidate } from "@vuelidate/core";
import { required,helpers } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class LoginVm{
  username:string="";
  password:string="";

  v$(ref: Ref<LoginVm>) {
    const rules = {
      username: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      password: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
    };
    return useVuelidate(rules, ref);
  }
}
