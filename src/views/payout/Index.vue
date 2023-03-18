<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Payout</h3>
          <p class="mt-1 text-sm text-gray-600">
            You can request to payout your available balance.
          </p>
          <div class="rounded-md bg-indigo-50 p-4 border border-indigo-400 mt-5">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-indigo-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3 flex-1 md:flex md:justify-between">
                <p class="text-sm text-indigo-700">
                  Your payout request will be processed immediately after submission, but
                  the speed of payout money into your account depends on the queue from
                  our side and the network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
            <fieldset>
              <legend class="text-base font-medium text-gray-900">
                Choose a Payment Method
              </legend>

              <div class="mt-4 grid grid-cols-2 gap-y-6 gap-x-4">
                <label
                  class="relative flex cursor-pointer rounded-lg border border-indigo-500 ring-1 ring-indigo-500 bg-white p-4 shadow-sm focus:outline-none"
                >
                  <span class="flex flex-1">
                    <span class="flex flex-col">
                      <span
                        id="project-type-0-label"
                        class="block text-sm font-medium text-gray-900"
                        >USD
                      </span>
                      <span
                        id="project-type-0-description-0"
                        class="mt-3 flex items-center text-xs text-gray-500"
                        >Available Balance</span
                      >
                      <span
                        id="project-type-0-description-1"
                        class="text-sm font-medium text-gray-900"
                        >{{ balanceModel.availableBalance }} USDT</span
                      >
                    </span>
                  </span>
                  <svg
                    class="h-5 w-5 text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span
                    class="pointer-events-none absolute -inset-px rounded-lg border border-indigo-500"
                    aria-hidden="true"
                  ></span>
                </label>
                <!-- <label
                    class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                  >
                    <span class="flex flex-1">
                      <span class="flex flex-col">
                        <span
                          id="project-type-1-label"
                          class="block text-sm font-medium text-gray-900"
                          >Ruble
                        </span>
                        <span
                          id="project-type-0-description-0"
                          class="mt-3 flex items-center text-xs text-gray-500"
                          >Available Balance</span
                        >
                        <span
                          id="project-type-0-description-1"
                          class="text-sm font-medium text-gray-900"
                          >12,843.00 RUB</span
                        >
                      </span>
                    </span>

                    <svg
                      class="h-5 w-5 text-indigo-600 invisible"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span
                      class="pointer-events-none absolute -inset-px rounded-lg border border-transparent"
                      aria-hidden="true"
                    ></span>
                  </label> -->
              </div>
            </fieldset>
            <fieldset>
              <legend class="text-base font-medium text-gray-900">
                Choose a Network
              </legend>
              <div class="relative mt-3 -space-y-px rounded-md bg-white">
                <template v-for="(item, index) in paymentMethod.items" :key="index">
                  <label
                    :for="'rb' + index"
                    class="border z-10 rounded-md mb-2 relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-2 focus:outline-none dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <span class="flex flex-2 items-center text-sm">
                      <input
                        :id="'rb' + index"
                        type="radio"
                        name="pricing-plan"
                        :value="item.value"
                        v-model="payoutModel.paymentMethod"
                        class="peer h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        aria-labelledby="pricing-plans-0-label"
                        aria-describedby="pricing-plans-0-description-0 pricing-plans-0-description-1"
                      />
                      <span
                        id="pricing-plans-0-label"
                        class="ml-3 font-medium text-indigo-900"
                        >{{ item.text }}</span
                      >
                    </span>
                    <span
                      id="pricing-plans-0-description-1"
                      class="ml-6 pl-1 text-xs md:ml-0 md:pl-0 md:text-right text-indigo-700"
                      >{{ item.text }}</span
                    >
                  </label>
                  <p
                    v-for="error of v$.paymentMethod.$errors"
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
                </template>

                <!-- <label
                  class="rounded-md relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-2 focus:outline-none focus:border-red-400"
                >
                  <span class="flex flex-2 items-center text-sm">
                    <input
                      type="radio"
                      name="pricing-plan"
                      value="Startup"
                      class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      aria-labelledby="pricing-plans-0-label"
                      aria-describedby="pricing-plans-0-description-0 pricing-plans-0-description-1"
                    />
                    <span id="pricing-plans-0-label" class="ml-3 font-sm"
                      >USDT ERC20</span
                    >
                  </span>
                  <span
                    id="pricing-plans-0-description-1"
                    class="ml-6 pl-1 text-xs md:ml-0 md:pl-0 md:text-right"
                    >Ethereum Network Fee</span
                  >
                </label> -->
              </div>
            </fieldset>
            <fieldset>
              <legend class="text-base mb-3 font-medium text-gray-900">
                Enter Wallet Address
              </legend>
              <div>
                <div class="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    :class="[
                      'block w-full rounded-md border-gray-300 pr-14 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4',
                      v$.userWalletAddress.$error
                        ? '!border-red-500 focus:ring-red-500'
                        : '',
                    ]"
                    placeholder="Enter the wallet address"
                    aria-describedby="price-currency"
                    v-model="payoutModel.userWalletAddress"
                    @blur="v$.userWalletAddress.$touch"
                  />
                </div>
                <p
                  v-for="error of v$.userWalletAddress.$errors"
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
              </div>
            </fieldset>
            <fieldset>
              <legend class="text-base mb-3 font-medium text-gray-900">
                Enter Amount
              </legend>
              <div>
                <div class="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    :class="[
                      'block w-full py-4 rounded-md border-gray-300 pr-14 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                      v$.amount.$error ? '!border-red-500 focus:ring-red-500' : '',
                    ]"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                    v-model="payoutModel.amount"
                    @blur="v$.amount.$touch"
                  />
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <span class="text-gray-500 sm:text-sm" id="price-currency">
                      USD
                    </span>
                  </div>
                </div>
                <p
                  v-for="error of v$.amount.$errors"
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
              </div>
            </fieldset>
          </div>
          <div class="bg-indigo-50 px-4 py-6 flex sm:px-6">
            <div class="text-xs flex-1">
              You will receive
              <span class="font-medium text-base block text-cyan-600"
                >{{ payoutModel.amount }} USDT</span
              >
            </div>
            <button
              @click="onSubmit"
              class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Request the Payout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { cid, container } from "inversify-props";
import { PayoutService } from "src/core/services";
import { BalanceVm, PaymentMethodVm, PayoutVm } from "src/core/viewModels";
import { useQuasar } from "quasar";
import { Utility } from "src/commons";

export default defineComponent({
  setup() {
    const payoutService = container.get<PayoutService>(cid.PayoutService);
    const balanceModel = ref(new BalanceVm());
    const paymentMethod = ref(new PaymentMethodVm());
    const payoutModel = ref(new PayoutVm());
    const $q = useQuasar();
    const v$ = payoutModel.value.v$(payoutModel);

    async function loadBalance() {
      balanceModel.value = await payoutService.balanceAsync();
    }
    async function loadPaymentMethod() {
      paymentMethod.value = await payoutService.paymentMethodAsync();
    }

    function onSubmit() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }
      $q.dialog({
        message: "Are You Sure?",
        cancel: true,
        persistent: true,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
      }).onOk(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result = await payoutService.payoutRequestAsync(payoutModel.value);
        Utility.showNotification(result.status, result.joinedErrors);
        loadBalance();
        onReset();
      });
    }

    function onReset() {
      payoutModel.value = new PayoutVm();
    }

    onMounted(() => {
      loadBalance();
      loadPaymentMethod();
    });

    return {
      balanceModel,
      paymentMethod,
      payoutModel,
      v$,
      onSubmit,
    };
  },
});
</script>
