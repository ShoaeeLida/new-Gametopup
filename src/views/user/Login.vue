<template>
  <q-card class="sign-container">
    <q-card-section class="logo-holder">
      <div class="custom-lp-container w-100">
        <q-img class="logo" src="../../assets/img/Logo.svg"></q-img>
        <h2 class="sign-title">{{ $t(L.GENERAL.LOGIN) }}</h2>
        <span class="sign-desc">{{ $t(L.GENERAL.LOGIN_DESC) }}</span>
      </div>
    </q-card-section>
    <div class="top-radius"></div>
    <q-card-section class="sign-body">
      <div class="custom-lp-container w-100">
        <div class="row w-100">
          <div class="col-12">
            <label class="input-label">
              <q-icon name="mail_outline" />
              {{ $t(L.GENERAL.EMAIL) }}
            </label>
            <q-input
              type="text"
              v-model="model.username"
              :placeholder="$t(L.GENERAL.EMAIL_DESC)"
              dense
              class="input-box"
              @blur="v$.username.$touch"
              :error="v$.username.$error"
              :error-message="v$.username.$errors.map((x) => x.$message).join(',')"
            />
          </div>
          <div class="col-12 q-mt-lg">
            <label class="input-label">
              <q-icon name="lock_outline" />
              {{ $t(L.GENERAL.PASSWORD) }}
            </label>
            <q-input
              type="password"
              v-model="model.password"
              :placeholder="$t(L.GENERAL.PASSWORD_DESC)"
              dense
              class="input-box"
              @blur="v$.password.$touch"
              :error="v$.password.$error"
              :error-message="v$.password.$errors.map((x) => x.$message).join(',')"
            />
          </div>

          <div class="col-12 submit-holder text-center">
            <q-btn @click="onSubmit" flat class="btn btn-blue"
              >{{ $t(L.GENERAL.LOGIN) }}
            </q-btn>
          </div>
          <div class="col-12 q-mt-md text-center">
            <router-link to="/ForgetPassword">
              <span class="forget-password">{{ $t(L.GENERAL.FORGET_PASSWORD) }}</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="social-account">
        <div class="separator text-center">
          <span>{{ $t(L.GENERAL.OR) }}</span>
        </div>
        <div class="row account-link-holder">
          <div class="custom-lp-container w-100 text-center">
            <div class="col-12">
              <q-btn class="btn-white">
                <div class="icon-holder">
                  <q-img src="../../assets/img/google.svg" />
                </div>
                {{ $t(L.GENERAL.GOOGLE_ACCOUNT) }}
              </q-btn>
            </div>
            <div class="col-12 q-mt-md">
              <q-btn class="btn-white">
                <div class="icon-holder">
                  <q-img src="../../assets/img/facebook.svg" />
                </div>
                {{ $t(L.GENERAL.FACEBOOK_ACCOUNT) }}
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";
import { GROUP_POLICY, L, Utility, LOCAL_STORAGE, MessageTypeEnum } from "src/commons";
import { useI18n } from "vue-i18n";
import { LoginVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { AccountService } from "src/core/services";
import { useRouter } from "vue-router";
import { LocalStorage, useQuasar } from "quasar";
import jwt_decode from "jwt-decode";

//import { $t } from "src/boot/i18n";

export default defineComponent({
  setup() {
    const model = ref(new LoginVm());
    const v$ = model.value.v$(model);
    const accountService = container.get<AccountService>(cid.AccountService);
    const router = useRouter();
    const $q = useQuasar();

    async function onSubmit() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }
      let response = await accountService.login(model.value);

      if (response.status == MessageTypeEnum.Success) {
        $q.localStorage.set(
          LOCAL_STORAGE.GROUP_POLICIES,
          response.data.dynamicGroupPolicies
        );
        $q.localStorage.set(LOCAL_STORAGE.TOKEN, response.data.token);
        let decoded: JSON = jwt_decode(response.data.token);
        var keys = JSON.parse(JSON.stringify(decoded));
        $q.localStorage.set(LOCAL_STORAGE.FULL_NAME, keys["FullName"]);
        $q.localStorage.set(
          LOCAL_STORAGE.USERNAME,
          keys["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
        );
        $q.localStorage.set(LOCAL_STORAGE.LANG, locale.value);
        await router.push({ name: GROUP_POLICY.DASHBOARD.NAME });
      } else {
        Utility.showNotification(response.status, response.joinedErrors);
      }
    }

    const { locale } = useI18n({ useScope: "global" });

    async function checkRemember() {
      var token = LocalStorage.getItem(LOCAL_STORAGE.TOKEN) as string;
      if (token) {
        await router.push({ name: GROUP_POLICY.DASHBOARD.NAME });
      }
    }

    onBeforeMount(async () => {
      await checkRemember();
    });

    onMounted(() => {
      Utility.showLoadingGlobally(true);
    });

    return {
      v$,
      L,
      model,
      onSubmit,
      locale,
      localeOptions: [
        {
          label: "en",
          value: "en-US",
          icon: "mail",
        },
      ],
    };
  },
});
</script>
