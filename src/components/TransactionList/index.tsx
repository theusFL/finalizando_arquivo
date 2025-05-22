import { ITransaction } from "@/interfaces/transaction";

const headers = ["Título", "Preço", "Categoria", "Data"];

interface ITransactionListProps {
  list: ITransaction[];
}

export function TransactionList(props: ITransactionListProps) {
  return (
    <table
      style={{
        width: "100%",
        borderSpacing: "0 8px",
        borderCollapse: "separate",
        marginTop: "64px",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr style={{ marginLeft: "32px" }}>
          {headers.map((header) => (
            <th
              key={header}
              style={{
                color: "#969CB2",
                textAlign: "left",
                padding: "8px",
                fontSize: "16px",
                fontWeight: "100",
                paddingLeft: headers.indexOf(header) === 0 ? "32px" : "0",
              }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.list.map((transaction) => (
          <TransactionListItem key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
}

function TransactionListItem({ transaction }: { transaction: ITransaction }) {
  return (
    <tr
      style={{
        backgroundColor: "#FFFFFF",
        fontSize: "16px",
        color: "#969CB2",
        height: "64px",
        marginLeft: "32px",
      }}
    >
      <td
        style={{
          color: "#000000",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
          paddingLeft: "32px",
        }}
      >
        {transaction.title}
      </td>
      <td
        style={{
          color: transaction.type === "outcome" ? "#E52E4D" : "#33CC95",
        }}
      >
        {`${transaction.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`}
      </td>
      <td>{transaction.category}</td>
      <td
        style={{ borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}
      >
        {transaction.createdAt.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
    </tr>
  );
}
