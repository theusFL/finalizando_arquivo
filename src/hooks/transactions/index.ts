import { createTransaction, getTransactions } from "@/services/transactions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const QUERY_KEY = 'qkTransaction'

const Create = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    }
  })
}

const Delete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

const ListAll = () => {
  return useQuery({ queryKey: [QUERY_KEY], queryFn: getTransactions})
}

export const useTransaction = {
    Create,
    ListAll,
    Delete, 
};



