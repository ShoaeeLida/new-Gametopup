<template>
  <div id="slideOver-container" :class="['fixed inset-0 h-full w-full ', invisible]">
    <div
      @click="toggleSlideOver"
      id="slideOver-bg"
      :class="[
        'absolute inset-0 h-full w-full bg-gray-900 transition-all duration-500 ease-out ',
        opacity,
      ]"
    ></div>
    <div
      id="slideOver"
      :class="[
        'absolute right-0 h-full w-96 overflow-y-auto bg-white transition-all duration-300 ease-out',
        translateX,
      ]"
    >
      <div
        @click="toggleSlideOver"
        class="absolute top-0 right-0 mt-5 mr-5 flex h-8 w-8 cursor-pointer items-center justify-center text-gray-600"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <div class="mt-14 px-12 py-4">
        <div class="row">
          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input">Category</label>
            <select
              v-model="editModel.productCategoryId"
              @blur="v$.productCategoryId.$touch"
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                v$.productCategoryId.$error ? '!border-red-500 focus:ring-red-500' : '',
              ]"
            >
              <option v-for="(item, index) in catList" :value="item.value" :key="index">
                {{ item.label }}
              </option>
            </select>
            <p
              v-for="error of v$.productCategoryId.$errors"
              :key="error.$uid"
              class="mt-2 flex text-red-500"
            >
              <svg
                class="mr-2 h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {{ error.$message }}
            </p>
          </div>

          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input">{{ $t($L.MODEL.PRODUCTS.TITLE) }}</label>
            <input
              type="text"
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                v$.title.$error ? '!border-red-500 focus:ring-red-500' : '',
              ]"
              v-model="editModel.title"
              autofocus
              :placeholder="$t($L.MODEL.PRODUCTS.TITLE)"
              @blur="v$.title.$touch"
            />
            <p
              v-for="error of v$.title.$errors"
              :key="error.$uid"
              class="mt-2 flex text-red-500"
            >
              <svg
                class="mr-2 h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {{ error.$message }}
            </p>
          </div>

          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input">Code</label>
            <input
              type="text"
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                v$.code.$error ? '!border-red-500 focus:ring-red-500' : '',
              ]"
              v-model="editModel.code"
              autofocus
              placeholder="Code"
              @blur="v$.code.$touch"
            />
            <p
              v-for="error of v$.code.$errors"
              :key="error.$uid"
              class="mt-2 flex text-red-500"
            >
              <svg
                class="mr-2 h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {{ error.$message }}
            </p>
          </div>

          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input">{{ $t($L.MODEL.PRODUCTS.PRICE) }}</label>
            <input
              type="number"
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                v$.price.$error ? '!border-red-500 focus:ring-red-500' : '',
              ]"
              v-model="editModel.price"
              :placeholder="$t($L.MODEL.PRODUCTS.PRICE)"
              @blur="v$.price.$touch"
            />
            <p
              v-for="error of v$.price.$errors"
              :key="error.$uid"
              class="mt-2 flex text-red-500"
            >
              <svg
                class="mr-2 h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {{ error.$message }}
            </p>
          </div>

          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input">Guest Price</label>
            <input
              type="number"
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                ,
              ]"
              v-model="editModel.guestPrice"
              placeholder="Guest Price"
            />
          </div>

          <div class="row justify-right mt-7">
            <button
              @click="onReset"
              class="mx-2 inline-flex w-20 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {{ $t($L.ACTIONS.CLEAR) }}
            </button>
            <button
              @click="onSubmit"
              class="mx-2 inline-flex w-20 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              {{ $t($L.ACTIONS.EDIT) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import { DropDownVm, ProductEditVm, ProductVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { ProductService } from "src/core/services";
import { MessageTypeEnum, Utility } from "src/commons";
import { instanceToPlain, plainToInstance } from "class-transformer";
export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    selectedId: {
      required: true,
      type: String,
    },
  },
  emits: ["update:modelValue", "onRegister"],
  setup(props, { emit }) {
    const productService = container.get<ProductService>(cid.ProductService);
    const model = ref(new ProductVm());
    const editModel = ref(new ProductEditVm());
    const v$ = editModel.value.v$(editModel);
    const title = ref("");

    const catList = ref<Array<DropDownVm>>();
    const invisible = ref("invisible");
    const opacity = ref("opacity-0");
    const translateX = ref("translate-x-full");

    function toggleSlideOver() {
      if (invisible.value == "invisible") invisible.value = "";
      else invisible.value = "invisible";
      if (opacity.value == "opacity-0") opacity.value = "opacity-50";
      else opacity.value = "opacity-0";
      if (translateX.value == "translate-x-full") translateX.value = "";
      else translateX.value = "translate-x-full";
      emit("update:modelValue", false);
    }

    const isOpen = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit("update:modelValue", value);
        onReset();
      },
    });

    watch(
      () => isOpen.value,
      async (newVal) => {
        if (newVal) {
          model.value = await productService.detailAsync(props.selectedId.toString());
          console.log("1:", model.value);
          title.value = `${model.value.productTitle}`;

          var plainModel = instanceToPlain(model.value);
          editModel.value = plainToInstance(ProductEditVm, plainModel);
          editModel.value.productId = model.value.id;
          console.log("2:", editModel.value);
          toggleSlideOver();
        }
      }
    );

    async function onSubmit() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }
      var test = editModel.value;
      console.log(test);
      var result = await productService.updateAsync(editModel.value);
      Utility.showNotification(result.status, result.message);

      if (result.status == MessageTypeEnum.Success) {
        emit("update:modelValue", false);
        emit("onRegister", productService.currentRequestProp);
        toggleSlideOver();
        onReset();
      }
    }

    function onReset() {
      v$.value.$reset();
      editModel.value = new ProductEditVm();
      editModel.value.productId = props.selectedId.toString();
      emit("update:modelValue", false);
    }

    onMounted(async () => {
      catList.value = await productService.ddlAsync();
    });
    return {
      isOpen,
      onSubmit,
      editModel,
      title,
      v$,
      onReset,
      catList,
      toggleSlideOver,
      invisible,
      opacity,
      translateX,
    };
  },
});
</script>
