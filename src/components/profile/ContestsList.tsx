
import React from 'react';
import { ContestType } from './data/mockProfileData';
import ContestCard from './ContestCard';

interface ContestsListProps {
  participations: ContestType[];
  onEditStocks: (contest: ContestType) => void;
  onShare: (contest: ContestType) => void;
  isAuthenticated: boolean;
  hasUserContests: boolean;
}

const ContestsList = ({ 
  participations, 
  onEditStocks, 
  onShare,
  isAuthenticated,
  hasUserContests 
}: ContestsListProps) => {
  // No participations state
  if (participations.length === 0) {
    return (
      <div className="text-center py-12 bg-secondary/40 rounded-lg">
        {isAuthenticated ? (
          <>
            <h3 className="text-xl font-medium mb-2">No Contests</h3>
            <p className="text-muted-foreground">
              {hasUserContests 
                ? "Loading your contests..." 
                : "You haven't participated in any contests yet."}
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-medium mb-2">Login to See Your Contests</h3>
            <p className="text-muted-foreground">
              Create an account or login to participate in contests.
            </p>
          </>
        )}
      </div>
    );
  }

  // Group contests by status
  const activeContests = participations.filter(contest => contest.status === 'active');
  const completedContests = participations.filter(contest => contest.status === 'completed');
  
  return (
    <div className="space-y-6">
      {/* Active Contests */}
      {activeContests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Active Contests</h3>
          <div className="grid grid-cols-1 gap-4">
            {activeContests.map((contest) => (
              <ContestCard 
                key={contest.uniqueKey || `${contest.contest_id}-${contest.join_time}`}
                contest={contest} 
                onEditStocks={onEditStocks} 
                onShare={onShare}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Completed Contests */}
      {completedContests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Completed Contests</h3>
          <div className="grid grid-cols-1 gap-4">
            {completedContests.map((contest) => (
              <ContestCard 
                key={contest.uniqueKey || `${contest.contest_id}-${contest.join_time}`}
                contest={contest} 
                onEditStocks={onEditStocks}
                onShare={onShare}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestsList;
