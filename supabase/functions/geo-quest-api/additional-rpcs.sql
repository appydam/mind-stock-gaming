
-- Add these functions to Supabase with SQL Editor

-- Get details for a specific GeoQuest contest
CREATE OR REPLACE FUNCTION get_geo_contest_details(contest_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_contest JSONB;
BEGIN
  SELECT jsonb_build_object(
    'id', id,
    'title', title,
    'theme', theme,
    'start_time', start_time,
    'end_time', end_time,
    'entry_fee', entry_fee,
    'prize_pool', prize_pool,
    'status', status,
    'image_url', image_url
  ) INTO v_contest
  FROM geo_contests
  WHERE id = contest_id;
  
  RETURN v_contest;
END;
$$;

-- Get all GeoQuest contests
CREATE OR REPLACE FUNCTION get_all_geo_contests()
RETURNS JSONB[]
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_contests JSONB[];
BEGIN
  SELECT array_agg(
    jsonb_build_object(
      'id', id,
      'title', title,
      'theme', theme,
      'start_time', start_time,
      'end_time', end_time,
      'entry_fee', entry_fee,
      'prize_pool', prize_pool,
      'status', status,
      'image_url', image_url
    )
  ) INTO v_contests
  FROM geo_contests
  ORDER BY 
    CASE 
      WHEN status = 'active' THEN 1
      WHEN status = 'upcoming' THEN 2
      ELSE 3
    END,
    start_time;
  
  RETURN COALESCE(v_contests, '{}');
END;
$$;

-- Check if a user has joined a specific contest
CREATE OR REPLACE FUNCTION check_contest_joined(contest_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_joined BOOLEAN;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('joined', false);
  END IF;
  
  SELECT EXISTS (
    SELECT 1 FROM geo_contestants
    WHERE user_id = v_user_id AND contest_id = check_contest_joined.contest_id
  ) INTO v_joined;
  
  RETURN jsonb_build_object('joined', v_joined);
END;
$$;

-- Get contest participant count
CREATE OR REPLACE FUNCTION get_contest_participants_count(contest_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_count
  FROM geo_contestants
  WHERE contest_id = get_contest_participants_count.contest_id;
  
  RETURN jsonb_build_object('count', v_count);
END;
$$;

-- Get questions for a specific contest
CREATE OR REPLACE FUNCTION get_geo_contest_questions(contest_id UUID)
RETURNS JSONB[]
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_joined BOOLEAN;
  v_questions JSONB[];
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Check if user has joined the contest
  SELECT EXISTS (
    SELECT 1 FROM geo_contestants
    WHERE user_id = v_user_id AND contest_id = get_geo_contest_questions.contest_id
  ) INTO v_joined;
  
  IF NOT v_joined THEN
    RETURN NULL;
  END IF;
  
  -- Get questions (without correct answers)
  SELECT array_agg(
    jsonb_build_object(
      'id', id,
      'contest_id', contest_id,
      'image_url', image_url,
      'question_text', question_text,
      'options', options
    )
  ) INTO v_questions
  FROM geo_questions
  WHERE contest_id = get_geo_contest_questions.contest_id
  ORDER BY created_at;
  
  RETURN COALESCE(v_questions, '{}');
END;
$$;
