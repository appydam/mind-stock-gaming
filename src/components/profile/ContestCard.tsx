
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MorphCard from "@/components/ui/MorphCard";
import { Edit, TrendingUp, MessageSquare } from "lucide-react";
import { ContestType } from "@/data/mockProfileData";

interface ContestCardProps {
  contest: ContestType;
  onEditStocks: (contest: ContestType) => void;
}

const ContestCard = ({ contest, onEditStocks }: ContestCardProps) => {
  const isOpinionContest = contest.gameType === "opinion";

  return (
    <MorphCard key={contest.uniqueKey || `contest-${contest.contest_id}`} className="p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isOpinionContest ? (
            <MessageSquare className="h-4 w-4 text-amber-500" />
          ) : (
            <TrendingUp className="h-4 w-4 text-blue-500" />
          )}
          <h3 className="font-medium">{contest.contest_name}</h3>
        </div>
        <div className="flex items-center gap-2">
          {contest.status === 'active' && !isOpinionContest && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-blue-500 border-blue-500 hover:bg-blue-50"
              onClick={() => onEditStocks(contest)}
            >
              <Edit className="h-3.5 w-3.5" />
              Edit Stocks
            </Button>
          )}
          <Badge variant={contest.status === 'active' ? 'secondary' : 'outline'}>
            {contest.status === 'active' ? 'In Progress' : 'Completed'}
          </Badge>
          {isOpinionContest && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Opinion
            </Badge>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-3">
        Joined: {new Date(contest.join_time).toLocaleDateString()}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {contest.stocks_in_basket.map((stock) => (
          <Badge key={stock} variant="outline" className="bg-background">{stock}</Badge>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Entry Fee</p>
          <p className="font-medium">₹{contest.entry_fee}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Return</p>
          <p className={`font-medium ${contest.returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {contest.returns >= 0 ? '+' : ''}{contest.returns.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Rank</p>
          <p className="font-medium">
            {contest.rank > 0 ? `${contest.rank}` : 'N/A'}
            {contest.totalParticipants > 0 ? ` / ${contest.totalParticipants}` : ''}
          </p>
        </div>
      </div>
    </MorphCard>
  );
};

export default ContestCard;
