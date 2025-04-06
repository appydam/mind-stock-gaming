
import MorphCard from "@/components/ui/MorphCard";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Coins, Info } from "lucide-react";

interface VirtualBalanceCardProps {
  virtualBalance: number;
}

const VirtualBalanceCard = ({ virtualBalance }: VirtualBalanceCardProps) => {
  return (
    <MorphCard className="p-4 bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Coins className="h-5 w-5 mr-2 text-amber-500" />
          <h3 className="text-sm font-medium">Virtual Balance</h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your virtual balance for participating in equity contests</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="text-3xl font-bold text-amber-600">₹{virtualBalance.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground mt-2">
        Use this virtual balance to participate in equity contests without using real money
      </p>
    </MorphCard>
  );
};

export default VirtualBalanceCard;
