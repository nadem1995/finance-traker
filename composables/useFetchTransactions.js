export const useFetchTransactions = async () => {
const supabase = useSupabaseClient();
const transactions = ref([])
const isLoading = ref([true])

    const { data } = await supabase.from("transactions").select().order('created_at', { ascending: false });
    transactions.value=data;
    isLoading.value=false
    return {
        isLoading:isLoading,
        transactions:transactions
    };
}