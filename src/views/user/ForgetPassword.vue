<template>
  <q-card class="sign-container">
    <q-card-section class="logo-holder">
      <div class="custom-lp-container w-100">
        <q-img class="logo" src="../../assets/img/Logo.svg"></q-img>
        <h5 style="margin-bottom: 0" class="sign-title">
          {{ $t(L.GENERAL.FORGET_PASSWORD) }}
        </h5>
      </div>
    </q-card-section>
    <div class="top-radius"></div>

    <q-card-section class="sign-body">
      <div class="custom-lp-container w-100">
        <div class="row">
          <div class="col-12 q-mt-md">
            <label class="q-mb-sm label-input text-primary bold">{{
              $t($L.MESSAGE.FORGET_MSG)
            }}</label>
            <q-input
              class="q-mt-sm"
              outlined
              v-model="model.email"
              autofocus
              :placeholder="$t($L.MODEL.USER.EMAIL)"
              @blur="v$.email.$touch"
              :error="v$.email.$error"
              :error-message="v$.email.$errors.map((x) => x.$message).join(',')"
            />
          </div>
          <div class="col-12 q-mt-md">
            <span v-if="msg != ''" class="text-secondary">{{ msg }}</span>
          </div>

          <div class="col-12 q-mt-md">
            <q-btn
              :label="$t($L.ACTIONS.SEND)"
              color="secondary w-100"
              @click="onSubmit"
              no-caps
            />
          </div>
          <div class="col-12 q-mt-md text-center">
            <router-link to="/login"
              ><span class="">{{ $t($L.GENERAL.BACK_LOGIN) }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { UserEmailVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { AccountService } from "src/core/services";
import { MessageTypeEnum, Utility, L, $t } from "src/commons";

export default defineComponent({
  setup() {
    const accountService = container.get<AccountService>(cid.AccountService);
    const model = ref(new UserEmailVm());
    const v$ = model.value.v$(model);
    const msg = ref("");

    async function onSubmit() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }

      var result = await accountService.resetPasswordRequest(model.value);
      Utility.showNotification(result.status, result.message);

      if (result.status == MessageTypeEnum.Success) {
        onReset();
        msg.value = $t(L.MESSAGE.AFTER_EMAIL);
      }
    }

    function onReset() {
      model.value = new UserEmailVm();
      v$.value.$reset();
      msg.value = "";
    }

    return {
      onSubmit,
      model,
      v$,
      onReset,
      msg,
      L,
    };
  },
});
</script>
