
import { useState, useEffect } from 'react';
import { ContestType, mockParticipations, mockOpinionParticipations } from '@/components/profile/data/mockProfileData';
import { BACKEND_HOST } from '@/constants/config';

export const useProfileData = () => {
  const [participations, setParticipations] = useState<ContestType[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [activeContestNumber, setActiveContestNumber] = useState(0);
  const [completedContestsNumber, setCompletedContestsNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasUserContests, setHasUserContests] = useState(false);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        // Check if user is authenticated
        const isAuthenticatedUser = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(isAuthenticatedUser);
        
        if (!isAuthenticatedUser) {
          // Use mock data for non-authenticated users (combination of equity and opinion trading contests)
          const combinedMocks = [...mockParticipations, ...mockOpinionParticipations];
          const mocksWithKeys = combinedMocks.map((item, index) => ({
            ...item,
            uniqueKey: `${item.contest_id}-${index}`
          }));
          
          setParticipations(mocksWithKeys);
          setTotalProfit(combinedMocks.reduce((sum, contest) => {
            return sum + (contest.entry_fee * contest.returns / 100);
          }, 0));
          
          setActiveContestNumber(combinedMocks.filter(p => p.status === 'active').length);
          setCompletedContestsNumber(combinedMocks.filter(p => p.status === 'completed').length);
          setHasUserContests(true);
          setLoading(false);
          return;
        }
        
        // For authenticated users, fetch data from API
        const apiPath = BACKEND_HOST + 'recentContests';
        const userId = Number(JSON.parse(localStorage.getItem("userId") || "0"));
        
        const response = await fetch(apiPath, {
          method: 'POST',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
            'DNT': '1',
            'Referer': BACKEND_HOST + 'competitions',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId })
        });

        const result = await response.json();
        
        if (result.code === 200) {
          if (result.data.recentContests && result.data.recentContests.length > 0) {
            const transformedData = result.data.recentContests.map((contest: any, index: number) => ({
              contest_id: contest.contestId,
              user_id: userId,
              contest_name: contest.contestName,
              stocks_in_basket: contest.bucket,
              join_time: contest.joinedTime,
              status: contest.status === 'open' ? 'active' : 'completed',
              returns: contest.pnl ? (contest.pnl / contest.entryFee * 100) : 0,
              entry_fee: contest.entryFee,
              rank: contest.rank || 0,
              totalParticipants: contest.totalParticipants || 0,
              uniqueKey: `${contest.contestId}-${index}`,
              gameType: contest.contestType || "equity" // Add gameType field based on contestType
            }));

            setTotalProfit(result.data.totalProfit || 0);
            setActiveContestNumber(result.data.activeContest || 0);
            setCompletedContestsNumber(result.data.completedContest || 0);
            setParticipations(transformedData);
            setHasUserContests(transformedData.length > 0);
          } else {
            // User is authenticated but has no contests
            setParticipations([]);
            setTotalProfit(0);
            setActiveContestNumber(0);
            setCompletedContestsNumber(0);
            setHasUserContests(false);
          }
        } else {
          // Error in API response, set empty data
          setParticipations([]);
          setHasUserContests(false);
        }
      } catch (error) {
        console.error('Error fetching contests:', error);
        // For authenticated users, don't fall back to mock data
        if (localStorage.getItem("isAuthenticated") === "true") {
          setParticipations([]);
          setHasUserContests(false);
        } else {
          // Only use mock data for non-authenticated users
          const combinedMocks = [...mockParticipations, ...mockOpinionParticipations];
          const mocksWithKeys = combinedMocks.map((item, index) => ({
            ...item,
            uniqueKey: `${item.contest_id}-${index}`
          }));
          setParticipations(mocksWithKeys);
          setHasUserContests(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  return {
    participations,
    setParticipations,
    totalProfit,
    activeContestNumber,
    completedContestsNumber,
    loading,
    isAuthenticated,
    hasUserContests
  };
};
