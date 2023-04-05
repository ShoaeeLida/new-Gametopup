<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Payout</h3>
          <p class="mt-1 text-sm text-gray-600">
            You can request to payout your available balance.
          </p>
          <div class="mt-5 rounded-md border border-indigo-400 bg-indigo-50 p-4">
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
        <form action="#" method="POST">
          <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
              <fieldset>
                <legend class="text-base font-medium text-gray-900">
                  Choose a Payment Method
                </legend>

                <div class="mt-4 grid grid-cols-2 gap-y-6 gap-x-4">
                  <label
                    class="relative flex cursor-pointer rounded-lg border border-indigo-500 bg-white p-4 shadow-sm ring-1 ring-indigo-500 focus:outline-none"
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
                          >1,843.00 USDT</span
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
                  <label
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
                    <!-- Not Checked: "invisible" -->
                    <svg
                      class="invisible h-5 w-5 text-indigo-600"
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
                    <!--
                                Active: "border", Not Active: "border-2"
                                Checked: "border-indigo-500", Not Checked: "border-transparent"
                              -->
                    <span
                      class="pointer-events-none absolute -inset-px rounded-lg border border-transparent"
                      aria-hidden="true"
                    ></span>
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <legend class="text-base font-medium text-gray-900">
                  Choose a Network
                </legend>
                <div class="relative mt-3 -space-y-px rounded-md bg-white">
                  <label
                    class="relative z-10 mb-2 flex cursor-pointer flex-col rounded-md border border-indigo-200 bg-indigo-50 p-4 focus:outline-none md:grid md:grid-cols-2 md:pl-4 md:pr-6"
                  >
                    <span class="flex-2 flex items-center text-sm">
                      <input
                        type="radio"
                        name="pricing-plan"
                        value="Startup"
                        checked
                        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        aria-labelledby="pricing-plans-0-label"
                        aria-describedby="pricing-plans-0-description-0 pricing-plans-0-description-1"
                      />
                      <span
                        id="pricing-plans-0-label"
                        class="ml-3 font-medium text-indigo-900"
                        >USDT TRC20</span
                      >
                    </span>
                    <span
                      id="pricing-plans-0-description-1"
                      class="ml-6 pl-1 text-xs text-indigo-700 md:ml-0 md:pl-0 md:text-right"
                      >Upto 30 TRX Fee</span
                    >
                  </label>
                  <label
                    class="relative flex cursor-pointer flex-col rounded-md border p-4 focus:outline-none md:grid md:grid-cols-2 md:pl-4 md:pr-6"
                  >
                    <span class="flex-2 flex items-center text-sm">
                      <input
                        type="radio"
                        name="pricing-plan"
                        value="Startup"
                        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        aria-labelledby="pricing-plans-0-label"
                        aria-describedby="pricing-plans-0-description-0 pricing-plans-0-description-1"
                      />
                      <span id="pricing-plans-0-label" class="font-sm ml-3"
                        >USDT ERC20</span
                      >
                    </span>
                    <span
                      id="pricing-plans-0-description-1"
                      class="ml-6 pl-1 text-xs md:ml-0 md:pl-0 md:text-right"
                      >Ethereum Network Fee</span
                    >
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <legend class="mb-3 text-base font-medium text-gray-900">
                  Enter Wallet Address
                </legend>
                <div>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      class="block w-full rounded-md border-gray-300 py-4 pr-14 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-4"
                      placeholder="Enter the wallet address"
                      aria-describedby="price-currency"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend class="mb-3 text-base font-medium text-gray-900">
                  Enter Amount
                </legend>
                <div>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      class="block w-full rounded-md border-gray-300 py-4 pr-14 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="0.00"
                      aria-describedby="price-currency"
                    />
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <span class="text-gray-500 sm:text-sm" id="price-currency">
                        USD
                      </span>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="flex bg-indigo-50 px-4 py-6 sm:px-6">
              <div class="flex-1 text-xs">
                You will receive
                <span class="block text-base font-medium text-cyan-600">921.45 USDT</span>
              </div>
              <button
                type="submit"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Request the Payout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { cid, container } from "inversify-props";
import { TransactionService } from "src/core/services";
import { BalanceVm, DropDownVm, WithdrawalVm } from "src/core/viewModels";
import { MessageTypeEnum, Utility } from "src/commons";

export default defineComponent({
  setup() {
    const transactionService = container.get<TransactionService>(cid.TransactionService);

    const balanceModel = ref(new BalanceVm());
    const withdrawalModel = ref(new WithdrawalVm());
    const paymentMethod = ref<Array<DropDownVm>>([]);
    const v$ = withdrawalModel.value.v$(withdrawalModel);
    const openModal = ref(false);

    paymentMethod.value = [
      {
        label: "TRON",
        value: "1",
      },
      {
        label: "USDT_TRON",
        value: "2",
      },
    ];

    async function onConfirm() {
      var result = await transactionService.withdrawalRequestAsync(withdrawalModel.value);
      Utility.showNotification(result.status, result.message);

      if (result.status == MessageTypeEnum.Success) {
        withdrawalModel.value = new WithdrawalVm();
        v$.value.$reset();
        loadBalance();
      }
    }

    function openConfirm() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }
      openModal.value = true;
    }

    async function loadBalance() {
      balanceModel.value = await transactionService.balanceAsync();
    }

    onMounted(() => {
      loadBalance();
    });

    return {
      withdrawalModel,
      balanceModel,
      paymentMethod,
      v$,
      onConfirm,
      openConfirm,
      openModal,
    };
  },
});
</script>
