"use client";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Spinner } from "@/components/Spinner";
import { Table } from "@/components/Table";
import { useTransaction } from "@/hooks/transactions";
import { ITotal, ITransaction } from "@/types/transaction";
import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useTransaction.ListAll();
    const { mutate: addTransaction } = useTransaction.Create();
    const { mutate: updateTransaction } = useTransaction.Update();
    const { mutate: deleteTransaction } = useTransaction.Delete();

    const transactions = useMemo(() => data?.pages.flatMap(page => page) || [], [data]);

    const totalTransactions = useMemo<ITotal>(() => {
        return transactions.reduce(
            (acc, transaction) => {
                if (transaction.type === 'INCOME') {
                    acc.income += transaction.price;
                    acc.total += transaction.price;
                } else {
                    acc.outcome += transaction.price;
                    acc.total -= transaction.price;
                }
                return acc;
            },
            {
                income: 0,
                outcome: 0,
                total: 0,
            }
        );
    }, [transactions]);

    const openModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleAddModal = (newTransaction: ITransaction) => {
        addTransaction(newTransaction);
    };

    const openEditModal = (transaction: ITransaction) => {
        setTransactionToEdit(transaction);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setTransactionToEdit(null);
    };
    const handleUpdateTransaction = (updatedTransaction: ITransaction) => {
        updateTransaction(updatedTransaction);
    };

    const handleDelete = (transactionId: string) => {
        setTransactionToDelete(transactionId);
        setIsDeleteModalOpen(true);
    };
    const confirmDelete = () => {
        if (transactionToDelete) {
            deleteTransaction(transactionToDelete);
            setIsDeleteModalOpen(false);
            setTransactionToDelete(null);
        }
    };
    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setTransactionToDelete(null);
    };

    return (
        <div>
            <Header openModal={openModal} />
            <ToastContainer />

            <BodyContainer>
                <CardContainer totals={totalTransactions} />

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <Table
                            data={transactions}
                            handleDelete={handleDelete}
                            handleEdit={openEditModal}
                        />

                        {hasNextPage && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="bg-button text-white px-8 py-3 rounded-md hover:opacity-80 disabled:opacity-50 transition-opacity"
                                >
                                    {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
                                </button>
                            </div>
                        )}
                    </>
                )}

            </BodyContainer>

            {isModalOpen && (
                <FormModal
                    closeModal={handleCloseModal}
                    formTitle="Adicionar Transação"
                    addTransaction={handleAddModal}
                />
            )}

            {isEditModalOpen && transactionToEdit && (
                <FormModal
                    closeModal={closeEditModal}
                    formTitle="Editar Transação"
                    updateTransaction={handleUpdateTransaction}
                    transactionToEdit={transactionToEdit}
                    addTransaction={() => {}}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}
