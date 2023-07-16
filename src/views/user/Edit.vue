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
            <label class="q-mb-sm label-input">{{ $t($L.MODEL.USER.EMAIL) }}</label>
            <input
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                v$.email.$error ? '!border-red-500 focus:ring-red-500' : '',
              ]"
              type="text"
              v-model="editModel.email"
              autofocus
              :placeholder="$t($L.MODEL.USER.EMAIL)"
              @blur="v$.email.$touch"
              :error="v$.email.$error"
              :error-message="v$.email.$errors.map((x) => x.$message).join(',')"
            />
          </div>

          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input">{{ $t($L.MODEL.USER.FIRST_NAME) }}</label>
            <input
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
              ]"
              type="text"
              v-model="editModel.firstName"
              autofocus
              :placeholder="$t($L.MODEL.USER.FIRST_NAME)"
            />
          </div>
          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input">{{ $t($L.MODEL.USER.LAST_NAME) }}</label>
            <input
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
              ]"
              type="text"
              v-model="editModel.lastName"
              autofocus
              :placeholder="$t($L.MODEL.USER.LAST_NAME)"
            />
          </div>
          <div class="col-12 q-mt-lg">
            <q-select
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
              ]"
              outlined
              multiple
              v-model="editModel.roles"
              :options="options"
              :label="$t($L.GENERAL.CHOOSE_ROLE)"
              @blur="v$.roles.$touch"
              :error="v$.roles.$error"
              :error-message="v$.roles.$errors.map((x) => x.$message).join(',')"
            />
          </div>
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
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { UserEditVm, UserVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { UserManagerService } from "src/core/services";
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
    const userManagerService = container.get<UserManagerService>(cid.UserManagerService);
    const model = ref(new UserVm());
    const editModel = ref(new UserEditVm());
    const v$ = editModel.value.v$(editModel);
    const title = ref("");
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
          model.value = await userManagerService.detailAsync(props.selectedId.toString());
          title.value = `${model.value.firstName} ${model.value.lastName}`;
          var plainModel = instanceToPlain(model.value);
          editModel.value = plainToInstance(UserEditVm, plainModel);

          toggleSlideOver();
        }
      }
    );

    async function onSubmit() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }

      var result = await userManagerService.updateAsync(editModel.value);
      Utility.showNotification(result.status, result.message);

      if (result.status == MessageTypeEnum.Success) {
        emit("update:modelValue", false);
        emit("onRegister", userManagerService.currentRequestProp);
        toggleSlideOver();
        onReset();
      }
    }

    function onReset() {
      v$.value.$reset();
      editModel.value = new UserEditVm();
      editModel.value.id = props.selectedId;
      emit("update:modelValue", false);
    }

    return {
      isOpen,
      options: ["PurchaseOperator", "Admin", "Accountant"],
      onSubmit,
      editModel,
      title,
      v$,
      onReset,
      toggleSlideOver,
      invisible,
      opacity,
      translateX,
    };
  },
});
</script>
