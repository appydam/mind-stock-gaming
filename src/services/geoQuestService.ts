
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching contest details:", error);
    return { data: null, error: error.message || "Failed to fetch contest details" };
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

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching contest questions:", error);
    return { data: null, error: error.message || "Failed to fetch questions" };
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
      return { success: false, score: 0, error: data.message };
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

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { data: null, error: error.message || "Failed to fetch leaderboard" };
  }
};
