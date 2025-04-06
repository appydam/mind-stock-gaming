
import MorphCard from "@/components/ui/MorphCard";
import { ArrowDownLeft, ArrowUpRight, Trophy } from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: string;
  contestName?: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
  isAuthenticated?: boolean;
}

const TransactionsList = ({ transactions, isAuthenticated = false }: TransactionsListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-secondary/40 rounded-lg">
        <h3 className="text-xl font-medium mb-2">No Transactions</h3>
        <p className="text-muted-foreground">
          {isAuthenticated 
            ? "You haven't made any transactions yet."
            : "Login to view your transaction history."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <MorphCard key={tx.id} className="p-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {tx.type === 'deposit' ? (
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              ) : tx.type === 'withdrawal' ? (
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              ) : (
                <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
                  <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              )}
              <div>
                <p className="font-medium capitalize">{tx.type}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(tx.date).toLocaleDateString()} at {new Date(tx.date).toLocaleTimeString()}
                </p>
                {tx.contestName && (
                  <p className="text-xs text-muted-foreground">
                    Contest: {tx.contestName}
                  </p>
                )}
              </div>
            </div>
            <p className={`font-medium ${tx.type === 'deposit' ? 'text-green-500' : 'text-blue-500'}`}>
              {tx.type === 'deposit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
            </p>
          </div>
        </MorphCard>
      ))}
    </div>
  );
};

export default TransactionsList;
