<template>
  <div class="mx-auto max-w-6xl mb-6">
    <div class="px-6 lg:px-8">
      <div class="sm:flex sm:items-center bg-white pt-6">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Team Member</h1>
          <p class="text-sm text-gray-700">A list of all the Users in your panel.</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            class="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="openCreate"
          >
            Add a user
          </button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="mt-5 overflow-hidden bg-white shadow sm:rounded-md">
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
              @request="fillUserList"
            >
              <template v-slot:body-cell-name="props">
                <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm">
                  <div class="flex items-center">
                    <div
                      class="h-10 w-10 flex items-center justify-center bg-slate-100 rounded-full"
                    >
                      <q-icon
                        name="person_outline"
                        class="text-gray-400"
                        size="sm"
                      ></q-icon>
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">
                        {{ props.row.firstName }} {{ props.row.lastName }}
                      </div>
                    </div>
                  </div>
                </td>
              </template>
              <template v-slot:body-cell-email="props">
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="text-gray-900">{{ props.row.email }}</div>
                </td>
              </template>
              <template v-slot:body-cell-roles="props">
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                  <template v-for="item in props.row.roles"> {{ item }} &nbsp; </template>
                </td>
              </template>
              <template v-slot:body-cell-Operations="props">
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <button class="mr-2" title="Edit" @click="openEdit(props.row.id)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6"
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
    @onRegister="fillUserList"
  ></app-create-modal>
  <app-edit-modal
    v-model="openEditModal"
    :selectedId="selectedItem"
    @onRegister="fillUserList"
  ></app-edit-modal>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent, ref, onMounted } from "vue";
import { cid, container } from "inversify-props";
import { UserManagerService } from "src/core/services";
import { UserVm } from "src/core/viewModels";
import { QuasarTable, RequestProp } from "src/core/viewModels/quasar";
import { $t, L } from "src/commons";

export default defineComponent({
  components: {
    AppCreateModal: defineAsyncComponent(() => import("./Create.vue")),
    AppEditModal: defineAsyncComponent(() => import("./Edit.vue")),
  },
  setup() {
    const userManagerService = container.get<UserManagerService>(cid.UserManagerService);
    const userList = ref<Array<UserVm>>([]);
    const quasarTable = ref(new QuasarTable());
    const openCreateModal = ref(false);
    const loadCreateModal = ref(false);
    const selectedItem = ref("");

    const openEditModal = ref(false);
    const loadEditModal = ref(false);

    quasarTable.value.columns = [
      {
        name: "name",
        label: "Name",
        field: "firstName" + " " + "lastName",
      },
      {
        name: "email",
        label: "Username",
        field: "email",
      },
      {
        name: "roles",
        label: $t(L.MODEL.USER.ROLES),
        field: "roles",
      },
      {
        name: "Operations",
        label: "Action",
        field: "id",
      },
    ];

    async function fillUserList(props: RequestProp) {
      var response = await userManagerService.tableAsync(props);
      userList.value = response.data;
      quasarTable.value.setData(
        response.data,
        response.total,
        userManagerService.currentRequestProp.pagination
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

    onMounted(async () => {
      userManagerService.currentRequestProp.setToFirstPage();
      await fillUserList(userManagerService.currentRequestProp);
    });

    return {
      search: ref(false),
      userList,
      openEdit,
      openCreate,
      quasarTable,
      selectedItem,
      fillUserList,
      openEditModal,
      openCreateModal,
    };
  },
});
</script>
