
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Minus } from "lucide-react";

interface PolyBetFormProps {
  yesPrice: number;
  noPrice: number;
  onPlaceBet: (outcome: "yes" | "no", amount: number) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const PolyBetForm = ({
  yesPrice,
  noPrice,
  onPlaceBet,
  onCancel,
  isSubmitting
}: PolyBetFormProps) => {
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no" | null>(null);
  const [betAmount, setBetAmount] = useState<number>(100);

  const handleIncreaseBet = () => {
    setBetAmount(prev => prev + 50);
  };

  const handleDecreaseBet = () => {
    setBetAmount(prev => Math.max(50, prev - 50));
  };

  const handleSubmit = async () => {
    if (selectedOutcome) {
      await onPlaceBet(selectedOutcome, betAmount);
    }
  };

  return (
    <div className="mt-3 border-t pt-3">
      <p className="text-sm font-medium mb-2">What do you predict?</p>
      
      <RadioGroup 
        value={selectedOutcome || ""} 
        onValueChange={value => setSelectedOutcome(value as "yes" | "no")}
        className="flex space-x-2 mb-3"
      >
        <div className={`flex-1 flex items-center space-x-2 border rounded-md p-2 ${selectedOutcome === "yes" ? "border-green-600 bg-green-50" : ""}`}>
          <RadioGroupItem value="yes" id="yes" className={selectedOutcome === "yes" ? "text-green-600" : ""} />
          <label htmlFor="yes" className="text-sm font-medium flex-grow cursor-pointer">Yes</label>
          <span className="text-xs text-green-600">{(yesPrice * 100).toFixed(0)}%</span>
        </div>
        
        <div className={`flex-1 flex items-center space-x-2 border rounded-md p-2 ${selectedOutcome === "no" ? "border-red-600 bg-red-50" : ""}`}>
          <RadioGroupItem value="no" id="no" className={selectedOutcome === "no" ? "text-red-600" : ""} />
          <label htmlFor="no" className="text-sm font-medium flex-grow cursor-pointer">No</label>
          <span className="text-xs text-red-600">{(noPrice * 100).toFixed(0)}%</span>
        </div>
      </RadioGroup>
      
      <div className="mb-3">
        <p className="text-sm font-medium mb-1">Bet Amount</p>
        <div className="flex items-center border rounded-md">
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="h-8 rounded-r-none"
            onClick={handleDecreaseBet}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <Input 
            type="number" 
            className="h-8 border-0 text-center" 
            value={betAmount}
            onChange={(e) => setBetAmount(parseInt(e.target.value) || 50)}
            min="50"
          />
          
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="h-8 rounded-l-none"
            onClick={handleIncreaseBet}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center text-xs mb-2">
        <span className="text-muted-foreground">Potential payout:</span>
        <span className="ml-auto font-medium">
          ₹{selectedOutcome ? (betAmount / (selectedOutcome === "yes" ? yesPrice : noPrice)).toFixed(2) : "0.00"}
        </span>
      </div>
      
      <div className="flex gap-2">
        <Button 
          size="sm"
          variant="outline"
          className="text-sm flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        
        <Button 
          size="sm"
          className="text-sm flex-1 bg-amber-500 hover:bg-amber-600"
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedOutcome}
        >
          {isSubmitting ? "Processing..." : "Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default PolyBetForm;
