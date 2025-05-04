
import React, { useState, useEffect } from "react";
import MorphCard from "@/components/ui/MorphCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { checkContestJoined, getContestParticipantsCount, joinGeoQuestContest } from "@/services/geoQuestService";
import GeoQuestImage from "./GeoQuestImage";
import GeoQuestStats from "./GeoQuestStats";
import GeoQuestProgress from "./GeoQuestProgress";
import GeoQuestActions from "./GeoQuestActions";

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

  return (
    <MorphCard className="p-5 flex flex-col h-full overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Contest Image and Badges */}
      <GeoQuestImage 
        imageUrl={contest.image_url} 
        title={contest.title} 
        status={contest.status} 
        theme={contest.theme} 
      />
      
      {/* Contest Title */}
      <h3 className="text-xl font-bold mb-2 line-clamp-2">{contest.title}</h3>
      
      {/* Contest Stats */}
      <GeoQuestStats 
        prizePool={contest.prize_pool}
        participants={participants}
        startTime={contest.start_time}
        endTime={contest.end_time}
        status={contest.status}
      />

      {/* Progress Indicator for time left */}
      <GeoQuestProgress 
        startTime={contest.start_time}
        endTime={contest.end_time}
        status={contest.status}
      />
      
      {/* Action Button */}
      <div className="mt-auto">
        <GeoQuestActions
          status={contest.status}
          hasJoined={hasJoined}
          isJoining={isJoining}
          entryFee={contest.entry_fee}
          onJoin={handleJoinContest}
          onPlay={handlePlayContest}
          onViewLeaderboard={handleViewLeaderboard}
        />
      </div>
    </MorphCard>
  );
};

export default GeoQuestCard;
