<template>
  <q-dialog
    v-model="isOpen"
    class="dark-modal"
    full-width
    @before-show="onReset"
    persistent
  >
    <q-card>
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">
            <q-icon name="arrow_outward" size="md"></q-icon>
            {{ $t($L.GENERAL.WITHDRAW_CONFIRMATION) }}
          </div>
          <q-space />
          <q-btn icon="close" color="red" flat round dense v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-12">
            <strong> {{ $t($L.GENERAL.WITHDRAW_CHECK_MESSAGE) }}</strong>
          </div>
          <div class="col-12 q-mt-lg">
            <span style="color: #a5a5a5"> {{ $t($L.GENERAL.WITHDRAW_TIME_DONE) }}</span>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-12 q-mt-md">
            <q-input
              outlined
              v-model="amountW"
              autofocus
              :placeholder="$t($L.MODEL.WITHDRAW.REQUEST.AMOUNT)"
              readonly
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>
          <div class="col-12 q-mt-md">
            <q-input
              outlined
              v-model="addressW"
              autofocus
              :placeholder="$t($L.MODEL.WITHDRAW.REQUEST.WALLET_ADDRESS)"
              readonly
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>
          <div class="col-12 q-mt-md">
            <q-checkbox
              v-model="accept"
              :label="$t($L.GENERAL.WITHDRAW_CONFIRM_ACCEPT)"
              dark
            />
          </div>
          <div class="col-12 q-my-lg text-center">
            <q-btn
              :label="$t($L.ACTIONS.CONFIRM_WITHDRAW)"
              color="secondary"
              class="q-ml-sm"
              no-caps
              size="lg"
              @click="onSubmit"
            >
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    address: {
      type: String,
      default: "",
      required: true,
    },
    amount: {
      type: String,
      default: "",
      required: true,
    },
  },
  emits: ["update:modelValue", "onConfirm"],
  setup(props, { emit }) {
    const accept = ref(false);
    const isOpen = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit("update:modelValue", value);
      },
    });

    const amountW = computed({
      get: () => {
        return props.amount;
      },
      set: () => {
        //
      },
    });

    const addressW = computed({
      get: () => {
        return props.address;
      },
      set: () => {
        //
      },
    });

    async function onSubmit() {
      if (accept.value == false) {
        return;
      }
      emit("onConfirm");
      emit("update:modelValue", false);
    }

    function onReset() {
      amountW.value = "";
      addressW.value = "";
      accept.value = false;
    }

    return {
      isOpen,
      onSubmit,
      amountW,
      addressW,
      accept,
      onReset,
    };
  },
});
</script>
