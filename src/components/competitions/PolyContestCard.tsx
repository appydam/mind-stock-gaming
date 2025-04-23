import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import MorphCard from "@/components/ui/MorphCard";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Share2, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PolyContest } from "@/types/competitions";
import { formatDistanceToNow } from "date-fns";

interface PolyContestCardProps {
  contest: PolyContest;
  onBetPlaced?: () => void;
}

const PolyContestCard = ({ contest, onBetPlaced }: PolyContestCardProps) => {
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [shareTooltip, setShareTooltip] = useState<boolean>(false);
  
  const handlePlaceBet = async () => {
    if (selectedOutcome === null) {
      toast.error("Please select Yes or No before placing your bet.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if user is signed in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to place a bet.");
        setIsSubmitting(false);
        return;
      }

      // Default bet amount - in a full implementation this would be user-selected
      const betAmount = 100;

      // Insert to poly_bets table
      const { error } = await supabase
        .from("poly_bets")
        .insert({
          user_id: user.id,
          contest_id: contest.id,
          prediction: selectedOutcome,
          coins: betAmount,
          price: selectedOutcome === "yes" ? contest.yes_price : contest.no_price,
          potential_payout:
            selectedOutcome === "yes"
              ? betAmount / contest.yes_price
              : betAmount / contest.no_price,
        });

      if (error) {
        console.error("Error placing bet:", error);
        toast.error("Failed to place your bet. Please try again.");
        setIsSubmitting(false);
        return;
      }

      toast.success(`You've successfully placed a ${selectedOutcome.toUpperCase()} bet on this contest.`);

      // Reset selection and call callback if provided
      setTimeout(() => {
        setSelectedOutcome(null);
        if (onBetPlaced) {
          onBetPlaced();
        }
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error placing bet:", error);
      toast.error("Failed to place your bet. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    const shareText = `I'm predicting "${contest.title}" on Mind Stock. Join me!`;
    const shareUrl = `${window.location.origin}/competitions?gameType=poly&id=${contest.id}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Mind Stock Prediction',
          text: shareText,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setShareTooltip(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setShareTooltip(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const timeLeft = formatDistanceToNow(new Date(contest.end_time), { addSuffix: true });
  const activeClass = "bg-gradient-to-r from-amber-500 to-amber-400 text-white border-none";

  return (
    <MorphCard className="p-4 flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-md group">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="outline" className="bg-white/80">
              {contest.category}
            </Badge>
            <Badge 
              variant={contest.status === "active" ? "default" : "secondary"}
              className={contest.status === "active" ? "bg-green-600" : ""}
            >
              {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mb-2 leading-tight">{contest.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{contest.description}</p>
        </div>
      </div>

      {/* Price Visualization */}
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium mb-1">
          <span className="flex items-center gap-1 text-green-600">
            <TrendingUp className="h-3.5 w-3.5" />
            Yes: ₹{contest.yes_price.toFixed(2)}
          </span>
          <span className="flex items-center gap-1 text-red-600">
            <TrendingDown className="h-3.5 w-3.5" />
            No: ₹{contest.no_price.toFixed(2)}
          </span>
        </div>
        
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300" 
            style={{ width: `${contest.yes_price * 100}%` }}
          />
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-1 gap-3 mt-auto"> 
        <div className="flex items-center justify-between text-sm flex-wrap gap-y-1">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-amber-500 mr-1 flex-shrink-0" />
            <span className="text-muted-foreground">Closes {timeLeft}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 text-amber-500 mr-1 flex-shrink-0" />
            <span className="text-muted-foreground">{contest.participants} participants</span>
          </div>
        </div>

        {/* Betting Options */}
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Volume</p>
            <p className="font-medium">₹{contest.total_volume.toLocaleString()}</p>
          </div>

          <div className="flex gap-2">
            <Button 
              variant={selectedOutcome === "yes" ? "default" : "outline"} 
              size="sm" 
              className={`flex items-center gap-1 ${selectedOutcome === "yes" ? activeClass : "border-green-600 text-green-600 hover:bg-green-50"}`}
              onClick={() => setSelectedOutcome("yes")}
              disabled={isSubmitting}
            >
              Yes
            </Button>
            <Button 
              variant={selectedOutcome === "no" ? "destructive" : "outline"}
              size="sm"
              className={`flex items-center gap-1 ${selectedOutcome === "no" ? "bg-gradient-to-r from-red-500 to-red-400 border-none" : "border-red-600 text-red-600 hover:bg-red-50"}`}
              onClick={() => setSelectedOutcome("no")}
              disabled={isSubmitting}
            >
              No
            </Button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between gap-2 mt-2">
          <Button
            size="sm"
            variant="ghost"
            className="flex-1 border border-input text-sm rounded-md hover:bg-accent hover:text-amber-600 transition-all"
            onClick={handlePlaceBet}
            disabled={isSubmitting || selectedOutcome === null}
          >
            {isSubmitting ? "Placing..." : "Place ₹100"}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            className="w-9 h-9 p-0 flex items-center justify-center border border-input rounded-md hover:bg-accent text-amber-600 relative"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            {shareTooltip && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                Copied!
              </span>
            )}
          </Button>
        </div>
      </div>
    </MorphCard>
  );
};

export default PolyContestCard;
