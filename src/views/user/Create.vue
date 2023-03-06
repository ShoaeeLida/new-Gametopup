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
      :title="`${$t($L.GENERAL.ADD_NEW_USER)}`"
      @submit="onSubmit"
      @reset="onReset"
    >
      <template v-slot:body>
        <q-card-section class="q-mt-lg">
          <div class="row">
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{ $t($L.MODEL.USER.EMAIL) }}</label>
              <q-input
                outlined
                v-model="createModel.email"
                autofocus
                :placeholder="$t($L.MODEL.USER.EMAIL)"
                @blur="v$.email.$touch"
                :error="v$.email.$error"
                :error-message="v$.email.$errors.map((x) => x.$message).join(',')"
              />
            </div>
            <!-- <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{ $t($L.MODEL.USER.USERNAME) }}</label>
              <q-input
                outlined
                v-model="createModel.userName"
                autofocus
                :placeholder="$t($L.GENERAL.ENTER_USERNAME)"
                @blur="v$.userName.$touch"
                :error="v$.userName.$error"
                :error-message="v$.userName.$errors.map((x) => x.$message).join(',')"
              />
            </div> -->
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{ $t($L.MODEL.USER.PASSWORD) }}</label>
              <q-input
                outlined
                v-model="createModel.password"
                autofocus
                type="password"
                :placeholder="$t($L.MODEL.USER.PASSWORD)"
                @blur="v$.password.$touch"
                :error="v$.password.$error"
                :error-message="v$.password.$errors.map((x) => x.$message).join(',')"
              />
              <!--  -->
            </div>
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{
                $t($L.MODEL.USER.FIRST_NAME)
              }}</label>
              <q-input
                outlined
                v-model="createModel.firstName"
                autofocus
                :placeholder="$t($L.MODEL.USER.FIRST_NAME)"
              />
            </div>
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{ $t($L.MODEL.USER.LAST_NAME) }}</label>
              <q-input
                outlined
                v-model="createModel.lastName"
                autofocus
                :placeholder="$t($L.MODEL.USER.LAST_NAME)"
              />
            </div>
            <div class="col-12 q-mt-lg">
              <q-select
                outlined
                multiple
                v-model="createModel.roles"
                :options="options"
                :label="$t($L.GENERAL.CHOOSE_ROLE)"
                @blur="v$.roles.$touch"
                :error="v$.roles.$error"
                :error-message="v$.roles.$errors.map((x) => x.$message).join(',')"
              />
              <!--  -->
            </div>
          </div>
        </q-card-section>
      </template>
    </app-create-form>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { UserCreateVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { UserManagerService } from "src/core/services";
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
    const userManagerService = container.get<UserManagerService>(cid.UserManagerService);
    const createModel = ref(new UserCreateVm());
    const v$ = createModel.value.v$(createModel);

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

      var result = await userManagerService.addAsync(createModel.value);
      Utility.showNotification(result.status, result.message);

      if (result.status == MessageTypeEnum.Success) {
        emit("update:modelValue", false);
        emit("onRegister", userManagerService.currentRequestProp);
        onReset();
      }
    }

    function onReset() {
      v$.value.$reset();
      createModel.value = new UserCreateVm();
    }

    return {
      isOpen,
      roles: ref<Array<string>>([]),
      options: ["PurchaseOperator", "Admin", "Accountant"],
      onSubmit,
      createModel,
      v$,
      onReset,
    };
  },
});
</script>
