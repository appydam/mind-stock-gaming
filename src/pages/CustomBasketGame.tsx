
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StockSelector, { Stock } from "@/components/StockSelector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, DollarSign, Calendar, Users, TrendingUp } from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";

const CustomBasketGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  
  // Get competition ID from query params or use a default
  const competitionId = searchParams.get('id') || 'comp-1';

  // Mock competition data
  const competitionData = {
    id: competitionId,
    title: "Weekly Tech Titans Challenge",
    description: "Select 5 tech stocks you believe will outperform over the next 7 days.",
    entryFee: 10,
    prizePool: 5000,
    participants: 128,
    startDate: "2023-09-25",
    endDate: "2023-10-02",
    maxSelectionsAllowed: 5
  };

  // Mock stocks data - in a real app, this would come from an API
  const availableStocks: Stock[] = [
    { id: "aapl", symbol: "AAPL", name: "Apple Inc.", sector: "Technology" },
    { id: "msft", symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology" },
    { id: "googl", symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology" },
    { id: "amzn", symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Cyclical" },
    { id: "fb", symbol: "META", name: "Meta Platforms Inc.", sector: "Technology" },
    { id: "tsla", symbol: "TSLA", name: "Tesla Inc.", sector: "Automotive" },
    { id: "nvda", symbol: "NVDA", name: "NVIDIA Corporation", sector: "Technology" },
    { id: "pypl", symbol: "PYPL", name: "PayPal Holdings Inc.", sector: "Financial Services" },
    { id: "nflx", symbol: "NFLX", name: "Netflix Inc.", sector: "Entertainment" },
    { id: "dis", symbol: "DIS", name: "The Walt Disney Company", sector: "Entertainment" },
    { id: "adbe", symbol: "ADBE", name: "Adobe Inc.", sector: "Technology" },
    { id: "crm", symbol: "CRM", name: "Salesforce.com Inc.", sector: "Technology" },
    { id: "intc", symbol: "INTC", name: "Intel Corporation", sector: "Technology" },
    { id: "csco", symbol: "CSCO", name: "Cisco Systems Inc.", sector: "Technology" },
    { id: "amd", symbol: "AMD", name: "Advanced Micro Devices Inc.", sector: "Technology" },
    { id: "qcom", symbol: "QCOM", name: "Qualcomm Inc.", sector: "Technology" },
    { id: "ibm", symbol: "IBM", name: "International Business Machines", sector: "Technology" },
    { id: "mu", symbol: "MU", name: "Micron Technology Inc.", sector: "Technology" },
    { id: "txn", symbol: "TXN", name: "Texas Instruments Inc.", sector: "Technology" },
    { id: "avgo", symbol: "AVGO", name: "Broadcom Inc.", sector: "Technology" },
    { id: "jpm", symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial Services" },
    { id: "bac", symbol: "BAC", name: "Bank of America Corp.", sector: "Financial Services" },
    { id: "wfc", symbol: "WFC", name: "Wells Fargo & Co.", sector: "Financial Services" },
    { id: "gs", symbol: "GS", name: "Goldman Sachs Group Inc.", sector: "Financial Services" },
    { id: "ms", symbol: "MS", name: "Morgan Stanley", sector: "Financial Services" },
    { id: "v", symbol: "V", name: "Visa Inc.", sector: "Financial Services" },
    { id: "ma", symbol: "MA", name: "Mastercard Inc.", sector: "Financial Services" },
    { id: "axp", symbol: "AXP", name: "American Express Co.", sector: "Financial Services" },
    { id: "pfe", symbol: "PFE", name: "Pfizer Inc.", sector: "Healthcare" },
    { id: "jnj", symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare" },
    { id: "unh", symbol: "UNH", name: "UnitedHealth Group Inc.", sector: "Healthcare" },
    { id: "mrk", symbol: "MRK", name: "Merck & Co. Inc.", sector: "Healthcare" },
    { id: "abt", symbol: "ABT", name: "Abbott Laboratories", sector: "Healthcare" },
    { id: "tmo", symbol: "TMO", name: "Thermo Fisher Scientific Inc.", sector: "Healthcare" },
    { id: "bmy", symbol: "BMY", name: "Bristol-Myers Squibb Co.", sector: "Healthcare" },
    { id: "hd", symbol: "HD", name: "Home Depot Inc.", sector: "Consumer Cyclical" },
    { id: "wmt", symbol: "WMT", name: "Walmart Inc.", sector: "Consumer Defensive" }
  ];

  const handleStockSelectionsChange = (selections: Stock[]) => {
    setSelectedStocks(selections);
  };

  const handleJoinCompetition = () => {
    // In a real app, this would submit the selections to an API
    if (selectedStocks.length < competitionData.maxSelectionsAllowed) {
      toast({
        title: "Selection Incomplete",
        description: `Please select ${competitionData.maxSelectionsAllowed} stocks for your basket.`,
        variant: "destructive"
      });
      return;
    }

    console.log("Joining competition with selected stocks:", selectedStocks);
    
    toast({
      title: "Success!",
      description: "You've successfully joined the competition.",
    });
    
    // Navigate to a confirmation page or back to competitions
    setTimeout(() => {
      navigate("/competitions");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate("/competitions")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Competitions
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <h1 className="text-3xl font-bold mb-4">{competitionData.title}</h1>
              <p className="text-muted-foreground mb-8">{competitionData.description}</p>

              <div className="space-y-8">
                <StockSelector 
                  stocks={availableStocks}
                  maxSelections={competitionData.maxSelectionsAllowed}
                  onSelectionsChange={handleStockSelectionsChange}
                />

                <div className="mt-8">
                  <Button 
                    size="lg" 
                    className="w-full md:w-auto"
                    onClick={handleJoinCompetition}
                    disabled={selectedStocks.length < competitionData.maxSelectionsAllowed}
                  >
                    Join Competition for ${competitionData.entryFee}
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <MorphCard className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Competition Details</h2>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gold-500 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Entry Fee</p>
                      <p className="font-medium">${competitionData.entryFee}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                      <p className="font-medium">${competitionData.prizePool}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-mint-600 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Participants</p>
                      <p className="font-medium">{competitionData.participants}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">
                        {new Date(competitionData.startDate).toLocaleDateString()} - {new Date(competitionData.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-gold-500 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Selection Requirement</p>
                      <p className="font-medium">{competitionData.maxSelectionsAllowed} stocks</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h3 className="font-medium">How Scoring Works</h3>
                  <p className="text-sm text-muted-foreground">
                    Your score is calculated based on the average percentage return of your selected 
                    stocks over the competition period. The higher the return, the higher your ranking.
                  </p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h3 className="font-medium">Prize Distribution</h3>
                  <ul className="text-sm text-muted-foreground">
                    <li>1st Place: 50% of prize pool</li>
                    <li>2nd Place: 30% of prize pool</li>
                    <li>3rd Place: 15% of prize pool</li>
                    <li>4th-10th Place: 5% distributed equally</li>
                  </ul>
                </div>
              </MorphCard>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomBasketGame;
