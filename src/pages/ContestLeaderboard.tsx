
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MorphCard from "@/components/ui/MorphCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Medal, Award, Star, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { fetchContestLeaderboard, LeaderboardEntry } from "@/services/leaderboardService";

interface ContestDetails {
  id: string;
  name: string;
  status: "open" | "closed" | "completed";
  description: string;
  startDate: string;
  endDate: string;
  participantCount: number;
  prizePool: number;
  type: "custom" | "predefined";
  entryFee?: number;
}

const ContestLeaderboard = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const [participants, setParticipants] = useState<LeaderboardEntry[]>([]);
  const [contestDetails, setContestDetails] = useState<ContestDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock API call to fetch contest details
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Mock contest details
        const mockContestDetails: ContestDetails = {
          id: contestId || "contest-1",
          name: contestId === "comp-2" ? "Banking Sector Prediction" : 
                contestId === "comp-3" ? "Pharma Giants Showdown" : 
                "Tech Stocks Challenge Q2 2023",
          status: "completed",
          description: contestId === "comp-2" ? 
            "Will banking stocks go up or down? See who predicted correctly." : 
            contestId === "comp-3" ?
            "Select pharmaceutical stocks that will outperform the market" :
            "Compete with the best traders in predicting tech stock movements",
          startDate: "2023-04-01",
          endDate: "2023-06-30",
          participantCount: 128,
          prizePool: contestId === "comp-2" ? 35000 : 
                     contestId === "comp-3" ? 50000 : 25000,
          type: contestId === "comp-2" ? "predefined" : "custom",
          entryFee: contestId === "comp-2" ? 50 : 
                    contestId === "comp-3" ? 200 : 100
        };
        
        setContestDetails(mockContestDetails);
        
        // Fetch leaderboard data from our service
        const leaderboardData = await fetchContestLeaderboard(contestId || 1);
        setParticipants(leaderboardData);
      } catch (error) {
        console.error("Error fetching contest data:", error);
        toast.error("Failed to load contest data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [contestId]);
  
  const renderRankIndicator = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-gold-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    if (rank <= 10) return <Star className="h-5 w-5 text-blue-500" />;
    return <span>{rank}</span>;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const calculateProfit = (avg: number, contestDetails: ContestDetails | null) => {
    if (!contestDetails || !contestDetails.entryFee) return 0;
    // Assuming a standard investment amount of 10,000 for simplicity
    const investmentAmount = 10000;
    return (investmentAmount * avg) / 100;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          ) : (
            <>
              {contestDetails && (
                <div className="max-w-4xl mx-auto text-center mb-8">
                  <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-secondary">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      contestDetails.status === "open" ? "bg-green-100 text-green-800" :
                      contestDetails.status === "closed" ? "bg-amber-100 text-amber-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {contestDetails.status.charAt(0).toUpperCase() + contestDetails.status.slice(1)}
                    </span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      contestDetails.type === "custom" ? "bg-mint-100 text-mint-800" : "bg-gold-100 text-gold-800"
                    }`}>
                      {contestDetails.type === "custom" ? "Custom Basket" : "Predefined Basket"}
                    </span>
                  </div>
                  
                  <h1 className="font-display text-4xl font-bold mb-4">{contestDetails.name}</h1>
                  
                  <p className="text-muted-foreground text-lg mb-4">
                    {contestDetails.description}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-6 mb-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">
                        {formatDate(contestDetails.startDate)} - {formatDate(contestDetails.endDate)}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Participants</p>
                      <p className="font-medium flex items-center justify-center">
                        <Users className="w-4 h-4 mr-1" />
                        {contestDetails.participantCount}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                      <p className="font-medium">₹{contestDetails.prizePool.toLocaleString()}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Entry Fee</p>
                      <p className="font-medium">₹{contestDetails.entryFee?.toLocaleString() || "Free"}</p>
                    </div>
                  </div>
                  
                  <Link to={`/competitions/${contestId}`}>
                    <Button variant="outline" className="mb-8">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Contest
                    </Button>
                  </Link>
                </div>
              )}
              
              <MorphCard className="overflow-hidden mb-6">
                <div className="p-4 bg-secondary/70 flex flex-col sm:flex-row justify-between items-center">
                  <h2 className="text-2xl font-bold flex items-center mb-2 sm:mb-0">
                    <Trophy className="h-6 w-6 mr-2 text-gold-500" />
                    Top 10 Performers
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {participants.length} participants ranked by performance
                  </div>
                </div>
                
                {/* Desktop Table Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 px-6 bg-secondary/30 text-sm font-semibold">
                  <div className="col-span-1 text-center">Rank</div>
                  <div className="col-span-3">User ID</div>
                  <div className="col-span-2 text-right">Return %</div>
                  <div className="col-span-3 text-right">Bucket</div>
                  <div className="col-span-3 text-right">Prize Money (₹)</div>
                </div>
                
                {/* Table Content */}
                <div className="divide-y">
                  {participants.slice(0, 10).map((participant) => (
                    <div
                      key={participant.UserId}
                      className={`grid grid-cols-2 md:grid-cols-12 gap-4 p-4 md:px-6 transition-colors ${
                        participant.Rank <= 3 ? "bg-secondary/20" : "hover:bg-secondary/10"
                      }`}
                    >
                      {/* Rank */}
                      <div className="col-span-1 flex justify-center items-center font-bold">
                        {renderRankIndicator(participant.Rank)}
                      </div>
                      
                      {/* User ID */}
                      <div className="col-span-1 md:col-span-3 flex items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">User {participant.UserId}</span>
                        </div>
                      </div>
                      
                      {/* Return % (mobile) */}
                      <div className="col-span-1 md:hidden text-right">
                        <div className="text-xs text-muted-foreground">Return</div>
                        <div className="font-semibold text-green-600">
                          +{participant.Avg.toFixed(2)}%
                        </div>
                      </div>
                      
                      {/* Return % (desktop) */}
                      <div className="hidden md:block md:col-span-2 text-right self-center">
                        <div className="font-semibold text-green-600">
                          +{participant.Avg.toFixed(2)}%
                        </div>
                      </div>
                      
                      {/* Bucket (desktop) */}
                      <div className="hidden md:block md:col-span-3 text-right self-center">
                        <div className="text-xs text-muted-foreground truncate">
                          {participant.Bucket.join(", ")}
                        </div>
                      </div>
                      
                      {/* Prize Money (desktop) */}
                      <div className="hidden md:block md:col-span-3 text-right self-center">
                        <div className="font-semibold text-gold-700">
                          ₹{participant.Prize.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MorphCard>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContestLeaderboard;
