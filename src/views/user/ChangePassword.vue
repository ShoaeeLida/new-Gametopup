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
          <div v-show="false" class="col-12 q-mt-md">
            <q-input
              outlined
              v-model="model.email"
              :placeholder="$t($L.MODEL.USER.EMAIL)"
              readonly
            />
          </div>
          <div v-show="false" class="col-12 q-mt-md">
            <q-input
              outlined
              v-model="model.token"
              :placeholder="$t($L.GENERAL.TOKEN)"
              readonly
            />
          </div>
          <div class="col-12 q-mt-md">
            <q-input
              type="password"
              outlined
              v-model="model.password"
              :placeholder="$t($L.MODEL.USER.PASSWORD)"
              @blur="v$.password.$touch"
              :error="v$.password.$error"
              :error-message="v$.password.$errors.map((x) => x.$message).join(',')"
            />
          </div>
          <div class="col-12 q-mt-md">
            <q-input
              type="password"
              outlined
              v-model="model.confirmPassword"
              :placeholder="$t($L.GENERAL.CONFIRM_PASSWORD)"
              @blur="v$.confirmPassword.$touch"
              :error="v$.confirmPassword.$error"
              :error-message="v$.confirmPassword.$errors.map((x) => x.$message).join(',')"
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
          <div class="col-12 q-mt-md text-primary text-center">
            <router-link to="/login">
              <span class="">{{ $t($L.GENERAL.BACK_LOGIN) }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { cid, container } from "inversify-props";
import { AccountService } from "src/core/services";
import { ResetPasswordVm } from "src/core/viewModels";
import { $t, MessageTypeEnum, Utility, L } from "src/commons";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const accountService = container.get<AccountService>(cid.AccountService);
    const model = ref(new ResetPasswordVm());
    const v$ = model.value.v$(model);
    const msg = ref("");

    async function onSubmit() {
      if (model.value.password === model.value.confirmPassword) {
        v$.value.$touch();
        if (v$.value.$invalid) {
          return;
        }

        var result = await accountService.changePassword(model.value);
        Utility.showNotification(result.status, result.message);

        if (result.status == MessageTypeEnum.Success) {
          model.value = new ResetPasswordVm();
          v$.value.$reset();
          msg.value = result.message;
        }
      } else {
        Utility.showNotification(MessageTypeEnum.Danger, $t(L.MESSAGE.NO_MATCH));
      }
    }

    const router = useRouter();
    onMounted(() => {
      if (router.currentRoute.value.query["token"]) {
        model.value.token = router.currentRoute.value.query["token"].toString();
      }
      if (router.currentRoute.value.query["email"]) {
        model.value.email = router.currentRoute.value.query["email"].toString();
      }
    });

    return {
      onSubmit,
      model,
      v$,
      msg,
      L,
    };
  },
});
</script>
