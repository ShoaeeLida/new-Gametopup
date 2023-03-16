<template>
  <div id="slideOver-container" :class="['w-full h-full fixed inset-0', invisible]">
    <div
      @click="toggleSlideOver"
      id="slideOver-bg"
      :class="[
        'w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ',
        opacity,
      ]"
    ></div>
    <div
      id="slideOver"
      :class="[
        'w-96 bg-white h-full absolute right-0 duration-300 ease-out transition-all overflow-y-auto',
        translateX,
      ]"
    >
      <div
        @click="toggleSlideOver"
        class="absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <div class="mt-14 px-12 py-4">
        <!-- <div class="row no-wrap items-center">
          <div class="col text-subtitle1 ellipsis">{{ title }}</div>
        </div> -->

        <div class="col-12 q-mb-md">
          <label for="" class="mb-2 block">Select the reason for cancellation</label>
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
      </div>
      <div
        class="relative w-full bottom-0 right-0 w-full flex items-center justify-center"
      >
        <q-btn
          color="secondary"
          @click="onCancel"
          :loading="loading"
          :disable="loading"
          no-caps
          class="mx-2 w-16"
        >
          {{ $t($L.ACTIONS.OK) }}
        </q-btn>
        <q-btn
          color="red"
          class="mx-2 w-16"
          no-caps
          outline
          v-close-popup
          :disable="loading"
        >
          {{ $t($L.ACTIONS.CANCEL) }}
        </q-btn>
      </div>
    </div>
  </div>
  <!-- <q-dialog v-model="isOpen" persistent class="dark-modal" full-width> </q-dialog> -->
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
    const invisible = ref("invisible");
    const opacity = ref("opacity-0");
    const translateX = ref("translate-x-full");

    function toggleSlideOver() {
      if (invisible.value == "invisible") invisible.value = "";
      else invisible.value = "invisible";
      if (opacity.value == "opacity-0") opacity.value = "opacity-50";
      else opacity.value = "opacity-0";
      if (translateX.value == "translate-x-full") translateX.value = "";
      else translateX.value = "translate-x-full";
      emit("update:modelValue", false);
    }

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
            toggleSlideOver();
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
        emit("update:modelValue", value);
        toggleSlideOver();
      },
    });
    //#endregion

    //#region  ### watch ###
    watch(
      () => isOpen.value,
      (newVal) => {
        if (newVal) {
          toggleSlideOver();
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
      toggleSlideOver,
      invisible,
      opacity,
      translateX,
    };
  },
});
</script>
