
// This edge function provides endpoints for the GeoQuest game

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const path = url.pathname.split('/').pop()

    const { data: { session } } = await supabaseClient.auth.getSession()
    
    if (!session && path !== 'get-all-contests') {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Handle different API endpoints based on path
    if (path === 'get-all-contests') {
      const { data, error } = await supabaseClient.rpc('get_all_geo_contests')
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (path === 'get-contest-details') {
      const params = await req.json()
      const { contest_id } = params
      
      if (!contest_id) {
        return new Response(
          JSON.stringify({ error: 'Contest ID is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { data, error } = await supabaseClient.rpc('get_geo_contest_details', { contest_id })
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (path === 'check-contest-joined') {
      const params = await req.json()
      const { contest_id } = params
      
      if (!contest_id) {
        return new Response(
          JSON.stringify({ error: 'Contest ID is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { data, error } = await supabaseClient.rpc('check_contest_joined', { contest_id })
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (path === 'get-participants-count') {
      const params = await req.json()
      const { contest_id } = params
      
      if (!contest_id) {
        return new Response(
          JSON.stringify({ error: 'Contest ID is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { data, error } = await supabaseClient.rpc('get_contest_participants_count', { contest_id })
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (path === 'join-contest') {
      const params = await req.json()
      const { contest_id } = params
      
      if (!contest_id) {
        return new Response(
          JSON.stringify({ error: 'Contest ID is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { data, error } = await supabaseClient.rpc('join_geo_contest', { contest_id })
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (path === 'get-contest-questions') {
      const params = await req.json()
      const { contest_id } = params
      
      if (!contest_id) {
        return new Response(
          JSON.stringify({ error: 'Contest ID is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { data, error } = await supabaseClient.rpc('get_geo_contest_questions', { contest_id })
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (path === 'get-leaderboard') {
      const params = await req.json()
      const { contest_id } = params
      
      if (!contest_id) {
        return new Response(
          JSON.stringify({ error: 'Contest ID is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const { data, error } = await supabaseClient.rpc('get_geo_leaderboard', { contest_id })
      
      if (error) throw error
      
      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Default response
    return new Response(
      JSON.stringify({ error: 'Endpoint not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
