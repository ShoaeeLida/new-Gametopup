import { useVuelidate } from "@vuelidate/core";
import { required,helpers } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class UserEditVm  {
  email: string = "";
  firstName: string = "";
  lastName: string = "";
 // userName: string = "";
  roles: Array<string> = [];
  id:string="0";


  v$(ref: Ref<UserEditVm>) {
    const rules = {
      // userName: {
      //   required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      // },
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
