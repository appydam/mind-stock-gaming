
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { BACKEND_HOST } from '@/constants/config';
import { ContestType } from '@/components/profile/data/mockProfileData';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: string;
  contestName?: string;
}

interface ProfileActionsProps {
  participations: ContestType[];
  setParticipations: React.Dispatch<React.SetStateAction<ContestType[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const useProfileActions = ({
  participations,
  setParticipations,
  transactions,
  setTransactions,
  user,
  setUser
}: ProfileActionsProps) => {
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState<ContestType | null>(null);

  const handleEditStocks = (contest: ContestType) => {
    setSelectedContest(contest);
    setIsEditDialogOpen(true);
  };

  const handleShareContest = (contest: ContestType) => {
    setSelectedContest(contest);
    setIsShareModalOpen(true);
  };

  const handleUpdateStocks = async (contestId: number, newStocks: string[]) => {
    try {
      const userId = Number(JSON.parse(localStorage.getItem("userId") || "0"));
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      const payload = {
        userId: userId,
        contestId: Number(contestId),
        bucket: newStocks,
      };

      const apiPath = BACKEND_HOST + 'updateCustomBucket';
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      const updatedParticipations = participations.map(p => {
        if (p.contest_id === contestId) {
          return { ...p, stocks_in_basket: newStocks };
        }
        return p;
      });

      setParticipations(updatedParticipations);
      setIsEditDialogOpen(false);

      toast({
        title: "Stocks updated",
        description: "Your stock selection has been updated successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to update stocks:", error);

      toast({
        title: "Error",
        description: "Failed to update stocks. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeposit = (depositAmount: string) => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to deposit.",
        variant: "destructive",
      });
      return;
    }

    const newBalance = user.balance + amount;
    setUser({ ...user, balance: newBalance });

    const newTransaction = {
      id: `tx${transactions.length + 1}`,
      type: 'deposit',
      amount: amount,
      date: new Date().toISOString(),
      status: 'completed'
    };
    setTransactions([newTransaction, ...transactions]);

    toast({
      title: "Deposit successful",
      description: `₹${amount} has been added to your balance.`,
      variant: "default",
    });

    setIsDepositDialogOpen(false);
  };

  const handleWithdraw = (withdrawAmount: string) => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive",
      });
      return;
    }

    if (amount > user.balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance to withdraw this amount.",
        variant: "destructive",
      });
      return;
    }

    const newBalance = user.balance - amount;
    setUser({ ...user, balance: newBalance });

    const newTransaction = {
      id: `tx${transactions.length + 1}`,
      type: 'withdrawal',
      amount: amount,
      date: new Date().toISOString(),
      status: 'completed'
    };
    setTransactions([newTransaction, ...transactions]);

    toast({
      title: "Withdrawal successful",
      description: `₹${amount} has been withdrawn from your balance.`,
      variant: "default",
    });

    setIsWithdrawDialogOpen(false);
  };

  // Generate share text based on contest type
  const getShareText = () => {
    if (!selectedContest) return "";
    
    if (selectedContest.gameType === "opinion") {
      return `I voted "${selectedContest.userAnswer}" on "${selectedContest.contest_name}" on MindStock! Join me in this prediction contest.`;
    } else {
      const returnText = selectedContest.returns >= 0 
        ? `made +${selectedContest.returns.toFixed(2)}%`
        : `currently at ${selectedContest.returns.toFixed(2)}%`;
      
      return `In the ${selectedContest.contest_name} on MindStock, I ${returnText} and ranked #${selectedContest.rank}. Join me in trading contests!`;
    }
  };

  return {
    isDepositDialogOpen,
    setIsDepositDialogOpen,
    isWithdrawDialogOpen,
    setIsWithdrawDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isShareModalOpen,
    setIsShareModalOpen,
    selectedContest,
    handleEditStocks,
    handleShareContest,
    handleUpdateStocks,
    handleDeposit,
    handleWithdraw,
    getShareText,
  };
};
