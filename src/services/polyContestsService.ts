
import { PolyContest, PriceHistoryPoint } from "@/types/competitions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Get all PolyContests
export const getPolyContests = async () => {
  try {
    // Fetch contests from Supabase
    const { data, error } = await supabase
      .from("poly_contests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Extract unique categories
    const categories = data && data.length > 0 
      ? [...new Set(data.map(contest => contest.category))] 
      : [];

    return { data: data as PolyContest[], categories, error: null };
  } catch (error) {
    console.error("Error fetching poly contests:", error);
    toast.error("Failed to load poly contests");
    
    // Return empty data with error
    return { data: [], categories: [], error: "Failed to fetch poly contests" };
  }
};

// Legacy alias
export const fetchPolyContests = getPolyContests;

// Get a single PolyContest by ID
export const getPolyContestById = async (id: string) => {
  try {
    // Fetch single contest
    const { data, error } = await supabase
      .from("poly_contests")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return { contest: data as PolyContest, error: null };
  } catch (error) {
    console.error(`Error fetching poly contest with ID ${id}:`, error);
    return { contest: null, error: "Failed to fetch contest details" };
  }
};

// Get price history for a contest
export const getPolyPriceHistory = async (contestId: string) => {
  try {
    const { data, error } = await supabase
      .from("poly_price_history")
      .select("*")
      .eq("contest_id", contestId)
      .order("timestamp", { ascending: true });

    if (error) {
      throw error;
    }

    return { priceHistory: data as PriceHistoryPoint[], error: null };
  } catch (error) {
    console.error("Error fetching price history:", error);
    return { priceHistory: [], error: "Failed to fetch price history" };
  }
};

// Place a bet on a poly contest
export const placePolyBet = async (
  userId: string,
  contestId: string,
  prediction: "yes" | "no",
  coins: number
) => {
  try {
    // Get current price
    const { data: contestData, error: contestError } = await supabase
      .from("poly_contests")
      .select("yes_price, no_price")
      .eq("id", contestId)
      .single();

    if (contestError) throw contestError;

    const price = prediction === "yes" ? contestData.yes_price : contestData.no_price;
    const potentialPayout = +(coins / price).toFixed(2);

    // Place the bet
    const { error: betError } = await supabase
      .from("poly_bets")
      .insert({
        user_id: userId,
        contest_id: contestId,
        prediction,
        coins,
        price,
        potential_payout: potentialPayout,
      });

    if (betError) throw betError;

    // Update contest data using RPC function
    const { error: rpcError } = await supabase.rpc("update_contest_after_bet", {
      p_contest_id: contestId,
      p_coins: coins,
      p_prediction: prediction,
    });

    if (rpcError) {
      console.error("Error updating contest after bet:", rpcError);
      // We don't throw here as the bet was already placed
    }

    return { 
      success: true, 
      message: `Bet placed successfully! Potential payout: ${potentialPayout} coins`,
      error: null 
    };
  } catch (error) {
    console.error("Error placing bet:", error);
    return { 
      success: false, 
      message: null,
      error: "Failed to place bet. Please try again." 
    };
  }
};

// Get user bets for a specific contest
export const getUserBetsForContest = async (contestId: string) => {
  try {
    const { data, error } = await supabase
      .from("poly_bets")
      .select("*")
      .eq("contest_id", contestId);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching user bets:", error);
    return { data: null, error: "Failed to fetch your bets" };
  }
};

// Alias exports for backward compatibility with existing code
export const fetchPolyContestById = getPolyContestById;
export const fetchPriceHistory = getPolyPriceHistory;
export const placeBet = placePolyBet;
