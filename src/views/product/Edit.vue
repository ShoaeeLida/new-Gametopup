<template>
  <q-dialog v-model="isOpen" class="dark-modal" full-width persistent>
    <app-edit-form
      :title="`${$t($L.ACTIONS.EDIT)} ${title}`"
      @submit="onSubmit"
      @reset="onReset"
    >
      <template v-slot:body>
        <q-card-section class="q-mt-lg">
          <div class="row">
            <div class="col-12 q-mt-md">
              <q-select
                dense
                v-model="editModel.productCategoryId"
                :options="catList"
                outlined
                emit-value
                map-options
                @blur="v$.productCategoryId.$touch"
                :error="v$.productCategoryId.$error"
                :error-message="
                  v$.productCategoryId.$errors.map((x) => x.$message).join(',')
                "
              />
            </div>
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{ $t($L.MODEL.PRODUCTS.TITLE) }}</label>
              <q-input
                outlined
                v-model="editModel.title"
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
                v-model="editModel.price"
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
    </app-edit-form>
  </q-dialog>
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
          title.value = `${model.value.title}`;
          var plainModel = instanceToPlain(model.value);
          editModel.value = plainToInstance(ProductEditVm, plainModel);
          editModel.value.productCategoryId = model.value.productCategoryId.toString();
        }
      }
    );

    async function onSubmit() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }

      var result = await productService.updateAsync(editModel.value);
      Utility.showNotification(result.status, result.message);

      if (result.status == MessageTypeEnum.Success) {
        emit("update:modelValue", false);
        emit("onRegister", productService.currentRequestProp);
        onReset();
      }
    }

    function onReset() {
      v$.value.$reset();
      editModel.value = new ProductEditVm();
      editModel.value.id = props.selectedId.toString();
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
    };
  },
});
</script>
