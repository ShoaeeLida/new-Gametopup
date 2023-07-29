<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="border-b border-gray-200">
      <div class="my-1 sm:flex sm:items-baseline">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Order summarize</h3>
      </div>
    </div>
    <div class="mt-5 w-full overflow-x-auto bg-white shadow sm:rounded-md">
      <div class="mx-auto mb-6 max-w-6xl">
        <div class="px-6 lg:px-8">
          <div class="mt-8 flow-root">
            <div class="mt-5 overflow-hidden bg-white">
              <div class="overflow-x-auto">
                <!-- body -->
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <q-select
                      class="'block sm:leading-4' w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      outlined
                      v-model="reportParameterModel.userId"
                      :options="userList"
                      label="Select User"
                      emit-value
                      map-options
                    />
                  </div>
                  <div>
                    <q-select
                      class="'block sm:leading-4' w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      outlined
                      v-model="reportParameterModel.customerId"
                      :options="customerList"
                      label="Select customer"
                      emit-value
                      map-options
                    />
                  </div>
                  <div>
                    <q-select
                      class="'block sm:leading-4' w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      outlined
                      v-model="reportParameterModel.status"
                      :options="statusList"
                      label="Select Status"
                      :emit-value="true"
                      map-options
                    />
                  </div>
                  <div>
                    <label for="">Start date</label>
                    <q-input
                      outlined
                      v-model="reportParameterModel.startDate"
                      @keyup.enter="onSubmit"
                      :clearable="true"
                      title="Start date"
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
                    <label for="">End date</label>
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
                                aria-placeholder="hi"
                              ></q-date>
                            </div>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div>
                    <button
                      @click="onSubmit"
                      class="ml-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    >
                      View
                    </button>
                  </div>
                </div>

                <div class="mt-7">
                  <!-- <template v-for="(item, index) in reportList" :key="index">
                    <div
                      class="relative mt-3 rounded-lg border border-gray-300 bg-white py-5 px-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                    >
                      <span class="block"
                        >Category:<b class="ml-2 text-base font-bold text-indigo-600">{{
                          item.productCategory
                        }}</b></span
                      >

                      <span class="mt-3 ml-0 block">
                        Product:<b class="ml-2 text-base font-bold text-indigo-600">{{
                          item.product
                        }}</b>
                      </span>

                      <div class="mt-2 ml-0 flex items-center justify-between">
                        <span
                          >Sum:<b class="ml-2 text-base font-bold text-indigo-600">{{
                            item.totalSume
                          }}</b></span
                        >
                        <span
                          >Count:<b class="ml-2 text-base font-bold text-indigo-600">{{
                            item.totalCount
                          }}</b></span
                        >
                      </div>
                    </div>
                  </template> -->

                  <!-- table -->
                  <table v-if="lastList.length > 0" class="min-w-full">
                    <thead class="bg-white">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Total Count
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Total Sum
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                      <template v-for="(item, index) in lastList" :key="index">
                        <tr class="border-t border-gray-200">
                          <th
                            colspan="5"
                            scope="colgroup"
                            class="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-indigo-600 sm:pl-3"
                          >
                            {{ item.cat }}
                          </th>
                        </tr>
                        <template v-for="(it, index) in item.product" :key="index">
                          <tr class="border-t border-gray-300">
                            <td
                              class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                            >
                              {{ it.product }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {{ it.totalCount }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {{ it.totalSume }}
                            </td>
                          </tr>
                        </template>
                      </template>
                    </tbody>
                  </table>
                  <template v-else>
                    <p class="text-gray-400 font-bold block mt-5 text-center">
                      No Data Found
                    </p>
                  </template>
                  <!-- end table -->
                </div>
              </div>
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
import { MessageTypeEnum, Utility } from "src/commons";
import { plainToInstance } from "class-transformer";
//import { QuasarTable } from "src/core/viewModels/quasar";

export default defineComponent({
  setup() {
    const userManagerService = container.get<UserManagerService>(cid.UserManagerService);
    const orderService = container.get<OrderService>(cid.OrderService);
    const userList = ref<Array<DropDownVm>>([]);
    const customerList = ref<Array<DropDownVm>>([]);
    const statusList = ref<Array<DropDownVm>>([]);
    const reportList = ref<Array<ReportOrderByUserVm>>([]);
    const reportParameterModel = ref(new ReportByUserParameterVm());

    class listProduct {
      "cat": string;
      "product": Array<ReportOrderByUserVm>;
    }
    const lastList = ref<Array<listProduct>>([]);

    async function onSubmit() {
      if (
        Date.parse(reportParameterModel.value.startDate) >
        Date.parse(reportParameterModel.value.endDate)
      ) {
        Utility.showNotification(MessageTypeEnum.Danger, "please select correct date");
        return;
      }
      var response = await orderService.getReportByUser(reportParameterModel.value);
      var result = response.data.reduce(function (r, a) {
        r[a.productCategory] = r[a.productCategory] || [];
        r[a.productCategory].push(a as ReportOrderByUserVm);
        return r;
      }, Object.create(null));
      var list = Object.entries(result);
      var dt = list.map((a) => {
        return { cat: a[0], product: a[1] as ReportOrderByUserVm };
      });
      lastList.value = plainToInstance(listProduct, dt);
    }

    async function getUser() {
      userList.value = await userManagerService.getUserTenant();
    }
    async function getCustomer() {
      customerList.value = await userManagerService.getCustomer();
    }
    async function getStatus() {
      statusList.value = await orderService.ddlStatusAsync();
      // reportParameterModel.value.status = statusList.value
      //   .find((x) => x.label == "Done")
      //   ?.value.toString();
    }

    onMounted(async () => {
      await getUser();
      await getStatus();
      await getCustomer();
    });

    return {
      onSubmit,
      reportParameterModel,
      userList,
      statusList,
      reportList,
      listProduct,
      lastList,
      customerList,
    };
  },
});
</script>
