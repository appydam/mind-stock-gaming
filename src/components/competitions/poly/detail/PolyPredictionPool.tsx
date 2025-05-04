
import React from 'react';
import { Card } from "@/components/ui/card";
import { Percent } from "lucide-react";

interface PolyPredictionPoolProps {
  yesPrice: number;
  noPrice: number;
}

const PolyPredictionPool = ({ yesPrice, noPrice }: PolyPredictionPoolProps) => {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Current Prediction Pool</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-green-50 z-0" 
            style={{ width: `${yesPrice * 100}%` }}
          />
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg text-green-700">YES</span>
              <span className="flex items-center text-green-700">
                <Percent className="h-3.5 w-3.5 mr-1" />
                {(yesPrice * 100).toFixed(0)}%
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Price</span>
              <span className="text-green-700 font-medium">₹{yesPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-red-50 z-0" 
            style={{ width: `${noPrice * 100}%` }}
          />
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg text-red-700">NO</span>
              <span className="flex items-center text-red-700">
                <Percent className="h-3.5 w-3.5 mr-1" />
                {(noPrice * 100).toFixed(0)}%
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Price</span>
              <span className="text-red-700 font-medium">₹{noPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PolyPredictionPool;
