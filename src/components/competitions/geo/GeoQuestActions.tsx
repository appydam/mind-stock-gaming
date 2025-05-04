
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trophy, Globe, Clock } from 'lucide-react';

interface GeoQuestActionsProps {
  status: "active" | "upcoming" | "completed";
  hasJoined: boolean;
  isJoining: boolean;
  entryFee: number;
  onJoin: () => void;
  onPlay: () => void;
  onViewLeaderboard: () => void;
}

const GeoQuestActions = ({ 
  status, 
  hasJoined, 
  isJoining,
  entryFee,
  onJoin, 
  onPlay, 
  onViewLeaderboard 
}: GeoQuestActionsProps) => {
  // Handle completed contest
  if (status === "completed") {
    return (
      <Button
        className="w-full bg-amber-500 hover:bg-amber-600"
        onClick={onViewLeaderboard}
      >
        <Trophy className="mr-2 h-4 w-4" />
        View Leaderboard
      </Button>
    );
  }
  
  // Handle joined contests
  if (hasJoined) {
    // Separate handling for active and upcoming contests
    if (status === "active") {
      return (
        <Button
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={onPlay}
        >
          <Globe className="mr-2 h-4 w-4" />
          Play Now
        </Button>
      );
    } 
    
    if (status === "upcoming") {
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
      onClick={onJoin}
      disabled={isJoining}
    >
      {isJoining ? (
        "Joining..."
      ) : (
        <>Join for ₹{entryFee}</>
      )}
    </Button>
  );
};

export default GeoQuestActions;
