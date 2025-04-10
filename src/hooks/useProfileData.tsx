
import { useState, useEffect } from 'react';
import { fetchRecentContests, EquityContestResponse, OpinionContestResponse } from '@/services/profileService';

export interface UserParticipation {
  contest_id: number;
  contest_name: string;
  stocks_in_basket?: string[];
  entry_fee: number;
  status: string;
  type: 'equity' | 'opinion';
  tag?: string;
  user_answer?: boolean;
  pnl?: number;
  rank?: number;
  joined_time: string;
  prize_money?: number | null;
}

export const useProfileData = () => {
  const [participations, setParticipations] = useState<UserParticipation[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [activeContestNumber, setActiveContestNumber] = useState(0);
  const [completedContestsNumber, setCompletedContestsNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasUserContests, setHasUserContests] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      // Check if user is authenticated (has userId in localStorage)
      const userIdString = localStorage.getItem("userId");
      const isAuth = !!userIdString;
      setIsAuthenticated(isAuth);

      if (isAuth) {
        try {
          const userId = parseInt(JSON.parse(userIdString || "0"));
          const apiData = await fetchRecentContests(userId);

          if (apiData && apiData.data) {
            // Set total profit
            setTotalProfit(apiData.data.EquityRecentData.totalProfit);
            
            // Set completed contests number
            setCompletedContestsNumber(apiData.data.EquityRecentData.completedContest);
            
            // Set active contests number
            setActiveContestNumber(apiData.data.OpinionRecentData.activeContest);

            // Process equity contests
            const equityParticipations: UserParticipation[] = 
              apiData.data.EquityRecentData.recentContests.map((contest: EquityContestResponse) => ({
                contest_id: contest.contestId,
                contest_name: contest.contestName,
                stocks_in_basket: contest.bucket,
                entry_fee: contest.entryFee,
                status: contest.status,
                type: 'equity',
                pnl: contest.pnl,
                rank: contest.rank,
                joined_time: contest.joinedTime,
              }));

            // Process opinion contests
            const opinionParticipations: UserParticipation[] = 
              apiData.data.OpinionRecentData.recentOpinionActivity.map((contest: OpinionContestResponse) => ({
                contest_id: contest.competition_id,
                contest_name: contest.competition_name,
                entry_fee: contest.entry_fee,
                status: contest.status,
                type: 'opinion',
                tag: contest.tag,
                user_answer: contest.user_answer,
                joined_time: new Date().toISOString(), // Since not provided in API
                prize_money: contest.prize_money,
              }));

            // Combine both types of contests
            const allParticipations = [...equityParticipations, ...opinionParticipations];
            setParticipations(allParticipations);
            setHasUserContests(allParticipations.length > 0);
          } else {
            setError("Failed to fetch user contest data");
            setHasUserContests(false);
          }
        } catch (err) {
          console.error("Error processing user data:", err);
          setError("Error processing user data");
          setHasUserContests(false);
        }
      } else {
        // Use mock data for demo purposes
        const mockParticipations: UserParticipation[] = [
          {
            contest_id: 1,
            contest_name: "Weekly Stock Challenge",
            stocks_in_basket: ["AAPL", "MSFT", "GOOGL", "AMZN", "META"],
            entry_fee: 100,
            status: "active",
            type: "equity",
            pnl: 250,
            rank: 3,
            joined_time: "2025-04-05T15:30:00Z",
          },
          {
            contest_id: 2,
            contest_name: "Tech Stocks Showdown",
            stocks_in_basket: ["NVDA", "AMD", "INTC", "TSM", "ASML"],
            entry_fee: 50,
            status: "completed",
            type: "equity",
            pnl: -75,
            rank: 12,
            joined_time: "2025-04-01T09:45:00Z",
          },
          {
            contest_id: 3,
            contest_name: "Will Bitcoin reach $100K by 2026?",
            entry_fee: 20,
            status: "active",
            type: "opinion",
            tag: "Crypto",
            user_answer: true,
            joined_time: "2025-04-08T14:20:00Z",
          },
        ];

        setParticipations(mockParticipations);
        setTotalProfit(175);
        setActiveContestNumber(2);
        setCompletedContestsNumber(1);
        setHasUserContests(true);
      }

      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  return {
    participations,
    setParticipations,
    totalProfit,
    activeContestNumber,
    completedContestsNumber,
    isLoading,
    error,
    isAuthenticated,
    hasUserContests
  };
};
