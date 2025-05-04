
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, XCircle, Plus, Minus } from "lucide-react";

interface PolyBetPlacementProps {
  yesPrice: number;
  noPrice: number;
  isSubmitting: boolean;
  onPlaceBet: (outcome: "yes" | "no", amount: number) => Promise<void>;
}

const PolyBetPlacement = ({ 
  yesPrice,
  noPrice,
  isSubmitting,
  onPlaceBet 
}: PolyBetPlacementProps) => {
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no">("yes");
  const [betAmount, setBetAmount] = useState<number>(100);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 10) {
      setBetAmount(10);
    } else {
      setBetAmount(value);
    }
  };

  const handleQuickAdd = (amount: number) => {
    setBetAmount(prev => prev + amount);
  };

  const handleIncreaseBet = () => {
    setBetAmount(prev => prev + 50);
  };

  const handleDecreaseBet = () => {
    setBetAmount(prev => Math.max(50, prev - 50));
  };

  const calculateWinnings = () => {
    const price = selectedOutcome === "yes" ? yesPrice : noPrice;
    return (betAmount / price).toFixed(2);
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Place Your Bet</h3>
      
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">I think this will happen:</p>
        
        <RadioGroup 
          value={selectedOutcome} 
          onValueChange={(value) => setSelectedOutcome(value as "yes" | "no")}
          className="grid grid-cols-2 gap-4"
        >
          <div className={`flex items-center justify-center gap-2 h-12 rounded-md border ${
            selectedOutcome === "yes" 
              ? "bg-gradient-to-r from-green-600 to-green-500 border-green-600 text-white"
              : "border-green-600 text-green-700 hover:bg-green-50"
          } cursor-pointer`}>
            <RadioGroupItem value="yes" id="place-yes" className="sr-only" />
            <label htmlFor="place-yes" className="flex items-center w-full h-full justify-center cursor-pointer">
              <CheckCircle className="h-4 w-4 mr-2" />
              YES
            </label>
          </div>
          
          <div className={`flex items-center justify-center gap-2 h-12 rounded-md border ${
            selectedOutcome === "no" 
              ? "bg-gradient-to-r from-red-600 to-red-500 border-red-600 text-white"
              : "border-red-600 text-red-700 hover:bg-red-50"
          } cursor-pointer`}>
            <RadioGroupItem value="no" id="place-no" className="sr-only" />
            <label htmlFor="place-no" className="flex items-center w-full h-full justify-center cursor-pointer">
              <XCircle className="h-4 w-4 mr-2" />
              NO
            </label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">Amount (₹):</p>
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            type="button"
            variant="ghost"
            className="h-9 px-2 rounded-none border-r"
            onClick={handleDecreaseBet}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min={10}
            value={betAmount}
            onChange={handleAmountChange}
            className="h-9 border-0 text-center"
          />
          <Button
            type="button"
            variant="ghost"
            className="h-9 px-2 rounded-none border-l"
            onClick={handleIncreaseBet}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(10)}
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            10
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(50)}
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            50
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(100)}
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            100
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(500)}
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            500
          </Button>
        </div>
      </div>
      
      <div className="bg-secondary/30 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">You're betting:</span>
          <span className="font-medium">₹{betAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Price per share:</span>
          <span className="font-medium">₹{selectedOutcome === "yes" ? yesPrice.toFixed(2) : noPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">If you win:</span>
          <span className="font-semibold text-green-600">₹{calculateWinnings()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">If you lose:</span>
          <span className="font-semibold text-red-600">₹0.00</span>
        </div>
      </div>
      
      <Button
        className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-400"
        onClick={() => onPlaceBet(selectedOutcome, betAmount)}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Place Bet"}
      </Button>
    </Card>
  );
};

export default PolyBetPlacement;
