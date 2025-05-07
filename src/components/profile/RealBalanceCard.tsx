
import MorphCard from "@/components/ui/MorphCard";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Wallet, Info } from "lucide-react";

interface RealBalanceCardProps {
  realBalance: number;
}

const RealBalanceCard = ({ realBalance }: RealBalanceCardProps) => {
  return (
    <MorphCard className="p-4 bg-gradient-to-br from-green-50 to-green-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Wallet className="h-5 w-5 mr-2 text-green-500" />
          <h3 className="text-sm font-medium">Real Money Balance</h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your real money balance for participating in contests with actual money</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="text-3xl font-bold text-green-600">₹{realBalance.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground mt-2">
        Use this real money balance to participate in contests with actual money
      </p>
    </MorphCard>
  );
};

export default RealBalanceCard;
