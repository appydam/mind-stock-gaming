
import { useState, useEffect } from 'react';
import { ContestType, mockParticipations } from '@/data/mockProfileData';
import { BACKEND_HOST } from '@/constants/config';

export const useProfileData = () => {
  const [participations, setParticipations] = useState<ContestType[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [activeContestNumber, setActiveContestNumber] = useState(0);
  const [completedContestsNumber, setCompletedContestsNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        // Check if user is authenticated
        const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
        
        if (!isAuthenticated) {
          // Use mock data for non-authenticated users
          const mocksWithKeys = mockParticipations.map((item, index) => ({
            ...item,
            uniqueKey: `${item.contest_id}-${index}`
          }));
          
          setParticipations(mocksWithKeys);
          setTotalProfit(mockParticipations.reduce((sum, contest) => {
            return sum + (contest.entry_fee * contest.returns / 100);
          }, 0));
          
          setActiveContestNumber(mockParticipations.filter(p => p.status === 'active').length);
          setCompletedContestsNumber(mockParticipations.filter(p => p.status === 'completed').length);
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
            totalParticipants: 0,
            uniqueKey: `${contest.contestId}-${index}`
          }));

          setTotalProfit(result.data.totalProfit);
          setActiveContestNumber(result.data.activeContest);
          setCompletedContestsNumber(result.data.completedContest);
          setParticipations(transformedData);
        }
      } catch (error) {
        console.error('Error fetching contests:', error);
        // Fallback to mock data
        const mocksWithKeys = mockParticipations.map((item, index) => ({
          ...item,
          uniqueKey: `${item.contest_id}-${index}`
        }));
        setParticipations(mocksWithKeys);
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
    loading
  };
};
