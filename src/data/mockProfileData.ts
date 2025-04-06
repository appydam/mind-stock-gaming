
export const mockTransactions = [
    {
        id: 'tx1',
        type: 'deposit',
        amount: 1000,
        date: '2023-09-01T10:30:00Z',
        status: 'completed'
    },
    {
        id: 'tx2',
        type: 'withdrawal',
        amount: 250,
        date: '2023-08-25T14:15:00Z',
        status: 'completed'
    },
    {
        id: 'tx3',
        type: 'deposit',
        amount: 500,
        date: '2023-08-10T09:45:00Z',
        status: 'completed'
    },
    {
        id: 'tx4',
        type: 'contest entry',
        amount: 25,
        date: '2023-09-02T16:20:00Z',
        status: 'completed',
        contestName: 'Monthly Finance Leaders'
    },
];

export interface ContestType {
    contest_id: number;
    user_id: number;
    contest_name: string;
    stocks_in_basket: string[];
    join_time: string;
    status: string;
    returns: number;
    entry_fee: number;
    rank: number;
    totalParticipants: number;
    uniqueKey?: string;
}

export const mockParticipations: ContestType[] = [
    {
        contest_id: 101,
        user_id: 1,
        contest_name: "Weekly Nifty Titans Challenge",
        stocks_in_basket: ["RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK"],
        join_time: "2023-09-01T15:20:00Z",
        status: "active",
        returns: 12.4,
        entry_fee: 800,
        rank: 5,
        totalParticipants: 128
    },
    {
        contest_id: 102,
        user_id: 1,
        contest_name: "Monthly Financial Leaders",
        stocks_in_basket: ["HDFC", "KOTAKBANK", "BAJFINANCE", "AXISBANK", "SBIN"],
        join_time: "2023-08-15T10:10:00Z",
        status: "completed",
        returns: -3.2,
        entry_fee: 2000,
        rank: 42,
        totalParticipants: 97
    },
    {
        contest_id: 103,
        user_id: 1,
        contest_name: "Pharma Powerhouse Challenge",
        stocks_in_basket: ["SUNPHARMA", "CIPLA", "DIVISLAB", "LUPIN", "DRREDDY"],
        join_time: "2023-08-05T09:30:00Z",
        status: "completed",
        returns: 8.7,
        entry_fee: 1200,
        rank: 12,
        totalParticipants: 76
    },
    {
        contest_id: 104,
        user_id: 1,
        contest_name: "Energy Giants Battle",
        stocks_in_basket: ["ONGC", "GAIL", "IOC", "BPCL", "HINDPETRO"],
        join_time: "2023-07-20T14:15:00Z",
        status: "active",
        returns: 5.2,
        entry_fee: 1600,
        rank: 8,
        totalParticipants: 64
    },
    {
        contest_id: 105,
        user_id: 1,
        contest_name: "Consumer Brands Showdown",
        stocks_in_basket: ["ITC", "HINDUNILVR", "NESTLEIND", "DABUR", "MARICO"],
        join_time: "2023-07-10T11:30:00Z",
        status: "active",
        returns: -1.8,
        entry_fee: 1200,
        rank: 25,
        totalParticipants: 82
    },
    {
        contest_id: 106,
        user_id: 1,
        contest_name: "Semiconductor Titans",
        stocks_in_basket: ["TATAELXSI", "LTTS", "HCLTECH", "INFY", "TECHM"],
        join_time: "2023-06-28T09:45:00Z",
        status: "completed",
        returns: 9.6,
        entry_fee: 2400,
        rank: 3,
        totalParticipants: 110
    },
    {
        contest_id: 107,
        user_id: 1,
        contest_name: "Electric Vehicle Revolution",
        stocks_in_basket: ["TATAMOTORS", "TVSMOTOR", "M&M", "BAJAJ-AUTO", "ASHOKLEY"],
        join_time: "2023-06-15T13:20:00Z",
        status: "active",
        returns: 7.3,
        entry_fee: 2000,
        rank: 15,
        totalParticipants: 95
    }
];
