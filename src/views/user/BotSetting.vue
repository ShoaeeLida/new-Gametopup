<template>
  <div class="mx-auto max-w-6xl mb-6">
    <div class="px-6 lg:px-8">
      <div class="mt-8 flow-root">
        <div class="mt-5 overflow-hidden bg-white shadow sm:rounded-md">
          <div class="overflow-x-auto">
            <!-- body -->
            <div class="flex flex-col">
              <q-checkbox v-model="placeOrder" label="Place order closed" />
              <button
                type="button"
                class="mt-5 block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="saveChange"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { cid, container } from "inversify-props";
import { TenantService } from "src/core/services";
import { Utility } from "src/commons";

export default defineComponent({
  setup() {
    const tenantService = container.get<TenantService>(cid.TenantService);
    const placeOrder = ref(false);

    async function getSettings() {
      placeOrder.value = await tenantService.getOrderRegistrationAsync();
    }

    async function saveChange() {
      var result = await tenantService.setOrderRegistrationAsync(placeOrder.value);
      Utility.showNotification(result.status, result.message);
    }

    onMounted(async () => {
      await getSettings();
    });

    return {
      placeOrder,
      saveChange,
    };
  },
});
</script>
