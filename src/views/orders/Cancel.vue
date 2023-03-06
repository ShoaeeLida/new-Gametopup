<template>
  <q-dialog v-model="isOpen" persistent class="dark-modal" full-width>
    <q-card bordered class="my-card w-100">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-subtitle1 ellipsis">{{ title }}</div>
          <q-space />
          <q-btn
            icon="close"
            color="red"
            style="font-size: 10px"
            flat
            round
            dense
            v-close-popup
            :disable="loading"
          />
        </div>
      </q-card-section>

      <q-card-section class="row items-center w-100">
        <div class="col-12 q-mb-md">
          <q-select
            dense
            v-model="reasonItem"
            :options="cancelReasonList"
            standout="bg-primary text-white"
            options-dense
            ref="select"
            style="word-break: break-all"
          >
            <!-- @update:model-value="setTextReason" -->
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <!-- <div class="col-12">
          <q-input
            v-model="txtMessage"
            filled
            type="textarea"
            :label="$t($L.MESSAGE.REASON_REFUND)"
          />
        </div> -->
      </q-card-section>
      <q-separator />

      <q-card-actions class="justify-end">
        <q-btn
          color="secondary"
          @click="onCancel"
          :loading="loading"
          :disable="loading"
          no-caps
        >
          {{ $t($L.ACTIONS.OK) }}
        </q-btn>
        <q-btn color="white" no-caps outline v-close-popup :disable="loading">
          {{ $t($L.ACTIONS.CANCEL) }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { cid, container } from "inversify-props";
import { OrderService } from "src/core/services";
import { $t, L, MessageTypeEnum, Utility } from "src/commons";
import { useQuasar } from "quasar";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue", "onRegister"],
  setup(props, { emit }) {
    type OptionType = {
      label: string;
      value: string | number;
    };
    //#region ### data ###

    const txtMessage = ref("");
    const orderService = container.get<OrderService>(cid.OrderService);
    const reasonItem = ref<OptionType>({
      label: "",
      value: 0,
    });
    // const refundReason = ref("");
    const cancelReasonList = ref<Array<OptionType>>([]);
    const loading = ref(false);
    const $q = useQuasar();
    //#endregion

    //#region ### methods ###
    async function onCancel() {
      loading.value = true;
      if (reasonItem.value.value != "" && reasonItem.value.value != "0") {
        $q.dialog({
          message: $t(L.MESSAGE.SURE),
          cancel: true,
          persistent: true,
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
        })
          .onOk(async () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const result = await orderService.cancelAsync(
              props.id,
              reasonItem.value.value.toString()
            );
            loading.value = false;
            Utility.showNotification(result.status, result.joinedErrors);
            emit("onRegister");
            emit("update:modelValue", false);
          })
          .onCancel(() => {
            loading.value = false;
          });
      } else {
        loading.value = false;
        Utility.showNotification(MessageTypeEnum.Danger, $t(L.VALIDATION.REQUIRED));
      }
    }

    // function setTextReason() {
    //   if (reasonItem.value?.label) {
    //     txtMessage.value = reasonItem.value?.desc;
    //     refundReason.value = reasonItem.value.value.toString();
    //   }
    // }

    //#endregion

    //#region ### computed ###
    const isOpen = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        reasonItem.value.value = "";
        reasonItem.value.label = "";
        //reasonItem.value = { label: "---انتخاب کنید---", value: 0, desc: "" };
        emit("update:modelValue", value);
      },
    });
    //#endregion

    //#region  ### watch ###
    watch(
      () => isOpen.value,
      (newVal) => {
        if (newVal) {
          reasonItem.value.value = "";
          reasonItem.value.label = "";

          cancelReasonList.value = [
            {
              label: "Need 2FA",
              value: "1",
            },
            {
              label: "Wrong Data",
              value: "2",
            },
            {
              label: "Wrong Name In game",
              value: "3",
            },
            {
              label: "Need User Logout",
              value: "4",
            },
          ];
        }
      }
    );
    //#endregion

    return {
      isOpen,
      txtMessage,
      onCancel,
      cancelReasonList,
      reasonItem,
      //setTextReason,
      confirm: ref(false),
      loading,
    };
  },
});
</script>
