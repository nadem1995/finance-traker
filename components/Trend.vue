<template>
    <div>
  <div class="font-bold" :class="[color]">
    {{ title }}
  </div>
  <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
    <USkeleton class="h-8 w-full" v-if="isLoading" />
    <div v-else>
      {{ amount }}
    </div>
  </div>
  <div>
    <USkeleton class="h-6 w-full" v-if="isLoading" />
    <div v-else class="flex space-x-1 items-center text-sm">
        <UIcon :class="{'green':trendingUp,'red':!trendingUp}" class="w-6 h-6" :name="icon"/>
        <span>{{ percentageTrend }} vs last period</span>
    </div>
  </div>
</div>
</template>



<script setup>
const props =defineProps({
  title: String,
  amount: Number,
  lastAmount: Number,
  color: String,
  isLoading: Boolean,
});

const trendingUp = computed(()=>{
  return props.amount>= props.lastAmount;
});

const icon = computed(()=>{
  return trendingUp.value?'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down';
})

const percentageTrend = computed(()=>{
  if (props.amount==0 || props.lastAmount ==0) {
    return 'infinite';
  }
const big = Math.max(props.amount,props.lastAmount);
const small = Math.min(props.amount,props.lastAmount);
const ratio = ((big-small)/small)*100;

return `${Math.ceil(ratio)}%`;



});
</script>

<style scoped>
.green {
  @apply text-green-600 dark:text-green-400;
}
.red{
    @apply  text-red-600 dark:text-red-400;
}
</style>
