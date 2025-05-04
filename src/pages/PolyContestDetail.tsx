import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PolyContest, PriceHistoryPoint } from "@/types/competitions";
import { getPolyContestById, getPolyPriceHistory, placePolyBet } from "@/services/polyContestsService";
import PolyContestHeader from "@/components/competitions/poly/detail/PolyContestHeader";
import PolyContestChart from "@/components/competitions/poly/detail/PolyContestChart";
import PolyPredictionPool from "@/components/competitions/poly/detail/PolyPredictionPool";
import PolyBetPlacement from "@/components/competitions/poly/detail/PolyBetPlacement";

const PolyContestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [contest, setContest] = useState<PolyContest | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<string>("all");
  
  useEffect(() => {
    const loadContestData = async () => {
      if (!id) {
        setError("Contest ID is missing");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const { contest: contestData, error: contestError } = await getPolyContestById(id);
        
        if (contestError || !contestData) {
          setError(contestError || "Failed to load contest details");
          setIsLoading(false);
          return;
        }
        
        setContest(contestData);
        
        const { priceHistory: historyData, error: historyError } = await getPolyPriceHistory(id);
        
        if (historyError) {
          console.error("Error loading price history:", historyError);
          // Don't set error state here, we can still show the contest without history
        }
        
        if (historyData) {
          setPriceHistory(historyData);
        }
        
      } catch (err) {
        console.error("Error loading contest details:", err);
        setError("Failed to load contest details");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContestData();
  }, [id]);

  const handlePlaceBet = async (selectedOutcome: "yes" | "no", betAmount: number) => {
    if (!contest || !id) return;
    
    setIsSubmitting(true);
    
    try {
      // Mock user ID for demo
      const userId = localStorage.getItem('userId') || 'demo-user';
      
      const result = await placePolyBet(userId, id, selectedOutcome, betAmount);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }
      
      toast.success(`Successfully placed ${selectedOutcome.toUpperCase()} bet for ₹${betAmount}`);
      
      const { contest: refreshedContest } = await getPolyContestById(id);
      if (refreshedContest) {
        setContest(refreshedContest);
      }
      
    } catch (err) {
      console.error("Error placing bet:", err);
      toast.error("Failed to place bet");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (!contest) return;
    
    const shareText = `I'm predicting "${contest.title}" on Mind Stock. Join me!`;
    const shareUrl = `${window.location.origin}/competitions/poly/${contest.id}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Mind Stock Prediction',
          text: shareText,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleBackToContests = () => {
    navigate('/competitions?gameType=poly');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-6xl mx-auto">
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-4 w-full mb-8" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Skeleton className="h-64 w-full rounded-xl mb-6" />
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-64 w-full rounded-xl mb-4" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-6xl mx-auto text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Contest Not Found</h2>
              <p className="text-muted-foreground mb-6">{error || "Unable to load the contest details"}</p>
              <Button onClick={handleBackToContests}>
                Back to Contests
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <PolyContestHeader 
              contest={contest}
              onBack={handleBackToContests}
              onShare={handleShare}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <PolyContestChart
                  priceHistory={priceHistory}
                  timeRange={timeRange}
                  onTimeRangeChange={setTimeRange}
                />
                
                <PolyPredictionPool
                  yesPrice={contest.yes_price}
                  noPrice={contest.no_price}
                />
              </div>
              
              <div className="lg:col-span-1">
                <PolyBetPlacement
                  yesPrice={contest.yes_price}
                  noPrice={contest.no_price}
                  isSubmitting={isSubmitting}
                  onPlaceBet={handlePlaceBet}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolyContestDetail;
