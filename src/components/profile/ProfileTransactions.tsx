
import TransactionsList from "./TransactionsList";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: string;
  contestName?: string;
}

interface ProfileTransactionsProps {
  transactions: Transaction[];
  isAuthenticated: boolean;
}

const ProfileTransactions = ({ transactions, isAuthenticated }: ProfileTransactionsProps) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <TransactionsList 
        transactions={transactions} 
        isAuthenticated={isAuthenticated}
      />
    </>
  );
};

export default ProfileTransactions;
