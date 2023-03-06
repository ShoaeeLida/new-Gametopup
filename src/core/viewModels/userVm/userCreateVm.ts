import { useVuelidate } from "@vuelidate/core";
import { required,helpers } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class UserCreateVm {
  firstName: string = "";
  lastName: string = "";

 // userName: string = "";
  password: string = "";

  roles: Array<string> = [];
  email: string = "";

  v$(ref: Ref<UserCreateVm>) {
    const rules = {
      // userName: {
      //   required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      // },
      password: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      roles: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      email: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
    };
    return useVuelidate(rules, ref);
  }
}
