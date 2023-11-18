export const useFetchTransactionsByDate = (transactions) => {
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
      return transactionsGroupedByDate;
}