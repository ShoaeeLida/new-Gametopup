<template>
  <div class="container mx-auto">
    <section class="h-screen">
      <div class="container h-full px-6 py-24">
        <div class="g-6 flex flex-col items-center justify-center">
          <div class="mb-16">
            <img
              src="../../assets/img/Logo.svg"
              class="mx-auto h-16 w-16"
              alt="GameTopUp"
            />
          </div>
          <div class="w-full max-w-[600px]">
            <form>
              <!-- Email input -->
              <label for="" class="mb-2 block">{{
                $t($L.MESSAGE.FORGET_MSG)
              }}</label>
              <div class="relative mb-6" data-te-input-wrapper-init>
                <input
                  type="text"
                  :class="[
                    'block w-full rounded-md border-gray-300 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                    v$.email.$error ? '!border-red-500 focus:ring-red-500' : '',
                  ]"
                  v-model="model.email"
                  @blur="v$.username.$touch"
                  :placeholder="$t($L.MODEL.USER.EMAIL)"
                />
                <p
                  v-for="error of v$.email.$errors"
                  :key="error.$uid"
                  class="mt-2 flex text-red-500"
                >
                  <svg
                    class="mr-2 h-5 w-5 text-red-500"
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
              </div>
              <div class="col-12 q-mt-md">
                <span v-if="msg != ''" class="text-secondary">{{ msg }}</span>
              </div>

              <!-- Submit button -->
              <button
                class="bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block w-full rounded px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                @click="onSubmit"
              >
                {{ $t($L.ACTIONS.SEND) }}
              </button>
              <div class="col-12 q-mt-md text-center">
                <router-link to="/login"
                  ><span class="">{{ $t($L.GENERAL.BACK_LOGIN) }}</span>
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
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
