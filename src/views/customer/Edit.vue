<template>
  <div id="slideOver-container" :class="['w-full h-full fixed inset-0 ', invisible]">
    <div
      @click="toggleSlideOver"
      id="slideOver-bg"
      :class="[
        'w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ',
        opacity,
      ]"
    ></div>
    <div
      id="slideOver"
      :class="[
        'w-96 bg-white h-full absolute right-0 duration-300 ease-out transition-all overflow-y-auto',
        translateX,
      ]"
    >
      <div
        @click="toggleSlideOver"
        class="absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5"
      >
        <svg
          class="w-6 h-6"
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
            <label class="q-mb-sm label-input block">{{
              $t($L.MODEL.CUSTOMER.FIRST_NAME)
            }}</label>

            <input
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                v$.firstName.$error ? '!border-red-500 focus:ring-red-500' : '',
              ]"
              type="text"
              :placeholder="$t($L.MODEL.CUSTOMER.FIRST_NAME)"
              v-model="editModel.firstName"
              @blur="v$.firstName.$touch"
            />
            <p
              v-for="error of v$.firstName.$errors"
              :key="error.$uid"
              class="text-red-500 flex mt-2"
            >
              <svg
                class="h-5 w-5 text-red-500 mr-2"
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
            <!-- -->
          </div>
          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input block">
              {{ $t($L.MODEL.CUSTOMER.LAST_NAME) }}
            </label>

            <input
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                v$.lastName.$error ? '!border-red-500 focus:ring-red-500' : '',
              ]"
              type="text"
              :placeholder="$t($L.MODEL.CUSTOMER.LAST_NAME)"
              v-model="editModel.lastName"
              @blur="v$.lastName.$touch"
            />
            <p
              v-for="error of v$.lastName.$errors"
              :key="error.$uid"
              class="text-red-500 flex mt-2"
            >
              <svg
                class="h-5 w-5 text-red-500 mr-2"
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
            <!-- -->
          </div>
          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input block">
              {{ $t($L.MODEL.CUSTOMER.EMAIL) }}
            </label>

            <input
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                v$.email.$error ? '!border-red-500 focus:ring-red-500' : '',
              ]"
              type="text"
              :placeholder="$t($L.MODEL.CUSTOMER.EMAIL)"
              v-model="editModel.email"
              @blur="v$.email.$touch"
            />
            <p
              v-for="error of v$.email.$errors"
              :key="error.$uid"
              class="text-red-500 flex mt-2"
            >
              <svg
                class="h-5 w-5 text-red-500 mr-2"
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
            <!-- -->
          </div>
          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input block">
              {{ $t($L.MODEL.CUSTOMER.FIELD) }}
            </label>

            <input
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                ,
              ]"
              type="text"
              :placeholder="$t($L.MODEL.CUSTOMER.FIELD)"
              v-model="editModel.field"
            />

            <!-- -->
          </div>
          <div class="col-12 q-mt-md">
            <div class="flex items-center">
              <input
                id="checked-checkbox"
                type="checkbox"
                value=""
                class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                v-model="editModel.isPayFirst"
              />
              <label
                for="checked-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >{{ $t($L.MODEL.CUSTOMER.IS_PAY_FIRST) }}</label
              >
            </div>
          </div>
          <div class="col-12 q-mt-md" v-show="!editModel.isPayFirst">
            <label class="q-mb-sm label-input">{{
              $t($L.MODEL.CUSTOMER.MAX_DEBT)
            }}</label>
            <input
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
              ]"
              type="number"
              :placeholder="$t($L.MODEL.CUSTOMER.MAX_DEBT)"
              v-model="editModel.maxDebt"
            />
          </div>
          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input">{{
              $t($L.MODEL.CUSTOMER.TELEGRAM_AUTHENTICATION_CODE)
            }}</label>
            <input
              type="text"
              :class="[
                'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                v$.teleAuthCode.$error ? '!border-red-500 focus:ring-red-500' : '',
              ]"
              v-model="editModel.teleAuthCode"
              :placeholder="$t($L.MODEL.CUSTOMER.TELEGRAM_AUTHENTICATION_CODE)"
              @blur="v$.teleAuthCode.$touch"
              readonly
            />
            <p
              v-for="error of v$.teleAuthCode.$errors"
              :key="error.$uid"
              class="text-red-500 flex mt-2"
            >
              <svg
                class="h-5 w-5 text-red-500 mr-2"
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

            <!-- <button
                icon="token"
                :label="$t($L.ACTIONS.GENERATE)"
                color="secondary"
                @click="onGenerate"
                class="mt-3"
              ></button> -->
            <button
              @click="onGenerate"
              class="mt-3 inline-flex justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              {{ $t($L.ACTIONS.GENERATE) }}
            </button>
          </div>
        </div>
        <div class="row mt-7 justify-right">
          <button
            @click="onReset"
            class="w-20 mx-2 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {{ $t($L.ACTIONS.CLEAR) }}
          </button>
          <button
            @click="onSubmit"
            class="w-20 mx-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
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
import { CustomerEditVm, CustomerVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { CustomerService } from "src/core/services";
import { $t, L, MessageTypeEnum, Utility } from "src/commons";
import { instanceToPlain, plainToInstance } from "class-transformer";
//import { classToPlain, plainToInstance } from "class-transformer";

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
    const customerService = container.get<CustomerService>(cid.CustomerService);
    const model = ref(new CustomerVm());
    const editModel = ref(new CustomerEditVm());
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
          model.value = await customerService.detailAsync(props.selectedId.toString());
          title.value = `${model.value.firstName} ${model.value.lastName}`;
          var plainModel = instanceToPlain(model.value);
          editModel.value = plainToInstance(CustomerEditVm, plainModel);
          toggleSlideOver();
        }
      }
    );

    async function onSubmit() {
      if (
        editModel.value.isPayFirst == false &&
        (editModel.value.maxDebt == null || editModel.value.maxDebt <= 0)
      ) {
        Utility.showNotification(MessageTypeEnum.Danger, $t(L.MESSAGE.EMPTY_MAX_DEBT));
        return;
      }

      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }

      var result = await customerService.updateAsync(editModel.value);
      Utility.showNotification(result.status, result.message);

      if (result.status == MessageTypeEnum.Success) {
        emit("update:modelValue", false);
        emit("onRegister", customerService.currentRequestProp);
        toggleSlideOver();
        onReset();
      }
    }

    function onReset() {
      v$.value.$reset();
      editModel.value = new CustomerEditVm();
      editModel.value.id = props.selectedId;
      emit("update:modelValue", false);
    }

    function onGenerate(e: FormDataEvent) {
      e.preventDefault();
      let randomCode = (Math.random() + 1).toString(36).substring(7);
      editModel.value.teleAuthCode = randomCode;
    }

    return {
      isOpen,
      options: ["PurchaseOperator", "Admin", "Accountant"],
      onSubmit,
      editModel,
      title,
      v$,
      onReset,
      onGenerate,
      toggleSlideOver,
      invisible,
      opacity,
      translateX,
    };
  },
});
</script>
