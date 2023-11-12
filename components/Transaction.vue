<template>
  <div class="border-b py-4 grid grid-cols-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1">
        <UIcon :name="icon" :class="iconColor" />
        <div class="capitalize">{{transaction.description }}</div>
      </div>
      <div v-if="transaction.category">
        <UBadge class="capitalize" color="white" variant="solid">{{ transaction.category }}</UBadge>
      </div>
    </div>
    
    <div class="flex items-center justify-end gap-1">
      <div>{{ currency }}</div>
      <div>
        <UDropdown mode="hover" :items="items" :popper="{ placement: 'bottom' }">
          <UButton
          variant="ghost"
            color="white"
            trailing-icon="i-heroicons-ellipsis-horizontal"
          />
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  transaction:Object
});
const isIncome = computed(()=>{
  return props.transaction.type==='income'
})
const icon = computed (()=>{
  return isIncome.value?'i-heroicons-arrow-up-right':'i-heroicons-arrow-down-right';
})

const iconColor = computed (()=>{
  return isIncome.value?'text-green-600':'text-red-600';
})

const { currency } = useCurrency(props.transaction.amount);
const items = [
  [
  {
    label: "Edit",
    icon: "i-heroicons-pencil-square-20-solid",
    click: () => {
      console.log("Edit");
    },
  },
  {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      console.log("Delete");
    },
  }
  ]
];
</script>
