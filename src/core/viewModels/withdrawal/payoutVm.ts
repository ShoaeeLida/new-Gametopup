
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minValue } from "@vuelidate/validators";
import { L, $t } from "src/commons";
import { Ref } from "vue";

export class PayoutVm{
  amount:number =0;
  userWalletAddress:string="";
  description:string="";
  paymentMethod :string="";

  v$(ref: Ref<PayoutVm>) {
    const rules = {
      amount: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
        minVal: helpers.withMessage($t(L.VALIDATION.REQUIRED), minValue(0.01)),
      },
      userWalletAddress: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
      paymentMethod: {
        required: helpers.withMessage($t(L.VALIDATION.REQUIRED), required),
      },
    };
    return useVuelidate(rules, ref);
  }

}
