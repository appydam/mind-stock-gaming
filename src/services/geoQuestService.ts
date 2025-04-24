
import { supabase } from '@/integrations/supabase/client';
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

// Get all GeoQuest contests
export const getGeoQuestContests = async () => {
  try {
    const { data: { data }, error } = await supabase.functions.invoke('geo-quest-api', {
      body: { path: 'get-all-contests' }
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching GeoQuest contests:", error);
    return { data: null, error: error.message || "Failed to fetch contests" };
  }
};

// Get details for a specific contest
export const getGeoQuestContestDetails = async (contestId: string) => {
  try {
    const { data: { data }, error } = await supabase.functions.invoke('geo-quest-api', {
      body: { path: 'get-contest-details', contest_id: contestId }
    });

    if (error) throw error;

    return { contest: data as GeoQuestContest, error: null };
  } catch (error) {
    console.error("Error fetching contest details:", error);
    return { contest: null, error: error.message || "Failed to fetch contest details" };
  }
};

// Check if user has joined a specific contest
export const checkContestJoined = async (contestId: string) => {
  try {
    const { data: { data }, error } = await supabase.functions.invoke('geo-quest-api', {
      body: { path: 'check-contest-joined', contest_id: contestId }
    });

    if (error) throw error;
    
    return { joined: data?.joined || false, error: null };
  } catch (error) {
    console.error("Error checking contest joined status:", error);
    return { joined: false, error: error.message || "Failed to check join status" };
  }
};

// Get participant count for a contest
export const getContestParticipantsCount = async (contestId: string) => {
  try {
    const { data: { data }, error } = await supabase.functions.invoke('geo-quest-api', {
      body: { path: 'get-participants-count', contest_id: contestId }
    });

    if (error) throw error;
    
    return { count: data?.count || 0, error: null };
  } catch (error) {
    console.error("Error fetching participant count:", error);
    return { count: 0, error: error.message || "Failed to fetch participant count" };
  }
};

// Join a GeoQuest contest
export const joinGeoQuestContest = async (contestId: string) => {
  try {
    const { data: { data }, error } = await supabase.functions.invoke('geo-quest-api', {
      body: { path: 'join-contest', contest_id: contestId }
    });

    if (error) throw error;

    if (data?.success) {
      return { success: true, message: data.message, error: null };
    } else {
      return { success: false, message: data.message, error: null };
    }
  } catch (error) {
    console.error("Error joining contest:", error);
    return { success: false, message: null, error: error.message || "Failed to join contest" };
  }
};

// Get questions for a contest (requires user to have joined)
export const getGeoQuestQuestions = async (contestId: string) => {
  try {
    const { data: { data }, error } = await supabase.functions.invoke('geo-quest-api', {
      body: { path: 'get-contest-questions', contest_id: contestId }
    });

    if (error) throw error;

    return { questions: data as GeoQuestion[], error: null };
  } catch (error) {
    console.error("Error fetching contest questions:", error);
    return { questions: [], error: error.message || "Failed to fetch questions" };
  }
};

// Submit answers for a contest
export const submitGeoQuestAnswers = async (contestId: string, answers: number[]) => {
  try {
    const { data: { data }, error } = await supabase.functions.invoke('geo-quest-api', {
      body: { path: 'submit-answers', contest_id: contestId, answers }
    });

    if (error) throw error;

    if (data?.success) {
      return { success: true, score: data.score, error: null };
    } else {
      return { success: false, score: 0, error: data?.message || "Unknown error" };
    }
  } catch (error) {
    console.error("Error submitting answers:", error);
    return { success: false, score: 0, error: error.message || "Failed to submit answers" };
  }
};

// Get leaderboard for a contest
export const getGeoQuestLeaderboard = async (contestId: string) => {
  try {
    const { data: { data }, error } = await supabase.functions.invoke('geo-quest-api', {
      body: { path: 'get-leaderboard', contest_id: contestId }
    });

    if (error) throw error;

    return { leaderboard: data as GeoLeaderboardEntry[], error: null };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { leaderboard: [], error: error.message || "Failed to fetch leaderboard" };
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
