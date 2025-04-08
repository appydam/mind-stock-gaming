import { Badge } from "@/components/ui/badge";
import MorphCard from "@/components/ui/MorphCard";
import { Button } from "@/components/ui/button";
import { Calendar, Users, CheckCircle, XCircle } from "lucide-react";
import { OpinionEvent } from "@/types/competitions"; // Import the type

// Remove local interface definition

interface OpinionEventCardProps {
  event: OpinionEvent;
}

const OpinionEventCard = ({ event }: OpinionEventCardProps) => {
  const totalVotes = event.currentPool.yes + event.currentPool.no;
  // Assuming pool amounts represent investment, not direct vote count.
  // Let's keep the display logic simple for now, maybe adjust later if needed.
  const yesPercentage = totalVotes > 0 ? (event.currentPool.yes / totalVotes) * 100 : 50;

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

      <div className="grid grid-cols-1 gap-3 mt-auto"> {/* Use mt-auto to push content down */}
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
            <span className="text-primary font-medium">Yes: {event.currentPool.yes.toLocaleString()}</span>
            <span className="text-destructive font-medium">No: {event.currentPool.no.toLocaleString()}</span>
          </div>
          
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${yesPercentage}%` }}
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
              // Add onClick handler later
            >
              <CheckCircle className="h-3 w-3" />
              Yes
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center gap-1 border-destructive text-destructive hover:bg-destructive/10"
              // Add onClick handler later
            >
              <XCircle className="h-3 w-3" />
              No
            </Button>
          </div>
        </div>
      </div>
    </MorphCard>
  );
};

export default OpinionEventCard;
// Remove type export
