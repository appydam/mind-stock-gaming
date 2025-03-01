
export const mockStocks = [
  {
    id: "stock-1",
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd.",
    sector: "Energy"
  },
  {
    id: "stock-2",
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd.",
    sector: "Technology"
  },
  {
    id: "stock-3",
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd.",
    sector: "Financials"
  },
  {
    id: "stock-4",
    symbol: "INFY",
    name: "Infosys Ltd.",
    sector: "Technology"
  },
  {
    id: "stock-5",
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever Ltd.",
    sector: "Consumer Goods"
  },
  {
    id: "stock-6",
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd.",
    sector: "Financials"
  },
  {
    id: "stock-7",
    symbol: "SBIN",
    name: "State Bank of India",
    sector: "Financials"
  },
  {
    id: "stock-8",
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Ltd.",
    sector: "Telecom"
  },
  {
    id: "stock-9",
    symbol: "ITC",
    name: "ITC Ltd.",
    sector: "Consumer Goods"
  },
  {
    id: "stock-10",
    symbol: "KOTAKBANK",
    name: "Kotak Mahindra Bank Ltd.",
    sector: "Financials"
  },
  {
    id: "stock-11",
    symbol: "BAJFINANCE",
    name: "Bajaj Finance Ltd.",
    sector: "Financials"
  },
  {
    id: "stock-12",
    symbol: "ASIANPAINT",
    name: "Asian Paints Ltd.",
    sector: "Consumer Goods"
  },
  {
    id: "stock-13",
    symbol: "AXISBANK",
    name: "Axis Bank Ltd.",
    sector: "Financials"
  },
  {
    id: "stock-14",
    symbol: "MARUTI",
    name: "Maruti Suzuki India Ltd.",
    sector: "Automobiles"
  },
  {
    id: "stock-15",
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical Industries Ltd.",
    sector: "Healthcare"
  },
  {
    id: "stock-16",
    symbol: "TITAN",
    name: "Titan Company Ltd.",
    sector: "Consumer Goods"
  },
  {
    id: "stock-17",
    symbol: "HCLTECH",
    name: "HCL Technologies Ltd.",
    sector: "Technology"
  },
  {
    id: "stock-18",
    symbol: "ULTRACEMCO",
    name: "UltraTech Cement Ltd.",
    sector: "Materials"
  },
  {
    id: "stock-19",
    symbol: "BAJAJFINSV",
    name: "Bajaj Finserv Ltd.",
    sector: "Financials"
  },
  {
    id: "stock-20",
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd.",
    sector: "Automobiles"
  }
];

export const mockCompetitions = [
  {
    id: "comp-1",
    name: "Daily Midcap Challenge",
    description: "Select 5 midcap stocks and compete for the highest returns",
    entryFee: 50,
    maxParticipants: 100,
    currentParticipants: 67,
    status: "open",
    prizePool: 4500,
    deadline: new Date(new Date().setHours(9, 15, 0, 0)).toISOString(),
    type: "custom"
  },
  {
    id: "comp-2",
    name: "Largecap Prediction",
    description: "Predict if Nifty 50 stocks will have positive or negative returns today",
    entryFee: 100,
    maxParticipants: 200,
    currentParticipants: 124,
    status: "open",
    prizePool: 18000,
    deadline: new Date(new Date().setHours(9, 15, 0, 0)).toISOString(),
    type: "predefined"
  },
  {
    id: "comp-3",
    name: "Weekly IT Stocks Battle",
    description: "Select 5 IT sector stocks and compete over a week-long period",
    entryFee: 200,
    maxParticipants: 50,
    currentParticipants: 31,
    status: "open",
    prizePool: 9000,
    deadline: new Date(new Date().setHours(9, 15, 0, 0)).toISOString(),
    type: "custom"
  },
  {
    id: "comp-4",
    name: "Banking Sector Prediction",
    description: "Predict if banking stocks will rise or fall today",
    entryFee: 50,
    maxParticipants: 150,
    currentParticipants: 92,
    status: "closed",
    prizePool: 6500,
    deadline: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    type: "predefined"
  }
];
