<template>
  <div id="slideOver-container" :class="['fixed inset-0 h-full w-full', invisible]">
    <div
      @click="toggleSlideOver"
      id="slideOver-bg"
      :class="[
        'absolute inset-0 h-full w-full bg-gray-900 transition-all duration-500 ease-out ',
        opacity,
      ]"
    ></div>
    <div
      id="slideOver"
      :class="[
        'absolute right-0 h-full w-96 overflow-y-auto bg-white transition-all duration-300 ease-out',
        translateX,
      ]"
    >
      <div
        @click="toggleSlideOver"
        class="absolute top-0 right-0 mt-5 mr-5 flex h-8 w-8 cursor-pointer items-center justify-center text-gray-600"
      >
        <svg
          class="h-6 w-6"
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
      <div class="mt-14 px-12 py-6">
        <div class="row q-col-gutter-sm flex">
          <div class="col-12">
            <span style="display: block" class="q-mb-sm text-subtitle2">
              {{ $t($L.GENERAL.FILE) }}
            </span>

            <q-uploader
              :url="uploadUrl"
              :headers="[
                {
                  name: 'Authorization',
                  value: authentication,
                },
              ]"
              color="primary"
              flat
              bordered
              :auto-upload="true"
              :hide-upload-btn="true"
              style="width: 100%; max-height: 100px; overflow: hidden"
              @uploaded="uploadedFirst"
              @failed="failedUpload"
              :disable="loading"
            />
          </div>

          <div class="col-12">
            <span style="display: block" class="q-mb-sm text-subtitle2">
              {{ $t($L.GENERAL.FILE) }}
            </span>
            <q-uploader
              :url="uploadUrl"
              :headers="[
                {
                  name: 'Authorization',
                  value: authentication,
                },
              ]"
              color="primary"
              flat
              bordered
              :auto-upload="true"
              :hide-upload-btn="true"
              style="width: 100%; max-height: 100px; overflow: hidden"
              @uploaded="uploadedSecond"
              @failed="failedUpload"
              :disable="loading"
            />
          </div>

          <div class="col-12">
            <span style="display: block" class="q-mb-sm text-subtitle2">
              {{ $t($L.GENERAL.FILE) }}
            </span>
            <q-uploader
              :url="uploadUrl"
              :headers="[
                {
                  name: 'Authorization',
                  value: authentication,
                },
              ]"
              color="primary"
              flat
              bordered
              :auto-upload="true"
              :hide-upload-btn="true"
              style="width: 100%; max-height: 100px; overflow: hidden"
              @uploaded="uploadedThird"
              @failed="failedUpload"
              :disable="loading"
            />
          </div>

          <div class="col-12">
            <q-input
              dense
              v-model="orderConfirmationModel.description"
              :label="$t($L.GENERAL.DESCRIPTION)"
              type="textarea"
              dir="ltr"
              outlined
              class="w-full"
            />
          </div>

          <div class="col-12 mt-5 flex justify-center">
            <q-btn
              :label="$t($L.ACTIONS.OK)"
              color="secondary"
              @click="confirmOrder"
              :loading="loading"
              :disable="loading"
              class="w-16"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { LOCAL_STORAGE, MessageTypeEnum, Utility, $t, L } from "src/commons";
import { LocalStorage } from "quasar";
import { cid, container } from "inversify-props";
import { OrderService } from "src/core/services";
import { OrderConfirmationVm } from "src/core/viewModels";

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
    code: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue", "onRegister"],
  setup(props, { emit }) {
    const orderService = container.get<OrderService>(cid.OrderService);
    const authentication = ref("");
    const token = LocalStorage.getItem(LOCAL_STORAGE.TOKEN) as string;
    authentication.value = `Bearer ${token}`;
    const uploadUrl = `${process.env.VUE_APP_BASE_API_URL}/file/upload`;

    const orderConfirmationModel = ref(new OrderConfirmationVm());
    const loading = ref(false);
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

    //#region ### computed ###
    const isOpen = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit("update:modelValue", value);
        reset();
      },
    });

    //#region  ### watch ###
    watch(
      () => isOpen.value,
      (newVal) => {
        if (newVal) {
          toggleSlideOver();
        }
      }
    );
    //#endregion

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function uploadedFirst(info: any) {
      orderConfirmationModel.value.attachment1 = JSON.parse(info.xhr.response)
        .data as string;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function uploadedSecond(info: any) {
      orderConfirmationModel.value.attachment2 = JSON.parse(info.xhr.response)
        .data as string;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function uploadedThird(info: any) {
      orderConfirmationModel.value.attachment3 = JSON.parse(info.xhr.response)
        .data as string;
    }

    async function confirmOrder() {
      loading.value = true;
      var response = await orderService.doAsync(props.id, orderConfirmationModel.value);
      Utility.showNotification(response.status, response.joinedErrors);
      loading.value = false;
      emit("update:modelValue", false);
      emit("onRegister");
      reset();
      toggleSlideOver();
    }

    function reset() {
      orderConfirmationModel.value = new OrderConfirmationVm();
    }

    function failedUpload() {
      Utility.showNotification(MessageTypeEnum.Warning, $t(L.MESSAGE.FAILED_UPLOAD));
    }
    //#endregion

    return {
      uploadedFirst,
      uploadedSecond,
      uploadedThird,
      isOpen,
      authentication,
      confirmOrder,
      failedUpload,
      loading,
      uploadUrl,
      orderConfirmationModel,
      toggleSlideOver,
      invisible,
      opacity,
      translateX,
    };
  },
});
</script>
