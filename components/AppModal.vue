<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header> Add transaction </template>

            <UForm :state="state" :schema="schema" ref="form" @submit.prevent="save">
                <UFormGroup :required="true" label="Transaction type" class="mb-4" name="transaction_type">
                    <USelect placeholder="Transaction type" v-model="state.type" :options="transactionsType" />
                </UFormGroup>
                <UFormGroup label="Amount" :required="true" class="mb-4" name="amount">
                    <UInput type="number" placeholder="Amount" v-model.number="state.amount" />
                </UFormGroup>
                <UFormGroup label="Transaction date" :required="true" class="mb-4" name="created_at">
                    <UInput type="date" placeholder="Transaction date" v-model="state.created_at" />
                </UFormGroup>
                <UFormGroup label="Description" hint="Optional" class="mb-4" name="description">
                    <UInput type="text" placeholder="Description" v-model="state.description" />
                </UFormGroup>
                <UFormGroup v-if="state.type==='Expence'" :required="true" label="Category" class="mb-4" name="category">
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
import {z} from 'zod';

const defaultSchema =z.object({
    created_at:z.string(),
    description:z.string().optional(),
    amount:z.number().positive('Amount most be more than 0'),
})
const incomeSchema = z.object({
    type :z.literal('Income'),
})
const expenceSchema = z.object({
    type :z.literal('Expence'),
    categories:z.enum(categories),
})
const investmentSchema = z.object({
    type :z.literal('Investment'),
})
const savingSchema = z.object({
    type :z.literal('Saving'),
})
const schema = z.intersection(
    z.discriminatedUnion('type',[incomeSchema,expenceSchema,investmentSchema,savingSchema])
    ,defaultSchema)

const form = ref();

const save=async ()=>{
    form.value.validate();
}
const initialState = {
    type: undefined,
    amount: 0,
    created_at: undefined,
    description: undefined,
    category: undefined,
}
const state = ref({
   ...initialState
})

const resetForm = ()=>{
    Object.assign(state.value,initialState);
    form.value.clear();
}

const props = defineProps({
    modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => {
        if(!value) resetForm()
        emit("update:modelValue", value)
    },
});
</script>