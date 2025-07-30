import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/services/transactions";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const QUERY_KEY = "qkTransaction";

const ListAll = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY],
    queryFn: getTransactions,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.length * 10;
    },
  });
};

const Create = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

const Update = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

const Delete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useTransaction = {
  Create,
  ListAll,
  Update,
  Delete,
};
