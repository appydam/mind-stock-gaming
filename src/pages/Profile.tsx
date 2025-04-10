import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockTransactions } from "@/components/profile/data/mockProfileData";

// Import custom hooks
import { useProfileData } from "@/hooks/useProfileData";
import { useProfileActions } from "@/hooks/useProfileActions";

// Import refactored components
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfileTransactions from "@/components/profile/ProfileTransactions";
import ProfileDialogsManager from "@/components/profile/ProfileDialogsManager";

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

  const {
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
    getShareText
  } = useProfileActions({
    participations,
    setParticipations,
    transactions,
    setTransactions,
    user,
    setUser
  });

  const DemoDataBanner = !isAuthenticated ? (
    <span className="block text-sm text-center text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md mb-4">
      🚀 This is demo data, <span className="font-semibold text-blue-600">login</span> and make your profile yourself! 🎯
    </span>
  ) : null;

  const overviewContent = (
    <ProfileOverview
      virtualBalance={user.virtualBalance}
      totalProfit={totalProfit}
      activeContestNumber={activeContestNumber}
      completedContestsNumber={completedContestsNumber}
      participations={participations}
      onEditStocks={handleEditStocks}
      onShare={handleShareContest}
      isAuthenticated={isAuthenticated}
      hasUserContests={hasUserContests}
      banner={DemoDataBanner}
    />
  );

  const transactionsContent = (
    <ProfileTransactions 
      transactions={isAuthenticated ? [] : transactions}
      isAuthenticated={isAuthenticated}
    />
  );

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
              <ProfileHeader 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                overviewContent={overviewContent}
                transactionsContent={transactionsContent}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ProfileDialogsManager
        isDepositDialogOpen={isDepositDialogOpen}
        setIsDepositDialogOpen={setIsDepositDialogOpen}
        isWithdrawDialogOpen={isWithdrawDialogOpen}
        setIsWithdrawDialogOpen={setIsWithdrawDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isShareModalOpen={isShareModalOpen}
        setIsShareModalOpen={setIsShareModalOpen}
        selectedContest={selectedContest}
        userBalance={user.balance}
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
        onUpdateStocks={handleUpdateStocks}
        shareText={getShareText()}
      />
    </div>
  );
};

export default Profile;
