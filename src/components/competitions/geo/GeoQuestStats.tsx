
import React from 'react';
import { Trophy, Users, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface GeoQuestStatsProps {
  prizePool: number;
  participants: number;
  startTime: string;
  endTime: string;
  status: "active" | "upcoming" | "completed";
}

const GeoQuestStats = ({ prizePool, participants, startTime, endTime, status }: GeoQuestStatsProps) => {
  const getTimeLeft = () => {
    if (status === "active") {
      return formatDistanceToNow(new Date(endTime), { addSuffix: true });
    } else if (status === "upcoming") {
      return formatDistanceToNow(new Date(startTime), { addSuffix: true });
    } else {
      return "Contest ended";
    }
  };
  
  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Trophy className="h-4 w-4 mr-1.5 text-amber-500" />
          Prize Pool
        </div>
        <div className="font-semibold">₹{prizePool.toLocaleString()}</div>
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
          {status === "active" ? "Ends" : status === "upcoming" ? "Starts" : "Ended"}
        </div>
        <div className="font-medium">{getTimeLeft()}</div>
      </div>
    </div>
  );
};

export default GeoQuestStats;
