export interface ITransaction {
  id: number;
  title: string;
  value: number;
  category: string;
  type: "income" | "outcome";
  createdAt: Date;
}
