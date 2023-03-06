<template>
  <q-dialog
    v-model="isOpen"
    class="dark-modal"
    full-width
    @hide="$emit('closeFab')"
    persistent
  >
    <q-card>
      <q-card-section class="q-mt-lg">
        <div class="row no-wrap items-center">
          <div class="text-h6">
            <q-icon name="search" size="md"></q-icon> {{ $t($L.GENERAL.SEARCH) }}
            {{ $t($L.GENERAL.TRANSACTION) }}
          </div>
          <q-space />
          <q-btn icon="close" color="red" flat round dense v-close-popup />
        </div>
      </q-card-section>

      <q-card-section class="q-mt-lg">
        <div class="row">
          <div class="col-12">
            <label class="q-mb-sm label-input">
              {{ $t($L.GENERAL.FROM) }}
            </label>
            <q-input id="from" filled v-model="from">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" @click="popupStartDate?.show">
                  <q-popup-proxy
                    ref="popupStartDate"
                    class="shadow"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <div class="row">
                      <q-date
                        class="calendar-wrap"
                        v-model="from"
                        today-btn
                        @update:model-value="hidePopup"
                      ></q-date>
                    </div>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <label class="q-mb-sm label-input">
              {{ $t($L.GENERAL.TO) }}
            </label>
            <q-input id="to" filled v-model="to">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" @click="popupEndDate?.show">
                  <q-popup-proxy
                    ref="popupEndDate"
                    class="shadow"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <div class="row">
                      <q-date
                        class="calendar-wrap"
                        v-model="to"
                        today-btn
                        @update:model-value="hidePopup"
                      ></q-date>
                    </div>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 q-mt-md">
            <q-select
              outlined
              v-model="customerId"
              :options="customerDdl"
              emit-value
              map-options
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section align="right" class="text-primary q-mb-sm">
        <q-btn
          :label="$t($L.ACTIONS.CLEAR)"
          class="text-dark bg-white"
          no-caps
          @click="onReset"
        />
        <q-btn
          :label="$t($L.ACTIONS.SEARCH)"
          color="secondary"
          class="q-ml-sm"
          no-caps
          @click="triggerFilter"
        >
          <q-icon name="search" class="q-ml-lg"></q-icon>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { OrderService } from "src/core/services";
import { cid, container } from "inversify-props";
import { QPopupProxy } from "quasar";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ["update:modelValue", "onFilter", "closeFab"],
  setup(props, { emit }) {
    const customerId = ref("");
    const orderService = container.get<OrderService>(cid.OrderService);
    const customerDdl = ref(orderService.ddlCustomer);

    const popupStartDate = ref<QPopupProxy | null>(null);
    const popupEndDate = ref<QPopupProxy | null>(null);
    const from = ref("");
    const to = ref("");

    function hidePopup() {
      popupStartDate.value?.hide();
      popupEndDate.value?.hide();
    }

    const isOpen = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit("update:modelValue", value);
        //onReset();
      },
    });
    function onReset() {
      from.value = "";
      to.value = "";
      customerId.value = "";
      emit("onFilter", customerId.value, from.value, to.value);
      emit("update:modelValue", false);
    }

    function triggerFilter() {
      emit("update:modelValue", false);
      emit("onFilter", customerId.value, from.value, to.value);
    }

    onMounted(async () => {
      customerDdl.value = await orderService.ddlCustomerAsync();
    });

    return {
      onReset,
      isOpen,
      search: ref(false),
      customerId,
      customerDdl,
      triggerFilter,
      hidePopup,
      popupStartDate,
      popupEndDate,
      from,
      to,
    };
  },
});
</script>
