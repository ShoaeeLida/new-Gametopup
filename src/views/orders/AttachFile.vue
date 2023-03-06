<template>
  <q-dialog v-model="isOpen" full-width persistent>
    <q-card class="my-card">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col ellipsis bold">
            {{ $t($L.GENERAL.ORDER_COMPLETION) }} {{ code }}
          </div>
          <q-space />
          <q-btn
            icon="close"
            color="red"
            flat
            round
            dense
            v-close-popup
            :disable="loading"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row flex q-col-gutter-sm">
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

          <div class="col-md-6 col-12">
            <q-input
              dense
              v-model="orderConfirmationModel.description"
              :label="$t($L.GENERAL.DESCRIPTION)"
              type="textarea"
              dir="ltr"
              outlined
            />
          </div>

          <div class="col-12 flex justify-end">
            <q-btn
              :label="$t($L.ACTIONS.OK)"
              color="secondary"
              @click="confirmOrder"
              :loading="loading"
              :disable="loading"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
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
    // const v$ = orderConfirmModel.value.v$(orderConfirmModel);
    const loading = ref(false);

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
    };
  },
});
</script>
