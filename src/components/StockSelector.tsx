
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
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
  const [stockToRemove, setStockToRemove] = useState<Stock | null>(null);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const handleAddStock = (stock: Stock) => {
    if (selectedStocks.length >= maxSelections) return;

    if (!selectedStocks.some(s => s.id === stock.id)) {
      const newSelections = [...selectedStocks, stock];
      setSelectedStocks(newSelections);
      onSelectionsChange(newSelections);
    }
  };

  const handleRemoveStock = (stockId: string) => {
    const newSelections = selectedStocks.filter(stock => stock.id !== stockId);
    setSelectedStocks(newSelections);
    onSelectionsChange(newSelections);
    
    toast({
      title: "Stock removed",
      description: "The stock has been removed from your selection.",
      variant: "default",
    });

    setShowRemoveDialog(false);
    setStockToRemove(null);
  };

  const openRemoveDialog = (stock: Stock) => {
    setStockToRemove(stock);
    setShowRemoveDialog(true);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        {selectedStocks.length} of {maxSelections} stocks selected
      </div>

      {stocks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {stocks.map(stock => (
            <MorphCard key={stock.id} className="flex items-center justify-between p-3 animate-fade-in">
              <div>
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-sm text-muted-foreground truncate max-w-[180px]">{stock.name}</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
                onClick={() => handleAddStock(stock)}
                disabled={selectedStocks.some(s => s.id === stock.id)}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </MorphCard>
          ))}
        </div>
      )}

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
                onClick={() => openRemoveDialog(stock)}
              >
                <X className="h-4 w-4" />
              </Button>
            </MorphCard>
          ))}
        </div>
      )}

      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Stock</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {stockToRemove?.name} ({stockToRemove?.symbol}) from your basket?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => stockToRemove && handleRemoveStock(stockToRemove.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StockSelector;
