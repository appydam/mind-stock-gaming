
import { ThumbsUp, ThumbsDown } from "lucide-react";
import ContestCard from "./ContestCard";
import { UserParticipation } from "@/hooks/useProfileData";

interface ContestsListProps {
  participations: UserParticipation[];
  onEditStocks: (contest: any) => void;
  isAuthenticated?: boolean;
  hasUserContests?: boolean;
  isLoading?: boolean;
}

const ContestsList = ({ 
  participations,
  onEditStocks,
  isAuthenticated = false,
  hasUserContests = false,
  isLoading = false
}: ContestsListProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading your contests...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-8 bg-secondary/40 rounded-lg">
        <h3 className="text-xl font-medium mb-2">Log in to see your contests</h3>
        <p className="text-muted-foreground">
          Create an account or log in to track your contests and performance.
        </p>
      </div>
    );
  }

  if (participations.length === 0 || !hasUserContests) {
    return (
      <div className="text-center py-8 bg-secondary/40 rounded-lg">
        <h3 className="text-xl font-medium mb-2">No contests yet</h3>
        <p className="text-muted-foreground">
          You haven't joined any competitions yet. Check out the competitions page to get started!
        </p>
      </div>
    );
  }

  // Separate equity and opinion contests
  const equityContests = participations.filter(contest => contest.type === 'equity');
  const opinionContests = participations.filter(contest => contest.type === 'opinion');

  return (
    <div className="space-y-6">
      {/* Equity Contests */}
      {equityContests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Equity Contests</h3>
          <div className="space-y-3">
            {equityContests.map((contest) => (
              <ContestCard
                key={`equity-${contest.contest_id}`}
                contest={{
                  id: contest.contest_id,
                  name: contest.contest_name,
                  status: contest.status.toLowerCase(),
                  entryFee: contest.entry_fee,
                  stocks: contest.stocks_in_basket || [],
                  joinedDate: contest.joined_time,
                  pnl: contest.pnl || 0,
                  rank: contest.rank || 0,
                  type: "equity"
                }}
                onEditStocks={
                  contest.status.toLowerCase() === "open" || contest.status.toLowerCase() === "active"
                    ? () => onEditStocks(contest)
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Opinion Contests */}
      {opinionContests.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Opinion Contests</h3>
          <div className="space-y-3">
            {opinionContests.map((contest) => (
              <div key={`opinion-${contest.contest_id}`} className="bg-card border rounded-lg p-4 animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{contest.contest_name}</h4>
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                      {contest.tag || "Opinion"}
                    </span>
                  </div>
                  <div>
                    {contest.status.toLowerCase() === "closed" && contest.prize_money ? (
                      <span className="bg-green-100 text-green-800 font-medium text-xs px-2 py-1 rounded">
                        Won ₹{contest.prize_money}
                      </span>
                    ) : (
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        contest.status.toLowerCase() === "open" || contest.status.toLowerCase() === "active" 
                          ? "bg-amber-100 text-amber-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {contest.status}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <div className="flex items-center">
                    <div className={`rounded-full p-1 mr-2 ${
                      contest.user_answer ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {contest.user_answer ? (
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <ThumbsDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <span className="text-sm">
                      You voted <strong>{contest.user_answer ? "YES" : "NO"}</strong>
                    </span>
                  </div>
                  <div className="ml-auto text-sm">
                    Entry: ₹{contest.entry_fee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestsList;
