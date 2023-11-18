<template>
  <main class="border-2 border-gray-600 dark:border-gray-200 p-3 rounded-md mt-5">
    <section>
      <div class="flex justify-between items-center">
        <h1 class="text-bold">Summary</h1>
        <USelectMenu v-model="selectedOption" :options="transactionsViewOptions" />
      </div>
    </section>
    <section>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mt-5">
        <Trend title="Income" :amount="incomsTotal" :last-amount="9000" :is-loading="false" />
        <Trend title="Expense" :amount="expensesTotal" :last-amount="15" :is-loading="false" />
        <Trend title="Investmense" :amount="3000" :last-amount="1100" :is-loading="false" />
        <Trend title="Saving" :amount="400" :last-amount="500" :is-loading="false" />
      </div>
    </section>
    <section class="my-10">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-extrabold">Transactions</h2>
          <div>You have {{ incomes.length }} incomes and {{ expenses.length }} expenses this period</div>
        </div>
        <div>
          <AppModal v-model="isOpen" @saved="refreshTransaction()"/> 
          <UButton @click="isOpen = true" icon="i-heroicons-plus-circle" color="white" variant="solid" label="Add" />
        </div>
      </div>
    </section>

    <section class="mt-10">
      <div v-for="(transactionsonDay, date) in transactionsGroupedByDate" :key="date">
        <DailyTransactionSummary :date="date" :transactions="transactionsonDay" />
        <Transaction @delete="refreshTransaction()" v-for="transaction in transactionsonDay" :key="transaction.id"
          :transaction="transaction">
        </Transaction>
      </div>
    </section>
  </main>
</template>

<script setup>
import { transactionsViewOptions } from "~/constants.js";
const selectedOption = ref(transactionsViewOptions[1]);
const transactions = ref([])
transactions.value= await useFetchTransactions()
const isOpen = ref(false);
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

const incomes = computed(() => {
  return transactions.value.filter((transaction) => transaction.type === 'income')
})

const expenses = computed(() => {
  return transactions.value.filter((transaction) => transaction.type === 'expence')
})

const incomsTotal = computed(() => {
  let sum = 0;
  incomes.value.forEach(income => {
    sum += income.amount;
  });

  return sum;
})

const expensesTotal = computed(() => {
  let sum = 0;
  expenses.value.forEach(expense => {
    sum += expense.amount;
  });

  return sum;
})

</script>
