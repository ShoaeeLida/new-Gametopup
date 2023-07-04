<template>
  <div class="mx-auto max-w-6xl">
    <div class="px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Products</h1>
          <p class="text-sm text-gray-700">A list of all the products in your panel.</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            class="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="openCreate"
          >
            Add a product
          </button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="mt-5 overflow-hidden bg-white shadow sm:rounded-md">
          <div class="overflow-x-auto">
            <div class="inline-block min-w-full align-middle">
              <!-- ***************************** -->
              <div class="px-4 sm:px-6 lg:px-8">
                <div class="mt-8 flow-root">
                  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                      class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                    >
                      <table class="min-w-full">
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
                              Code
                            </th>
                            <th
                              scope="col"
                              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Guest Price
                            </th>
                            <th
                              scope="col"
                              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Status
                            </th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                              <span class="sr-only">Actions</span>
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
                                  {{ it.productTitle }}
                                </td>
                                <td
                                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                  {{ it.code }}
                                </td>
                                <td
                                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                  {{ it.price }}
                                </td>
                                <td
                                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                  {{ it.guestPrice }}
                                </td>
                                <td
                                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                  <span
                                    v-if="it.isActive"
                                    class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                                    >Active</span
                                  >
                                  <span
                                    v-else
                                    class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-green-800"
                                    >deActive</span
                                  >
                                </td>
                                <td
                                  class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3"
                                >
                                  <button
                                    class="mr-2"
                                    title="Edit"
                                    @click="openEdit(it.productId)"
                                  >
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
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                      />
                                    </svg>
                                  </button>
                                  <button title="Statistics">
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
                                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            </template>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <q-table
                class="min-w-full divide-y divide-gray-300 !text-left"
                row-key="id"
                :rows="quasarTable.rows"
                :columns="quasarTable.columns"
                v-model:pagination="quasarTable.pagination"
                :loading="quasarTable.loading"
                :filter="quasarTable.filter"
                @request="fillDataTable"
              >
                <template v-slot:body-cell-name="props">
                  <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm">
                    <div class="font-medium text-gray-900">
                      {{ props.row.productTitle }}
                    </div>
                    <div class="text-gray-500">{{ props.row.categoryName }}</div>
                  </td>
                </template>
                <template v-slot:body-cell-price="props">
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 divide-y">
                    <div class="text-gray-900">
                      ${{ props.row.price }}
                      <span class="bg-gray-50 rounded-full text-xs px-2 text-gray-500"
                        >Customers</span
                      >
                    </div>
                    <div class="text-gray-500">
                      ${{ props.row.price }}
                      <span class="bg-gray-50 rounded-full text-xs px-2 text-gray-500"
                        >Resellers</span
                      >
                    </div>
                  </td>
                </template>
                <template v-slot:body-cell-status="props">
                  <td class="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                    <span
                      v-if="props.row.isActive"
                      class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                      >Active</span
                    >
                    <span
                      v-else
                      class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-green-800"
                      >deActive</span
                    >
                  </td>
                </template>
                <template v-slot:body-cell-Action="props">
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button
                      class="mr-2"
                      title="Edit"
                      @click="openEdit(props.row.productId)"
                    >
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button title="Statistics">
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
                          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                        />
                      </svg>
                    </button>
                  </td>
                </template>
              </q-table> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-create-modal
    v-if="loadCreateModal"
    v-model="openCreateModal"
    @onRegister="fillDataTable"
  ></app-create-modal>
  <app-edit-modal
    v-if="loadEditModal"
    v-model="openEditModal"
    :selectedId="selectedItem"
    @onRegister="fillDataTable"
  ></app-edit-modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, defineAsyncComponent } from "vue";
import { cid, container } from "inversify-props";
import { ProductService } from "src/core/services";
import { QuasarTable, RequestProp } from "src/core/viewModels/quasar";
import { NestedProductVm, ProductVm } from "src/core/viewModels";
import { plainToInstance } from "class-transformer";

export default defineComponent({
  components: {
    AppCreateModal: defineAsyncComponent(() => import("./Create.vue")),
    AppEditModal: defineAsyncComponent(() => import("./Edit.vue")),
  },
  setup() {
    const productService = container.get<ProductService>(cid.ProductService);

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
        label: "name",
        field: "productTitle",
      },
      {
        name: "code",
        label: "code",
        field: "code",
      },
      {
        name: "price",
        label: "price",
        field: "price",
      },
      {
        name: "guestPrice",
        label: "Guest Price",
        field: "guestPrice",
      },

      {
        name: "status",
        label: "status",
        field: "isActive",
      },
      {
        name: "Action",
        label: "Action",
        field: "id",
      },
    ];

    class listProduct {
      "cat": string;
      "product": Array<ProductVm>;
    }
    const lastList = ref<Array<listProduct>>([]);
    async function fillDataTable(props: RequestProp) {
      var response = await productService.tableAsync(props);
      quasarTable.value.setData(
        response.data,
        response.total,
        productService.currentRequestProp.pagination
      );

      var result = response.data.reduce(function (r, a) {
        r[a.categoryName] = r[a.categoryName] || [];
        r[a.categoryName].push(a as ProductVm);
        return r;
      }, Object.create(null));
      var list = Object.entries(result);
      var dt = list.map((a) => {
        return { cat: a[0], product: a[1] as ProductVm };
      });
      lastList.value = plainToInstance(listProduct, dt);
    }
    // async function fillDataTable(props: RequestProp) {
    //   var response = await productService.tableAsync(props);
    //   quasarTable.value.setData(
    //     response.data,
    //     response.total,
    //     productService.currentRequestProp.pagination
    //   );
    // }

    async function openEdit(id: string) {
      if (!loadEditModal.value) {
        loadEditModal.value = true;
        await Promise.delay(1000);
      }
      selectedItem.value = id.toString();
      openEditModal.value = true;
    }

    async function openCreate() {
      if (!loadCreateModal.value) {
        loadCreateModal.value = true;
        await Promise.delay(1000);
      }
      openCreateModal.value = true;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nestedProduct = computed(() => (products: any) => {
      return products as Array<NestedProductVm>;
    });

    const target = ref();

    const sticking = ref(false);

    onMounted(async () => {
      productService.currentRequestProp.setToFirstPage();
      await fillDataTable(productService.currentRequestProp);
    });

    return {
      tab: ref("all"),
      fab1,
      txt: ref(""),
      search: ref(false),
      openEdit,
      openCreate,
      quasarTable,
      selectedItem,
      fillDataTable,
      openEditModal,
      openCreateModal,
      loadEditModal,
      loadCreateModal,
      nestedProduct,
      target,
      sticking,
      listProduct,
      lastList,
    };
  },
});
</script>
