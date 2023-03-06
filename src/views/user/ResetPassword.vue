<template>
  <div class="top-radius"></div>
  <div class="main-page-container users-container">
    <div class="row">
      <div class="col-12 q-mt-md">
        <q-input
          type="password"
          outlined
          v-model="model.oldPassword"
          :placeholder="$t($L.MODEL.PASSWORD.OLD_PASSWORD)"
          @blur="v$.oldPassword.$touch"
          :error="v$.oldPassword.$error"
          :error-message="v$.oldPassword.$errors.map((x) => x.$message).join(',')"
        />
      </div>

      <div class="col-12 q-mt-md">
        <q-input
          type="password"
          outlined
          v-model="model.newPassword"
          :placeholder="$t($L.MODEL.PASSWORD.NEW_PASSWORD)"
          @blur="v$.newPassword.$touch"
          :error="v$.newPassword.$error"
          :error-message="v$.newPassword.$errors.map((x) => x.$message).join(',')"
        />
      </div>
      <div class="col-12 q-mt-md">
        <q-input
          type="password"
          outlined
          v-model="model.confirmNewPassword"
          :placeholder="$t($L.MODEL.PASSWORD.CONFIRM_NEW_PASSWORD)"
          @blur="v$.confirmNewPassword.$touch"
          :error="v$.confirmNewPassword.$error"
          :error-message="v$.confirmNewPassword.$errors.map((x) => x.$message).join(',')"
        />
      </div>

      <div class="col-12 q-mt-md text-primary text-center">
        <q-btn
          :label="$t($L.ACTIONS.CHANGE)"
          color="secondary"
          @click="onSubmit"
          no-caps
          class="w-100"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { cid, container } from "inversify-props";
import { AccountService } from "src/core/services";
import { UserResetPasswordVm } from "src/core/viewModels";
import { $t, MessageTypeEnum, Utility, L } from "src/commons";

export default defineComponent({
  setup() {
    const accountService = container.get<AccountService>(cid.AccountService);
    const model = ref(new UserResetPasswordVm());
    const v$ = model.value.v$(model);

    async function onSubmit() {
      if (model.value.newPassword === model.value.confirmNewPassword) {
        v$.value.$touch();
        if (v$.value.$invalid) {
          return;
        }

        var result = await accountService.userResetPassword(model.value);
        Utility.showNotification(result.status, result.message);

        if (result.status == MessageTypeEnum.Success) {
          model.value = new UserResetPasswordVm();
          v$.value.$reset();
        }
      } else {
        Utility.showNotification(MessageTypeEnum.Danger, $t(L.MESSAGE.NO_MATCH));
      }
    }

    return {
      onSubmit,
      model,
      v$,
      L,
    };
  },
});
</script>
