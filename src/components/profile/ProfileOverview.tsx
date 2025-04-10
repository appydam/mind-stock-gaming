
import { ReactNode } from "react";
import VirtualBalanceCard from "./VirtualBalanceCard";
import StatCards from "./StatCards";
import ContestsList from "./ContestsList";
import { ContestType } from "./data/mockProfileData";

interface ProfileOverviewProps {
  virtualBalance: number;
  totalProfit: number;
  activeContestNumber: number;
  completedContestsNumber: number;
  participations: ContestType[];
  onEditStocks: (contest: ContestType) => void;
  onShare: (contest: ContestType) => void;
  isAuthenticated: boolean;
  hasUserContests: boolean;
  banner?: ReactNode;
}

const ProfileOverview = ({
  virtualBalance,
  totalProfit,
  activeContestNumber,
  completedContestsNumber,
  participations,
  onEditStocks,
  onShare,
  isAuthenticated,
  hasUserContests,
  banner
}: ProfileOverviewProps) => {
  return (
    <>
      <div className="mb-4">
        <VirtualBalanceCard virtualBalance={virtualBalance} />
      </div>
      
      <StatCards 
        totalProfit={totalProfit}
        activeContestNumber={activeContestNumber}
        completedContestsNumber={completedContestsNumber}
      />

      <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
      
      {banner}

      <ContestsList 
        participations={participations} 
        onEditStocks={onEditStocks}
        onShare={onShare}
        isAuthenticated={isAuthenticated}
        hasUserContests={hasUserContests}
      />
    </>
  );
};

export default ProfileOverview;
