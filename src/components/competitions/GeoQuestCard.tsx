import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import MorphCard from "@/components/ui/MorphCard";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, Trophy, Globe } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { checkContestJoined, getContestParticipantsCount, joinGeoQuestContest } from "@/services/geoQuestService";

interface GeoQuestContest {
  id: string;
  title: string;
  theme: string;
  start_time: string;
  end_time: string;
  entry_fee: number;
  prize_pool: number;
  status: "active" | "upcoming" | "completed";
  image_url: string;
}

interface GeoQuestCardProps {
  contest: GeoQuestContest;
  onContestJoined?: () => void;
}

const GeoQuestCard = ({ contest, onContestJoined }: GeoQuestCardProps) => {
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [participants, setParticipants] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>("");
  
  // Check authentication status and if user has joined the contest
  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
      
      if (authStatus) {
        // Check if user has joined this contest
        const { joined, error } = await checkContestJoined(contest.id);
        if (error) {
          console.error("Error checking join status:", error);
        } else {
          setHasJoined(joined);
        }

        // Get participant count
        const { count, error: countError } = await getContestParticipantsCount(contest.id);
        if (countError) {
          console.error("Error getting participant count:", countError);
        } else {
          setParticipants(count);
        }
      }
    };

    checkAuth();
  }, [contest.id]);

  // Update time left every minute
  useEffect(() => {
    const calculateTimeLeft = () => {
      if (contest.status === "active") {
        setTimeLeft(formatDistanceToNow(new Date(contest.end_time), { addSuffix: true }));
      } else if (contest.status === "upcoming") {
        setTimeLeft(formatDistanceToNow(new Date(contest.start_time), { addSuffix: true }));
      } else {
        setTimeLeft("Contest ended");
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [contest.status, contest.end_time, contest.start_time]);
  
  // Join contest handler
  const handleJoinContest = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to join this contest");
      navigate("/login");
      return;
    }
    
    setIsJoining(true);
    
    try {
      const { success, message, error } = await joinGeoQuestContest(contest.id);
      
      if (error) throw new Error(error);
      
      if (success) {
        toast.success(message || "Successfully joined contest");
        setHasJoined(true);
        if (onContestJoined) onContestJoined();
      } else {
        toast.error(message || "Failed to join contest");
      }
    } catch (error) {
      console.error("Error joining contest:", error);
      toast.error("Failed to join contest. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };
  
  // Play contest handler
  const handlePlayContest = () => {
    navigate(`/geoquest/${contest.id}`);
  };
  
  // View leaderboard handler
  const handleViewLeaderboard = () => {
    navigate(`/geoquest/${contest.id}/leaderboard`);
  };

  const getStatusBadgeVariant = () => {
    switch (contest.status) {
      case 'active': return "default";
      case 'upcoming': return "secondary";
      case 'completed': return "outline";
    }
  };

  const getActionButton = () => {
    // Handle completed contest
    if (contest.status === "completed") {
      return (
        <Button
          className="w-full bg-amber-500 hover:bg-amber-600"
          onClick={handleViewLeaderboard}
        >
          <Trophy className="mr-2 h-4 w-4" />
          View Leaderboard
        </Button>
      );
    }
    
    // Handle joined contests
    if (hasJoined) {
      // Separate handling for active and upcoming contests
      if (contest.status === "active") {
        return (
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handlePlayContest}
          >
            <Globe className="mr-2 h-4 w-4" />
            Play Now
          </Button>
        );
      } 
      
      if (contest.status === "upcoming") {
        return (
          <Button
            className="w-full"
            variant="outline"
            disabled
          >
            <Clock className="mr-2 h-4 w-4" />
            Waiting to Start
          </Button>
        );
      }
    }
    
    // Handle join contest for non-completed contests
    return (
      <Button
        className="w-full"
        onClick={handleJoinContest}
        disabled={isJoining}
      >
        {isJoining ? (
          "Joining..."
        ) : (
          <>Join for ₹{contest.entry_fee}</>
        )}
      </Button>
    );
  };
  
  return (
    <MorphCard className="p-5 flex flex-col h-full overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Contest Image and Badges */}
      <div className="relative w-full h-40 mb-4 overflow-hidden rounded-md">
        <img 
          src={contest.image_url || "https://images.unsplash.com/photo-1516302350523-4c29d47b89e9"} 
          alt={contest.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant={getStatusBadgeVariant()} className="capitalize">
            {contest.status}
          </Badge>
          <Badge variant="outline" className="bg-white/80">
            {contest.theme}
          </Badge>
        </div>
      </div>
      
      {/* Contest Title and Details */}
      <h3 className="text-xl font-bold mb-2 line-clamp-2">{contest.title}</h3>
      
      {/* Contest Stats */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Trophy className="h-4 w-4 mr-1.5 text-amber-500" />
            Prize Pool
          </div>
          <div className="font-semibold">₹{contest.prize_pool.toLocaleString()}</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1.5 text-blue-500" />
            Participants
          </div>
          <div className="font-medium">{participants}</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1.5 text-green-500" />
            {contest.status === "active" ? "Ends" : contest.status === "upcoming" ? "Starts" : "Ended"}
          </div>
          <div className="font-medium">{timeLeft}</div>
        </div>
      </div>

      {/* Progress Indicator for time left */}
      {contest.status === "active" && (
        <div className="mb-4">
          <Progress 
            value={calculateProgress(contest.start_time, contest.end_time)} 
            className="h-1.5"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{format(new Date(contest.start_time), "MMM d")}</span>
            <span>{format(new Date(contest.end_time), "MMM d")}</span>
          </div>
        </div>
      )}
      
      {/* Action Button */}
      <div className="mt-auto">
        {getActionButton()}
      </div>
    </MorphCard>
  );
};

// Helper function to calculate progress percentage
function calculateProgress(startTime: string, endTime: string): number {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  
  if (now <= start) return 0;
  if (now >= end) return 100;
  
  const total = end - start;
  const elapsed = now - start;
  
  return Math.round((elapsed / total) * 100);
}

export default GeoQuestCard;
