
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MorphCard from "./ui/MorphCard";

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector?: string;
}

interface StockSelectorProps {
  stocks: Stock[];
  maxSelections: number;
  onSelectionsChange: (selections: Stock[]) => void;
}

const StockSelector = ({ stocks, maxSelections, onSelectionsChange }: StockSelectorProps) => {
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [currentStock, setCurrentStock] = useState<string>("");

  const handleAddStock = () => {
    if (!currentStock || selectedStocks.length >= maxSelections) return;
    
    const stockToAdd = stocks.find(stock => stock.id === currentStock);
    if (stockToAdd && !selectedStocks.some(s => s.id === stockToAdd.id)) {
      const newSelections = [...selectedStocks, stockToAdd];
      setSelectedStocks(newSelections);
      onSelectionsChange(newSelections);
      setCurrentStock("");
    }
  };

  const handleRemoveStock = (stockId: string) => {
    const newSelections = selectedStocks.filter(stock => stock.id !== stockId);
    setSelectedStocks(newSelections);
    onSelectionsChange(newSelections);
  };

  // Group stocks by sector
  const stocksBySector = stocks.reduce((acc, stock) => {
    const sector = stock.sector || "Other";
    if (!acc[sector]) {
      acc[sector] = [];
    }
    acc[sector].push(stock);
    return acc;
  }, {} as Record<string, Stock[]>);

  const sectors = Object.keys(stocksBySector).sort();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium">Select Stocks</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Select up to {maxSelections} stocks for your basket. Your performance will be based on their average return.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select 
            value={currentStock} 
            onValueChange={setCurrentStock}
            disabled={selectedStocks.length >= maxSelections}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a stock..." />
            </SelectTrigger>
            <SelectContent>
              {sectors.map(sector => (
                <SelectGroup key={sector}>
                  <SelectLabel>{sector}</SelectLabel>
                  {stocksBySector[sector].map(stock => (
                    <SelectItem 
                      key={stock.id} 
                      value={stock.id}
                      disabled={selectedStocks.some(s => s.id === stock.id)}
                    >
                      {stock.symbol} - {stock.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={handleAddStock} 
          disabled={!currentStock || selectedStocks.length >= maxSelections}
          className="flex-shrink-0"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        {selectedStocks.length} of {maxSelections} stocks selected
      </div>

      {selectedStocks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {selectedStocks.map(stock => (
            <MorphCard key={stock.id} className="flex items-center justify-between p-3 animate-fade-in">
              <div>
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-sm text-muted-foreground truncate max-w-[180px]">{stock.name}</div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                onClick={() => handleRemoveStock(stock.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </MorphCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockSelector;
