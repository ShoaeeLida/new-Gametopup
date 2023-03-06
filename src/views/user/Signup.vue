<template>
  <q-card class="sign-container">
    <q-card-section class="logo-holder">
      <div class="custom-lp-container w-100">
        <q-img class="logo" src="../../assets/img/Logo.svg"></q-img>
        <h2 class="sign-title">{{ $t(L.GENERAL.SIGNUP) }}</h2>
        <span class="sign-desc">{{ $t(L.GENERAL.SIGNUP_DESC) }}</span>
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
              v-model="email"
              :placeholder="$t(L.GENERAL.EMAIL_DESC)"
              dense
              class="input-box"
            />
          </div>
          <div class="col-12 q-mt-lg">
            <label class="input-label">
              <q-icon name="lock_outline" />
              {{ $t(L.GENERAL.PASSWORD) }}
            </label>
            <q-input
              type="password"
              v-model="password"
              :placeholder="$t(L.GENERAL.PASSWORD_DESC)"
              dense
              class="input-box"
            />
          </div>
          <div class="col-12 q-mt-lg">
            <label class="input-label">
              <q-icon name="lock_outline" />
              {{ $t(L.GENERAL.CONFIRM_PASSWORD) }}
            </label>
            <q-input
              type="password"
              v-model="passwordConfirm"
              :placeholder="$t(L.GENERAL.CONFIRM_PASSWORD_DESC)"
              dense
              class="input-box"
            />
          </div>
          <div class="col-12 submit-holder text-center">
            <q-btn flat class="btn btn-blue">{{ $t(L.GENERAL.CREATE_ACCOUNT) }} </q-btn>
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
import { defineComponent, ref } from "vue";
import { L } from "src/commons";
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const email = ref("");
    const password = ref("");
    const passwordConfirm = ref("");
    const { locale } = useI18n({ useScope: "global" });

    return {
      L,
      email,
      password,
      passwordConfirm,
      locale,
      localeOptions: [{ value: "en-US", label: "English" }],
    };
  },
});
</script>
