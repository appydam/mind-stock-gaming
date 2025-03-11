
export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
}

export const availableStocks: Stock[] = [
  {
    id: "AAPL",
    symbol: "AAPL",
    name: "Apple Inc.",
    sector: "Technology"
  },
  {
    id: "MSFT",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    sector: "Technology"
  },
  {
    id: "AMZN",
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    sector: "Consumer Cyclical"
  },
  {
    id: "NVDA",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    sector: "Technology"
  },
  {
    id: "GOOGL",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    sector: "Communication Services"
  },
  {
    id: "GOOG",
    symbol: "GOOG",
    name: "Alphabet Inc.",
    sector: "Communication Services"
  },
  {
    id: "META",
    symbol: "META",
    name: "Meta Platforms, Inc.",
    sector: "Communication Services"
  },
  {
    id: "TSLA",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    sector: "Consumer Cyclical"
  },
  {
    id: "BRK.A",
    symbol: "BRK.A",
    name: "Berkshire Hathaway Inc.",
    sector: "Financial Services"
  },
  {
    id: "BRK.B",
    symbol: "BRK.B",
    name: "Berkshire Hathaway Inc.",
    sector: "Financial Services"
  },
  {
    id: "V",
    symbol: "V",
    name: "Visa Inc.",
    sector: "Financial Services"
  },
  {
    id: "UNH",
    symbol: "UNH",
    name: "UnitedHealth Group Incorporated",
    sector: "Healthcare"
  },
  {
    id: "JNJ",
    symbol: "JNJ",
    name: "Johnson & Johnson",
    sector: "Healthcare"
  },
  {
    id: "JPM",
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    sector: "Financial Services"
  },
  {
    id: "WMT",
    symbol: "WMT",
    name: "Walmart Inc.",
    sector: "Consumer Defensive"
  },
  {
    id: "PG",
    symbol: "PG",
    name: "The Procter & Gamble Company",
    sector: "Consumer Defensive"
  },
  {
    id: "MA",
    symbol: "MA",
    name: "Mastercard Incorporated",
    sector: "Financial Services"
  },
  {
    id: "LLY",
    symbol: "LLY",
    name: "Eli Lilly and Company",
    sector: "Healthcare"
  },
  {
    id: "HD",
    symbol: "HD",
    name: "The Home Depot, Inc.",
    sector: "Consumer Cyclical"
  },
  {
    id: "BAC",
    symbol: "BAC",
    name: "Bank of America Corporation",
    sector: "Financial Services"
  },
  {
    id: "ABBV",
    symbol: "ABBV",
    name: "AbbVie Inc.",
    sector: "Healthcare"
  },
  {
    id: "PFE",
    symbol: "PFE",
    name: "Pfizer Inc.",
    sector: "Healthcare"
  },
  {
    id: "AVGO",
    symbol: "AVGO",
    name: "Broadcom Inc.",
    sector: "Technology"
  },
  {
    id: "KO",
    symbol: "KO",
    name: "The Coca-Cola Company",
    sector: "Consumer Defensive"
  },
  {
    id: "MRK",
    symbol: "MRK",
    name: "Merck & Co., Inc.",
    sector: "Healthcare"
  },
  {
    id: "COST",
    symbol: "COST",
    name: "Costco Wholesale Corporation",
    sector: "Consumer Defensive"
  },
  {
    id: "TMO",
    symbol: "TMO",
    name: "Thermo Fisher Scientific Inc.",
    sector: "Healthcare"
  },
  {
    id: "CSCO",
    symbol: "CSCO",
    name: "Cisco Systems, Inc.",
    sector: "Technology"
  },
  {
    id: "ABT",
    symbol: "ABT",
    name: "Abbott Laboratories",
    sector: "Healthcare"
  },
  {
    id: "DHR",
    symbol: "DHR",
    name: "Danaher Corporation",
    sector: "Healthcare"
  },
  {
    id: "ADBE",
    symbol: "ADBE",
    name: "Adobe Inc.",
    sector: "Technology"
  },
  {
    id: "MCD",
    symbol: "MCD",
    name: "McDonald's Corporation",
    sector: "Consumer Cyclical"
  },
  {
    id: "CRM",
    symbol: "CRM",
    name: "Salesforce, Inc.",
    sector: "Technology"
  },
  {
    id: "VZ",
    symbol: "VZ",
    name: "Verizon Communications Inc.",
    sector: "Communication Services"
  },
  {
    id: "NEE",
    symbol: "NEE",
    name: "NextEra Energy, Inc.",
    sector: "Utilities"
  },
  {
    id: "ACN",
    symbol: "ACN",
    name: "Accenture plc",
    sector: "Technology"
  },
  {
    id: "TXN",
    symbol: "TXN",
    name: "Texas Instruments Incorporated",
    sector: "Technology"
  },
  {
    id: "CMCSA",
    symbol: "CMCSA",
    name: "Comcast Corporation",
    sector: "Communication Services"
  },
  {
    id: "NKE",
    symbol: "NKE",
    name: "NIKE, Inc.",
    sector: "Consumer Cyclical"
  },
  {
    id: "INTC",
    symbol: "INTC",
    name: "Intel Corporation",
    sector: "Technology"
  },
  {
    id: "HON",
    symbol: "HON",
    name: "Honeywell International Inc.",
    sector: "Industrials"
  },
  {
    id: "WFC",
    symbol: "WFC",
    name: "Wells Fargo & Company",
    sector: "Financial Services"
  },
  {
    id: "PM",
    symbol: "PM",
    name: "Philip Morris International Inc.",
    sector: "Consumer Defensive"
  },
  {
    id: "QCOM",
    symbol: "QCOM",
    name: "QUALCOMM Incorporated",
    sector: "Technology"
  },
  {
    id: "ORCL",
    symbol: "ORCL",
    name: "Oracle Corporation",
    sector: "Technology"
  },
  {
    id: "IBM",
    symbol: "IBM",
    name: "International Business Machines Corporation",
    sector: "Technology"
  },
  {
    id: "AMD",
    symbol: "AMD",
    name: "Advanced Micro Devices, Inc.",
    sector: "Technology"
  },
  {
    id: "UPS",
    symbol: "UPS",
    name: "United Parcel Service, Inc.",
    sector: "Industrials"
  },
  {
    id: "CAT",
    symbol: "CAT",
    name: "Caterpillar Inc.",
    sector: "Industrials"
  },
  {
    id: "LIN",
    symbol: "LIN",
    name: "Linde plc",
    sector: "Basic Materials"
  },
  {
    id: "T",
    symbol: "T",
    name: "AT&T Inc.",
    sector: "Communication Services"
  },
  {
    id: "SBUX",
    symbol: "SBUX",
    name: "Starbucks Corporation",
    sector: "Consumer Cyclical"
  },
  {
    id: "AMGN",
    symbol: "AMGN",
    name: "Amgen Inc.",
    sector: "Healthcare"
  },
  {
    id: "CVX",
    symbol: "CVX",
    name: "Chevron Corporation",
    sector: "Energy"
  },
  {
    id: "LOW",
    symbol: "LOW",
    name: "Lowe's Companies, Inc.",
    sector: "Consumer Cyclical"
  },
  {
    id: "UNP",
    symbol: "UNP",
    name: "Union Pacific Corporation",
    sector: "Industrials"
  },
  {
    id: "INTU",
    symbol: "INTU",
    name: "Intuit Inc.",
    sector: "Technology"
  },
  {
    id: "SCHW",
    symbol: "SCHW",
    name: "The Charles Schwab Corporation",
    sector: "Financial Services"
  },
  {
    id: "SPGI",
    symbol: "SPGI",
    name: "S&P Global Inc.",
    sector: "Financial Services"
  },
  {
    id: "RTX",
    symbol: "RTX",
    name: "Raytheon Technologies Corporation",
    sector: "Industrials"
  },
  {
    id: "AMT",
    symbol: "AMT",
    name: "American Tower Corporation",
    sector: "Real Estate"
  },
  {
    id: "AXP",
    symbol: "AXP",
    name: "American Express Company",
    sector: "Financial Services"
  },
  {
    id: "MS",
    symbol: "MS",
    name: "Morgan Stanley",
    sector: "Financial Services"
  },
  {
    id: "GS",
    symbol: "GS",
    name: "The Goldman Sachs Group, Inc.",
    sector: "Financial Services"
  },
  {
    id: "BA",
    symbol: "BA",
    name: "The Boeing Company",
    sector: "Industrials"
  },
  {
    id: "BLK",
    symbol: "BLK",
    name: "BlackRock, Inc.",
    sector: "Financial Services"
  },
  {
    id: "PLD",
    symbol: "PLD",
    name: "Prologis, Inc.",
    sector: "Real Estate"
  },
  {
    id: "MDT",
    symbol: "MDT",
    name: "Medtronic plc",
    sector: "Healthcare"
  },
  {
    id: "BMY",
    symbol: "BMY",
    name: "Bristol-Myers Squibb Company",
    sector: "Healthcare"
  },
  {
    id: "TGT",
    symbol: "TGT",
    name: "Target Corporation",
    sector: "Consumer Defensive"
  },
  {
    id: "C",
    symbol: "C",
    name: "Citigroup Inc.",
    sector: "Financial Services"
  },
  {
    id: "MMM",
    symbol: "MMM",
    name: "3M Company",
    sector: "Industrials"
  },
  {
    id: "GE",
    symbol: "GE",
    name: "General Electric Company",
    sector: "Industrials"
  },
  {
    id: "DE",
    symbol: "DE",
    name: "Deere & Company",
    sector: "Industrials"
  },
  {
    id: "ISRG",
    symbol: "ISRG",
    name: "Intuitive Surgical, Inc.",
    sector: "Healthcare"
  },
  {
    id: "ELV",
    symbol: "ELV",
    name: "Elevance Health, Inc.",
    sector: "Healthcare"
  },
  {
    id: "PEP",
    symbol: "PEP",
    name: "PepsiCo, Inc.",
    sector: "Consumer Defensive"
  },
  {
    id: "COP",
    symbol: "COP",
    name: "ConocoPhillips",
    sector: "Energy"
  },
  {
    id: "ADP",
    symbol: "ADP",
    name: "Automatic Data Processing, Inc.",
    sector: "Industrials"
  },
  {
    id: "ADI",
    symbol: "ADI",
    name: "Analog Devices, Inc.",
    sector: "Technology"
  },
  {
    id: "SYK",
    symbol: "SYK",
    name: "Stryker Corporation",
    sector: "Healthcare"
  },
  {
    id: "CI",
    symbol: "CI",
    name: "Cigna Corporation",
    sector: "Healthcare"
  },
  {
    id: "MO",
    symbol: "MO",
    name: "Altria Group, Inc.",
    sector: "Consumer Defensive"
  },
  {
    id: "DUK",
    symbol: "DUK",
    name: "Duke Energy Corporation",
    sector: "Utilities"
  },
  {
    id: "MDLZ",
    symbol: "MDLZ",
    name: "Mondelez International, Inc.",
    sector: "Consumer Defensive"
  },
  {
    id: "SO",
    symbol: "SO",
    name: "The Southern Company",
    sector: "Utilities"
  },
  {
    id: "AMAT",
    symbol: "AMAT",
    name: "Applied Materials, Inc.",
    sector: "Technology"
  },
  {
    id: "GILD",
    symbol: "GILD",
    name: "Gilead Sciences, Inc.",
    sector: "Healthcare"
  },
  {
    id: "CB",
    symbol: "CB",
    name: "Chubb Limited",
    sector: "Financial Services"
  },
  {
    id: "ZTS",
    symbol: "ZTS",
    name: "Zoetis Inc.",
    sector: "Healthcare"
  },
  {
    id: "BKNG",
    symbol: "BKNG",
    name: "Booking Holdings Inc.",
    sector: "Consumer Cyclical"
  },
  {
    id: "CSX",
    symbol: "CSX",
    name: "CSX Corporation",
    sector: "Industrials"
  },
  {
    id: "CL",
    symbol: "CL",
    name: "Colgate-Palmolive Company",
    sector: "Consumer Defensive"
  },
  {
    id: "CHTR",
    symbol: "CHTR",
    name: "Charter Communications, Inc.",
    sector: "Communication Services"
  },
  {
    id: "CME",
    symbol: "CME",
    name: "CME Group Inc.",
    sector: "Financial Services"
  },
  {
    id: "PGR",
    symbol: "PGR",
    name: "The Progressive Corporation",
    sector: "Financial Services"
  },
  {
    id: "TJX",
    symbol: "TJX",
    name: "The TJX Companies, Inc.",
    sector: "Consumer Cyclical"
  },
  {
    id: "REGN",
    symbol: "REGN",
    name: "Regeneron Pharmaceuticals, Inc.",
    sector: "Healthcare"
  },
  {
    id: "NFLX",
    symbol: "NFLX",
    name: "Netflix, Inc.",
    sector: "Communication Services"
  },
  {
    id: "NOC",
    symbol: "NOC",
    name: "Northrop Grumman Corporation",
    sector: "Industrials"
  }
]
