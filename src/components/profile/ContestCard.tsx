
import { format } from 'date-fns';
import MorphCard from "@/components/ui/MorphCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, CalendarIcon, Share2 } from "lucide-react";
import { ContestType } from "./data/mockProfileData";

interface ContestCardProps {
  contest: ContestType;
  onEditStocks: (contest: ContestType) => void;
  onShare: (contest: ContestType) => void;
}

const ContestCard = ({ contest, onEditStocks, onShare }: ContestCardProps) => {
  const isProfitable = contest.returns >= 0;
  const joinDate = new Date(contest.join_time);
  
  return (
    <MorphCard className="p-4">
      {/* Header with contest name and date */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{contest.contest_name}</h3>
          <div className="flex items-center text-muted-foreground text-xs">
            <CalendarIcon className="h-3 w-3 mr-1" />
            {format(joinDate, "MMMM d, yyyy")}
            {contest.gameType && (
              <Badge variant="outline" className="ml-2 text-xs">
                {contest.gameType}
              </Badge>
            )}
          </div>
        </div>
        <Badge variant={contest.status === "active" ? "default" : "secondary"} className="uppercase text-xs">
          {contest.status}
        </Badge>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-secondary/30 p-2 rounded-md">
          <p className="text-xs text-muted-foreground mb-1">Entry Fee</p>
          <p className="font-semibold">₹{contest.entry_fee}</p>
        </div>
        
        <div className="bg-secondary/30 p-2 rounded-md">
          <p className="text-xs text-muted-foreground mb-1">Returns</p>
          <div className="flex items-center">
            {isProfitable ? (
              <TrendingUp className="h-3.5 w-3.5 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-500 mr-1" />
            )}
            <p className={`font-semibold ${isProfitable ? "text-green-500" : "text-red-500"}`}>
              {isProfitable ? "+" : ""}{contest.returns.toFixed(2)}%
            </p>
          </div>
        </div>
        
        <div className="bg-secondary/30 p-2 rounded-md">
          <p className="text-xs text-muted-foreground mb-1">Rank</p>
          <p className="font-semibold">{contest.rank || "-"}/{contest.totalParticipants || "-"}</p>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between items-center">
        {contest.status === "active" ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEditStocks(contest)}
            className="text-xs"
          >
            Edit Stocks
          </Button>
        ) : (
          <div className="text-sm text-muted-foreground">Contest completed</div>
        )}
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onShare(contest)}
          className="text-xs"
        >
          <Share2 className="h-3.5 w-3.5 mr-1" />
          Share
        </Button>
      </div>
    </MorphCard>
  );
};

export default ContestCard;
