
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PolyPriceBarProps {
  yesPrice: number;
  noPrice: number;
}

const PolyPriceBar = ({ yesPrice, noPrice }: PolyPriceBarProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-medium mb-1">
        <span className="flex items-center gap-1 text-green-600">
          <TrendingUp className="h-3.5 w-3.5" />
          Yes: ₹{yesPrice.toFixed(2)}
        </span>
        <span className="flex items-center gap-1 text-red-600">
          <TrendingDown className="h-3.5 w-3.5" />
          No: ₹{noPrice.toFixed(2)}
        </span>
      </div>
      
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300" 
          style={{ width: `${yesPrice * 100}%` }}
        />
      </div>
    </div>
  );
};

export default PolyPriceBar;
