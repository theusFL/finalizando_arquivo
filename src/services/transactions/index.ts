import { ITransaction } from "@/types/transaction";
import { api } from "../api"
import { toast } from "react-toastify";
export async function getTransactions() {
    try {
      const response = await api.get('/transaction') 
      return response.data; 
    } catch (error) {
        throw new Error("Erro ao buscar transações: " + error);
    }
}

export async function createTransaction(transaction: ITransaction) {
    try {
        const response = await api.post('/transaction', transaction);
        toast.success("Transação adicionada com sucesso!")
        return response.data;
    } catch (error) {
        throw new Error("Erro ao criar transação: " + error);
    }
}

export async function deleteTransaction(transactionId: string) {
    try {
        await api.delete(`/transaction/${transactionId}`);
        toast.success("Transação excluída com sucesso!");
    } catch (error) {
        throw new Error("Erro ao excluir transação: " + error);
    }
}

export async function updateTransaction(transaction: ITransaction) {
    try {
        const response = await api.patch(`/transaction/${transaction.id}`, transaction);
        toast.success("Transação atualizada com sucesso!");
        return response.data;
    } catch (error) {
        throw new Error("Erro ao atualizar transação: " + error);
    }
}
