import { useVuelidate } from "@vuelidate/core";
import { required,helpers } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class UserResetPasswordVm{
  oldPassword:string="";
  newPassword:string="";
  confirmNewPassword:string="";

  v$(ref: Ref<UserResetPasswordVm>) {
    const rules = {
      oldPassword: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      newPassword: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      confirmNewPassword: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
    };
    return useVuelidate(rules, ref);
  }
}
