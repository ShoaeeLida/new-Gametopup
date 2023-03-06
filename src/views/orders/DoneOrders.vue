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
      <q-card class="my-card order-card q-mb-lg w-100">
        <div class="flex items-center">
          <div>
            <span class="order-number">#{{ props.row.code }}</span>
            <span class="date-time">{{ props.row.createdDateTime }}</span>
            <strong class="order-title">{{ props.row.productTitle }}</strong>
          </div>
          <q-space />
          <!-- <div class="action-icon bg-secondary">
            <q-icon name="person_add_alt" size="xs"></q-icon>
          </div> -->
        </div>
        <div class="row q-mt-lg">
          <div class="col-6">
            <span class="account-info">
              <q-icon name="mail_outline">
                <q-tooltip>{{ $t($L.MODEL.ORDER.ACCOUNT_USERNAME) }}</q-tooltip>
              </q-icon>
              {{ props.row.accountUsername }}
            </span>
          </div>
          <!-- <div class="col-6">
            <span class="account-info">
              <q-icon name="lock_outline"></q-icon>
              {{ props.row.accountPassword }}
            </span>
          </div> -->
          <div class="col-6" v-if="props.row.accountName">
            <span class="account-info">
              <q-icon name="person_outline">
                <q-tooltip>{{ $t($L.MODEL.ORDER.ACCOUNT_NAME) }}</q-tooltip>
              </q-icon>
              {{ props.row.accountName }}
            </span>
            <!-- <span class="account-info" v-else>
              <q-icon name="person_outline"></q-icon>
              |FindMe|
            </span> -->
          </div>
          <div class="col-6">
            <span class="account-info">
              <q-icon name="save"
                ><q-tooltip>{{ $t($L.MODEL.ORDER.ACCOUNT_PLATFORM) }}</q-tooltip></q-icon
              >
              {{ props.row.accountPlatform }}
            </span>
          </div>
          <div class="col-6">
            <span class="account-info">
              <q-icon name="person"
                ><q-tooltip>{{ $t($L.MODEL.ORDER.CUSTOMER_NAME) }}</q-tooltip></q-icon
              >
              {{ props.row.customerName }}
            </span>
          </div>
        </div>
      </q-card>
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
  <app-search-modal
    v-model="openSearchModal"
    @closeFab="closeFab"
    @onFilter="doFilter"
  ></app-search-modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, defineAsyncComponent } from "vue";
import { cid, container } from "inversify-props";
import { OrderService } from "src/core/services";
import { QuasarTable, RequestProp } from "src/core/viewModels/quasar";
import { $t, L } from "src/commons";
import { FilterVm } from "src/core/viewModels/table";

export default defineComponent({
  components: {
    AppSearchModal: defineAsyncComponent(() => import("./SearchOrder.vue")),
  },
  setup() {
    const orderService = container.get<OrderService>(cid.OrderService);
    const quasarTable = ref(new QuasarTable());
    const fab1 = ref(false);
    const openSearchModal = ref(false);

    quasarTable.value.columns = [
      {
        name: "createdDateTime",
        label: $t(L.MODEL.ORDER.CREATED_DATE_TIME),
        field: "createdDateTime",
      },
      {
        name: "productTitle",
        label: $t(L.MODEL.ORDER.PRODUCT_TITLE),
        field: "productTitle",
      },
      {
        name: "code",
        label: $t(L.MODEL.ORDER.CODE),
        field: "code",
      },
      {
        name: "accountUsername",
        label: $t(L.MODEL.ORDER.ACCOUNT_USERNAME),
        field: "accountUsername",
      },
      {
        name: "accountPassword",
        label: $t(L.MODEL.ORDER.ACCOUNT_PASSWORD),
        field: "accountPassword",
      },
      {
        name: "accountName",
        label: $t(L.MODEL.ORDER.ACCOUNT_NAME),
        field: "accountName",
      },
      {
        name: "accountPlatform",
        label: $t(L.MODEL.ORDER.ACCOUNT_PLATFORM),
        field: "accountPlatform",
      },
    ];

    async function fillDataTable(
      props: RequestProp = orderService.currentDoneRequestProp
    ) {
      props.pagination.sortBy = "createDateTime";
      props.pagination.descending = true;
      var response = await orderService.tableDoneAsync(props);
      quasarTable.value.setData(
        response.data,
        response.total,
        orderService.currentDoneRequestProp.pagination
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
      closeFab();
    }

    function closeFab() {
      fab1.value = false;
      // console.log(fab1.value);
    }

    function openSearch() {
      openSearchModal.value = true;
    }

    onMounted(async () => {
      orderService.currentDoneRequestProp.setToFirstPage();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      syncDataTable();
    });

    return {
      fillDataTable,
      tab: ref("new"),
      txt: ref(""),
      search: ref(false),
      dropdown: ref(""),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
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
