import { useVuelidate } from "@vuelidate/core";
import { required,helpers,email } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class ResetPasswordVm{
  email:string="";
  token:string="";
  password:string="";
  confirmPassword:string="";

  v$(ref: Ref<ResetPasswordVm>) {
    const rules = {
      email: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
        email:helpers.withMessage($t(L.VALIDATION.INVALID_EMAIL), email),
      },
      token: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      password: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      confirmPassword: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
    };
    return useVuelidate(rules, ref);
  }
}
