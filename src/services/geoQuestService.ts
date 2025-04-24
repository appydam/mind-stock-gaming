
import { supabase } from "@/integrations/supabase/client";

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
}

export interface GeoQuestion {
  id: string;
  contest_id: string;
  image_url: string;
  question_text: string;
  options: string[];
  correct_option?: number; // Only included in admin mode
}

export interface GeoLeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  score: number;
  submitted_at: string;
}

// Fetch all GeoQuest contests
export const fetchGeoQuestContests = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('geo-quest-api', {
      method: 'GET',
      query: { path: 'get-all-contests' }
    });
    
    if (error) {
      throw error;
    }
    
    return { contests: data?.data || [], error: null };
  } catch (error) {
    console.error("Error fetching GeoQuest contests:", error);
    return { contests: [], error: "Failed to load contests" };
  }
};

// Fetch details for a specific contest
export const fetchGeoQuestContestDetails = async (contestId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('geo-quest-api', {
      method: 'POST',
      body: { contest_id: contestId, path: 'get-contest-details' }
    });
    
    if (error) {
      throw error;
    }
    
    return { contest: data?.data as GeoQuestContest, error: null };
  } catch (error) {
    console.error("Error fetching GeoQuest contest details:", error);
    return { contest: null, error: "Failed to load contest details" };
  }
};

// Fetch questions for a specific contest (only available to users who have joined)
export const fetchGeoQuestQuestions = async (contestId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('geo-quest-api', {
      method: 'POST',
      body: { contest_id: contestId, path: 'get-contest-questions' }
    });
    
    if (error) {
      throw error;
    }
    
    return { questions: data?.data || [], error: null };
  } catch (error) {
    console.error("Error fetching GeoQuest questions:", error);
    return { questions: [], error: "Failed to load questions" };
  }
};

// Submit answers to a contest
export const submitGeoQuestAnswers = async (contestId: string, answers: number[]) => {
  try {
    const { data, error } = await supabase.functions.invoke('geo-quest-api', {
      method: 'POST',
      body: { contest_id: contestId, answers, path: 'submit-answers' }
    });
    
    if (error) throw error;
    
    return { data: data?.data || null, error: null };
  } catch (error) {
    console.error("Error submitting answers:", error);
    return { data: null, error: "Failed to submit answers" };
  }
};

// Get leaderboard for a specific contest
export const fetchGeoQuestLeaderboard = async (contestId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('geo-quest-api', {
      method: 'POST',
      body: { contest_id: contestId, path: 'get-leaderboard' }
    });
    
    if (error) throw error;
    
    return { leaderboard: data?.data as GeoLeaderboardEntry[] || [], error: null };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { leaderboard: [], error: "Failed to load leaderboard" };
  }
};

// Check if user has joined a specific contest
export const checkContestJoined = async (contestId: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || !session.user) {
      return { joined: false, error: null };
    }
    
    const { data, error } = await supabase.functions.invoke('geo-quest-api', {
      method: 'POST',
      body: { contest_id: contestId, path: 'check-contest-joined' }
    });
    
    if (error) {
      throw error;
    }
    
    return { joined: data?.data?.joined || false, error: null };
  } catch (error) {
    console.error("Error checking contest joined status:", error);
    return { joined: false, error: "Failed to check join status" };
  }
};

// Join a contest
export const joinGeoQuestContest = async (contestId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('geo-quest-api', {
      method: 'POST',
      body: { contest_id: contestId, path: 'join-contest' }
    });
    
    if (error) throw error;
    
    return { 
      success: data?.data?.success || false, 
      message: data?.data?.message || "Operation completed", 
      error: null 
    };
  } catch (error) {
    console.error("Error joining contest:", error);
    return { success: false, message: null, error: "Failed to join contest" };
  }
};

// Get participant count for a contest
export const getContestParticipantsCount = async (contestId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('geo-quest-api', {
      method: 'POST',
      body: { contest_id: contestId, path: 'get-participants-count' }
    });
    
    if (error) throw error;
    
    return { count: data?.data?.count || 0, error: null };
  } catch (error) {
    console.error("Error getting participant count:", error);
    return { count: 0, error: "Failed to get participant count" };
  }
};

// Get user profile and virtual balance
export const fetchUserProfile = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('geo-quest-api', {
      method: 'GET',
      query: { path: 'get-user-profile' }
    });
    
    if (error) throw error;
    
    return { profile: data?.data?.profile || null, error: null };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { profile: null, error: "Failed to load profile" };
  }
};
