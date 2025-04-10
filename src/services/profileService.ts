
import { BACKEND_HOST } from '@/constants/config';
import { mockTransactions } from '@/components/profile/data/mockProfileData';

// Define types for API response
export interface EquityContestResponse {
  contestId: number;
  contestName: string;
  bucket: string[];
  entryFee: number;
  rank: number;
  pnl: number;
  joinedTime: string;
  status: string;
}

export interface OpinionContestResponse {
  competition_id: number;
  competition_name: string;
  entry_fee: number;
  status: string;
  tag: string;
  user_answer: boolean;
  prize_money: number | null;
}

export interface RecentContestsApiResponse {
  code: number;
  data: {
    EquityRecentData: {
      totalProfit: number;
      completedContest: number;
      recentContests: EquityContestResponse[];
    };
    OpinionRecentData: {
      activeContest: number;
      recentOpinionActivity: OpinionContestResponse[];
    };
  };
}

export const fetchRecentContests = async (userId: number): Promise<RecentContestsApiResponse | null> => {
  try {
    const response = await fetch(`${BACKEND_HOST}recentContests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recent contests:", error);
    return null;
  }
};

export const getMockTransactions = () => {
  return mockTransactions;
};
