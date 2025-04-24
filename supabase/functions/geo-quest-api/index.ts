
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const authHeader = req.headers.get("Authorization")!;
    const supabase = createClient(
      // Get Supabase URL from environment variable
      Deno.env.get("SUPABASE_URL") ?? "",
      // Get Supabase key from environment variable
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    // Get user ID from auth token
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Parse request to get operation and params
    const { path, ...params } = await req.json();
    
    // Log the request
    console.log(`GeoQuest API request: ${path}`, params);

    let responseData: any = null;
    let error: any = null;

    switch (path) {
      case "get-all-contests":
        // Get all GeoQuest contests
        const { data: contests, error: contestsError } = await supabase
          .from("geo_contests")
          .select("*")
          .order("start_time", { ascending: true });
        responseData = contests;
        error = contestsError;
        break;

      case "get-contest-details":
        // Get details for a specific contest
        const { data: contest, error: contestError } = await supabase
          .from("geo_contests")
          .select("*")
          .eq("id", params.contest_id)
          .single();
        responseData = contest;
        error = contestError;
        break;

      case "check-contest-joined":
        // Check if the user has joined a specific contest
        if (!user) {
          return new Response(
            JSON.stringify({
              data: { joined: false },
              error: "Not authenticated"
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const { data: contestant, error: contestantError } = await supabase
          .from("geo_contestants")
          .select("*")
          .eq("user_id", user.id)
          .eq("contest_id", params.contest_id)
          .maybeSingle();
        responseData = { joined: !!contestant };
        error = contestantError;
        break;

      case "get-participants-count":
        // Get participant count for a contest
        const { count, error: countError } = await supabase
          .from("geo_contestants")
          .select("*", { count: "exact", head: true })
          .eq("contest_id", params.contest_id);
        responseData = { count };
        error = countError;
        break;

      case "join-contest":
        // Join a GeoQuest contest using the DB function
        if (!user) {
          return new Response(
            JSON.stringify({
              data: { success: false, message: "Authentication required" },
              error: "Not authenticated"
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const { data: joinResult, error: joinError } = await supabase
          .rpc("join_geo_contest", { contest_id: params.contest_id });
        responseData = joinResult;
        error = joinError;
        break;

      case "get-contest-questions":
        // Get questions for a contest (check if user has joined)
        if (!user) {
          return new Response(
            JSON.stringify({
              data: [],
              error: "Authentication required"
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // First verify the user has joined
        const { data: joinCheck } = await supabase
          .from("geo_contestants")
          .select("*")
          .eq("user_id", user.id)
          .eq("contest_id", params.contest_id)
          .maybeSingle();
          
        if (!joinCheck) {
          return new Response(
            JSON.stringify({
              data: [],
              error: "You must join this contest first"
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Now get the questions (exclude correct_option from results)
        const { data: questions, error: questionsError } = await supabase
          .from("geo_questions")
          .select("id, contest_id, image_url, question_text, options, created_at")
          .eq("contest_id", params.contest_id);
        responseData = questions;
        error = questionsError;
        break;

      case "submit-answers":
        // Submit answers for a contest and get score
        if (!user) {
          return new Response(
            JSON.stringify({
              data: { success: false, message: "Authentication required" },
              error: "Not authenticated"
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const { data: submitResult, error: submitError } = await supabase
          .rpc("submit_geo_answers", { 
            contest_id: params.contest_id, 
            answers: params.answers 
          });
        responseData = submitResult;
        error = submitError;
        break;

      case "get-leaderboard":
        // Get leaderboard for a contest
        const { data: leaderboard, error: leaderboardError } = await supabase
          .rpc("get_geo_leaderboard", { contest_id: params.contest_id });
        responseData = leaderboard;
        error = leaderboardError;
        break;
        
      case "get-user-profile":
        // Get user's GeoQuest profile data
        if (!user) {
          return new Response(
            JSON.stringify({
              data: { participations: [] },
              error: "Not authenticated"
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Get user's contest participations
        const { data: userContests, error: userContestsError } = await supabase
          .from("geo_contestants")
          .select(`
            contest_id,
            geo_contests!inner(
              id,
              title,
              theme,
              status,
              entry_fee,
              prize_pool,
              image_url
            ),
            joined_at
          `)
          .eq("user_id", user.id);
          
        if (userContestsError) {
          return new Response(
            JSON.stringify({
              data: { participations: [] },
              error: userContestsError.message
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // Get user's scores
        const { data: userScores, error: userScoresError } = await supabase
          .from("geo_scores")
          .select("*")
          .eq("user_id", user.id);
          
        // Get user's transactions
        const { data: userTransactions, error: userTransactionsError } = await supabase
          .from("geo_transactions")
          .select("*")
          .eq("user_id", user.id);
          
        // Format the response data
        const participations = userContests.map(entry => {
          const contest = entry.geo_contests;
          const score = userScores?.find(s => s.contest_id === entry.contest_id);
          const profit = userTransactions
            ?.filter(t => t.contest_id === entry.contest_id && t.type === 'prize')
            ?.reduce((sum, t) => sum + t.amount, 0) || 0;
            
          // Calculate rank for completed contests with scores
          let rank = null;
          let total_participants = null;
          
          return {
            contest_id: entry.contest_id,
            user_id: user.id,
            title: contest.title,
            theme: contest.theme,
            status: contest.status,
            entry_fee: contest.entry_fee,
            prize_pool: contest.prize_pool,
            joined_at: entry.joined_at,
            score: score?.score || null,
            rank,
            total_participants,
            profit,
            image_url: contest.image_url
          };
        });
        
        // Calculate summary stats
        const totalProfit = userTransactions
          ?.filter(t => t.type === 'prize')
          ?.reduce((sum, t) => sum + t.amount, 0) || 0;
          
        const activeContests = participations.filter(p => p.status === 'active').length;
        const completedContests = participations.filter(p => p.status === 'completed').length;
        
        responseData = {
          participations,
          total_profit: totalProfit,
          active_contests: activeContests,
          completed_contests: completedContests
        };
        break;

      default:
        return new Response(
          JSON.stringify({
            data: null,
            error: `Unknown operation: ${path}`
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    // Return the response
    return new Response(
      JSON.stringify({
        data: responseData,
        error: error?.message
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error processing request:", err);
    
    return new Response(
      JSON.stringify({
        data: null,
        error: `Error processing request: ${err.message}`
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
