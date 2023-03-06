<template>
  <q-card>
    <q-form
      @submit="$emit('submit')"
      @reset="$emit('reset')"
      :autocomplete="autocomplete"
    >
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6"><q-icon name="add" size="md"></q-icon> {{ title }}</div>
          <q-space />
          <q-btn icon="close" color="red" flat round dense v-close-popup />
        </div>
      </q-card-section>

      <slot name="body"></slot>

      <q-card-section align="right" class="text-primary q-mb-sm">
        <q-btn
          :label="$t($L.ACTIONS.CANCEL)"
          class="text-dark bg-white"
          no-caps
          type="reset"
        />
        <q-btn
          :label="$t($L.ACTIONS.EDIT)"
          color="secondary"
          class="q-ml-sm"
          no-caps
          type="submit"
          icon-right="edit"
        >
        </q-btn>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
    autocomplete: {
      default: "",
      type: String as PropType<"on" | "off">,
    },
  },
  setup() {
    return {};
  },
});
</script>
