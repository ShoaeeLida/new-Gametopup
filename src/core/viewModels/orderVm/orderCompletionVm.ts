// import useVuelidate from "@vuelidate/core";
// import { required, helpers } from "@vuelidate/validators";
// import { L, $t } from "src/commons";
// import { Ref } from "vue";

export class OrderConfirmationVm {
  attachment1: string = "";
  attachment2: string = "";
  attachment3: string = "";
  description: string = "";

  // v$(ref: Ref<OrderConfirmVm>) {
  //   const rules = {
  //     attachment1: {
  //       required: helpers.withMessage($t(L.VALIDATION.REQUIRED_MSG), required),
  //     },
  //     attachment2: {
  //       required: helpers.withMessage($t(L.VALIDATION.REQUIRED_MSG), required),
  //     },
  //   };
  //   return useVuelidate(rules, ref);
  // }
}
