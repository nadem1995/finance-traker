<template>
  <div class="border-b py-4 grid grid-cols-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1">
        <UIcon name="i-heroicons-arrow-up-right" class="text-green-600" />
        <span>Slary</span>
      </div>
      <div><UBadge color="white" variant="solid">Badge</UBadge></div>
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
const { currency } = useCurrency(3000);

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
