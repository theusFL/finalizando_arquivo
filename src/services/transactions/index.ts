import { ITransaction } from "@/types/transaction";
import { api } from "../api";
import { toast } from "react-toastify";

export async function getTransactions({ pageParam = 0 }) {
  try {
    const response = await api.get(`/transaction?skip=${pageParam}&take=10`);
    return response.data;
  } catch (error) {
    toast.error("Erro ao buscar transações.");
    throw new Error("Erro ao buscar transações: " + error);
  }
}

export async function createTransaction(transaction: ITransaction) {
  try {
    const response = await api.post('/transaction', transaction);
    toast.success("Transação criada com sucesso!");
    return response.data;
  } catch (error) {
    toast.error("Erro ao criar transação.");
    throw new Error("Erro ao criar transação: " + error);
  }
}

export async function updateTransaction(transaction: ITransaction) {
  try {
    const response = await api.patch(`/transaction/${transaction.id}`, transaction);
    toast.success("Transação atualizada com sucesso!");
    return response.data;
  } catch (error) {
    toast.error("Erro ao atualizar transação.");
    throw new Error("Erro ao atualizar transação: " + error);
  }
}

export async function deleteTransaction(transactionId: string) {
  try {
    await api.delete(`/transaction/${transactionId}`);
    toast.success("Transação excluída com sucesso!");
  } catch (error) {
    toast.error("Erro ao excluir transação.");
    throw new Error("Erro ao excluir transação: " + error);
  }
}
