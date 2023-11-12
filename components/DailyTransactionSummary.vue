<template>
  <div class="border-b py-4 grid grid-cols-2">
    <div class="flex items-center justify-between">
      {{ props.date }}
    </div>

    <div class="flex items-center justify-end gap-1 mr-9">{{ currency }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  date: String,
  transactions: Array,
});

const sum = computed(() => {
  let sum = 0;
  for (const transaction of props.transactions) {
    if (transaction.type === "income") {
      sum += transaction.amount;
    } else {
      sum -= transaction.amount;
    }
  }
  return sum;
});
const {currency} = useCurrency(sum);
</script>
