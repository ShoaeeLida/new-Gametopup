<template>
  <q-dialog
    v-model="isOpen"
    class="dark-modal"
    full-width
    @before-show="onReset"
    @hide="$emit('closeFab')"
    persistent
  >
    <app-create-form
      :title="`${$t($L.GENERAL.ADD_NEW)} ${$t($L.GENERAL.PRODUCT)}`"
      @submit="onSubmit"
      @reset="onReset"
    >
      <template v-slot:body>
        <q-card-section class="q-mt-lg">
          <div class="row">
            <div class="col-12 q-mt-md">
              <q-select
                dense
                v-model="createModel.productCategoryId"
                :options="catList"
                outlined
                emit-value
                map-options
                @blur="v$.productCategoryId.$touch"
                :error="v$.productCategoryId.$error"
                :error-message="
                  v$.productCategoryId.$errors.map((x) => x.$message).join(',')
                "
                autofocus
              />
            </div>
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{ $t($L.MODEL.PRODUCTS.TITLE) }}</label>
              <q-input
                outlined
                v-model="createModel.title"
                autofocus
                :placeholder="$t($L.MODEL.PRODUCTS.TITLE)"
                @blur="v$.title.$touch"
                :error="v$.title.$error"
                :error-message="v$.title.$errors.map((x) => x.$message).join(',')"
              />
            </div>
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{ $t($L.MODEL.PRODUCTS.PRICE) }}</label>
              <q-input
                outlined
                v-model="createModel.price"
                autofocus
                :placeholder="$t($L.MODEL.PRODUCTS.PRICE)"
                @blur="v$.price.$touch"
                :error="v$.price.$error"
                :error-message="v$.price.$errors.map((x) => x.$message).join(',')"
              >
                <template v-slot:append>
                  <q-icon name="attach_money" class="q-mr-xs pointer"></q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
      </template>
    </app-create-form>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { ProductCreateVm, DropDownVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { ProductService } from "src/core/services";
import { MessageTypeEnum, Utility } from "src/commons";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ["update:modelValue", "onRegister", "closeFab"],
  setup(props, { emit }) {
    const productService = container.get<ProductService>(cid.ProductService);
    // const categoryService = container.get<CategoryService>(cid.CategoryService);
    const createModel = ref(new ProductCreateVm());
    const v$ = createModel.value.v$(createModel);
    const catList = ref<Array<DropDownVm>>();

    const isOpen = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit("update:modelValue", value);
        onReset();
      },
    });

    async function onSubmit() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }

      var result = await productService.addAsync(createModel.value);
      Utility.showNotification(result.status, result.message);

      if (result.status == MessageTypeEnum.Success) {
        emit("update:modelValue", false);
        emit("onRegister", productService.currentRequestProp);
        onReset();
      }
    }

    async function loadCategory() {
      catList.value = await productService.ddlAsync();
    }

    function onReset() {
      v$.value.$reset();
      createModel.value = new ProductCreateVm();
    }

    onMounted(async () => {
      await loadCategory();
    });

    return {
      isOpen,
      roles: ref<Array<string>>([]),
      options: ["PurchaseOperator", "Admin", "Accountant"],
      onSubmit,
      createModel,
      v$,
      onReset,
      catList,
    };
  },
});
</script>
