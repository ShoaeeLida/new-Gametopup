<template>
  <q-dialog
    v-model="isOpen"
    class="dark-modal"
    full-width
    @before-show="onReset"
    @hide="$emit('closeFab')"
    persistent
  >
    <app-create-form
      :title="`${$t($L.GENERAL.ADD_NEW)} ${$t($L.GENERAL.CUSTOMER)}`"
      @submit="onSubmit"
      @reset="onReset"
    >
      <template v-slot:body>
        <q-card-section class="q-mt-lg">
          <div class="row">
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{ $t($L.MODEL.CUSTOMER.NAME) }}</label>
              <!--  -->
              <q-input
                outlined
                v-model="createModel.name"
                autofocus
                :placeholder="$t($L.MODEL.CUSTOMER.NAME)"
                @blur="v$.name.$touch"
                :error="v$.name.$error"
                :error-message="v$.name.$errors.map((x) => x.$message).join(',')"
              />
              <!-- -->
            </div>
            <div class="col-12 q-mt-md">
              <q-checkbox
                v-model="createModel.isPayFirst"
                right-label
                :label="$t($L.MODEL.CUSTOMER.IS_PAY_FIRST)"
                dark
              />
            </div>
            <div class="col-12 q-mt-md" v-show="!createModel.isPayFirst">
              <label class="q-mb-sm label-input">{{
                $t($L.MODEL.CUSTOMER.MAX_DEBT)
              }}</label>
              <q-input
                outlined
                v-model="createModel.maxDebt"
                autofocus
                :placeholder="$t($L.MODEL.CUSTOMER.MAX_DEBT)"
                type="number"
              />
            </div>
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{
                $t($L.MODEL.CUSTOMER.TELEGRAM_AUTHENTICATION_CODE)
              }}</label>
              <q-input
                outlined
                v-model="createModel.teleAuthCode"
                autofocus
                :placeholder="$t($L.MODEL.CUSTOMER.TELEGRAM_AUTHENTICATION_CODE)"
                @blur="v$.teleAuthCode.$touch"
                :error="v$.teleAuthCode.$error"
                :error-message="v$.teleAuthCode.$errors.map((x) => x.$message).join(',')"
                readonly
              />
              <q-btn
                icon="token"
                :label="$t($L.ACTIONS.GENERATE)"
                color="secondary"
                @click="onGenerate"
              ></q-btn>
            </div>
          </div>
        </q-card-section>
      </template>
    </app-create-form>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { CustomerCreateVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { CustomerService } from "src/core/services";
import { $t, L, MessageTypeEnum, Utility } from "src/commons";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ["update:modelValue", "onRegister", "closeFab"],
  setup(props, { emit }) {
    const customerService = container.get<CustomerService>(cid.CustomerService);
    const createModel = ref(new CustomerCreateVm());
    const v$ = createModel.value.v$(createModel);

    const isOpen = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit("update:modelValue", value);
        onReset();
      },
    });

    async function onSubmit() {
      if (
        createModel.value.isPayFirst == false &&
        (createModel.value.maxDebt == null || createModel.value.maxDebt <= 0)
      ) {
        Utility.showNotification(MessageTypeEnum.Danger, $t(L.MESSAGE.EMPTY_MAX_DEBT));
        return;
      }

      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }

      var result = await customerService.addAsync(createModel.value);
      Utility.showNotification(result.status, result.message);

      if (result.status == MessageTypeEnum.Success) {
        emit("update:modelValue", false);
        emit("onRegister", customerService.currentRequestProp);
        onReset();
      }
    }

    function onReset() {
      v$.value.$reset();
      createModel.value = new CustomerCreateVm();
    }
    function onGenerate(e: FormDataEvent) {
      e.preventDefault();
      let randomCode = (Math.random() + 1).toString(36).substring(7);
      createModel.value.teleAuthCode = randomCode;
    }

    return {
      isOpen,
      roles: ref<Array<string>>([]),
      onSubmit,
      createModel,
      v$,
      onReset,
      onGenerate,
    };
  },
});
</script>
