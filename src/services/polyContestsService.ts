import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { PolyContest, PriceHistoryPoint } from "@/types/competitions";

// Use Supabase database types to ensure we use the correct table and column names
type PolyContestsRow = Database["public"]["Tables"]["poly_contests"]["Row"];
type PolyBetsRow = Database["public"]["Tables"]["poly_bets"]["Row"];
type PolyPriceHistoryRow = Database["public"]["Tables"]["poly_price_history"]["Row"];

export const fetchPolyContests = async (): Promise<{
  polyContests: PolyContest[];
  error: string | null;
}> => {
  try {
    const { data: contests, error } = await supabase
      .from("poly_contests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !contests) {
      console.error("Error fetching poly contests:", error);
      return { polyContests: [], error: error ? error.message : "No contests found" };
    }

    // Transform to match the PolyContest interface
    const polyContests: PolyContest[] = contests.map((contest) => ({
      id: contest.id,
      title: contest.title,
      description: contest.description,
      category: contest.category,
      yes_price: Number(contest.yes_price),
      no_price: Number(contest.no_price),
      total_volume: Number(contest.total_volume),
      participants: contest.participants,
      end_time: contest.end_time,
      status: contest.status as "active" | "resolved" | "cancelled",
      outcome: contest.outcome as "yes" | "no" | null,
      image_url: contest.image_url ?? undefined,
      created_at: contest.created_at
    }));

    return { polyContests, error: null };
  } catch (err) {
    console.error("Unexpected error fetching poly contests:", err);
    return { polyContests: [], error: "Failed to load poly contests" };
  }
};

// Alias fetchPolyContests as getPolyContests for compatibility
export const getPolyContests = async () => {
  const { polyContests, error } = await fetchPolyContests();
  
  // Extract unique categories
  const categories = [...new Set(polyContests.map(contest => contest.category))];
  
  return { data: polyContests, categories, error };
};

export const fetchPolyContestById = async (contestId: string): Promise<{
  contest: PolyContest | null;
  error: string | null;
}> => {
  try {
    const { data: contest, error } = await supabase
      .from("poly_contests")
      .select("*")
      .eq("id", contestId)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching poly contest ${contestId}:`, error);
      return { contest: null, error: error.message };
    }

    if (!contest) {
      return { contest: null, error: "Contest not found" };
    }

    const polyContest: PolyContest = {
      id: contest.id,
      title: contest.title,
      description: contest.description,
      category: contest.category,
      yes_price: Number(contest.yes_price),
      no_price: Number(contest.no_price),
      total_volume: Number(contest.total_volume),
      participants: contest.participants,
      end_time: contest.end_time,
      status: contest.status as "active" | "resolved" | "cancelled",
      outcome: contest.outcome as "yes" | "no" | null,
      image_url: contest.image_url ?? undefined,
      created_at: contest.created_at
    };

    return { contest: polyContest, error: null };
  } catch (err) {
    console.error(`Unexpected error fetching poly contest:`, err);
    return { contest: null, error: "Failed to load contest details" };
  }
};

export const fetchPriceHistory = async (contestId: string): Promise<{
  priceHistory: PriceHistoryPoint[];
  error: string | null;
}> => {
  try {
    const { data: history, error } = await supabase
      .from("poly_price_history")
      .select("*")
      .eq("contest_id", contestId)
      .order("timestamp", { ascending: true });

    if (error || !history) {
      console.error(`Error fetching price history for contest ${contestId}:`, error);
      return { priceHistory: [], error: error ? error.message : "No price history" };
    }

    const priceHistory: PriceHistoryPoint[] = history.map((point) => ({
      timestamp: point.timestamp,
      yes_price: Number(point.yes_price),
      no_price: Number(point.no_price)
    }));

    return { priceHistory, error: null };
  } catch (err) {
    console.error(`Unexpected error fetching price history:`, err);
    return { priceHistory: [], error: "Failed to load price history" };
  }
};

export const placeBet = async (
  userId: string,
  contestId: string,
  prediction: "yes" | "no",
  coins: number
): Promise<{ success: boolean; error: string | null }> => {
  try {
    // Get the current price
    const { data: contest, error: contestError } = await supabase
      .from("poly_contests")
      .select("yes_price, no_price")
      .eq("id", contestId)
      .maybeSingle();

    if (contestError || !contest) {
      return { success: false, error: "Contest not found" };
    }

    const price =
      prediction === "yes"
        ? Number(contest.yes_price)
        : Number(contest.no_price);
    const potentialPayout = coins / price;

    // Insert the bet
    const { error } = await supabase
      .from("poly_bets")
      .insert([
        {
          user_id: userId,
          contest_id: contestId,
          prediction,
          coins,
          price,
          potential_payout: potentialPayout
        }
      ]);

    if (error) {
      console.error("Error placing bet:", error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Unexpected error placing bet:", err);
    return { success: false, error: "Failed to place bet" };
  }
};
