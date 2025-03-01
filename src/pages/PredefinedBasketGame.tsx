
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { 
  ArrowLeft, 
  DollarSign, 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle,
  AlertTriangle
} from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInButton } from "@clerk/clerk-react";

const PredefinedBasketGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  
  const [selectedBasket, setSelectedBasket] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<"positive" | "negative" | null>(null);
  const [entryFee, setEntryFee] = useState<string>("100");
  
  // Get competition ID from query params or use a default
  const competitionId = searchParams.get('id') || 'comp-2';

  // Mock competition data
  const competitionData = {
    id: competitionId,
    title: "Banking Sector Prediction Challenge",
    description: "Predict whether these predefined stock baskets will have positive or negative returns over the next 7 days.",
    entryFee: parseInt(entryFee),
    prizePool: 35000,
    participants: 879,
    startDate: "2023-09-25",
    endDate: "2023-10-02"
  };

  // Mock predefined baskets
  const predefinedBaskets = [
    {
      id: "large-cap",
      name: "Large Cap Banking",
      description: "Top 5 large-cap banking stocks by market capitalization",
      stocks: ["HDFC Bank", "ICICI Bank", "State Bank of India", "Kotak Mahindra Bank", "Axis Bank"],
      riskLevel: "Low",
      volatility: "Medium"
    },
    {
      id: "mid-cap",
      name: "Mid Cap Banking",
      description: "Growing mid-sized banking institutions with potential",
      stocks: ["Federal Bank", "IndusInd Bank", "RBL Bank", "Yes Bank", "IDFC First Bank"],
      riskLevel: "Medium",
      volatility: "Medium-High"
    },
    {
      id: "small-cap",
      name: "Small Cap Banking",
      description: "Emerging small-cap banks with high growth potential",
      stocks: ["South Indian Bank", "City Union Bank", "DCB Bank", "Karnataka Bank", "Dhanlaxmi Bank"],
      riskLevel: "High",
      volatility: "High"
    }
  ];

  const handleJoinCompetition = () => {
    if (!isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to join this competition.",
        variant: "destructive"
      });
      return;
    }

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
        description: "Please make a prediction (positive or negative) to continue.",
        variant: "destructive"
      });
      return;
    }

    console.log("Joining competition with:", {
      competitionId,
      selectedBasket,
      prediction,
      entryFee
    });
    
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

              {!isSignedIn ? (
                <MorphCard className="p-6 mb-8 bg-secondary/30">
                  <div className="flex flex-col items-center text-center p-4">
                    <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
                    <p className="text-muted-foreground mb-4">
                      You need to sign in to join this competition.
                    </p>
                    <SignInButton mode="modal">
                      <Button size="lg">
                        Sign In to Continue
                      </Button>
                    </SignInButton>
                  </div>
                </MorphCard>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">1. Choose a Basket</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {predefinedBaskets.map((basket) => (
                        <Card 
                          key={basket.id}
                          className={`cursor-pointer border-2 transition-all ${
                            selectedBasket === basket.id 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedBasket(basket.id)}
                        >
                          <CardHeader className="pb-3">
                            <CardTitle>{basket.name}</CardTitle>
                            <CardDescription>{basket.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Risk Level:</span>
                                <span className="font-medium">{basket.riskLevel}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Volatility:</span>
                                <span className="font-medium">{basket.volatility}</span>
                              </div>
                              <Separator className="my-2" />
                              <p className="text-sm font-medium">Stocks:</p>
                              <ul className="text-sm text-muted-foreground list-disc pl-5">
                                {basket.stocks.map((stock, i) => (
                                  <li key={i}>{stock}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">2. Make Your Prediction</h2>
                    <div className="bg-card rounded-lg border p-6">
                      <p className="mb-4">Do you predict this basket will have a positive or negative return?</p>
                      <RadioGroup 
                        value={prediction || ""} 
                        onValueChange={(value) => setPrediction(value as "positive" | "negative")}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="positive" id="positive" />
                          <Label 
                            htmlFor="positive" 
                            className="flex items-center cursor-pointer"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <span>Positive Return</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="negative" id="negative" />
                          <Label 
                            htmlFor="negative" 
                            className="flex items-center cursor-pointer"
                          >
                            <XCircle className="h-5 w-5 text-red-500 mr-2" />
                            <span>Negative Return</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">3. Select Entry Fee</h2>
                    <div className="bg-card rounded-lg border p-6">
                      <p className="mb-4">Choose your preferred entry fee:</p>
                      <Select value={entryFee} onValueChange={setEntryFee}>
                        <SelectTrigger className="w-full md:w-[200px]">
                          <SelectValue placeholder="Select fee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">INR 20</SelectItem>
                          <SelectItem value="50">INR 50</SelectItem>
                          <SelectItem value="100">INR 100</SelectItem>
                          <SelectItem value="200">INR 200</SelectItem>
                          <SelectItem value="500">INR 500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto"
                      onClick={handleJoinCompetition}
                      disabled={!selectedBasket || !prediction}
                    >
                      Join Competition for INR {entryFee}
                    </Button>
                  </div>
                </div>
              )}
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
                      <p className="font-medium">INR {entryFee}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                      <p className="font-medium">INR {competitionData.prizePool}</p>
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
                    Your prediction is evaluated based on the actual performance of the basket at the end of the competition period. 
                    If your prediction matches the actual performance, you will be a winner.
                  </p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h3 className="font-medium">Prize Distribution</h3>
                  <ul className="text-sm text-muted-foreground">
                    <li>- All correct predictions share the prize pool equally</li>
                    <li>- Minimum payout guarantee of 1.2x your entry fee</li>
                    <li>- Maximum payout of 50x your entry fee</li>
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

export default PredefinedBasketGame;
