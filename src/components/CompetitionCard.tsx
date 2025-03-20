
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Award, ArrowRight, BarChart3 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MorphCard from "./ui/MorphCard";

export interface CompetitionProps {
  id: string;
  name: string;
  description: string;
  entryFee: number;
  maxParticipants: number;
  currentParticipants: number;
  status: "open" | "closed" | "completed";
  prizePool: number;
  deadline: string; // ISO date string
  type: "custom" | "predefined";
}

const CompetitionCard = ({
  id,
  name,
  description,
  entryFee,
  maxParticipants,
  currentParticipants,
  status,
  prizePool,
  deadline,
  type
}: CompetitionProps) => {
  const participationPercentage = (currentParticipants / maxParticipants) * 100;
  const deadlineDate = new Date(deadline);
  const isOpen = status === "open";
  const isClosed = status === "closed" || status === "completed";

  // Format deadline as relative time
  const formatDeadline = () => {
    const now = new Date();
    const diff = deadlineDate.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} minutes left`;
    } else if (hours < 24) {
      return `${hours} hours left`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} days left`;
    }
  };

  return (
    <MorphCard
      className="flex flex-col h-full animate-fade-up"
      hoverEffect
      highlightBorder={participationPercentage > 75}
    >
      {/* Card Header */}
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${type === "custom"
            ? "bg-mint-100 text-mint-800"
            : "bg-gold-100 text-gold-800"
            }`}>
            {type === "custom" ? "Custom Basket" : "Predefined Basket"}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status === "open"
            ? "bg-green-100 text-green-800"
            : status === "closed"
              ? "bg-amber-100 text-amber-800"
              : "bg-gray-100 text-gray-800"
            }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
      </div>

      {/* Competition Details */}
      <div className="space-y-4 mb-6 flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{currentParticipants} of {maxParticipants} participants</span>
          </div>
          {isOpen && (
            <div className="text-sm font-medium text-primary">
              {formatDeadline()}
            </div>
          )}
        </div>

        <Progress value={participationPercentage} className="h-2" />

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Entry Fee</span>
            <span className="font-semibold">{entryFee > 0 ? `₹${entryFee}` : "Free"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Prize Pool</span>
            <span className="font-semibold">₹{prizePool.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Deadline</span>
            <span className="font-semibold">{deadlineDate.toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Status</span>
            <span className="font-semibold">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto space-y-2">
        {/* <Link to={
          type === "custom"
            ? `/custom-basket?id=${id}`
            : type === "predefined"
              ? "/predefined-basket"
              : isOpen
                ? `/game/${id}`
                : `/competitions/${id}`
        }> */}
        <Link
          to={
            type === "custom" && isOpen
              ? `/custom-basket?id=${id}` // Pass the id as a query parameter
              : type === "predefined" && isOpen
                ? `/predefined-basket?id=${id}`
                : `/competitions/${id}` // Fallback for closed/completed competitions
          }
        >
          <Button
            className="w-full"
            variant={isOpen ? "default" : "outline"}
            disabled={!isOpen}
          >
            {isOpen ? "Join Competition" : "View Details"}
            {/* id = {id} */}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Link to={isClosed ? `/contest-leaderboard/${id}` : "#"}>
                  <Button
                    className="w-full"
                    variant={isClosed ? "secondary" : "outline"}
                    disabled={!isClosed}
                    style={{
                      backgroundColor: isClosed ? "#4CAF50" : "#E6FFE6",
                      opacity: isClosed ? 1 : 0.8,
                      cursor: isClosed ? "pointer" : "not-allowed"
                    }}
                  >
                    View Leaderboard
                    <BarChart3 className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TooltipTrigger>
            {!isClosed && (
              <TooltipContent>
                <p>Available when contest ends</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </MorphCard>
  );
};

export default CompetitionCard;
