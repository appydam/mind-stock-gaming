
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Trophy, ArrowRight, TrendingUp, Bitcoin, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CompetitionProps {
  id: string;
  name: string;
  description: string;
  entryFee: number;
  maxParticipants: number;
  currentParticipants: number;
  status: "open" | "closed" | "upcoming";
  prizePool: number;
  deadline: string;
  type: "custom" | "predefined" | "opinion";
  gameType: "equity" | "crypto" | "opinion";
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
  type,
  gameType
}: CompetitionProps) => {
  const percentFilled = (currentParticipants / maxParticipants) * 100;
  const isExpired = new Date(deadline) < new Date();
  const remainingTime = new Date(deadline).getTime() - new Date().getTime();
  const remainingHours = Math.max(0, Math.floor(remainingTime / (1000 * 60 * 60)));
  const remainingDays = Math.floor(remainingHours / 24);
  
  const statusDisplay = isExpired ? "closed" : status;
  
  // Determine game type link
  const getGameLink = () => {
    if (gameType === "opinion") {
      return `/opinion-trading?id=${id}`;
    } else if (gameType === "crypto") {
      return type === "custom" ? `/crypto-basket?id=${id}` : `/predefined-basket?id=${id}&type=crypto`;
    } else {
      return type === "custom" ? `/custom-basket?id=${id}` : `/predefined-basket?id=${id}`;
    }
  };

  const renderGameTypeIcon = () => {
    switch (gameType) {
      case "crypto":
        return <Bitcoin className="h-4 w-4 text-gold-500" />;
      case "opinion":
        return <MessageSquare className="h-4 w-4 text-mint-600" />;
      default:
        return <TrendingUp className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4 bg-secondary/30">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Badge
              variant={statusDisplay === "open" ? "default" : "secondary"}
              className="mb-2"
            >
              {statusDisplay === "open" ? "Open" : "Closed"}
            </Badge>
            
            <div className="flex items-center gap-2 mb-1">
              {renderGameTypeIcon()}
              <Badge variant="outline" className="capitalize">
                {gameType}
                {gameType !== "opinion" && ` - ${type === "custom" ? "Custom" : "Predefined"}`}
              </Badge>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Entry Fee</p>
            <p className="font-bold">₹{entryFee}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-medium text-lg mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{currentParticipants}/{maxParticipants}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-gold-500" />
            <span className="text-sm font-medium">₹{prizePool.toLocaleString()}</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Filling up</span>
            <span className="text-xs font-medium">{percentFilled.toFixed(0)}%</span>
          </div>
          <Progress value={percentFilled} className="h-1.5" />
        </div>
      </CardContent>
      
      <CardFooter 
        className={cn(
          "p-4 bg-secondary/20 flex justify-between items-center",
          statusDisplay !== "open" && "bg-secondary/40"
        )}
      >
        <div className="flex items-center gap-1">
          <Clock className={cn(
            "h-4 w-4",
            remainingHours <= 24 && statusDisplay === "open" ? "text-destructive" : "text-muted-foreground"
          )} />
          <span className={cn(
            "text-xs",
            remainingHours <= 24 && statusDisplay === "open" ? "text-destructive font-medium" : "text-muted-foreground"
          )}>
            {statusDisplay === "open" 
              ? remainingDays > 0 
                ? `${remainingDays}d ${remainingHours % 24}h left` 
                : `${remainingHours}h left`
              : "Competition closed"
            }
          </span>
        </div>
        
        <Link to={getGameLink()}>
          <Button 
            variant={statusDisplay === "open" ? "default" : "secondary"} 
            size="sm"
            disabled={statusDisplay !== "open"}
          >
            {statusDisplay === "open" ? "Join Now" : "View Details"}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CompetitionCard;
