
import { ContestType } from "./data/mockProfileData";
import EditStocksDialog from "@/components/EditStocksDialog";
import ShareModal from "./ShareModal";
import ContestShareCard from "./ContestShareCard";
import MoneyManagementDialogs from "./MoneyManagementDialogs";

interface ProfileDialogsManagerProps {
  isDepositDialogOpen: boolean;
  setIsDepositDialogOpen: (open: boolean) => void;
  isWithdrawDialogOpen: boolean;
  setIsWithdrawDialogOpen: (open: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  selectedContest: ContestType | null;
  userBalance: number;
  onDeposit: (amount: string) => void;
  onWithdraw: (amount: string) => void;
  onUpdateStocks: (contestId: number, newStocks: string[]) => void;
  shareText: string;
}

const ProfileDialogsManager = ({
  isDepositDialogOpen,
  setIsDepositDialogOpen,
  isWithdrawDialogOpen,
  setIsWithdrawDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isShareModalOpen,
  setIsShareModalOpen,
  selectedContest,
  userBalance,
  onDeposit,
  onWithdraw,
  onUpdateStocks,
  shareText
}: ProfileDialogsManagerProps) => {
  return (
    <>
      <MoneyManagementDialogs 
        isDepositDialogOpen={isDepositDialogOpen}
        setIsDepositDialogOpen={setIsDepositDialogOpen}
        isWithdrawDialogOpen={isWithdrawDialogOpen}
        setIsWithdrawDialogOpen={setIsWithdrawDialogOpen}
        userBalance={userBalance}
        onDeposit={onDeposit}
        onWithdraw={onWithdraw}
      />

      <EditStocksDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        contest={selectedContest}
        onUpdate={onUpdateStocks}
      />
      
      {selectedContest && (
        <ShareModal 
          open={isShareModalOpen} 
          onOpenChange={setIsShareModalOpen}
          title="Share Your Contest Results"
          shareText={shareText}
        >
          <ContestShareCard contest={selectedContest} />
        </ShareModal>
      )}
    </>
  );
};

export default ProfileDialogsManager;
