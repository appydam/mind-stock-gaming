
import MorphCard from "@/components/ui/MorphCard";
import { TrendingUp, TrendingDown, Trophy, Calendar } from "lucide-react";

interface StatCardsProps {
  totalProfit: number;
  activeContestNumber: number;
  completedContestsNumber: number;
}

const StatCards = ({ totalProfit, activeContestNumber, completedContestsNumber }: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <MorphCard className="p-4">
        <h3 className="text-sm text-muted-foreground mb-1">Total P&L</h3>
        <div className="flex items-center">
          {totalProfit >= 0 ? (
            <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
          )}
          <span className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ₹{Math.abs(totalProfit).toFixed(2)}
          </span>
        </div>
      </MorphCard>

      <MorphCard className="p-4">
        <h3 className="text-sm text-muted-foreground mb-1">Active Contests</h3>
        <div className="flex items-center">
          <Trophy className="h-5 w-5 text-amber-500 mr-2" />
          <span className="text-2xl font-bold">{activeContestNumber}</span>
        </div>
      </MorphCard>

      <MorphCard className="p-4">
        <h3 className="text-sm text-muted-foreground mb-1">Completed Contests</h3>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-primary mr-2" />
          <span className="text-2xl font-bold">{completedContestsNumber}</span>
        </div>
      </MorphCard>
    </div>
  );
};

export default StatCards;
