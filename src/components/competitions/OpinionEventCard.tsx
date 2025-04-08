
import { Badge } from "@/components/ui/badge";
import MorphCard from "@/components/ui/MorphCard";
import { Button } from "@/components/ui/button";
import { Calendar, Users, CheckCircle, XCircle } from "lucide-react";
import { OpinionEvent } from "@/types/competitions";
import { BACKEND_HOST } from "@/constants/config";
import { toast } from "sonner";
import { useState } from "react";

interface OpinionEventCardProps {
  event: OpinionEvent;
  isAuthenticated?: boolean;
}

const OpinionEventCard = ({ event, isAuthenticated = false }: OpinionEventCardProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  
  const handlePlaceTrade = async (answer: boolean) => {
    if (!isAuthenticated) {
      toast.error("Please login to place a trade");
      return;
    }
    
    setIsSubmitting(true);
    setUserAnswer(answer ? "yes" : "no");
    
    try {
      const contestId = parseInt(event.id);
      if (isNaN(contestId)) {
        throw new Error("Invalid contest ID");
      }
      
      const response = await fetch(`${BACKEND_HOST}EnterOpinionCompetitions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({
          contest_id: contestId,
          answer: answer
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.code === 200) {
        toast.success(`Your prediction has been placed: ${answer ? "Yes" : "No"}`);
      } else {
        toast.error(data.message || "Failed to place trade");
        setUserAnswer(null);
      }
    } catch (error) {
      console.error("Error placing trade:", error);
      toast.error("Failed to place trade. Please try again.");
      setUserAnswer(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MorphCard className="p-4 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="outline">{event.category}</Badge>
            <Badge variant={event.status === "active" ? "default" : "secondary"}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mb-1">{event.question}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-auto">
        <div className="flex items-center justify-between text-sm flex-wrap gap-y-1">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-primary mr-1 flex-shrink-0" />
            <span>Closes: {new Date(event.deadline).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 text-primary mr-1 flex-shrink-0" />
            <span>{event.participants} participants</span>
          </div>
        </div>
        
        <div className="mt-1">
          <p className="text-xs font-medium mb-1">Current Distribution</p>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-primary font-medium">Yes: {event.currentPool.yes} people</span>
            <span className="text-destructive font-medium">No: {event.currentPool.no} people</span>
          </div>
          
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${event.participants > 0 ? (event.currentPool.yes / event.participants) * 100 : 50}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Entry Fee</p>
            <p className="font-medium">₹{event.minTradeAmount}</p>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 border-primary text-primary hover:bg-primary/10"
              onClick={() => handlePlaceTrade(true)}
              disabled={isSubmitting || userAnswer !== null}
            >
              {isSubmitting && userAnswer === "yes" ? 
                <span className="animate-spin">●</span> : 
                <CheckCircle className="h-3 w-3" />
              }
              Yes
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center gap-1 border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => handlePlaceTrade(false)}
              disabled={isSubmitting || userAnswer !== null}
            >
              {isSubmitting && userAnswer === "no" ? 
                <span className="animate-spin">●</span> : 
                <XCircle className="h-3 w-3" />
              }
              No
            </Button>
          </div>
        </div>
      </div>
    </MorphCard>
  );
};

export default OpinionEventCard;
