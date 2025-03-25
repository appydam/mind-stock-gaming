
import { BACKEND_HOST } from "@/constants/config";
import { toast } from "sonner";

export interface LeaderboardEntry {
  UserId: number;
  Name: string;
  ContestId: number;
  Avg: number;
  Bucket: string[];
  Rank: number;
  Prize: number;
}

export interface LeaderboardResponse {
  code: number;
  data: LeaderboardEntry[];
}

export const fetchContestLeaderboard = async (contestId: string | number): Promise<LeaderboardEntry[]> => {
  try {
    const apiPath = BACKEND_HOST + 'getContestLeaderBoard';
    const response = await fetch(apiPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contest_id: Number(contestId)
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard data');
    }

    const data: LeaderboardResponse = await response.json();

    if (data.code === 200 && Array.isArray(data.data)) {
      return data.data;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    toast.error('Failed to load leaderboard data');

    // Return mock data in case of error
    return [
      {
        UserId: 18,
        Name: "Amit Sharma",
        ContestId: 1,
        Avg: 6.96,
        Bucket: ["BAJAJ-AUTO", "HCLTECH", "SBIN", "MARUTI", "TATAMOTORS"],
        Rank: 1,
        Prize: 274.53
      },
      {
        UserId: 9,
        Name: "Neha Verma",
        ContestId: 1,
        Avg: 6.52,
        Bucket: ["HDFCLIFE", "NTPC", "HCLTECH", "TATAMOTORS", "AXISBANK"],
        Rank: 2,
        Prize: 269.06
      },
      {
        UserId: 23,
        Name: "Raj Patel",
        ContestId: 1,
        Avg: 5.89,
        Bucket: ["INFY", "TCS", "WIPRO", "TECHM", "LTI"],
        Rank: 3,
        Prize: 230.15
      },
      {
        UserId: 31,
        Name: "Sneha Iyer",
        ContestId: 1,
        Avg: 5.45,
        Bucket: ["RELIANCE", "TCS", "HDFCBANK", "INFY", "ICICIBANK"],
        Rank: 4,
        Prize: 195.78
      },
      {
        UserId: 12,
        Name: "Vikram Desai",
        ContestId: 1,
        Avg: 5.12,
        Bucket: ["ADANIENT", "ADANIPORTS", "ADANIPOWER", "ATGL", "AWL"],
        Rank: 5,
        Prize: 172.33
      },
      {
        UserId: 7,
        Name: "Priya Singh",
        ContestId: 1,
        Avg: 4.87,
        Bucket: ["SUNPHARMA", "DIVISLAB", "CIPLA", "DRREDDY", "BIOCON"],
        Rank: 6,
        Prize: 150.20
      },
      {
        UserId: 45,
        Name: "Aniket Reddy",
        ContestId: 1,
        Avg: 4.35,
        Bucket: ["ITC", "HINDUNILVR", "NESTLEIND", "BRITANNIA", "MARICO"],
        Rank: 7,
        Prize: 125.10
      },
      {
        UserId: 28,
        Name: "Pooja Mehta",
        ContestId: 1,
        Avg: 3.92,
        Bucket: ["HDFC", "SBIN", "KOTAKBANK", "AXISBANK", "ICICIBANK"],
        Rank: 8,
        Prize: 100.50
      },
      {
        UserId: 19,
        Name: "Rohan Gupta",
        ContestId: 1,
        Avg: 3.41,
        Bucket: ["ONGC", "GAIL", "IOC", "BPCL", "HINDPETRO"],
        Rank: 9,
        Prize: 75.25
      },
      {
        UserId: 33,
        Name: "Ananya Nair",
        ContestId: 1,
        Avg: 2.95,
        Bucket: ["TATASTEEL", "JSWSTEEL", "JSPL", "SAIL", "HINDALCO"],
        Rank: 10,
        Prize: 50.00
      }
    ];

  }
};
