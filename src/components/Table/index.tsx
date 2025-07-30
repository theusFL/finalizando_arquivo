// src/components/Table/index.tsx

import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";

export interface ITableProps {
    data: ITransaction[];
    handleDelete: (transactionId: string) => void;
    handleEdit: (transaction: ITransaction) => void;
}

export function Table({ data, handleDelete, handleEdit }: ITableProps) {
    return (
        <table className="w-full mt-16 border-0 border-separate border-spacing-y-2 ">
            <thead>
                <tr>
                    <th className="px-4 text-left text-table-header text-base font-medium">Título</th>
                    <th className="px-4 text-left text-table-header text-base font-medium">Preço</th>
                    <th className="px-4 text-left text-table-header text-base font-medium">Categoria</th>
                    <th className="px-4 text-left text-table-header text-base font-medium">Data</th>
                    <th className="px-4 text-left text-table-header text-base font-medium">Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map((transaction) => (
                    <tr key={transaction.id} className="bg-white h-16 rounded-lg">
                        <td className="px-4 py-4 whitespace-nowrap text-title">{transaction.title}</td>
                        <td className={`px-4 py-4 whitespace-nowrap text-right ${transaction.type === 'INCOME' ? "text-income" : "text-outcome"}`}>{formatCurrency(transaction.price)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-table">{transaction.category}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-table">{transaction.data ? formatDate(new Date(transaction.data)) : ''}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-table">
                            <button onClick={() => handleEdit(transaction)} className="mr-2 text-blue-600 hover:text-blue-800">Editar</button>
                            <button onClick={() => handleDelete(transaction.id!)} className="text-red-600 hover:text-red-800">Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
