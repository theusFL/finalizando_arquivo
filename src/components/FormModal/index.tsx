import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ITransaction, TransactionType } from "@/types/transaction";
import { Input } from "../Form/Input";
import { TransactionSwitcher } from "../TransactionSwitcher";

interface ITransactionForm {
  title: string;
  price: number;
  category: string;
  type: TransactionType;
  data: Date;
}

const transactionFormDefaultValues: ITransactionForm = {
  title: "",
  price: 0,
  category: "",
  type: "INCOME",
  data: new Date(),
};

const transactionSchema = yup.object().shape({
  title: yup.string().required("Título é obrigatório"),
  price: yup
    .number()
    .typeError("Preço deve ser um número")
    .positive("Preço deve ser positivo")
    .required("Preço é obrigatório"),
  category: yup.string().required("Categoria é obrigatória"),
  type: yup
    .mixed<TransactionType>()
    .oneOf(["INCOME", "OUTCOME"])
    .required("Tipo é obrigatório"),
  data: yup.date().required("Data é obrigatória"),
});

export interface IFormModalProps {
  formTitle: string;
  closeModal: () => void;
  addTransaction: (transaction: ITransaction) => void;
  updateTransaction?: (transaction: ITransaction) => void;
  transactionToEdit?: ITransaction | null;
}

export function FormModal({
  formTitle,
  closeModal,
  addTransaction,
  updateTransaction,
  transactionToEdit,
}: IFormModalProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm<ITransactionForm>({
    defaultValues: transactionFormDefaultValues,
    resolver: yupResolver(transactionSchema),
  });

  const transactionType = watch("type");

  useEffect(() => {
    if (transactionToEdit) {
      reset({
        ...transactionToEdit,
        price: transactionToEdit.price,
        data: new Date(transactionToEdit.data),
      });
    }
  }, [transactionToEdit, reset]);

  const onSubmit = (data: ITransactionForm) => {
    const transactionData = {
        ...data,
        price: Number(data.price) // Garante que o preço seja um número
    }

    if (transactionToEdit) {
      updateTransaction?.({ ...transactionData, id: transactionToEdit.id } as ITransaction);
    } else {
      addTransaction(transactionData as ITransaction);
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-8 bg-background rounded-lg shadow-lg w-full max-w-lg">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-title">{formTitle}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Título"
            {...register("title")}
            error={errors.title?.message}
          />
          <Input
            placeholder="Preço"
            type="number"
            step="0.01"
            {...register("price")}
            error={errors.price?.message}
          />
          <Input
            placeholder="Categoria"
            {...register("category")}
            error={errors.category?.message}
          />

          <TransactionSwitcher
            value={transactionType}
            onChange={(value) => setValue("type", value)}
          />

          <button
            type="submit"
            className="w-full bg-button text-white py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            {transactionToEdit ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
