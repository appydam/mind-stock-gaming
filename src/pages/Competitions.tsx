
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabase";
import CompetitionCard, { CompetitionProps } from "@/components/CompetitionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Filter, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Competitions = () => {
  const [competitions, setCompetitions] = useState<CompetitionProps[]>([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState<CompetitionProps[]>([]);
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
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
          setFilteredCompetitions(data as CompetitionProps[]);
        }
      } catch (error) {
        console.error('Error fetching competitions:', error);
        toast({
          title: "Error",
          description: "Failed to load competitions. Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, [toast]);

  useEffect(() => {
    let result = [...competitions];
    
    if (status !== "all") {
      result = result.filter(comp => comp.status === status);
    }
    
    if (type !== "all") {
      result = result.filter(comp => comp.type === type);
    }
    
    setFilteredCompetitions(result);
  }, [competitions, status, type]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Competitions</h1>
            <p className="text-muted-foreground max-w-2xl">
              Join stock prediction competitions and win real prizes. Test your market analysis skills against other players.
            </p>
          </div>
          
          <Button className="mt-4 md:mt-0" disabled={!user}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Competition
          </Button>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all" onClick={() => setStatus("all")}>All</TabsTrigger>
              <TabsTrigger value="open" onClick={() => setStatus("open")}>Open</TabsTrigger>
              <TabsTrigger value="closed" onClick={() => setStatus("closed")}>Closed</TabsTrigger>
              <TabsTrigger value="completed" onClick={() => setStatus("completed")}>Completed</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Game Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="custom">Custom Basket</SelectItem>
                  <SelectItem value="predefined">Predefined Basket</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="h-[320px] rounded-xl bg-card animate-pulse" />
                ))}
              </div>
            ) : filteredCompetitions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompetitions.map((competition) => (
                  <CompetitionCard key={competition.id} {...competition} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No competitions found</h3>
                <p className="text-muted-foreground mb-6">
                  {status === "all" 
                    ? "There are no competitions available at the moment." 
                    : `There are no ${status} competitions currently.`}
                </p>
                <Button variant="outline" onClick={() => {
                  setStatus("all");
                  setType("all");
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Competitions;
