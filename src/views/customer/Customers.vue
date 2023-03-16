<template>
  <div class="mx-auto max-w-6xl">
    <div class="px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Customers</h1>
          <p class="text-sm text-gray-700">
            A list of all the customers in your panel including their name, title, email
            and shop.
          </p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            class="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="openCreate"
          >
            Add a customer
          </button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="overflow-hidden bg-white shadow mt-5 sm:rounded-md">
          <div class="overflow-x-auto">
            <!-- <div class="inline-block min-w-full py-2 align-middle"> -->
            <q-table
              class="min-w-full divide-y divide-gray-300 !text-left"
              row-key="id"
              :rows="quasarTable.rows"
              :columns="quasarTable.columns"
              v-model:pagination="quasarTable.pagination"
              :loading="quasarTable.loading"
              :filter="quasarTable.filter"
              @request="fillCustomerList"
            >
              <template v-slot:body-cell-name="props">
                <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img
                        class="h-10 w-10 rounded-full"
                        src="../../assets/images/dynamic/igame-logo.jpg"
                        alt=""
                      />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">
                        {{ props.row.firstName }} {{ props.row.lastName }}
                      </div>
                      <div class="text-gray-500">{{ props.row.email }}</div>
                    </div>
                  </div>
                </td>
              </template>
              <template v-slot:body-cell-field="props">
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="text-gray-900">{{ props.row.field }}</div>
                  <div class="text-gray-500">{{ props.row.field }}</div>
                </td>
              </template>
              <template v-slot:body-cell-status="props">
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span
                    v-if="props.row.isActive"
                    class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                  >
                    Active
                  </span>
                  <span
                    v-else
                    class="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800"
                  >
                    Deactive
                  </span>
                </td>
              </template>
              <template v-slot:body-cell-Operations="props">
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <button class="mr-2" title="Settings">
                    <span class="hidden">{{ props.row.id }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <button class="mr-2" title="Payout">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                      />
                    </svg>
                  </button>
                  <button title="Profile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </td>
              </template>
            </q-table>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-create-modal
    v-model="openCreateModal"
    @onRegister="fillCustomerList"
  ></app-create-modal>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeMount,
  defineAsyncComponent,
} from "vue";
import { cid, container } from "inversify-props";
import { CustomerService } from "src/core/services";
import { CustomerVm } from "src/core/viewModels";
import { QuasarTable, RequestProp } from "src/core/viewModels/quasar";
import { $t, L } from "src/commons";
import { useRouter } from "vue-router";
import EventBus from "../../plugins/event";

export default defineComponent({
  components: {
    AppCreateModal: defineAsyncComponent(() => import("./Create.vue")),
    //AppEditModal: defineAsyncComponent(() => import("./Edit.vue")),
  },
  setup() {
    const customerService = container.get<CustomerService>(cid.CustomerService);
    const customerList = ref<Array<CustomerVm>>([]);
    const quasarTable = ref(new QuasarTable());
    const openCreateModal = ref(false);
    const loadCreateModal = ref(false);
    const selectedItem = ref("");
    const openEditModal = ref(false);
    const loadEditModal = ref(false);
    const fab1 = ref(false);

    quasarTable.value.columns = [
      {
        name: "name",
        label: $t(L.MODEL.CUSTOMER.NAME),
        field: "",
      },

      {
        name: "field",
        label: "Shop",
        field: "field",
      },
      {
        name: "status",
        label: "Status",
        field: "isActive",
      },

      {
        name: "Operations",
        label: "Action",
        field: "id",
      },
    ];

    async function fillCustomerList(props: RequestProp) {
      var response = await customerService.tableAsync(props);
      customerList.value = response.data;
      quasarTable.value.setData(
        response.data,
        response.total,
        customerService.currentRequestProp.pagination
      );
    }

    function openEdit(id: string) {
      selectedItem.value = id;
      if (!loadEditModal.value) {
        loadEditModal.value = true;
        openEditModal.value = true;
      }
      openEditModal.value = true;
    }
    async function openCreate() {
      if (!loadCreateModal.value) {
        loadCreateModal.value = true;
        await Promise.delay(1000);
      }

      openCreateModal.value = true;
    }

    function closeFab() {
      fab1.value = false;
    }

    onMounted(async () => {
      customerService.currentRequestProp.setToFirstPage();
      await fillCustomerList(customerService.currentRequestProp);
      EventBus.addEventListener("openCreate", openCreate);
    });

    const router = useRouter();
    onBeforeMount(() => {
      if (router.currentRoute.value.query["add"]) {
        openCreate();
      }
    });

    return {
      tab: ref("all"),
      search: ref(false),
      customerList,
      openEdit,
      openCreate,
      quasarTable,
      selectedItem,
      fillCustomerList,
      openEditModal,
      openCreateModal,
      closeFab,
      fab1,
    };
  },
});
</script>
