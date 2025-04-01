
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
  GameType?: string; // Added to support different game types
}

export interface LeaderboardResponse {
  code: number;
  data: LeaderboardEntry[];
}

export const fetchContestLeaderboard = async (contestId: string | number, gameType: string = 'equity'): Promise<LeaderboardEntry[]> => {
  try {
    const apiPath = BACKEND_HOST + 'getContestLeaderBoard';
    const response = await fetch(apiPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contest_id: Number(contestId),
        game_type: gameType
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

    // Return mock data based on game type
    if (gameType === 'crypto') {
      return getMockCryptoLeaderboard();
    } else if (gameType === 'opinion') {
      return getMockOpinionLeaderboard();
    } else {
      return getMockEquityLeaderboard();
    }
  }
};

// Mock data for equity games
const getMockEquityLeaderboard = (): LeaderboardEntry[] => {
  return [
    {
      UserId: 18,
      Name: "Amit Sharma",
      ContestId: 1,
      Avg: 6.96,
      Bucket: ["BAJAJ-AUTO", "HCLTECH", "SBIN", "MARUTI", "TATAMOTORS"],
      Rank: 1,
      Prize: 274.53,
      GameType: "equity"
    },
    {
      UserId: 9,
      Name: "Neha Verma",
      ContestId: 1,
      Avg: 6.52,
      Bucket: ["HDFCLIFE", "NTPC", "HCLTECH", "TATAMOTORS", "AXISBANK"],
      Rank: 2,
      Prize: 269.06,
      GameType: "equity"
    },
    {
      UserId: 23,
      Name: "Raj Patel",
      ContestId: 1,
      Avg: 5.89,
      Bucket: ["INFY", "TCS", "WIPRO", "TECHM", "LTI"],
      Rank: 3,
      Prize: 230.15,
      GameType: "equity"
    },
    {
      UserId: 31,
      Name: "Sneha Iyer",
      ContestId: 1,
      Avg: 5.45,
      Bucket: ["RELIANCE", "TCS", "HDFCBANK", "INFY", "ICICIBANK"],
      Rank: 4,
      Prize: 195.78,
      GameType: "equity"
    },
    {
      UserId: 12,
      Name: "Vikram Desai",
      ContestId: 1,
      Avg: 5.12,
      Bucket: ["ADANIENT", "ADANIPORTS", "ADANIPOWER", "ATGL", "AWL"],
      Rank: 5,
      Prize: 172.33,
      GameType: "equity"
    },
    {
      UserId: 7,
      Name: "Priya Singh",
      ContestId: 1,
      Avg: 4.87,
      Bucket: ["SUNPHARMA", "DIVISLAB", "CIPLA", "DRREDDY", "BIOCON"],
      Rank: 6,
      Prize: 150.20,
      GameType: "equity"
    },
    {
      UserId: 45,
      Name: "Aniket Reddy",
      ContestId: 1,
      Avg: 4.35,
      Bucket: ["ITC", "HINDUNILVR", "NESTLEIND", "BRITANNIA", "MARICO"],
      Rank: 7,
      Prize: 125.10,
      GameType: "equity"
    },
    {
      UserId: 28,
      Name: "Pooja Mehta",
      ContestId: 1,
      Avg: 3.92,
      Bucket: ["HDFC", "SBIN", "KOTAKBANK", "AXISBANK", "ICICIBANK"],
      Rank: 8,
      Prize: 100.50,
      GameType: "equity"
    },
    {
      UserId: 19,
      Name: "Rohan Gupta",
      ContestId: 1,
      Avg: 3.41,
      Bucket: ["ONGC", "GAIL", "IOC", "BPCL", "HINDPETRO"],
      Rank: 9,
      Prize: 75.25,
      GameType: "equity"
    },
    {
      UserId: 33,
      Name: "Ananya Nair",
      ContestId: 1,
      Avg: 2.95,
      Bucket: ["TATASTEEL", "JSWSTEEL", "JSPL", "SAIL", "HINDALCO"],
      Rank: 10,
      Prize: 50.00,
      GameType: "equity"
    }
  ];
};

// Mock data for crypto games
const getMockCryptoLeaderboard = (): LeaderboardEntry[] => {
  return [
    {
      UserId: 24,
      Name: "Rahul Saxena",
      ContestId: 101,
      Avg: 12.45,
      Bucket: ["BTC", "ETH", "SOL", "AVAX", "MATIC"],
      Rank: 1,
      Prize: 384.67,
      GameType: "crypto"
    },
    {
      UserId: 17,
      Name: "Kiran Joshi",
      ContestId: 101,
      Avg: 11.27,
      Bucket: ["ETH", "LINK", "DOT", "XRP", "ADA"],
      Rank: 2,
      Prize: 312.93,
      GameType: "crypto"
    },
    {
      UserId: 42,
      Name: "Arjun Malhotra",
      ContestId: 101,
      Avg: 9.83,
      Bucket: ["BTC", "SOL", "BNB", "UNI", "DOGE"],
      Rank: 3,
      Prize: 258.45,
      GameType: "crypto"
    },
    {
      UserId: 11,
      Name: "Maya Sharma",
      ContestId: 101,
      Avg: 8.76,
      Bucket: ["BNB", "ATOM", "ALGO", "XLM", "FIL"],
      Rank: 4,
      Prize: 207.12,
      GameType: "crypto"
    },
    {
      UserId: 36,
      Name: "Siddharth Rao",
      ContestId: 101,
      Avg: 7.52,
      Bucket: ["ETH", "DOT", "MATIC", "AVAX", "ATOM"],
      Rank: 5,
      Prize: 178.35,
      GameType: "crypto"
    },
    {
      UserId: 29,
      Name: "Ankit Kumar",
      ContestId: 101,
      Avg: 6.87,
      Bucket: ["SOL", "ETH", "ADA", "DOT", "AVAX"],
      Rank: 6,
      Prize: 142.69,
      GameType: "crypto"
    },
    {
      UserId: 51,
      Name: "Tanvi Mehta",
      ContestId: 101,
      Avg: 5.94,
      Bucket: ["BTC", "ETH", "LINK", "UNI", "MATIC"],
      Rank: 7,
      Prize: 112.85,
      GameType: "crypto"
    },
    {
      UserId: 8,
      Name: "Varun Kapoor",
      ContestId: 101,
      Avg: 4.58,
      Bucket: ["BNB", "ETH", "DOGE", "SHIB", "XRP"],
      Rank: 8,
      Prize: 87.40,
      GameType: "crypto"
    },
    {
      UserId: 39,
      Name: "Divya Singh",
      ContestId: 101,
      Avg: 3.73,
      Bucket: ["DOT", "LINK", "ATOM", "FIL", "XLM"],
      Rank: 9,
      Prize: 64.25,
      GameType: "crypto"
    },
    {
      UserId: 22,
      Name: "Nikhil Yadav",
      ContestId: 101,
      Avg: 2.91,
      Bucket: ["ADA", "MATIC", "DOT", "ALGO", "XLM"],
      Rank: 10,
      Prize: 45.20,
      GameType: "crypto"
    }
  ];
};

// Mock data for opinion games
const getMockOpinionLeaderboard = (): LeaderboardEntry[] => {
  return [
    {
      UserId: 32,
      Name: "Ravi Mishra",
      ContestId: 201,
      Avg: 87.5,
      Bucket: ["Yes", "No", "Yes", "Yes", "No"],
      Rank: 1,
      Prize: 457.82,
      GameType: "opinion"
    },
    {
      UserId: 15,
      Name: "Aisha Khan",
      ContestId: 201,
      Avg: 83.2,
      Bucket: ["Yes", "Yes", "No", "Yes", "No"],
      Rank: 2,
      Prize: 386.45,
      GameType: "opinion"
    },
    {
      UserId: 27,
      Name: "Vivek Shah",
      ContestId: 201,
      Avg: 79.8,
      Bucket: ["No", "Yes", "Yes", "No", "Yes"],
      Rank: 3,
      Prize: 298.32,
      GameType: "opinion"
    },
    {
      UserId: 44,
      Name: "Meera Patel",
      ContestId: 201,
      Avg: 74.6,
      Bucket: ["Yes", "No", "No", "Yes", "Yes"],
      Rank: 4,
      Prize: 245.76,
      GameType: "opinion"
    },
    {
      UserId: 53,
      Name: "Rohit Agarwal",
      ContestId: 201,
      Avg: 72.4,
      Bucket: ["No", "Yes", "No", "Yes", "No"],
      Rank: 5,
      Prize: 198.50,
      GameType: "opinion"
    },
    {
      UserId: 6,
      Name: "Jaya Kumar",
      ContestId: 201,
      Avg: 68.9,
      Bucket: ["Yes", "Yes", "Yes", "No", "No"],
      Rank: 6,
      Prize: 156.23,
      GameType: "opinion"
    },
    {
      UserId: 38,
      Name: "Sameer Khanna",
      ContestId: 201,
      Avg: 65.7,
      Bucket: ["No", "No", "Yes", "Yes", "Yes"],
      Rank: 7,
      Prize: 127.40,
      GameType: "opinion"
    },
    {
      UserId: 14,
      Name: "Neetu Singh",
      ContestId: 201,
      Avg: 62.3,
      Bucket: ["Yes", "No", "Yes", "No", "Yes"],
      Rank: 8,
      Prize: 95.65,
      GameType: "opinion"
    },
    {
      UserId: 48,
      Name: "Kabir Chadha",
      ContestId: 201,
      Avg: 58.6,
      Bucket: ["No", "Yes", "No", "No", "Yes"],
      Rank: 9,
      Prize: 72.30,
      GameType: "opinion"
    },
    {
      UserId: 25,
      Name: "Aarti Sharma",
      ContestId: 201,
      Avg: 54.1,
      Bucket: ["Yes", "No", "No", "Yes", "No"],
      Rank: 10,
      Prize: 48.95,
      GameType: "opinion"
    }
  ];
};
