<template>
  <main class="border-2 border-gray-600 dark:border-gray-200 p-3 rounded-md mt-5">
    <section>
      <div class="flex justify-between items-center">
        <h1 class="text-bold">Summary</h1>
        <USelectMenu
          v-model="selectedOption"
          :options="transactionsViewOptions"
        />
      </div>
    </section>
    <section>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mt-5"
      >
        <Trend
          title="Income"
          :amount="4200"
          :last-amount="9000"
          :is-loading="flase"
        />
        <Trend
          title="Expense"
          :amount="4500"
          :last-amount="4000"
          :is-loading="flase"
        />
        <Trend
          title="Investmense"
          :amount="3000"
          :last-amount="1100"
          :is-loading="flase"
        />
        <Trend
          title="Saving"
          :amount="400"
          :last-amount="500"
          :is-loading="flase"
        />
      </div>
    </section>

    <section class="mt-10 ">
      <Transaction/>
      <Transaction/>
      <Transaction/>
      <Transaction/>
    </section>
  </main>
</template>

<script setup>
import { transactionsViewOptions } from "~/constants.js";
const selectedOption = ref(transactionsViewOptions[1]);
</script>