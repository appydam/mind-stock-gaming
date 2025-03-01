import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabase";
import StockSelector from "@/components/StockSelector";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Trophy, AlertCircle } from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";
import { CompetitionProps } from "@/components/CompetitionCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector?: string;
}

const GamePage = () => {
  const { competitionId } = useParams<{ competitionId: string }>();
  const [competition, setCompetition] = useState<CompetitionProps | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [predictionValue, setPredictionValue] = useState<"positive" | "negative">("positive");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompetitionAndStocks = async () => {
      try {
        const { data: competitionData, error: competitionError } = await supabase
          .from('competitions')
          .select('*')
          .eq('id', competitionId)
          .single();
        
        if (competitionError) throw competitionError;
        
        if (competitionData) {
          setCompetition(competitionData as CompetitionProps);
        }

        const { data: stocksData, error: stocksError } = await supabase
          .from('stocks')
          .select('*');
        
        if (stocksError) throw stocksError;
        
        if (stocksData) {
          setStocks(stocksData as Stock[]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load competition details. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitionAndStocks();
  }, [competitionId, toast]);

  const handleStockSelection = (selections: Stock[]) => {
    setSelectedStocks(selections);
  };

  const handleSubmit = async () => {
    if (!user || !competition) return;
    
    if (competition.type === "custom" && selectedStocks.length < 5) {
      toast({
        title: "Selection incomplete",
        description: "Please select 5 stocks for your basket",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data: existingEntry, error: checkError } = await supabase
        .from('participations')
        .select('*')
        .eq('competition_id', competitionId)
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (checkError) throw checkError;
      
      if (existingEntry) {
        toast({
          title: "Already participating",
          description: "You've already joined this competition",
          variant: "destructive"
        });
        navigate('/competitions');
        return;
      }
      
      const participationData = {
        user_id: user.id,
        competition_id: competitionId,
        joined_at: new Date().toISOString(),
        ...(competition.type === "custom" 
          ? { selected_stocks: selectedStocks.map(s => s.id) }
          : { prediction: predictionValue })
      };
      
      const { error: insertError } = await supabase
        .from('participations')
        .insert(participationData);
      
      if (insertError) throw insertError;
      
      const { error: updateError } = await supabase
        .from('competitions')
        .update({ current_participants: competition.currentParticipants + 1 })
        .eq('id', competitionId);
      
      if (updateError) throw updateError;
      
      toast({
        title: "Success!",
        description: "You've successfully joined the competition",
      });
      
      navigate('/competitions');
    } catch (error) {
      console.error('Error joining competition:', error);
      toast({
        title: "Failed to join",
        description: "There was an issue joining the competition. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <MorphCard className="text-center p-8">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Competition Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The competition you're looking for doesn't exist or has ended.
          </p>
          <Button onClick={() => navigate('/competitions')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Competitions
          </Button>
        </MorphCard>
      </div>
    );
  }

  if (competition.status !== "open") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <MorphCard className="text-center p-8">
          <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Competition {competition.status}</h2>
          <p className="text-muted-foreground mb-6">
            This competition is no longer open for new entries.
          </p>
          <Button onClick={() => navigate('/competitions')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Competitions
          </Button>
        </MorphCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/competitions')} className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Competitions
          </Button>
          
          <MorphCard className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{competition.name}</h1>
            <p className="text-muted-foreground mb-6">{competition.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm text-muted-foreground block">Entry Fee</span>
                <span className="font-medium">{competition.entryFee > 0 ? `₹${competition.entryFee}` : "Free"}</span>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground block">Prize Pool</span>
                <span className="font-medium">₹{competition.prizePool.toLocaleString()}</span>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground block">Participants</span>
                <span className="font-medium">{competition.currentParticipants} / {competition.maxParticipants}</span>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground block">Deadline</span>
                <span className="font-medium">{new Date(competition.deadline).toLocaleString()}</span>
              </div>
            </div>
          </MorphCard>
          
          <MorphCard>
            <div className="flex items-center mb-6">
              <Trophy className="h-6 w-6 text-gold-500 mr-3" />
              <h2 className="text-xl font-bold">
                {competition.type === "custom" 
                  ? "Select Your Stocks" 
                  : "Make Your Prediction"}
              </h2>
            </div>
            
            {competition.type === "custom" ? (
              <div className="space-y-8">
                <StockSelector 
                  stocks={stocks} 
                  maxSelections={5} 
                  onSelectionsChange={handleStockSelection} 
                />
                
                <div className="flex flex-col items-center justify-center mt-8 pt-8 border-t">
                  <p className="text-center text-muted-foreground mb-4">
                    Once you confirm your selection, it cannot be changed after the market opens.
                  </p>
                  <Button 
                    onClick={handleSubmit}
                    disabled={selectedStocks.length !== 5 || isSubmitting}
                    className="min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Processing...
                      </span>
                    ) : (
                      "Join Competition"
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-4">Will this basket have a positive or negative return?</h3>
                  <RadioGroup value={predictionValue} onValueChange={(value) => setPredictionValue(value as "positive" | "negative")}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="positive" id="positive" />
                        <Label htmlFor="positive" className="cursor-pointer">
                          <div className="flex flex-col">
                            <span className="font-medium">Positive Return</span>
                            <span className="text-sm text-muted-foreground">The basket will gain value</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="negative" id="negative" />
                        <Label htmlFor="negative" className="cursor-pointer">
                          <div className="flex flex-col">
                            <span className="font-medium">Negative Return</span>
                            <span className="text-sm text-muted-foreground">The basket will lose value</span>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex flex-col items-center justify-center mt-8 pt-8 border-t">
                  <p className="text-center text-muted-foreground mb-4">
                    Your prediction will be locked once you join the competition.
                  </p>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Processing...
                      </span>
                    ) : (
                      "Confirm Prediction"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </MorphCard>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
