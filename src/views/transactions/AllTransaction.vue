<template>
  <q-table
    class="base-tb"
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
      <div v-if="props.row.price > 0" class="transaction-row income w-100">
        <div class="transaction-icon">
          <q-icon name="south_east" size="xs"></q-icon>
        </div>
        <div>
          <span class="title">{{ $t($L.GENERAL.WITHDRAW_WALLET) }}</span>
          <span class="title">{{ props.row.customerName }}</span>
          <span class="date-time">{{ props.row.createDateTime }}</span>
        </div>
        <q-space />
        <div>
          <span class="amount">+ {{ props.row.price }} USD </span>
          <span class="status">{{ props.row.status }} </span>
        </div>
      </div>
      <div v-else class="transaction-row withdraw w-100">
        <div class="transaction-icon">
          <q-icon name="north_west" size="xs"></q-icon>
        </div>
        <div>
          <span v-if="props.row.orderCode" class="title">
            Order #{{ props.row.orderCode }}
          </span>
          <span class="title">{{ props.row.customerName }}</span>
          <span class="date-time">{{ props.row.createDateTime }}</span>
        </div>
        <q-space />
        <div>
          <span class="amount"> {{ props.row.price }} USD </span>
          <span class="status">{{ props.row.status }} </span>
        </div>
      </div>

      <q-separator class="w-100" />
    </template>
  </q-table>
  <q-page-sticky
    position="bottom-right"
    :offset="[18, 18]"
    class="float-action"
    style="z-index: 11"
  >
    <q-fab v-model="fab1" color="dark" icon="search" direction="left" @click="openSearch">
    </q-fab>
  </q-page-sticky>
  <app-search-modal v-model="openSearchModal" @closeFab="closeFab" @onFilter="doFilter">
  </app-search-modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, defineAsyncComponent } from "vue";
import { cid, container } from "inversify-props";
import { TransactionService } from "src/core/services";
import { QuasarTable, RequestProp } from "src/core/viewModels/quasar";
import { $t, L } from "src/commons";
import { FilterVm } from "src/core/viewModels/table";

export default defineComponent({
  components: {
    AppSearchModal: defineAsyncComponent(() => import("./SearchTransaction.vue")),
  },
  setup() {
    const transactionService = container.get<TransactionService>(cid.TransactionService);
    const quasarTable = ref(new QuasarTable());
    const fab1 = ref(false);
    const openSearchModal = ref(false);

    quasarTable.value.columns = [
      {
        name: "orderCode",
        label: $t(L.MODEL.TRANSACTION.ORDER_CODE),
        field: "orderCode",
      },
      {
        name: "customerName",
        label: $t(L.MODEL.TRANSACTION.CUSTOMER_NAME),
        field: "customerName",
      },
      {
        name: "createDateTime",
        label: $t(L.MODEL.TRANSACTION.CREATE_DATE_TIME),
        field: "createDateTime",
      },
      {
        name: "price",
        label: $t(L.MODEL.TRANSACTION.PRICE),
        field: "price",
      },
      {
        name: "description",
        label: $t(L.MODEL.TRANSACTION.DESCRIPTION),
        field: "description",
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
