<template>
  <div class="container mx-auto">
    <section class="h-screen">
      <div class="container h-full px-6 py-24">
        <div
          class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between"
        >
          <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="w-full"
              alt="Phone image"
            />
          </div>
          <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form>
              <!-- Email input -->
              <label for="" class="mb-2 block">Email</label>
              <div class="relative mb-6" data-te-input-wrapper-init>
                <input
                  type="text"
                  class="border-1 peer block min-h-[auto] w-full rounded border-gray-300 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="exampleFormControlInput3"
                  v-model="model.username"
                  :placeholder="$t(L.GENERAL.EMAIL_DESC)"
                  @blur="v$.username.$touch"
                  :error="v$.username.$error"
                  :error-message="
                    v$.username.$errors.map((x) => x.$message).join(',')
                  "
                />
                <!-- <label
                  for="exampleFormControlInput3"
                  class="pointer-events-none absolute top-1 bg-white px-2 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                  >Email address
                </label> -->
              </div>

              <!-- Password input -->
              <label for="" class="mb-2 mt-5 block">Password</label>
              <div class="relative mb-6" data-te-input-wrapper-init>
                <input
                  type="password"
                  class="border-1 peer block min-h-[auto] w-full rounded border-gray-300 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="exampleFormControlInput33"
                  v-model="model.password"
                  :placeholder="$t(L.GENERAL.PASSWORD_DESC)"
                  @blur="v$.password.$touch"
                  :error="v$.password.$error"
                  :error-message="
                    v$.password.$errors.map((x) => x.$message).join(',')
                  "
                />
                <!-- <label
                  for="exampleFormControlInput33"
                  class="pointer-events-none absolute top-1 bg-white px-2 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                  >Password
                </label> -->
              </div>

              <div class="mb-6 flex items-center justify-between">
                <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    class="checked:border-primary dark:checked:border-primary checked:bg-primary dark:checked:bg-primary relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600"
                    type="checkbox"
                    value=""
                    id="exampleCheck3"
                    checked
                  />
                  <label
                    class="inline-block pl-[0.15rem] hover:cursor-pointer"
                    for="exampleCheck3"
                  >
                    Remember me
                  </label>
                </div>
                <router-link
                  to="ForgetPassword"
                  class="text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 transition duration-150 ease-in-out"
                  >Forgot password?</router-link
                >
              </div>

              <!-- Submit button -->
              <button
                class="bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block w-full rounded px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                @click="onSubmit"
              >
                Sign in
              </button>

              <div
                class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"
              >
                <p
                  class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200"
                >
                  OR
                </p>
              </div>

              <a
                class="bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 mb-3 flex w-full items-center justify-center rounded px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                style="background-color: #3b5998"
                href="#!"
                role="button"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <!-- Facebook -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                  />
                </svg>
                Continue with Facebook
              </a>
              <a
                class="bg-info focus:bg-info-600 active:bg-info-700 mb-3 flex w-full items-center justify-center rounded px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
                style="background-color: #55acee"
                href="#!"
                role="button"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <!-- Twitter -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  />
                </svg>
                Continue with Twitter
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";
import {
  GROUP_POLICY,
  L,
  Utility,
  LOCAL_STORAGE,
  MessageTypeEnum,
} from "src/commons";
import { useI18n } from "vue-i18n";
import { LoginVm } from "src/core/viewModels";
import { cid, container } from "inversify-props";
import { AccountService } from "src/core/services";
import { useRouter } from "vue-router";
import { LocalStorage, useQuasar } from "quasar";
import jwt_decode from "jwt-decode";

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
