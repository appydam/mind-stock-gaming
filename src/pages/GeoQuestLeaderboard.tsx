
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, ArrowLeft, Globe, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getGeoQuestLeaderboard, getGeoQuestContestDetails, GeoLeaderboardEntry, GeoQuestContest } from "@/services/geoQuestService";

const GeoQuestLeaderboard = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const navigate = useNavigate();
  
  const [leaderboard, setLeaderboard] = useState<GeoLeaderboardEntry[]>([]);
  const [contest, setContest] = useState<GeoQuestContest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userRank, setUserRank] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!contestId) return;
      
      setIsLoading(true);
      
      try {
        // Get current user ID
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setCurrentUserId(session.user.id);
        }
        
        // Fetch contest details
        const { contest, error: contestError } = await getGeoQuestContestDetails(contestId);
        
        if (contestError) throw contestError;
        if (!contest) throw new Error("Contest not found");
        
        setContest(contest);
        
        // Fetch leaderboard
        const { leaderboard: leaderboardData, error: leaderboardError } = await getGeoQuestLeaderboard(contestId);
        
        if (leaderboardError) throw new Error(leaderboardError);
        setLeaderboard(leaderboardData);
        
        // Find user's rank
        if (session?.user) {
          const userEntry = leaderboardData.find(entry => entry.user_id === session.user.id);
          if (userEntry) {
            setUserRank(userEntry.rank);
          }
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError(typeof error === 'string' ? error : "Failed to load leaderboard");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [contestId]);
  
  const getAvatarText = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };
  
  const getMedalColor = (rank: number) => {
    if (rank === 1) return "text-amber-500"; // Gold
    if (rank === 2) return "text-gray-400"; // Silver
    if (rank === 3) return "text-amber-700"; // Bronze
    return "";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-16 w-16 mb-4 mx-auto animate-spin text-blue-500" />
            <h2 className="text-2xl font-bold mb-2">Loading Leaderboard...</h2>
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
          <div className="container px-4 mx-auto max-w-2xl">
            <div className="bg-destructive/10 text-destructive p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Error Loading Leaderboard</h2>
              <p className="mb-6">{error || "Contest not found"}</p>
              <Button onClick={() => navigate("/competitions?gameType=geoquest")}>
                Back to Competitions
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
        <div className="container px-4 mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(`/competitions?gameType=geoquest`)}
              className="p-0 h-auto flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Competitions
            </Button>
            
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">{contest.theme}</span>
            </div>
          </div>
          
          {/* Contest info and leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contest info card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{contest.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Prize Pool</div>
                      <div className="text-2xl font-bold text-amber-500">₹{contest.prize_pool.toLocaleString()}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Status</div>
                      <div className="font-medium capitalize">{contest.status}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Total Participants</div>
                      <div className="font-medium">{leaderboard.length}</div>
                    </div>
                    
                    {userRank && (
                      <div className="pt-4 border-t">
                        <div className="text-sm text-muted-foreground mb-1">Your Rank</div>
                        <div className="flex items-center">
                          <div className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-lg">
                            #{userRank}
                          </div>
                          {userRank <= 3 && (
                            <div className={`ml-2 ${getMedalColor(userRank)}`}>
                              {userRank === 1 ? (
                                <Trophy className="h-5 w-5" />
                              ) : (
                                <Medal className="h-5 w-5" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => navigate(`/geoquest/${contestId}`)}
                    >
                      {contest.status === 'completed' ? 'View Contest Details' : 'Play Contest'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Leaderboard table */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {leaderboard.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No participants yet</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {/* Header */}
                      <div className="grid grid-cols-12 py-2 font-semibold text-sm text-muted-foreground">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-7">Player</div>
                        <div className="col-span-2 text-center">Score</div>
                        <div className="col-span-2 text-right">Prize</div>
                      </div>
                      
                      {/* Entries */}
                      {leaderboard.map((entry) => {
                        const isCurrentUser = entry.user_id === currentUserId;
                        const prizeAmount = entry.rank <= 3 ? (
                          contest.prize_pool * (entry.rank === 1 ? 0.5 : entry.rank === 2 ? 0.3 : 0.2)
                        ) : 0;
                        
                        return (
                          <div 
                            key={entry.user_id} 
                            className={`grid grid-cols-12 py-3 px-2 rounded-md ${
                              isCurrentUser ? "bg-blue-50" : (entry.rank % 2 === 0 ? "bg-gray-50" : "")
                            }`}
                          >
                            {/* Rank */}
                            <div className="col-span-1 flex justify-center items-center">
                              {entry.rank <= 3 ? (
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  entry.rank === 1 ? "bg-amber-500" : 
                                  entry.rank === 2 ? "bg-gray-400" : 
                                  "bg-amber-700"
                                } text-white font-semibold text-sm`}>
                                  {entry.rank}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">{entry.rank}</span>
                              )}
                            </div>
                            
                            {/* User */}
                            <div className="col-span-7 flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className={isCurrentUser ? "bg-blue-500 text-white" : undefined}>
                                  {getAvatarText(entry.username)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className={`font-medium ${isCurrentUser ? "text-blue-600" : ""}`}>
                                  {entry.username}
                                  {isCurrentUser && <span className="ml-2 text-xs text-blue-600">(You)</span>}
                                </div>
                              </div>
                            </div>
                            
                            {/* Score */}
                            <div className="col-span-2 flex items-center justify-center font-semibold">
                              {entry.score}/10
                            </div>
                            
                            {/* Prize */}
                            <div className="col-span-2 flex items-center justify-end font-medium">
                              {prizeAmount > 0 ? (
                                <span className="text-amber-600">₹{prizeAmount.toLocaleString()}</span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GeoQuestLeaderboard;
