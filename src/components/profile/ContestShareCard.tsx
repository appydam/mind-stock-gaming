
import MorphCard from "@/components/ui/MorphCard";
import { Trophy, TrendingUp, TrendingDown, Calendar, Award, MessageCircle } from "lucide-react";
import { ContestType } from "@/components/profile/data/mockProfileData";

interface ContestShareCardProps {
  contest: ContestType;
}

const ContestShareCard = ({ contest }: ContestShareCardProps) => {
  const isProfitable = contest.returns >= 0;
  const formattedReturn = Math.abs(contest.returns).toFixed(2);
  const formattedDate = new Date(contest.join_time).toLocaleDateString();
  
  return (
    <MorphCard className="p-5 overflow-hidden relative bg-white dark:bg-gray-800">
      {/* App branding */}
      <div className="absolute top-3 right-3 flex items-center">
        <span className="text-xs font-semibold text-muted-foreground">MindStock</span>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">{contest.contest_name}</h2>
        <div className="flex items-center text-muted-foreground text-sm">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          {formattedDate}
          {contest.gameType && (
            <span className="ml-2 px-1.5 py-0.5 bg-secondary/50 rounded-sm text-xs">
              {contest.gameType}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs mb-1">Performance</span>
          <div className="flex items-center">
            {isProfitable ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-lg font-bold ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
              {isProfitable ? '+' : '-'}{formattedReturn}%
            </span>
          </div>
        </div>
        
        {contest.gameType === "equity" ? (
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs mb-1">Rank</span>
            <div className="flex items-center">
              <Award className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-lg font-bold">
                {contest.rank}/{contest.totalParticipants || '?'}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs mb-1">Your Answer</span>
            <div className="flex items-center">
              <MessageCircle className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-lg font-bold">
                {contest.userAnswer || "N/A"}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {contest.tag && (
        <div className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-md mb-3">
          <p className="text-xs text-center">Category: <span className="font-medium">{contest.tag}</span></p>
        </div>
      )}
      
      <div className="text-center pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-muted-foreground">
          Join MindStock - The Mind Sport of Stock Trading
        </p>
      </div>
    </MorphCard>
  );
};

export default ContestShareCard;
