
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight, Users, Trophy, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface CompetitionProps {
  id: string;
  name: string;
  description: string;
  entryFee: number;
  maxParticipants: number;
  currentParticipants: number;
  status: "open" | "closed" | "completed";
  prizePool: number;
  deadline: string;
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
  type,
}: CompetitionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const percentageFilled = (currentParticipants / maxParticipants) * 100;
  const timeLeft = formatDistanceToNow(new Date(deadline), { addSuffix: true });
  const isPositive = timeLeft.includes("in") && !timeLeft.includes("ago");
  
  const statusVariants = {
    open: "bg-green-500/10 text-green-600 border-green-600/20",
    closed: "bg-amber-500/10 text-amber-600 border-amber-600/20",
    completed: "bg-blue-500/10 text-blue-600 border-blue-600/20",
  };

  const handleJoinClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (type === "custom") {
        navigate(`/custom-basket?id=${id}`);
      } else {
        navigate(`/predefined-basket?id=${id}`);
      }
    }, 500);
  };

  if (isLoading) {
    return (
      <Card className="overflow-hidden transition-all animate-pulse">
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-2 w-full mb-6" />
          <div className="flex justify-between mb-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge 
            variant="outline" 
            className={cn(
              "ml-2 capitalize border", 
              statusVariants[status]
            )}
          >
            {status}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
            <span className={cn(
              "text-sm", 
              isPositive ? "text-green-600" : "text-red-600"
            )}>
              {timeLeft}
            </span>
          </div>
          <div className="flex items-center">
            <Trophy className="w-4 h-4 mr-1 text-gold-500" />
            <span className="text-sm font-medium">
              ₹{prizePool.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">Participants</span>
            </span>
            <span className="font-medium">
              {currentParticipants}/{maxParticipants}
            </span>
          </div>
          <Progress value={percentageFilled} className="h-2" />
        </div>

        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-sm text-muted-foreground">Entry Fee</span>
            <p className="font-medium">
              {entryFee > 0 ? `₹${entryFee}` : "Free"}
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm text-muted-foreground">Type</span>
            <p className="font-medium capitalize">
              {type === "custom" ? "Custom Basket" : "Predefined Basket"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          disabled={status !== "open" || currentParticipants >= maxParticipants}
          onClick={handleJoinClick}
        >
          {status === "open" ? (
            currentParticipants >= maxParticipants ? "Fully Booked" : "Join Competition"
          ) : (
            status === "completed" ? "View Results" : "Competition Closed"
          )}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompetitionCard;
