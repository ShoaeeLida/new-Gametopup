<template>
  <q-dialog v-model="isOpen" class="dark-modal" full-width persistent>
    <app-edit-form
      :title="`${$t($L.ACTIONS.EDIT)} ${$t($L.GENERAL.USER)}`"
      @submit="onSubmit"
      @reset="onReset"
    >
      <template v-slot:body>
        <q-card-section class="q-mt-lg">
          <div class="row">
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{
                $t($L.MODEL.USER.EMAIL)
              }}</label>
              <q-input
                outlined
                v-model="editModel.email"
                autofocus
                :placeholder="$t($L.MODEL.USER.EMAIL)"
                @blur="v$.email.$touch"
                :error="v$.email.$error"
                :error-message="
                  v$.email.$errors.map((x) => x.$message).join(',')
                "
              />
            </div>

            <!-- <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{ $t($L.MODEL.USER.USERNAME) }}</label>
              <q-input
                outlined
                v-model="editModel.userName"
                autofocus
                :placeholder="$t($L.GENERAL.ENTER_USERNAME)"
                @blur="v$.userName.$touch"
                :error="v$.userName.$error"
                :error-message="v$.userName.$errors.map((x) => x.$message).join(',')"
              />
            </div> -->

            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{
                $t($L.MODEL.USER.FIRST_NAME)
              }}</label>
              <q-input
                outlined
                v-model="editModel.firstName"
                autofocus
                :placeholder="$t($L.MODEL.USER.FIRST_NAME)"
              />
            </div>
            <div class="col-12 q-mt-md">
              <label class="q-mb-sm label-input">{{
                $t($L.MODEL.USER.LAST_NAME)
              }}</label>
              <q-input
                outlined
                v-model="editModel.lastName"
                autofocus
                :placeholder="$t($L.MODEL.USER.LAST_NAME)"
              />
            </div>
            <div class="col-12 q-mt-lg">
              <q-select
                outlined
                multiple
                v-model="editModel.roles"
                :options="options"
                :label="$t($L.GENERAL.CHOOSE_ROLE)"
                @blur="v$.roles.$touch"
                :error="v$.roles.$error"
                :error-message="
                  v$.roles.$errors.map((x) => x.$message).join(',')
                "
              />
            </div>
          </div>
        </q-card-section>
      </template>
    </app-edit-form>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, watch } from "vue";
import { UserEditVm, UserVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { UserManagerService } from "src/core/services";
import { MessageTypeEnum, Utility } from "src/commons";
//import { classToPlain, plainToInstance } from "class-transformer";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    user: {
      required: true,
      type: Object as PropType<UserVm>,
    },
  },
  emits: ["update:modelValue", "onRegister"],
  setup(props, { emit }) {
    const userManagerService = container.get<UserManagerService>(
      cid.UserManagerService
    );
    //const model = ref(new UserVm());
    const editModel = ref(new UserEditVm());
    const v$ = editModel.value.v$(editModel);
    const title = ref("");

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
          title.value = `${props.user.email}`;
          // mapping objects
          // var plainModel = classToPlain(model.value);
          //editModel.value = plainToInstance(UserEditVm, plainModel);
          editModel.value.firstName = props.user.firstName;
          editModel.value.lastName = props.user.lastName;
          // editModel.value.userName = props.user.userName;
          editModel.value.roles = props.user.roles;
          editModel.value.id = props.user.id;
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
        onReset();
      }
    }

    function onReset() {
      v$.value.$reset();
      editModel.value = new UserEditVm();
      editModel.value.id = props.user.id;
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
    };
  },
});
</script>
