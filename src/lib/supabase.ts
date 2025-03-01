
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://seoootuucqpeqgdgtsap.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlb29vdHV1Y3FwZXFnZGd0c2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3ODIxNDAsImV4cCI6MjA1NjM1ODE0MH0.D0X4_v3fzMs_BY6AO5nYqZA967Bs4NHm6wrgRCqsLCE';

export const supabase = createClient(supabaseUrl, supabaseKey);
