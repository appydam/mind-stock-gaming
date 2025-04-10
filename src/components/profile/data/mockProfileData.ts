
// Mock data for profile page

export interface ContestType {
  contest_id: number;
  user_id: number;
  contest_name: string;
  stocks_in_basket: string[];
  join_time: string;
  status: 'active' | 'completed';
  returns: number;
  entry_fee: number;
  rank?: number;
  totalParticipants?: number;
  uniqueKey?: string;
  gameType?: string;
  userAnswer?: string;
  tag?: string;
}

export const mockParticipations: ContestType[] = [
  {
    contest_id: 1,
    user_id: 1,
    contest_name: "Daily Stock Challenge",
    stocks_in_basket: ["SBIN", "HDFCBANK", "RELIANCE", "INFY", "TCS"],
    join_time: "2023-03-15T10:30:00Z",
    status: 'completed',
    returns: 12.5,
    entry_fee: 100,
    rank: 3,
    totalParticipants: 50,
    gameType: "equity"
  },
  {
    contest_id: 2,
    user_id: 1,
    contest_name: "Weekly Stock Battle",
    stocks_in_basket: ["TITAN", "MARUTI", "WIPRO", "LT", "BRITANNIA"],
    join_time: "2023-04-01T11:45:00Z",
    status: 'active',
    returns: -2.3,
    entry_fee: 200,
    rank: 12,
    totalParticipants: 100,
    gameType: "equity"
  },
  {
    contest_id: 3,
    user_id: 1,
    contest_name: "Monthly Market Masters",
    stocks_in_basket: ["ITC", "ZEEL", "HCLTECH", "BPCL", "KOTAKBANK"],
    join_time: "2023-04-05T09:15:00Z",
    status: 'active',
    returns: 5.7,
    entry_fee: 500,
    rank: 8,
    totalParticipants: 200,
    gameType: "equity"
  },
  {
    contest_id: 4,
    user_id: 1,
    contest_name: "Quarterly Quant Quest",
    stocks_in_basket: ["ASIANPAINT", "BAJAJ-AUTO", "SUNPHARMA", "DRREDDY", "CIPLA"],
    join_time: "2023-02-15T14:20:00Z",
    status: 'completed',
    returns: 18.9,
    entry_fee: 1000,
    rank: 1,
    totalParticipants: 75,
    gameType: "equity"
  }
];

export const mockOpinionParticipations: ContestType[] = [
  {
    contest_id: 101,
    user_id: 1,
    contest_name: "IPL 2023 Finals Prediction",
    stocks_in_basket: [], // Opinion trading doesn't have stocks
    join_time: "2023-05-15T10:30:00Z",
    status: 'completed',
    returns: 15.0,
    entry_fee: 50,
    gameType: "opinion",
    userAnswer: "Yes",
    tag: "Sports"
  },
  {
    contest_id: 102,
    user_id: 1,
    contest_name: "Bitcoin Price Prediction",
    stocks_in_basket: [],
    join_time: "2023-04-01T11:45:00Z",
    status: 'active',
    returns: 0,
    entry_fee: 100,
    gameType: "opinion",
    userAnswer: "No",
    tag: "Crypto"
  }
];

export const mockTransactions = [
  {
    id: "tx1",
    type: "deposit",
    amount: 1000,
    date: "2023-03-01T12:45:00Z",
    status: "completed"
  },
  {
    id: "tx2",
    type: "contest",
    amount: 200,
    date: "2023-03-02T15:30:00Z",
    status: "completed",
    contestName: "Daily Stock Challenge"
  },
  {
    id: "tx3",
    type: "withdrawal",
    amount: 500,
    date: "2023-03-05T18:20:00Z",
    status: "completed"
  },
  {
    id: "tx4",
    type: "contest",
    amount: 500,
    date: "2023-03-10T09:15:00Z",
    status: "completed",
    contestName: "Weekly Stock Battle"
  },
  {
    id: "tx5",
    type: "deposit",
    amount: 2000,
    date: "2023-03-15T14:00:00Z",
    status: "completed"
  }
];
