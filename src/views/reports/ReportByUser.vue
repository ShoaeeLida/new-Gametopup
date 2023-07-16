<template>
  <div class="mx-auto mb-6 max-w-6xl">
    <div class="px-6 lg:px-8">
      <div class="mt-8 flow-root">
        <div class="mt-5 overflow-hidden bg-white">
          <div class="overflow-x-auto">
            <!-- body -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <q-select
                  class="'block sm:leading-4' w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  outlined
                  v-model="reportParameterModel.userId"
                  :options="userList"
                  emit-value
                  map-options
                  label="Select User"
                />
              </div>
              <div>
                <q-select
                  class="'block sm:leading-4' w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  outlined
                  v-model="reportParameterModel.status"
                  :options="statusList"
                  emit-value
                  map-options
                  label="Select Status"
                />
              </div>
              <div>
                <q-input
                  outlined
                  v-model="reportParameterModel.startDate"
                  @keyup.enter="onSubmit"
                  :clearable="true"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        class="shadow"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <div class="row">
                          <q-date
                            class="calendar-wrap"
                            v-model="reportParameterModel.startDate"
                            today-btn
                          ></q-date>
                        </div>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div>
                <q-input
                  outlined
                  v-model="reportParameterModel.endDate"
                  @keyup.enter="onSubmit"
                  :clearable="true"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        class="shadow"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <div class="row">
                          <q-date
                            class="calendar-wrap"
                            v-model="reportParameterModel.endDate"
                            today-btn
                          ></q-date>
                        </div>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="basis-1/4">
                <button
                  @click="onSubmit"
                  class="flex justify-center items-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                  View
                </button>
              </div>
            </div>

            <div class="mt-4">
              <template v-for="(item, index) in reportList" :key="index">
                <div
                  class="relative mt-3 rounded-lg border border-gray-300 bg-white py-5 px-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                >
                  <span class="block"
                    >Category:<b class="ml-2 text-indigo-600 font-bold text-base">{{
                      item.productCategory
                    }}</b></span
                  >

                  <span class="block mt-3 ml-0">
                    Product:<b class="ml-2 text-indigo-600 font-bold text-base">{{
                      item.product
                    }}</b>
                  </span>

                  <div class="flex mt-2 justify-between items-center ml-0">
                    <span
                      >Sum:<b class="ml-2 text-indigo-600 font-bold text-base">{{
                        item.totalSume
                      }}</b></span
                    >
                    <span
                      >Count:<b class="ml-2 text-indigo-600 font-bold text-base">{{
                        item.totalCount
                      }}</b></span
                    >
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import {
  DropDownVm,
  ReportByUserParameterVm,
  ReportOrderByUserVm,
} from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { UserManagerService, OrderService } from "src/core/services";

export default defineComponent({
  setup() {
    const userManagerService = container.get<UserManagerService>(cid.UserManagerService);
    const orderService = container.get<OrderService>(cid.OrderService);
    const userList = ref<Array<DropDownVm>>([]);
    const statusList = ref<Array<DropDownVm>>([]);
    const reportList = ref<Array<ReportOrderByUserVm>>([]);
    const reportParameterModel = ref(new ReportByUserParameterVm());

    async function onSubmit() {
      var result = await orderService.getReportByUser(reportParameterModel.value);
      reportList.value = result.data;
    }

    async function getUser() {
      userList.value = await userManagerService.getUserTenant();
    }
    async function getStatus() {
      statusList.value = await orderService.ddlStatusAsync();
    }

    onMounted(async () => {
      await getUser();
      await getStatus();
    });

    return {
      onSubmit,
      reportParameterModel,
      userList,
      statusList,
      reportList,
    };
  },
});
</script>
