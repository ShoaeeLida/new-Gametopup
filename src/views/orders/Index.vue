<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="border-b border-gray-200">
      <div class="sm:flex sm:items-baseline">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Orders</h3>
        <div class="mt-4 !overflow-x-auto overflow-y-hidden sm:mt-0 sm:ml-10">
          <q-tabs
            v-model="tab"
            narrow-indicator
            align="justify"
            no-caps
            active-color="indigo-13"
          >
            <q-tab name="new" :label="$t($L.GENERAL.NEW)" />
            <q-tab name="inProgress" label="Assigned to me" />
            <q-tab name="canceled" label="Canceled" />
            <q-tab name="completed" label="Completed" />
          </q-tabs>
        </div>
      </div>
    </div>
    <div class="mt-5 w-full overflow-x-auto bg-white shadow sm:rounded-md">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="new">
          <app-new-orders></app-new-orders>
        </q-tab-panel>
        <q-tab-panel name="inProgress">
          <app-in-progress-orders></app-in-progress-orders>
        </q-tab-panel>
        <q-tab-panel name="canceled">
          <app-refund-orders></app-refund-orders>
        </q-tab-panel>
        <q-tab-panel name="completed">
          <app-done-orders></app-done-orders>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: {
    AppNewOrders: defineAsyncComponent(() => import("./NewOrders.vue")),
    AppInProgressOrders: defineAsyncComponent(() => import("./InProgressOrders.vue")),
    AppRefundOrders: defineAsyncComponent(() => import("./RefundOrders.vue")),
    AppDoneOrders: defineAsyncComponent(() => import("./DoneOrders.vue")),
  },
  setup() {
    // const target = ref();
    const sticking = ref(false);
    // const observer = new IntersectionObserver(
    //   ([entry]) => {
    //     sticking.value = !entry.isIntersecting;
    //   },
    //   { threshold: 0.0 }
    // );

    onMounted(() => {
      // observer.observe(target.value);
    });
    return {
      tab: ref("new"),
      // target,
      sticking,
    };
  },
});
</script>
