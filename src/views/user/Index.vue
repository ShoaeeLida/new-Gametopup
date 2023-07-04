<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="border-b border-gray-200">
      <div class="sm:flex sm:items-baseline">
        <div class="mt-4 !overflow-x-auto overflow-y-hidden sm:mt-0">
          <q-tabs
            v-model="tab"
            narrow-indicator
            align="justify"
            no-caps
            active-color="indigo-13"
            inline-label
          >
            <q-tab name="myAccount" label="My Account" icon="person" />
            <q-tab name="teamMember" label="Team Members" icon="people" />
            <q-tab name="botSetting" label="Bot Settings" icon="electric_bolt" />
          </q-tabs>
        </div>
      </div>
    </div>
    <div class="mt-5 w-full overflow-x-auto bg-white shadow sm:rounded-md">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="myAccount">
          <app-setting></app-setting>
        </q-tab-panel>
        <q-tab-panel name="teamMember">
          <app-team></app-team>
        </q-tab-panel>
        <q-tab-panel name="botSetting">
          <app-bot-setting></app-bot-setting>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: {
    AppSetting: defineAsyncComponent(() => import("./Setting.vue")),
    AppTeam: defineAsyncComponent(() => import("./TeamMember.vue")),
    AppBotSetting: defineAsyncComponent(() => import("./BotSetting.vue")),
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
      tab: ref("myAccount"),
      // target,
      sticking,
    };
  },
});
</script>
