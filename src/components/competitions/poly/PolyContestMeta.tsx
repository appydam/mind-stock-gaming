
import React from "react";
import { Calendar, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PolyContestMetaProps {
  endTime: string;
  participants: number;
}

const PolyContestMeta = ({ endTime, participants }: PolyContestMetaProps) => {
  const timeLeft = formatDistanceToNow(new Date(endTime), { addSuffix: true });
  
  return (
    <div className="flex items-center justify-between text-sm flex-wrap gap-y-1">
      <div className="flex items-center">
        <Calendar className="h-4 w-4 text-amber-500 mr-1 flex-shrink-0" />
        <span className="text-muted-foreground">Closes {timeLeft}</span>
      </div>
      
      <div className="flex items-center">
        <Users className="h-4 w-4 text-amber-500 mr-1 flex-shrink-0" />
        <span className="text-muted-foreground">{participants} participants</span>
      </div>
    </div>
  );
};

export default PolyContestMeta;
