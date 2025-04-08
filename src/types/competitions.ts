
// mind-stock-gaming/src/types/competitions.ts

// --- API Response Types ---

export interface ApiEquityContest {
  id: number;
  name: string;
  description: string;
  type: "equity"; // This seems fixed in the example
  entry_fee: number;
  max_participants: number;
  status: "open" | "closed" | "upcoming"; // Assuming these are the possible statuses
  basket_type: "Custom Basket" | "Predefined Basket";
  scoring_done: boolean;
  start_time: string; // ISO string
  created_at: string; // ISO string
  updated_at: string; // ISO string
  current_participants: number;
}

export interface ApiOpinionContest {
  id: number;
  name: string; // e.g., "IPL Fantasy League"
  description: string; // e.g., "Will MI win against CSK?"
  registeration_deadline: string; // ISO string
  tag: string; // e.g., "Sports"
  entry_fee: number;
  created_at: string; // ISO string
  participant_meta_data: {
    totalParticipants: number;
    agreed: number; // Assuming this is count or value for 'yes'
    disagreed: number; // Assuming this is count or value for 'no'
  };
}

export interface CompetitionsApiResponseData {
  opinions_contests: ApiOpinionContest[];
  equity_contests: ApiEquityContest[];
}

export interface FullCompetitionsApiResponse {
  code: number;
  data: CompetitionsApiResponseData;
  message?: string; // Optional message field
}


// --- Frontend Component Prop Types ---

// For <CompetitionCard /> - Derived from ApiEquityContest
export interface CompetitionProps {
  id: string; // Using string ID for component keys/consistency
  name: string;
  description: string;
  entryFee: number; // Mapped from entry_fee
  maxParticipants: number; // Mapped from max_participants
  currentParticipants: number; // Mapped from current_participants
  status: "open" | "closed" | "upcoming"; // Mapped from status
  prizePool: number; // MISSING in API - Needs clarification or default (using 0 for now)
  deadline: string; // Mapped from start_time (Assumption for Equity)
  type: "custom" | "predefined"; // Derived from basket_type
  gameType: "equity"; // Hardcoded
}

// For <OpinionEventCard /> - Derived from ApiOpinionContest
export interface OpinionEvent {
  id: string; // Using string ID
  question: string; // Mapped from description (Assumption)
  description: string; // Using API description
  category: string; // Mapped from tag
  deadline: string; // Mapped from registeration_deadline
  minTradeAmount: number; // Mapped from entry_fee
  currentPool: {
    yes: number; // Mapped from participant_meta_data.agreed (Assumption: value/amount)
    no: number;  // Mapped from participant_meta_data.disagreed (Assumption: value/amount)
  };
  participants: number; // Mapped from participant_meta_data.totalParticipants
  status: "active" | "pending" | "resolved"; // MISSING in API - Needs clarification/logic (Defaulting to 'active')
  outcome?: "yes" | "no" | null; // MISSING in API
}
