
import { supabase } from "@/lib/supabase";
import { mockStocks, mockCompetitions } from "@/data/mockStocks";

export const initSupabaseTables = async () => {
  try {
    // Check if stocks table exists and has data
    const { data: existingStocks, error: stocksError } = await supabase
      .from('stocks')
      .select('id')
      .limit(1);
    
    if (stocksError && stocksError.code === '42P01') {
      // Table doesn't exist, create it
      const { error: createTableError } = await supabase.rpc('create_stocks_table');
      if (createTableError) {
        console.error('Error creating stocks table:', createTableError);
      } else {
        // Insert mock stocks
        const { error: insertError } = await supabase
          .from('stocks')
          .insert(mockStocks);
        
        if (insertError) console.error('Error inserting stocks:', insertError);
      }
    } else if (!existingStocks || existingStocks.length === 0) {
      // Table exists but is empty, insert mock data
      const { error: insertError } = await supabase
        .from('stocks')
        .insert(mockStocks);
      
      if (insertError) console.error('Error inserting stocks:', insertError);
    }
    
    // Check if competitions table exists and has data
    const { data: existingCompetitions, error: competitionsError } = await supabase
      .from('competitions')
      .select('id')
      .limit(1);
    
    if (competitionsError && competitionsError.code === '42P01') {
      // Table doesn't exist, create it
      const { error: createTableError } = await supabase.rpc('create_competitions_table');
      if (createTableError) {
        console.error('Error creating competitions table:', createTableError);
      } else {
        // Insert mock competitions
        const { error: insertError } = await supabase
          .from('competitions')
          .insert(mockCompetitions);
        
        if (insertError) console.error('Error inserting competitions:', insertError);
      }
    } else if (!existingCompetitions || existingCompetitions.length === 0) {
      // Table exists but is empty, insert mock data
      const { error: insertError } = await supabase
        .from('competitions')
        .insert(mockCompetitions);
      
      if (insertError) console.error('Error inserting competitions:', insertError);
    }
    
    // Check if participations table exists
    const { data: existingParticipations, error: participationsError } = await supabase
      .from('participations')
      .select('id')
      .limit(1);
    
    if (participationsError && participationsError.code === '42P01') {
      // Table doesn't exist, create it
      const { error: createTableError } = await supabase.rpc('create_participations_table');
      if (createTableError) {
        console.error('Error creating participations table:', createTableError);
      }
    }
    
    console.log('Supabase tables initialized successfully');
  } catch (error) {
    console.error('Error initializing Supabase tables:', error);
  }
};
