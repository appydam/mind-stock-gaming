
import { toast } from 'sonner';

// Type definitions
export interface GeoQuestContest {
  id: string;
  title: string;
  theme: string;
  start_time: string;
  end_time: string;
  entry_fee: number;
  prize_pool: number;
  status: "active" | "upcoming" | "completed";
  image_url: string;
  created_at?: string;
}

export interface GeoQuestion {
  id: string;
  contest_id: string;
  image_url: string;
  question_text: string;
  options: string[];
  correct_option?: number; // Optional as we don't want to expose correct answers to client
  created_at?: string;
}

export interface GeoLeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  score: number;
  submitted_at: string;
}

// Mock data for GeoQuest contests
const mockGeoQuestContests: GeoQuestContest[] = [
  {
    id: "geo1",
    title: "World Capitals Challenge",
    theme: "Capitals",
    start_time: "2024-04-01T00:00:00Z",
    end_time: "2025-05-30T23:59:59Z",
    entry_fee: 100,
    prize_pool: 5000,
    status: "active",
    image_url: "https://images.unsplash.com/photo-1535224206242-487f7090b5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    created_at: "2024-03-15T10:00:00Z"
  },
  {
    id: "geo2",
    title: "European Landmarks Quiz",
    theme: "Landmarks",
    start_time: "2024-04-15T00:00:00Z",
    end_time: "2025-06-15T23:59:59Z",
    entry_fee: 150,
    prize_pool: 7500,
    status: "upcoming",
    image_url: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    created_at: "2024-04-01T08:30:00Z"
  },
  {
    id: "geo3",
    title: "Asian Geography Master",
    theme: "Geography",
    start_time: "2024-03-10T00:00:00Z",
    end_time: "2024-04-10T23:59:59Z",
    entry_fee: 120,
    prize_pool: 6000,
    status: "completed",
    image_url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    created_at: "2024-02-25T14:45:00Z"
  },
  {
    id: "geo4",
    title: "Natural Wonders Explorer",
    theme: "Nature",
    start_time: "2024-05-01T00:00:00Z",
    end_time: "2025-07-01T23:59:59Z",
    entry_fee: 200,
    prize_pool: 10000,
    status: "upcoming",
    image_url: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    created_at: "2024-04-10T11:20:00Z"
  }
];

// Mock questions for GeoQuest contests
const mockGeoQuestions: Record<string, GeoQuestion[]> = {
  "geo1": [
    {
      id: "q1-geo1",
      contest_id: "geo1",
      image_url: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      question_text: "Which city is this famous landmark located in?",
      options: ["Paris", "London", "Rome", "Berlin"],
      correct_option: 0
    },
    {
      id: "q2-geo1",
      contest_id: "geo1",
      image_url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      question_text: "What is the capital of this country?",
      options: ["Madrid", "Lisbon", "Barcelona", "Seville"],
      correct_option: 0
    },
    // Add more questions as needed
  ],
  // Add questions for other contests
};

// Mock user joined contests
const mockJoinedContests = new Set<string>();

// Mock participant counts
const mockParticipantCounts: Record<string, number> = {
  "geo1": 145,
  "geo2": 78,
  "geo3": 256,
  "geo4": 23
};

// Mock leaderboard data
const mockLeaderboards: Record<string, GeoLeaderboardEntry[]> = {
  "geo1": [
    { rank: 1, user_id: "user1", username: "GeoMaster", score: 10, submitted_at: "2024-04-05T14:30:00Z" },
    { rank: 2, user_id: "user2", username: "WorldTraveler", score: 9, submitted_at: "2024-04-05T15:45:00Z" },
    { rank: 3, user_id: "user3", username: "GlobeTrotter", score: 8, submitted_at: "2024-04-05T12:15:00Z" }
  ],
  "geo3": [
    { rank: 1, user_id: "user4", username: "AsiaExpert", score: 10, submitted_at: "2024-04-02T09:20:00Z" },
    { rank: 2, user_id: "user1", username: "GeoMaster", score: 9, submitted_at: "2024-04-02T10:35:00Z" },
    { rank: 3, user_id: "user5", username: "MapQuest", score: 7, submitted_at: "2024-04-02T11:10:00Z" }
  ]
};

// Mock user scores
let mockCurrentUserScore = 0;

// Get all GeoQuest contests
export const getGeoQuestContests = async () => {
  try {
    return { data: mockGeoQuestContests, error: null };
  } catch (error) {
    console.error("Error fetching GeoQuest contests:", error);
    return { data: null, error: "Failed to fetch contests" };
  }
};

// Get details for a specific contest
export const getGeoQuestContestDetails = async (contestId: string) => {
  try {
    const contest = mockGeoQuestContests.find(c => c.id === contestId);
    
    if (!contest) {
      throw new Error(`Contest with ID ${contestId} not found`);
    }

    return { contest, error: null };
  } catch (error) {
    console.error("Error fetching contest details:", error);
    return { contest: null, error: "Failed to fetch contest details" };
  }
};

// Check if user has joined a specific contest
export const checkContestJoined = async (contestId: string) => {
  try {
    // In a real implementation, this would check against a database
    const joined = mockJoinedContests.has(contestId);
    return { joined, error: null };
  } catch (error) {
    console.error("Error checking contest joined status:", error);
    return { joined: false, error: "Failed to check join status" };
  }
};

// Get participant count for a contest
export const getContestParticipantsCount = async (contestId: string) => {
  try {
    const count = mockParticipantCounts[contestId] || 0;
    return { count, error: null };
  } catch (error) {
    console.error("Error fetching participant count:", error);
    return { count: 0, error: "Failed to fetch participant count" };
  }
};

// Join a GeoQuest contest
export const joinGeoQuestContest = async (contestId: string) => {
  try {
    const contest = mockGeoQuestContests.find(c => c.id === contestId);
    
    if (!contest) {
      throw new Error("Contest not found");
    }
    
    if (mockJoinedContests.has(contestId)) {
      return { success: true, message: "You have already joined this contest", error: null };
    }
    
    // Add to joined contests
    mockJoinedContests.add(contestId);
    
    // Increase participant count
    mockParticipantCounts[contestId] = (mockParticipantCounts[contestId] || 0) + 1;

    return { success: true, message: "Successfully joined the contest", error: null };
  } catch (error) {
    console.error("Error joining contest:", error);
    return { success: false, message: null, error: "Failed to join contest" };
  }
};

// Get questions for a contest (requires user to have joined)
export const getGeoQuestQuestions = async (contestId: string) => {
  try {
    // Check if user has joined the contest
    if (!mockJoinedContests.has(contestId)) {
      throw new Error("You must join this contest to view questions");
    }
    
    // Get questions for the contest
    const questions = mockGeoQuestions[contestId] || [];
    
    // Remove correct_option from questions before sending to client
    const clientQuestions = questions.map(({ correct_option, ...question }) => question);
    
    return { questions: clientQuestions as GeoQuestion[], error: null };
  } catch (error) {
    console.error("Error fetching contest questions:", error);
    return { questions: [], error: "Failed to fetch questions" };
  }
};

// Submit answers for a contest
export const submitGeoQuestAnswers = async (contestId: string, answers: number[]) => {
  try {
    if (!mockJoinedContests.has(contestId)) {
      throw new Error("You must join this contest to submit answers");
    }
    
    const questions = mockGeoQuestions[contestId] || [];
    
    if (answers.length !== questions.length) {
      throw new Error("Number of answers does not match number of questions");
    }
    
    // Calculate score
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correct_option === answers[i]) {
        score++;
      }
    }
    
    // Store score (in a real implementation)
    mockCurrentUserScore = score;
    
    return { success: true, score, error: null };
  } catch (error) {
    console.error("Error submitting answers:", error);
    return { success: false, score: 0, error: "Failed to submit answers" };
  }
};

// Get leaderboard for a contest
export const getGeoQuestLeaderboard = async (contestId: string) => {
  try {
    const leaderboard = mockLeaderboards[contestId] || [];
    
    // Add current user to leaderboard if they've completed the contest
    if (mockCurrentUserScore > 0 && mockJoinedContests.has(contestId)) {
      const currentUserEntry = {
        rank: leaderboard.length + 1,
        user_id: "current-user",
        username: "You",
        score: mockCurrentUserScore,
        submitted_at: new Date().toISOString()
      };
      
      leaderboard.push(currentUserEntry);
      
      // Sort by score (desc) and submission time (asc)
      leaderboard.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
      });
      
      // Update ranks
      leaderboard.forEach((entry, index) => {
        entry.rank = index + 1;
      });
    }
    
    return { leaderboard, error: null };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { leaderboard: [], error: "Failed to fetch leaderboard" };
  }
};

// Add alias for backwards compatibility
export const fetchOpinionEvents = async () => {
  const { opinionEvents, error } = await fetchCompetitionsData();
  // Extract unique categories
  const categories = opinionEvents.length > 0 
    ? [...new Set(opinionEvents.map(event => event.category))] 
    : [];
  
  return { data: opinionEvents, categories, error };
};

// Import and re-export the competitionsService
import { fetchCompetitionsData, submitOpinionAnswer, mapApiDataToFrontend } from "./competitionsService";
export {
  fetchCompetitionsData,
  submitOpinionAnswer,
  mapApiDataToFrontend
};
