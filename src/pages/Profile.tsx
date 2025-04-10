
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_HOST } from '@/constants/config';
import EditStocksDialog from "@/components/EditStocksDialog";
import ShareModal from "@/components/profile/ShareModal";
import ContestShareCard from "@/components/profile/ContestShareCard";

// Import custom components
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import TransactionsList from "@/components/profile/TransactionsList";
import ContestsList from "@/components/profile/ContestsList";
import MoneyManagementDialogs from "@/components/profile/MoneyManagementDialogs";
import StatCards from "@/components/profile/StatCards";
import VirtualBalanceCard from "@/components/profile/VirtualBalanceCard";

// Import hooks and data
import { useProfileData } from "@/hooks/useProfileData";
import { mockTransactions } from "@/components/profile/data/mockProfileData";
import { ContestType } from "@/components/profile/data/mockProfileData";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState({
    name: JSON.parse(localStorage.getItem("userName") || '""'),
    emailId: JSON.parse(localStorage.getItem("userEmail") || '""'),
    age: JSON.parse(localStorage.getItem("userAge") || '""'),
    phoneNo: JSON.parse(localStorage.getItem("userPhone") || '""'),
    username: JSON.parse(localStorage.getItem("userUsername") || '""'),
    profileImage: "",
    balance: 2500,
    virtualBalance: JSON.parse(localStorage.getItem("virtualBalance") || "100000"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
  });
  
  const { 
    participations, 
    setParticipations, 
    totalProfit, 
    activeContestNumber, 
    completedContestsNumber,
    isAuthenticated,
    hasUserContests
  } = useProfileData();
  
  const [transactions, setTransactions] = useState(mockTransactions);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <ProfileSidebar 
                user={user} 
                onDepositClick={() => setIsDepositDialogOpen(true)} 
                onWithdrawClick={() => setIsWithdrawDialogOpen(true)}
                totalProfit={totalProfit}
                completedContests={completedContestsNumber}
                activeContests={activeContestNumber}
              />
            </div>

            <div className="lg:col-span-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid grid-cols-2 w-full max-w-md">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="mb-4">
                    <VirtualBalanceCard virtualBalance={user.virtualBalance} />
                  </div>
                  <StatCards 
                    totalProfit={totalProfit}
                    activeContestNumber={activeContestNumber}
                    completedContestsNumber={completedContestsNumber}
                  />

                  <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
                  
                  {/* Only show demo data message for non-authenticated users */}
                  {!isAuthenticated && (
                    <span className="block text-sm text-center text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md mb-4">
                      🚀 This is demo data, <span className="font-semibold text-blue-600">login</span> and make your profile yourself! 🎯
                    </span>
                  )}

                  <ContestsList 
                    participations={participations} 
                    onEditStocks={handleEditStocks}
                    onShare={handleShareContest}
                    isAuthenticated={isAuthenticated}
                    hasUserContests={hasUserContests}
                  />
                </TabsContent>

                <TabsContent value="transactions">
                  <h2 className="text-xl font-bold mb-4">Transaction History</h2>
                  <TransactionsList 
                    transactions={isAuthenticated ? [] : transactions} 
                    isAuthenticated={isAuthenticated}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <MoneyManagementDialogs 
        isDepositDialogOpen={isDepositDialogOpen}
        setIsDepositDialogOpen={setIsDepositDialogOpen}
        isWithdrawDialogOpen={isWithdrawDialogOpen}
        setIsWithdrawDialogOpen={setIsWithdrawDialogOpen}
        userBalance={user.balance}
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
      />

      <EditStocksDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        contest={selectedContest}
        onUpdate={handleUpdateStocks}
      />
      
      {/* Share Modal for Contest Results */}
      {selectedContest && (
        <ShareModal 
          open={isShareModalOpen} 
          onOpenChange={setIsShareModalOpen}
          title="Share Your Contest Results"
          shareText={getShareText()}
        >
          <ContestShareCard contest={selectedContest} />
        </ShareModal>
      )}
    </div>
  );
};

export default Profile;
