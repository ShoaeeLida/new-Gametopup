<template>
  <q-tabs
    v-model="tab"
    narrow-indicator
    align="justify"
    class="bg-dark text-gray top-tabs"
    active-color="white"
    no-caps
  >
    <q-tab name="all" :label="$t($L.GENERAL.ALL)" />
    <q-tab name="actives" :label="$t($L.GENERAL.ACTIVE)" />
    <q-tab name="deActives" :label="$t($L.GENERAL.DE_ACTIVE)" />
  </q-tabs>
  <div class="top-radius"></div>
  <div class="main-page-container users-container">
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      class="float-action"
      style="z-index: 11"
    >
      <q-fab v-model="fab1" color="dark" icon="add" direction="left" @click="openCreate">
      </q-fab>
    </q-page-sticky>
    <q-table
      class="base-tb"
      row-key="id"
      :rows="quasarTable.rows"
      :columns="quasarTable.columns"
      v-model:pagination="quasarTable.pagination"
      :loading="quasarTable.loading"
      :filter="quasarTable.filter"
      @request="fillUserList"
      grid
    >
      <template v-slot:item="props">
        <q-card class="my-card user-card q-mb-md w-100">
          <q-card-section style="flex-wrap: wrap">
            <div class="user-icon q-mr-xs">
              <q-icon name="person_outline" size="sm"></q-icon>
            </div>
            <div class="user-name-wrap">
              <span class="name">{{ props.row.firstName }} {{ props.row.lastName }}</span>
              <span class="user-name">{{ props.row.email }}</span>
            </div>
            <q-space />
            <div
              style="display: flex; align-items: center; justify-content: space-between"
            >
              <div class="role q-mr-sm">
                <template v-for="item in props.row.roles"> {{ item }} &nbsp; </template>
              </div>
              <q-icon
                name="edit_note"
                size="sm"
                color="blue"
                class="q-mr-xs pointer"
                @click="openEdit(props.row.id)"
              >
                <q-tooltip>{{ $t($L.ACTIONS.EDIT) }}</q-tooltip>
              </q-icon>
              <!-- <q-icon name="lock_reset" color="warning" size="sm" class="q-ml-md pointer">
              <q-tooltip>{{ $t($L.GENERAL.RESET_PASSWORD) }}</q-tooltip>
            </q-icon> -->
            </div>
          </q-card-section>
        </q-card>
      </template>
    </q-table>
  </div>
  <app-create-modal
    v-model="openCreateModal"
    @onRegister="fillUserList"
    @closeFab="closeFab"
  ></app-create-modal>
  <app-edit-modal
    v-model="openEditModal"
    :user="selectedItem"
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
    const selectedItem = ref(new UserVm());

    const openEditModal = ref(false);
    const loadEditModal = ref(false);
    const fab1 = ref(false);

    quasarTable.value.columns = [
      {
        name: "firstName",
        label: $t(L.MODEL.USER.FIRST_NAME),
        field: "firstName",
      },
      {
        name: "lastName",
        label: $t(L.MODEL.USER.LAST_NAME),
        field: "lastName",
      },
      {
        name: "email",
        label: $t(L.MODEL.USER.EMAIL),
        field: "email",
      },
      {
        name: "roles",
        label: $t(L.MODEL.USER.ROLES),
        field: "roles",
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
      selectedItem.value = userList.value.find((x) => x.id == id) as UserVm;
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
      userManagerService.currentRequestProp.setToFirstPage();
      await fillUserList(userManagerService.currentRequestProp);
    });

    return {
      tab: ref("all"),
      fab1,
      search: ref(false),
      userList,
      openEdit,
      openCreate,
      quasarTable,
      selectedItem,
      fillUserList,
      openEditModal,
      openCreateModal,
      closeFab,
    };
  },
});
</script>
