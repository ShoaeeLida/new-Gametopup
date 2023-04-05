<template>
  <div class="mx-auto max-w-6xl">
    <div class="px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Categories</h1>
          <p class="text-sm text-gray-700">A list of all the categories in your panel.</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            class="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="openCreate"
          >
            Add a category
          </button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <template v-for="(item, index) in categoryList" :key="index">
            <div
              class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white py-5 px-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  src="../../assets/images/dynamic/codm.webp"
                  alt=""
                />
              </div>
              <div class="min-w-0 flex-1">
                <a href="#" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="text-sm font-medium text-gray-900">
                    {{ item.title }}
                  </p>
                  <p class="truncate text-sm text-gray-500">
                    {{ item.ProductsCount }} Products
                  </p>
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <app-create-modal
    v-model="openCreateModal"
    @onRegister="fillCategoryList"
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
import { CategoryService } from "src/core/services";
import { CategoryVm } from "src/core/viewModels";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    AppCreateModal: defineAsyncComponent(() => import("./Create.vue")),
    //AppEditModal: defineAsyncComponent(() => import("./Edit.vue")),
  },
  setup() {
    const categoryService = container.get<CategoryService>(cid.CategoryService);
    const categoryList = ref<Array<CategoryVm>>([]);
    // const quasarTable = ref(new QuasarTable());
    const openCreateModal = ref(false);
    const loadCreateModal = ref(false);
    const selectedItem = ref("");
    const openEditModal = ref(false);
    const loadEditModal = ref(false);

    async function fillCategoryList() {
      var response = await categoryService.listAsync();
      categoryList.value = response;
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
      await fillCategoryList();
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
      categoryList,
      openEdit,
      openCreate,
      selectedItem,
      fillCategoryList,
      openEditModal,
      openCreateModal,
    };
  },
});
</script>
