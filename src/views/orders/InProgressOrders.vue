<template>
  <q-table
    row-key="id"
    :rows="quasarTable.rows"
    :columns="quasarTable.columns"
    v-model:pagination="quasarTable.pagination"
    :loading="quasarTable.loading"
    :filter="quasarTable.filter"
    @request="fillDataTable"
    grid
  >
    <template v-slot:item="props">
      <div
        class="flex px-4 py-4 sm:px-6 hover:bg-gray-50 place-items-top flex-col sm:flex-row border-b border-gray-200 w-full"
      >
        <div class="flex-1 mr-0 sm:mr-5">
          <div class="flex items-center justify-between">
            <p class="truncate text-sm font-medium text-indigo-600">
              {{ props.row.productTitle }}
            </p>
          </div>
          <div class="mt-2 flex justify-between flex-wrap">
            <p class="mt-2 mr-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:mr-2">
              <svg
                class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ props.row.createdDateTime }}
            </p>
            <p class="mt-2 mr-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              >
                <path
                  d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
                />
                <path
                  d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
                />
              </svg>
              {{ props.row.accountUsername }}
            </p>
            <p class="mt-2 mr-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ props.row.accountPlatform }}
            </p>
            <p class="mt-2 mr-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              >
                <path
                  d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z"
                />
                <path
                  fill-rule="evenodd"
                  d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ props.row.customerName }}
            </p>
          </div>
        </div>
        <button
          type="button"
          class="mx-2 mt-5 sm:mt-0 justify-center inline-flex items-center rounded-md border border-transparent bg-green-400 p-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#fff"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
          <span class="ml-2 sm:hidden">Complete</span>
        </button>
        <button
          type="button"
          class="mx-2 mt-5 sm:mt-0 justify-center inline-flex items-center rounded-md border border-transparent bg-red-500 p-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#fff"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
            />
          </svg>
          <span class="ml-2 sm:hidden">Cancel</span>
        </button>
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { cid, container } from "inversify-props";
import { OrderService } from "src/core/services";
import { QuasarTable, RequestProp } from "src/core/viewModels/quasar";
import { $t, L, Utility } from "src/commons";
import { useQuasar } from "quasar";
import { FilterVm } from "src/core/viewModels/table";

export default defineComponent({
  setup() {
    const orderService = container.get<OrderService>(cid.OrderService);
    const quasarTable = ref(new QuasarTable());
    const $q = useQuasar();
    const openSearchModal = ref(false);

    async function fillDataTable(
      props: RequestProp = orderService.currentNewOrderRequestProp
    ) {
      props.pagination.sortBy = "createDateTime";
      props.pagination.descending = true;
      var response = await orderService.tableInProgressAsync(props);

      quasarTable.value.setData(
        response.data,
        response.total,
        orderService.currentNewOrderRequestProp.pagination
      );
    }
    async function takeOrder(id: string) {
      $q.dialog({
        message: $t(L.MESSAGE.SURE),
        cancel: true,
        persistent: true,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
      }).onOk(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result = await orderService.takeAsync(id);
        Utility.showNotification(result.status, result.joinedErrors);
        await fillDataTable(orderService.currentNewOrderRequestProp);
      });
    }
    let stopSyncing = false;
    async function syncDataTable() {
      while (!stopSyncing) {
        try {
          quasarTable.value.loading = true;
          await fillDataTable();
        } catch {
        } finally {
          quasarTable.value.loading = false;
          await Promise.delay(30_000);
        }
      }
    }
    async function doFilter(customerId: string, orderCode: string) {
      if (
        (customerId == "" || customerId == null) &&
        (orderCode == "" || orderCode == null)
      ) {
        stopSyncing = false;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        syncDataTable();
      } else {
        stopSyncing = true;
      }
      let filter = new FilterVm({ filters: new Array<FilterVm>() });

      if (customerId) {
        filter.filters.push(
          new FilterVm({
            field: "customerId",
            value: customerId,
          })
        );
      }

      if (orderCode) {
        filter.filters.push(
          new FilterVm({
            field: "code",
            value: orderCode,
          })
        );
      }

      let requestProp = new RequestProp();
      requestProp.pagination.rowsPerPage = 20;
      requestProp.pagination.sortBy = "";
      requestProp.pagination.descending = false;
      requestProp.filterHeader = filter;
      await fillDataTable(requestProp);
    }

    onMounted(async () => {
      orderService.currentNewOrderRequestProp.setToFirstPage();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      syncDataTable();
    });
    return {
      fillDataTable,
      txt: ref(""),
      dropdown: ref(""),
      quasarTable,
      takeOrder,
      openSearchModal,
      doFilter,
    };
  },
});
</script>
