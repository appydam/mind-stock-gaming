
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabase";
import { CompetitionProps } from "@/components/CompetitionCard";
import CompetitionCard from "@/components/CompetitionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Competitions = () => {
  const [competitions, setCompetitions] = useState<CompetitionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const { data, error } = await supabase
          .from('competitions')
          .select('*');
        
        if (error) throw error;
        
        if (data) {
          setCompetitions(data as CompetitionProps[]);
        }
      } catch (error) {
        console.error('Error fetching competitions:', error);
        toast({
          title: "Error",
          description: "Failed to load competitions. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();

    // Set up real-time subscription for competitions
    const subscription = supabase
      .channel('competitions_changes')
      .on('INSERT', (payload) => {
        setCompetitions(prev => [...prev, payload.new as CompetitionProps]);
      })
      .on('UPDATE', (payload) => {
        setCompetitions(prev => 
          prev.map(comp => comp.id === payload.new.id ? {...comp, ...payload.new} : comp)
        );
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  // Filter competitions by type
  const customCompetitions = competitions.filter(comp => comp.type === "custom");
  const predefinedCompetitions = competitions.filter(comp => comp.type === "predefined");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pb-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Available Competitions</h1>
          <p className="text-muted-foreground mb-8">
            Join the competition that suits your investment style and prediction skills
          </p>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Competitions</TabsTrigger>
              <TabsTrigger value="custom">Custom Basket</TabsTrigger>
              <TabsTrigger value="predefined">Predefined Basket</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {loading ? (
                <div className="grid grid-cols-1 gap-6 animate-pulse">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 bg-primary/10 rounded-xl"></div>
                  ))}
                </div>
              ) : competitions.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {competitions.map(competition => (
                    <CompetitionCard key={competition.id} {...competition} />
                  ))}
                </div>
              ) : (
                <p className="text-center py-12 text-muted-foreground">
                  No competitions available at the moment. Check back soon!
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="custom">
              {!loading && customCompetitions.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {customCompetitions.map(competition => (
                    <CompetitionCard key={competition.id} {...competition} />
                  ))}
                </div>
              ) : (
                <p className="text-center py-12 text-muted-foreground">
                  No custom basket competitions available at the moment.
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="predefined">
              {!loading && predefinedCompetitions.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {predefinedCompetitions.map(competition => (
                    <CompetitionCard key={competition.id} {...competition} />
                  ))}
                </div>
              ) : (
                <p className="text-center py-12 text-muted-foreground">
                  No predefined basket competitions available at the moment.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Competitions;
