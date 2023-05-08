<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Transactions</h3>
      <div class="mt-3 sm:mt-0 sm:ml-4">
        <button
          type="button"
          class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="mr-1 h-4 w-4"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clip-rule="evenodd"
            />
          </svg>
          Search Results
        </button>
      </div>
    </div>
    <div class="mt-5 overflow-hidden bg-white shadow sm:rounded-md">
      <div class="overflow-x-auto">
        <q-table
          class="min-w-full divide-y divide-gray-300 !text-left"
          row-key="id"
          :rows="quasarTable.rows"
          :columns="quasarTable.columns"
          v-model:pagination="quasarTable.pagination"
          :loading="quasarTable.loading"
          :filter="quasarTable.filter"
          @request="fillDataTable"
        >
          <template v-slot:body-cell-description="props">
            <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm">
              <div class="flex items-center">
                <div v-if="props.row.price > 0" class="h-10 w-10 flex-shrink-0">
                  <span
                    class="flex h-10 w-10 place-items-center justify-center rounded-full bg-green-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                      stroke="currentColor"
                      class="h-4 w-4 stroke-green-800"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </span>
                </div>
                <div v-else class="h-10 w-10 flex-shrink-0">
                  <span
                    class="flex h-10 w-10 place-items-center justify-center rounded-full bg-red-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                      stroke="currentColor"
                      class="h-4 w-4 stroke-red-900"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 12h-15"
                      />
                    </svg>
                  </span>
                </div>
                <div class="ml-4">
                  <div class="font-medium text-gray-900">
                    {{ props.row.createDateTime }}
                  </div>
                  <div class="text-gray-500">
                    Deposit from
                    <span class="text-red-600">{{ props.row.customerName }}</span>
                  </div>
                </div>
              </div>
            </td>
          </template>
          <template v-slot:body-cell-price="props">
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div class="text-gray-900">{{ props.row.price }} USD</div>
            </td>
          </template>
          <template v-slot:body-cell-status="props">
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <span
                v-if="props.row.price > 0"
                class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
              >
                {{ props.row.status }}
              </span>
              <span
                v-else
                class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800"
              >
                {{ props.row.status }}
              </span>
            </td>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { cid, container } from "inversify-props";
import { TransactionService } from "src/core/services";
import { QuasarTable, RequestProp } from "src/core/viewModels/quasar";
import { $t, L } from "src/commons";
import { FilterVm } from "src/core/viewModels/table";

export default defineComponent({
  setup() {
    const transactionService = container.get<TransactionService>(cid.TransactionService);
    const quasarTable = ref(new QuasarTable());
    const fab1 = ref(false);
    const openSearchModal = ref(false);

    quasarTable.value.columns = [
      {
        name: "description",
        label: $t(L.MODEL.TRANSACTION.DESCRIPTION),
        field: "description",
      },
      {
        name: "price",
        label: "Amount",
        field: "price",
      },

      {
        name: "status",
        label: $t(L.MODEL.TRANSACTION.STATUS),
        field: "status",
      },
    ];

    async function fillDataTable(
      props: RequestProp = transactionService.currentAllRequestProp
    ) {
      props.pagination.sortBy = "createDateTime";
      props.pagination.descending = true;
      var response = await transactionService.listAllAsync(props);
      quasarTable.value.setData(
        response.data,
        response.total,
        transactionService.currentAllRequestProp.pagination
      );
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
    async function doFilter(customerId: string, startDate: string, endDate: string) {
      if (
        (customerId == "" || customerId == null) &&
        (startDate == "" || startDate == null) &&
        (endDate == "" || endDate == null)
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

      if (startDate) {
        filter.filters.push(
          new FilterVm({
            field: "createDateTime",
            value: startDate,
            operator: "GreaterThanEqual",
          })
        );
      }
      if (endDate) {
        filter.filters.push(
          new FilterVm({
            field: "createDateTime",
            value: endDate,
            operator: "LessThanEqual",
          })
        );
      }

      let requestProp = new RequestProp();
      requestProp.pagination.rowsPerPage = 20;
      requestProp.pagination.sortBy = "";
      requestProp.pagination.descending = false;
      requestProp.filterHeader = filter;
      await fillDataTable(requestProp);
      closeFab();
    }

    function closeFab() {
      fab1.value = false;
    }

    function openSearch() {
      openSearchModal.value = true;
    }

    onMounted(async () => {
      transactionService.currentAllRequestProp.setToFirstPage();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      syncDataTable();
    });
    onBeforeUnmount(() => {
      stopSyncing = true;
    });
    return {
      fillDataTable,
      tab: ref("all"),
      quasarTable,
      closeFab,
      openSearch,
      openSearchModal,
      doFilter,
      fab1,
    };
  },
});
</script>
