
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
    // Use a raw query instead of typed query builder since the table isn't in TypeScript yet
    const { data: contestsData, error: contestsError } = await supabase.rpc('get_all_geo_contests');
    
    if (contestsError) {
      throw contestsError;
    }
    
    return { contests: contestsData || [], error: null };
  } catch (error) {
    console.error("Error fetching GeoQuest contests:", error);
    return { contests: [], error: "Failed to load contests" };
  }
};

// Fetch questions for a specific contest (only available to users who have joined)
export const fetchGeoQuestQuestions = async (contestId: string) => {
  try {
    // Use a stored procedure to get questions instead of direct table access
    const { data: questionsData, error: questionsError } = await supabase.rpc('get_geo_contest_questions', {
      contest_id: contestId
    });
    
    if (questionsError) {
      throw questionsError;
    }
    
    return { questions: questionsData || [], error: null };
  } catch (error) {
    console.error("Error fetching GeoQuest questions:", error);
    return { questions: [], error: "Failed to load questions" };
  }
};

// Submit answers to a contest
export const submitGeoQuestAnswers = async (contestId: string, answers: number[]) => {
  try {
    const { data, error } = await supabase.rpc(
      'submit_geo_answers',
      { contest_id: contestId, answers }
    );
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error("Error submitting answers:", error);
    return { data: null, error: "Failed to submit answers" };
  }
};

// Get leaderboard for a specific contest
export const fetchGeoQuestLeaderboard = async (contestId: string) => {
  try {
    const { data, error } = await supabase.rpc(
      'get_geo_leaderboard',
      { contest_id: contestId }
    );
    
    if (error) throw error;
    
    return { leaderboard: data as GeoLeaderboardEntry[], error: null };
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
    
    const { data, error } = await supabase.rpc('check_contest_joined', {
      contest_id: contestId
    });
    
    if (error) {
      throw error;
    }
    
    return { joined: data?.joined || false, error: null };
  } catch (error) {
    console.error("Error checking contest joined status:", error);
    return { joined: false, error: "Failed to check join status" };
  }
};

// Get user profile and virtual balance
export const fetchUserProfile = async () => {
  try {
    const { data, error } = await supabase.rpc('get_user_profile');
    
    if (error) throw error;
    
    return { profile: data?.profile, error: null };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { profile: null, error: "Failed to load profile" };
  }
};
