
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
    const { data: contestsData, error: contestsError } = await supabase
      .from('geo_contests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (contestsError) {
      throw contestsError;
    }
    
    // Transform data to match the interface
    const contests: GeoQuestContest[] = contestsData.map((contest) => ({
      id: contest.id,
      title: contest.title,
      theme: contest.theme,
      start_time: contest.start_time,
      end_time: contest.end_time,
      entry_fee: contest.entry_fee,
      prize_pool: contest.prize_pool,
      status: contest.status as "active" | "upcoming" | "completed",
      image_url: contest.image_url || '',
    }));
    
    return { contests, error: null };
  } catch (error) {
    console.error("Error fetching GeoQuest contests:", error);
    return { contests: [], error: "Failed to load contests" };
  }
};

// Fetch questions for a specific contest (only available to users who have joined)
export const fetchGeoQuestQuestions = async (contestId: string) => {
  try {
    const { data: questionsData, error: questionsError } = await supabase
      .from('geo_questions')
      .select('*')
      .eq('contest_id', contestId)
      .order('id');
    
    if (questionsError) {
      throw questionsError;
    }
    
    // Transform data to match the interface (without correct answers for security)
    const questions: GeoQuestion[] = questionsData.map((question) => ({
      id: question.id,
      contest_id: question.contest_id,
      image_url: question.image_url,
      question_text: question.question_text,
      options: question.options,
      // correct_option is omitted for security
    }));
    
    return { questions, error: null };
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
    
    const { data, error } = await supabase
      .from('geo_contestants')
      .select('*')
      .eq('contest_id', contestId)
      .eq('user_id', session.user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
      throw error;
    }
    
    return { joined: !!data, error: null };
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
    
    return { profile: data.profile, error: null };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { profile: null, error: "Failed to load profile" };
  }
};
