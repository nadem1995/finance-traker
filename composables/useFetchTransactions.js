export const useFetchTransactions = async () => {
const supabase = useSupabaseClient();
    const { data } = await supabase.from("transactions").select().order('created_at', { ascending: false });
    return data;
}