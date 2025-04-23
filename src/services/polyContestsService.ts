
import { supabase } from "@/integrations/supabase/client";
import { PolyContest, PriceHistoryPoint } from "@/types/competitions";

export const fetchPolyContests = async (): Promise<{
  polyContests: PolyContest[];
  error: string | null;
}> => {
  try {
    // Fetch all poly contests
    const { data: contests, error } = await supabase
      .from("poly_contests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching poly contests:", error);
      return { polyContests: [], error: error.message };
    }

    // Transform to match the PolyContest interface
    const polyContests: PolyContest[] = contests.map((contest) => ({
      id: contest.id,
      title: contest.title,
      description: contest.description,
      category: contest.category,
      yes_price: contest.yes_price,
      no_price: contest.no_price,
      total_volume: contest.total_volume,
      participants: contest.participants,
      end_time: contest.end_time,
      status: contest.status as "active" | "resolved" | "cancelled",
      outcome: contest.outcome as "yes" | "no" | null,
      image_url: contest.image_url,
      created_at: contest.created_at
    }));

    return { polyContests, error: null };
  } catch (err) {
    console.error("Unexpected error fetching poly contests:", err);
    return { polyContests: [], error: "Failed to load poly contests" };
  }
};

export const fetchPolyContestById = async (contestId: string): Promise<{
  contest: PolyContest | null;
  error: string | null;
}> => {
  try {
    // Fetch a specific poly contest by ID
    const { data: contest, error } = await supabase
      .from("poly_contests")
      .select("*")
      .eq("id", contestId)
      .single();

    if (error) {
      console.error(`Error fetching poly contest ${contestId}:`, error);
      return { contest: null, error: error.message };
    }

    const polyContest: PolyContest = {
      id: contest.id,
      title: contest.title,
      description: contest.description,
      category: contest.category,
      yes_price: contest.yes_price,
      no_price: contest.no_price,
      total_volume: contest.total_volume,
      participants: contest.participants,
      end_time: contest.end_time,
      status: contest.status as "active" | "resolved" | "cancelled",
      outcome: contest.outcome as "yes" | "no" | null,
      image_url: contest.image_url,
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

    if (error) {
      console.error(`Error fetching price history for contest ${contestId}:`, error);
      return { priceHistory: [], error: error.message };
    }

    const priceHistory: PriceHistoryPoint[] = history.map((point) => ({
      timestamp: point.timestamp,
      yes_price: point.yes_price,
      no_price: point.no_price
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
    // First get the current price
    const { data: contest, error: contestError } = await supabase
      .from("poly_contests")
      .select("yes_price, no_price")
      .eq("id", contestId)
      .single();

    if (contestError) {
      return { success: false, error: "Contest not found" };
    }

    const price = prediction === "yes" ? contest.yes_price : contest.no_price;
    const potentialPayout = coins / price;

    // Insert the bet
    const { error } = await supabase.from("poly_bets").insert({
      user_id: userId,
      contest_id: contestId,
      prediction,
      coins,
      price,
      potential_payout: potentialPayout
    });

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
