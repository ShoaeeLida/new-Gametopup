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
      :title="`${$t($L.GENERAL.ADD_NEW)} ${$t($L.GENERAL.TRANSACTION)}`"
      @submit="onSubmit"
      @reset="onReset"
    >
      <template v-slot:body>
        <q-card-section class="q-mt-lg">
          <div class="row">
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">
                {{ $t($L.MODEL.TRANSACTION.CUSTOMER_NAME) }}
              </label>
              <q-select
                outlined
                v-model="createModel.customerId"
                :options="customerDdl"
                emit-value
                map-options
                @blur="v$.customerId.$touch"
                :error="v$.customerId.$error"
                :error-message="v$.customerId.$errors.map((x) => x.$message).join(',')"
              />
            </div>
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">
                {{ $t($L.MODEL.TRANSACTION.PRICE) }}
              </label>
              <q-input
                type="number"
                outlined
                v-model="createModel.price"
                autofocus
                :placeholder="$t($L.MODEL.TRANSACTION.PRICE)"
                @blur="v$.price.$touch"
                :error="v$.price.$error"
                :error-message="v$.price.$errors.map((x) => x.$message).join(',')"
              >
                <template v-slot:append>
                  <q-icon name="attach_money" class="q-mr-xs pointer"></q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{
                $t($L.MODEL.TRANSACTION.DESCRIPTION)
              }}</label>
              <q-input
                type="textarea"
                outlined
                v-model="createModel.description"
                autofocus
                dir="ltr"
              >
              </q-input>
            </div>
          </div>
        </q-card-section>
      </template>
    </app-create-form>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { TransactionCreateVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { OrderService, TransactionService } from "src/core/services";
import { MessageTypeEnum, Utility } from "src/commons";

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
    const transactionService = container.get<TransactionService>(cid.TransactionService);
    const orderService = container.get<OrderService>(cid.OrderService);
    const customerDdl = ref(orderService.ddlCustomer);

    const createModel = ref(new TransactionCreateVm());
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
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }

      var result = await transactionService.addAsync(createModel.value);
      Utility.showNotification(result.status, result.message);

      if (result.status == MessageTypeEnum.Success) {
        emit("update:modelValue", false);
        emit("onRegister", transactionService.currentRequestProp);
        onReset();
      }
    }

    function onReset() {
      v$.value.$reset();
      createModel.value = new TransactionCreateVm();
    }

    onMounted(async () => {
      customerDdl.value = await orderService.ddlCustomerAsync();
    });

    return {
      isOpen,
      roles: ref<Array<string>>([]),
      onSubmit,
      createModel,
      v$,
      onReset,
      customerDdl,
    };
  },
});
</script>
