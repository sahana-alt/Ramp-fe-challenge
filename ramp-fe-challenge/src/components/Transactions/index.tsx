import { useCallback, useEffect, useState } from "react"
import { useCustomFetch } from "src/hooks/useCustomFetch"
import { SetTransactionApprovalParams } from "src/utils/types"
import { TransactionPane } from "./TransactionPane"
import { SetTransactionApprovalFunction, TransactionsComponent } from "./types"

export const Transactions: TransactionsComponent = ({ transactions }) => {
  const { fetchWithoutCache, loading } = useCustomFetch()
  const [localTransactions, setLocalTransactions] = useState(transactions);

  useEffect(() => {
    setLocalTransactions(transactions);
  }, [transactions]);

  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue }) => {
      await fetchWithoutCache<void, SetTransactionApprovalParams>("setTransactionApproval", {
        transactionId,
        value: newValue,
      });

      setLocalTransactions((prevTransactions) =>
        prevTransactions && prevTransactions.map((transaction) =>
          transaction.id === transactionId ? { ...transaction, approved: newValue } : transaction
        )
      );

    },
    [fetchWithoutCache]
  )

  if (localTransactions === null) {
    return <div className="RampLoading--container">Loading...</div>
  }

  return (
    <div data-testid="transaction-container">
      {localTransactions.map((transaction) => (
        <TransactionPane
          key={transaction.id}
          transaction={transaction}
          loading={loading}
          setTransactionApproval={setTransactionApproval}
        />
      ))}
    </div>
  )
}