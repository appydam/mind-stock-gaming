
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ArrowLeft, DollarSign, Calendar, Users, TrendingUp, Check } from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";
import { useUser } from "@clerk/clerk-react";
import { toast as sonnerToast } from "sonner";

const PredefinedBasketGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  
  // State for user selections
  const [selectedBasket, setSelectedBasket] = useState<string>("");
  const [prediction, setPrediction] = useState<string>("");
  const [entryFee, setEntryFee] = useState<number>(50);
  const [userBalance, setUserBalance] = useState<number>(500); // Mock user balance
  const [showInsufficientFundsDialog, setShowInsufficientFundsDialog] = useState(false);
  
  // Get competition ID from query params or use a default
  const competitionId = searchParams.get('id') || 'comp-2';

  // Mock competition data
  const competitionData = {
    id: competitionId,
    title: "Banking Sector Prediction Challenge",
    description: "Predict whether these predefined stock baskets will have positive or negative returns over the next 7 days.",
    minEntryFee: 20,
    maxEntryFee: 500,
    prizePool: 3000,
    participants: 87,
    startDate: "2023-09-25",
    endDate: "2023-10-02"
  };

  // Predefined baskets
  const baskets = [
    {
      id: "large-cap",
      name: "Large Cap Basket",
      description: "Top 10 companies by market capitalization",
      stocks: ["RELIANCE", "TCS", "HDFCBANK", "INFY", "ICICIBANK", "HUL", "ITC", "SBIN", "BAJFINANCE", "BHARTIARTL"],
      performanceLastWeek: "+2.3%"
    },
    {
      id: "mid-cap",
      name: "Mid Cap Basket",
      description: "Rising mid-cap companies with growth potential",
      stocks: ["AUROPHARMA", "PEL", "TORNTPHARM", "GLAND", "LUPIN", "ABBOTINDIA", "BIOCON", "DIVISLAB", "APOLLOHOSP", "LALPATHLAB"],
      performanceLastWeek: "+1.7%"
    },
    {
      id: "small-cap",
      name: "Small Cap Basket",
      description: "Small companies with high volatility and growth potential",
      stocks: ["TATAMOTORS", "NATIONALUM", "IRCTC", "APOLLOTYRE", "PNB", "CANBK", "BHEL", "IDEA", "SAIL", "HINDCOPPER"],
      performanceLastWeek: "-0.8%"
    }
  ];

  // Entry fee options
  const entryFeeOptions = [20, 50, 100, 200, 500];

  // Fetch user balance - in a real app, this would come from an API or user context
  useEffect(() => {
    // Mock API call to get user balance
    const fetchUserBalance = () => {
      // This would be an actual API call in a real app
      setTimeout(() => {
        setUserBalance(500); // Mock balance
      }, 500);
    };
    
    fetchUserBalance();
  }, []);

  const handleJoinCompetition = () => {
    // Check if user is authenticated
    if (!isSignedIn) {
      sonnerToast.error("Authentication Required", {
        description: "You must be signed in to join a competition",
      });
      navigate("/login");
      return;
    }

    // Validate form
    if (!selectedBasket) {
      toast({
        title: "Selection Required",
        description: "Please select a basket to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!prediction) {
      toast({
        title: "Prediction Required",
        description: "Please make a prediction about the basket's performance.",
        variant: "destructive"
      });
      return;
    }

    // Check if user has sufficient balance
    if (userBalance < entryFee) {
      setShowInsufficientFundsDialog(true);
      return;
    }

    // In a real app, this would submit the selections to an API
    console.log("Joining competition with:", {
      competitionId,
      basketId: selectedBasket,
      prediction,
      entryFee
    });
    
    // Deduct the entry fee from user's balance
    setUserBalance(prevBalance => prevBalance - entryFee);
    
    toast({
      title: "Success!",
      description: "You've successfully joined the competition.",
    });
    
    // Navigate to confirmation page
    setTimeout(() => {
      navigate(`/competition-confirmation?type=predefined&basketId=${selectedBasket}&prediction=${prediction}`);
    }, 1500);
  };

  const handleNavigateToDeposit = () => {
    // In a real app, this would navigate to a deposit page
    setShowInsufficientFundsDialog(false);
    navigate('/profile');
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
                {/* Basket Selection */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Select a Basket</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {baskets.map(basket => (
                      <MorphCard 
                        key={basket.id}
                        className={`p-5 cursor-pointer transition ${selectedBasket === basket.id ? 'ring-2 ring-primary' : 'hover:bg-accent/50'}`}
                        onClick={() => setSelectedBasket(basket.id)}
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{basket.name}</h3>
                            <p className="text-muted-foreground">{basket.description}</p>
                            
                            <div className="mt-3">
                              <span className="text-sm font-medium">Stocks:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {basket.stocks.map((stock, index) => (
                                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-background border">
                                    {stock}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <span className="text-sm font-medium">Performance Last Week:</span>
                              <span className={`ml-2 ${basket.performanceLastWeek.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {basket.performanceLastWeek}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 mt-1">
                            <div className={`w-5 h-5 rounded-full border-2 ${selectedBasket === basket.id ? 'border-primary bg-primary text-primary-foreground' : 'border-muted'} flex items-center justify-center`}>
                              {selectedBasket === basket.id && <Check className="h-3 w-3" />}
                            </div>
                          </div>
                        </div>
                      </MorphCard>
                    ))}
                  </div>
                </div>

                {/* Prediction Selection */}
                {selectedBasket && (
                  <div className="space-y-4 animate-fade-up">
                    <h2 className="text-xl font-semibold">Your Prediction</h2>
                    <p className="text-muted-foreground">
                      Do you predict this basket will have positive or negative returns over the competition period?
                    </p>
                    
                    <RadioGroup value={prediction} onValueChange={setPrediction} className="mt-3 space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="positive" id="positive" />
                        <Label htmlFor="positive" className="flex items-center cursor-pointer">
                          <span className="text-green-600 font-medium mr-2">Positive</span>
                          <span className="text-muted-foreground text-sm">
                            (The basket's average return will be greater than 0%)
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="negative" id="negative" />
                        <Label htmlFor="negative" className="flex items-center cursor-pointer">
                          <span className="text-red-600 font-medium mr-2">Negative</span>
                          <span className="text-muted-foreground text-sm">
                            (The basket's average return will be less than 0%)
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Entry Fee Selection */}
                {prediction && (
                  <div className="space-y-4 animate-fade-up" style={{animationDelay: "150ms"}}>
                    <h2 className="text-xl font-semibold">Select Entry Fee</h2>
                    <p className="text-muted-foreground">
                      Choose how much you want to wager on your prediction.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mt-3">
                      {entryFeeOptions.map(fee => (
                        <Button
                          key={fee}
                          variant={entryFee === fee ? "default" : "outline"}
                          onClick={() => setEntryFee(fee)}
                          className={`min-w-[80px] ${fee > userBalance ? 'opacity-50' : ''}`}
                        >
                          ₹{fee}
                          {fee > userBalance && <span className="text-xs ml-1 text-red-500">*</span>}
                        </Button>
                      ))}
                    </div>
                    
                    {/* Show warning if selected fee is greater than balance */}
                    {entryFee > userBalance && (
                      <p className="text-xs text-red-500 mt-2">
                        * Insufficient balance for this entry fee
                      </p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                {selectedBasket && prediction && (
                  <div className="mt-8 animate-fade-up" style={{animationDelay: "300ms"}}>
                    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg bg-muted/30 mb-4">
                      <div>
                        <p className="text-sm font-medium">Your Balance</p>
                        <p className="text-xl font-bold">₹{userBalance}</p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <p className="text-sm font-medium">Entry Fee</p>
                        <p className={`text-xl font-bold ${entryFee > userBalance ? 'text-red-500' : ''}`}>₹{entryFee}</p>
                      </div>
                    </div>
                    
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto"
                      onClick={handleJoinCompetition}
                    >
                      Join Competition for ₹{entryFee}
                    </Button>
                  </div>
                )}
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
                      <p className="text-sm text-muted-foreground">Entry Fee Range</p>
                      <p className="font-medium">₹{competitionData.minEntryFee} - ₹{competitionData.maxEntryFee}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                      <p className="font-medium">₹{competitionData.prizePool}</p>
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
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h3 className="font-medium">How Scoring Works</h3>
                  <p className="text-sm text-muted-foreground">
                    Your prediction is correct if the basket's average return matches your prediction (positive or negative)
                    by the end of the competition period. All correct predictions share the prize pool proportionally to their entry fees.
                  </p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h3 className="font-medium">Prize Distribution</h3>
                  <p className="text-sm text-muted-foreground">
                    If your prediction is correct, you'll receive a share of the prize pool proportional to your entry fee
                    compared to all other participants with correct predictions.
                  </p>
                </div>
              </MorphCard>
            </div>
          </div>
        </div>
      </main>

      {/* Insufficient Funds Dialog */}
      <AlertDialog open={showInsufficientFundsDialog} onOpenChange={setShowInsufficientFundsDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Insufficient Balance</AlertDialogTitle>
            <AlertDialogDescription>
              Your available balance is ₹{userBalance}, but the entry fee is ₹{entryFee}. 
              Please deposit funds to join this competition.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleNavigateToDeposit} className="bg-green-600 hover:bg-green-700">
              Deposit Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default PredefinedBasketGame;
