<template>
  <div ref="target" id="nav"></div>
  <div class="sticky-menu" :class="{ sticking }">
    <q-tabs
      v-model="tab"
      narrow-indicator
      dense
      align="justify"
      class="bg-dark text-gray top-tabs"
      active-color="white"
      no-caps
    >
      <q-tab name="all" :label="$t($L.GENERAL.ALL)" />
      <q-tab name="income" :label="$t($L.GENERAL.INCOME)" />
      <q-tab name="withdraw" :label="$t($L.GENERAL.WITHDRAW)" />
    </q-tabs>
  </div>
  <div class="top-radius"></div>
  <div class="transaction-container">
    <q-tab-panels v-model="tab" animated class="q-mt-sm">
      <q-tab-panel name="all"><app-all-transaction></app-all-transaction></q-tab-panel>
      <q-tab-panel name="income">
        <app-income-transaction></app-income-transaction>
      </q-tab-panel>
      <q-tab-panel name="withdraw">
        <app-withdraw-transaction></app-withdraw-transaction>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, defineAsyncComponent } from "vue";

export default defineComponent({
  components: {
    AppAllTransaction: defineAsyncComponent(() => import("./AllTransaction.vue")),
    AppIncomeTransaction: defineAsyncComponent(() => import("./IncomeTransaction.vue")),
    AppWithdrawTransaction: defineAsyncComponent(
      () => import("./withdrawTransaction.vue")
    ),
  },
  setup() {
    const target = ref();
    const sticking = ref(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        sticking.value = !entry.isIntersecting;
      },
      { threshold: 0.0 }
    );

    onMounted(() => {
      observer.observe(target.value);
    });
    return {
      tab: ref("all"),
      target,
      sticking,
    };
  },
});
</script>
