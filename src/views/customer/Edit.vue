<template>
  <q-dialog v-model="isOpen" class="dark-modal" full-width persistent>
    <app-edit-form
      :title="`${$t($L.ACTIONS.EDIT)} ${title}`"
      @submit="onSubmit"
      @reset="onReset"
    >
      <template v-slot:body>
        <q-card-section class="q-mt-lg">
          <div class="row">
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{ $t($L.MODEL.CUSTOMER.NAME) }}</label>
              <q-input
                outlined
                v-model="editModel.firstName"
                autofocus
                :placeholder="$t($L.MODEL.CUSTOMER.NAME)"
                @blur="v$.name.$touch"
                :error="v$.name.$error"
                :error-message="v$.name.$errors.map((x) => x.$message).join(',')"
              />
            </div>
            <div class="col-12 q-mt-md">
              <q-checkbox
                v-model="editModel.isPayFirst"
                right-label
                :label="$t($L.MODEL.CUSTOMER.IS_PAY_FIRST)"
                dark
              />
            </div>
            <div class="col-12 q-mt-md" v-show="!editModel.isPayFirst">
              <label class="q-mb-sm label-input">{{
                $t($L.MODEL.CUSTOMER.MAX_DEBT)
              }}</label>
              <q-input
                outlined
                v-model="editModel.maxDebt"
                autofocus
                :placeholder="$t($L.MODEL.CUSTOMER.MAX_DEBT)"
                type="number"
              />
            </div>

            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">
                {{ $t($L.MODEL.CUSTOMER.TELEGRAM_AUTHENTICATION_CODE) }}
              </label>
              <q-input
                outlined
                v-model="editModel.teleAuthCode"
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
    </app-edit-form>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { CustomerEditVm, CustomerVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { CustomerService } from "src/core/services";
import { $t, L, MessageTypeEnum, Utility } from "src/commons";
import { instanceToPlain, plainToInstance } from "class-transformer";
//import { classToPlain, plainToInstance } from "class-transformer";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    selectedId: {
      required: true,
      type: String,
    },
  },
  emits: ["update:modelValue", "onRegister"],
  setup(props, { emit }) {
    const customerService = container.get<CustomerService>(cid.CustomerService);
    const model = ref(new CustomerVm());
    const editModel = ref(new CustomerEditVm());
    const v$ = editModel.value.v$(editModel);
    const title = ref("");

    const isOpen = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit("update:modelValue", value);
        onReset();
      },
    });

    watch(
      () => isOpen.value,
      async (newVal) => {
        if (newVal) {
          model.value = await customerService.detailAsync(props.selectedId.toString());
          title.value = `${model.value.firstName} ${model.value.lastName}`;
          var plainModel = instanceToPlain(model.value);
          editModel.value = plainToInstance(CustomerEditVm, plainModel);
          console.log(editModel);
        }
      }
    );

    async function onSubmit() {
      if (
        editModel.value.isPayFirst == false &&
        (editModel.value.maxDebt == null || editModel.value.maxDebt <= 0)
      ) {
        Utility.showNotification(MessageTypeEnum.Danger, $t(L.MESSAGE.EMPTY_MAX_DEBT));
        return;
      }

      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }

      var result = await customerService.updateAsync(editModel.value);
      Utility.showNotification(result.status, result.message);

      if (result.status == MessageTypeEnum.Success) {
        emit("update:modelValue", false);
        emit("onRegister", customerService.currentRequestProp);
        onReset();
      }
    }

    function onReset() {
      v$.value.$reset();
      editModel.value = new CustomerEditVm();
      editModel.value.id = props.selectedId;
      emit("update:modelValue", false);
    }

    function onGenerate(e: FormDataEvent) {
      e.preventDefault();
      let randomCode = (Math.random() + 1).toString(36).substring(7);
      editModel.value.teleAuthCode = randomCode;
    }

    return {
      isOpen,
      options: ["PurchaseOperator", "Admin", "Accountant"],
      onSubmit,
      editModel,
      title,
      v$,
      onReset,
      onGenerate,
    };
  },
});
</script>
