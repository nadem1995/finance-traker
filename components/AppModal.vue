<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header> Add transaction </template>

      <UForm :state="state">
      <UFormGroup
        :required="true"
        label="Transaction type"
        class="mb-4"
        name="transaction_type"
      >
        <USelect placeholder="Transaction type" v-model="state.type" :options="transactionsType" />
      </UFormGroup>
      <UFormGroup label="Amount" :required="true" class="mb-4" name="amount">
        <UInput type="number" placeholder="Amount" v-model.number="state.amount" />
      </UFormGroup>
      <UFormGroup
        label="Transaction date"
        :required="true"
        class="mb-4"
        name="created_at"
      >
        <UInput type="date" placeholder="Transaction date" v-model="state.created_at" />
      </UFormGroup>
      <UFormGroup
        label="Description"
        hint="Optional"
        class="mb-4"
        name="description"
      >
        <UInput type="text" placeholder="Description"  v-model="state.description" />
      </UFormGroup>
      <UFormGroup
        :required="true"
        label="Category"
        class="mb-4"
        name="category"
      >
        <USelect placeholder="Category" :options="categories" v-model="state.category" />
      </UFormGroup>
      <UButton type="submit" color="black" variant="solid">Save</UButton>
    </UForm>
    </UCard>
  </UModal>
</template>
<script setup>
import { categories } from "~/constants.js";
import { transactionsType } from "~/constants.js";

 const state =ref({
    type:undefined,
    amount:0,
    created_at:undefined,
    description:undefined,
    category:undefined,
 })

const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>