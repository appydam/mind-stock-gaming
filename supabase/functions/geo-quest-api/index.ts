
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );
    
    // Get user authentication status
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError) {
      return new Response(
        JSON.stringify({ error: "Authentication error", data: null }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }
    
    const { path, ...params } = await req.json();
    
    // Handle different API paths
    if (path === "get-all-contests") {
      const { data, error } = await supabaseClient
        .from("geo_contests")
        .select("*")
        .order("start_time", { ascending: false });
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ error: null, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    else if (path === "get-contest-details") {
      const { contest_id } = params;
      
      const { data, error } = await supabaseClient
        .from("geo_contests")
        .select("*")
        .eq("id", contest_id)
        .single();
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ error: null, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    else if (path === "check-contest-joined") {
      const { contest_id } = params;
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: null, data: { joined: false } }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const { data, error } = await supabaseClient
        .from("geo_contestants")
        .select("*")
        .eq("user_id", user.id)
        .eq("contest_id", contest_id)
        .maybeSingle();
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ error: null, data: { joined: !!data } }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    else if (path === "get-participants-count") {
      const { contest_id } = params;
      
      const { count, error } = await supabaseClient
        .from("geo_contestants")
        .select("*", { count: 'exact', head: true })
        .eq("contest_id", contest_id);
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ error: null, data: { count } }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    else if (path === "join-contest") {
      const { contest_id } = params;
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Authentication required", data: null }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
        );
      }
      
      // Call the join_geo_contest function
      const { data, error } = await supabaseClient.rpc(
        "join_geo_contest",
        { contest_id }
      );
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ error: null, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    else if (path === "get-contest-questions") {
      const { contest_id } = params;
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Authentication required", data: null }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
        );
      }
      
      // Check if user has joined the contest
      const { data: contestantData, error: contestantError } = await supabaseClient
        .from("geo_contestants")
        .select("*")
        .eq("user_id", user.id)
        .eq("contest_id", contest_id)
        .maybeSingle();
      
      if (contestantError) throw contestantError;
      
      if (!contestantData) {
        return new Response(
          JSON.stringify({ error: "You have not joined this contest", data: null }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
        );
      }
      
      // Get questions with correct answers removed
      const { data: questions, error } = await supabaseClient
        .from("geo_questions")
        .select("id, contest_id, image_url, question_text, options")
        .eq("contest_id", contest_id)
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ error: null, data: questions }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    else if (path === "submit-answers") {
      const { contest_id, answers } = params;
      
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Authentication required", data: null }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
        );
      }
      
      // Call the submit_geo_answers function
      const { data, error } = await supabaseClient.rpc(
        "submit_geo_answers",
        { contest_id, answers }
      );
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ error: null, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    else if (path === "get-leaderboard") {
      const { contest_id } = params;
      
      // Call the get_geo_leaderboard function
      const { data, error } = await supabaseClient.rpc(
        "get_geo_leaderboard",
        { contest_id }
      );
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ error: null, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    else if (path === "get-user-profile") {
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Authentication required", data: null }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
        );
      }
      
      // Get user profile data
      const { data: profileData, error: profileError } = await supabaseClient
        .from("profiles")
        .select("username, virtual_balance")
        .eq("id", user.id)
        .single();
      
      if (profileError && profileError.code !== "PGRST116") throw profileError; // PGRST116 is "no rows found"
      
      // Get user participations
      const { data: contestData, error: contestError } = await supabaseClient
        .from("geo_contestants")
        .select(`
          contest_id,
          user_id,
          joined_at,
          geo_contests(title, entry_fee, status),
          geo_scores(score, submitted_at)
        `)
        .eq("user_id", user.id)
        .order("joined_at", { ascending: false });
      
      if (contestError) throw contestError;
      
      // Get counts of active and completed contests
      let activeContests = 0;
      let completedContests = 0;
      let totalProfit = 0;
      
      const participations = contestData.map((entry) => {
        const contest = entry.geo_contests;
        const score = entry.geo_scores && entry.geo_scores.length > 0 ? entry.geo_scores[0] : null;
        
        // Count active and completed contests
        if (contest.status === "active") activeContests++;
        if (contest.status === "completed") completedContests++;
        
        // Calculate profit (simplified for now)
        let profit = 0;
        if (score && contest.status === "completed") {
          if (score.score >= 8) profit = contest.entry_fee * 2;
          else if (score.score >= 5) profit = contest.entry_fee;
        }
        
        totalProfit += profit;
        
        return {
          contest_id: entry.contest_id,
          title: contest.title,
          status: contest.status,
          joined_at: entry.joined_at,
          score: score?.score || 0,
          submitted_at: score?.submitted_at,
          entry_fee: contest.entry_fee,
          profit: profit
        };
      });
      
      return new Response(
        JSON.stringify({ 
          error: null, 
          data: {
            username: profileData?.username || `User_${user.id.substring(0, 8)}`,
            virtual_balance: profileData?.virtual_balance || 0,
            participations,
            active_contests: activeContests,
            completed_contests: completedContests,
            total_profit: totalProfit
          } 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    else {
      return new Response(
        JSON.stringify({ error: "Invalid API path", data: null }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error", data: null }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
