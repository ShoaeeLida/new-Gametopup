<template>
  <h1></h1>
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
      props: RequestProp = orderService.currentNewOrderRequestProp
    ) {
      props.pagination.sortBy = "createDateTime";
      props.pagination.descending = true;
      var response = await orderService.tableNewAsync(props);

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
      orderService.currentNewOrderRequestProp.setToFirstPage();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      syncDataTable();
    });

    return {
      fillDataTable,
      tab: ref("new"),

      txt: ref(""),
      dropdown: ref(""),
      quasarTable,
      takeOrder,
      closeFab,
      openSearch,
      openSearchModal,
      doFilter,
      fab1,
    };
  },
});
</script>
