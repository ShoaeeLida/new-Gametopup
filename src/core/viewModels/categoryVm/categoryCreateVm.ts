import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class CategoryCreateVm  {
  title: string = "";
  description: string = "";

  v$(ref: Ref<CategoryCreateVm>) {
    const rules = {
      title: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
    };
    return useVuelidate(rules, ref);
  }

}
