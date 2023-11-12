<template>
  <main
    class="border-2 border-gray-600 dark:border-gray-200 p-3 rounded-md mt-5"
  >
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

    <section class="mt-10">
     <div v-for="(transactionsonDay,index) in transactionsGroupedByDate" :key="index">
      <DailyTransactionSummary :date="date" :transactions="transactionsonDay"/>
     <Transaction v-for="transaction in transactionsonDay" :key="transaction.id" :transaction="transaction"></Transaction>
    </div>
    </section>
  </main>
</template>

<script setup>
import {transactionsViewOptions} from '~/constants.js';
const selectedOption = ref(transactionsViewOptions[1]);

const supabase = useSupabaseClient();

const { data, pending } = await useAsyncData("transactions", async () => {
  const { data, error } = await supabase.from("transactions").select();

  if (error) {
    return [];
  }
  return data;
});
const transactions = ref(data);

const transactionsGroupedByDate = computed(() => {
  let groups = {};
  for (const transaction of transactions.value) {
    const date = new Date(transaction.created_at).toISOString().split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
  }

  return groups;
});

console.log(transactionsGroupedByDate);

</script>