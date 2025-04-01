
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { 
  ArrowLeft, 
  Calendar, 
  MessageSquare, 
  Users, 
  DollarSign, 
  CheckCircle, 
  XCircle 
} from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BACKEND_HOST } from "@/constants/config";
import { toast } from "sonner";

interface OpinionEvent {
  id: string;
  question: string;
  description: string;
  category: string;
  deadline: string;
  minTradeAmount: number;
  currentPool: {
    yes: number;
    no: number;
  };
  participants: number;
  status: "active" | "pending" | "resolved";
  outcome?: "yes" | "no" | null;
}

const OpinionTradingGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [tradeAmount, setTradeAmount] = useState<Record<string, string>>({});
  const [prediction, setPrediction] = useState<Record<string, "yes" | "no" | null>>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in production this would come from API
  const [events, setEvents] = useState<OpinionEvent[]>([
    {
      id: "ev-1",
      question: "Will Mumbai Indians win their next IPL match?",
      description: "Predict if Mumbai Indians will win their upcoming match against Chennai Super Kings on May 15th, 2024.",
      category: "Sports",
      deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      minTradeAmount: 0.5,
      currentPool: {
        yes: 15000,
        no: 12000
      },
      participants: 450,
      status: "active"
    },
    {
      id: "ev-2",
      question: "Will RBI increase interest rates in the next meeting?",
      description: "Predict if the Reserve Bank of India will increase interest rates in their upcoming monetary policy meeting.",
      category: "Finance",
      deadline: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      minTradeAmount: 0.5,
      currentPool: {
        yes: 25000,
        no: 30000
      },
      participants: 890,
      status: "active"
    },
    {
      id: "ev-3",
      question: "Will the Sensex cross 80,000 by June 2024?",
      description: "Predict if the BSE Sensex will cross the 80,000 mark by the end of June 2024.",
      category: "Finance",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      minTradeAmount: 1,
      currentPool: {
        yes: 45000,
        no: 32000
      },
      participants: 1200,
      status: "active"
    },
    {
      id: "ev-4",
      question: "Will India win more than 10 gold medals in Olympics 2024?",
      description: "Predict if India will win more than 10 gold medals in the Paris Olympics 2024.",
      category: "Sports",
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      minTradeAmount: 0.5,
      currentPool: {
        yes: 18000,
        no: 22000
      },
      participants: 650,
      status: "active"
    },
    {
      id: "ev-5",
      question: "Will the new iPhone be released before September 2024?",
      description: "Predict if Apple will release the new iPhone model before September 2024.",
      category: "Technology",
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      minTradeAmount: 0.5,
      currentPool: {
        yes: 12000,
        no: 28000
      },
      participants: 780,
      status: "active"
    },
    {
      id: "ev-6",
      question: "Will Bitcoin price exceed $100,000 in 2024?",
      description: "Predict if Bitcoin will reach a price above $100,000 USD at any point in 2024.",
      category: "Crypto",
      deadline: new Date(2024, 11, 31).toISOString(),
      minTradeAmount: 1,
      currentPool: {
        yes: 85000,
        no: 65000
      },
      participants: 2300,
      status: "active"
    }
  ]);

  const filteredEvents = events.filter(event => {
    // Filter by search query
    const matchesSearch = 
      event.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === event.category.toLowerCase()) ||
      (activeTab === event.status);
    
    return matchesSearch && matchesTab;
  });

  const handleTradeAmountChange = (eventId: string, value: string) => {
    // Only allow numbers with up to 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setTradeAmount(prev => ({ ...prev, [eventId]: value }));
    }
  };

  const handlePredictionChange = (eventId: string, value: "yes" | "no") => {
    setPrediction(prev => ({ ...prev, [eventId]: value }));
  };

  const handlePlaceTrade = async (event: OpinionEvent) => {
    const amount = parseFloat(tradeAmount[event.id] || "0");
    const userPrediction = prediction[event.id];
    
    if (!userPrediction) {
      toast({
        title: "Prediction Required",
        description: "Please select Yes or No for your prediction",
        variant: "destructive"
      });
      return;
    }
    
    if (isNaN(amount) || amount < event.minTradeAmount) {
      toast({
        title: "Invalid Amount",
        description: `Minimum trade amount is ₹${event.minTradeAmount}`,
        variant: "destructive"
      });
      return;
    }

    try {
      // In production, this would be an actual API call
      // const response = await fetch(`${BACKEND_HOST}place-opinion-trade`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     user_id: JSON.parse(localStorage.getItem("userId") || "0"),
      //     event_id: event.id,
      //     prediction: userPrediction,
      //     amount
      //   }),
      // });
      
      // Mock successful response
      toast({
        title: "Trade Placed Successfully",
        description: `You predicted "${userPrediction}" for ₹${amount} on "${event.question}"`,
      });
      
      // Update local state to reflect the trade
      setEvents(prev => 
        prev.map(e => {
          if (e.id === event.id) {
            return {
              ...e,
              currentPool: {
                ...e.currentPool,
                [userPrediction]: e.currentPool[userPrediction] + amount
              },
              participants: e.participants + 1
            };
          }
          return e;
        })
      );
      
      // Clear the form
      setTradeAmount(prev => ({ ...prev, [event.id]: "" }));
      setPrediction(prev => ({ ...prev, [event.id]: null }));
      
    } catch (error) {
      console.error("Failed to place trade:", error);
      toast({
        title: "Failed to Place Trade",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const categories = Array.from(new Set(events.map(event => event.category.toLowerCase())));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Button>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Opinion Trading</h1>
            <p className="text-muted-foreground mb-8">
              Predict real-world events and win rewards based on your accurate predictions.
            </p>

            <div className="mb-8">
              <Input
                type="search"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 w-full overflow-auto">
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  {categories.map(category => (
                    <TabsTrigger key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </TabsTrigger>
                  ))}
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="space-y-6">
                {filteredEvents.map(event => (
                  <OpinionEventCard
                    key={event.id}
                    event={event}
                    tradeAmount={tradeAmount[event.id] || ""}
                    prediction={prediction[event.id]}
                    onTradeAmountChange={(value) => handleTradeAmountChange(event.id, value)}
                    onPredictionChange={(value) => handlePredictionChange(event.id, value)}
                    onPlaceTrade={() => handlePlaceTrade(event)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 my-4 bg-secondary/40 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No events found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface OpinionEventCardProps {
  event: OpinionEvent;
  tradeAmount: string;
  prediction: "yes" | "no" | null;
  onTradeAmountChange: (value: string) => void;
  onPredictionChange: (value: "yes" | "no") => void;
  onPlaceTrade: () => void;
}

const OpinionEventCard = ({
  event,
  tradeAmount,
  prediction,
  onTradeAmountChange,
  onPredictionChange,
  onPlaceTrade
}: OpinionEventCardProps) => {
  const totalPool = event.currentPool.yes + event.currentPool.no;
  const yesPercentage = Math.round((event.currentPool.yes / totalPool) * 100);
  const noPercentage = Math.round((event.currentPool.no / totalPool) * 100);
  
  // Calculate potential payout
  const calculatePayout = (choice: "yes" | "no") => {
    const amount = parseFloat(tradeAmount || "0");
    if (isNaN(amount) || amount === 0) return 0;
    
    const oppositePool = choice === "yes" ? event.currentPool.no : event.currentPool.yes;
    const choicePool = choice === "yes" ? event.currentPool.yes : event.currentPool.no;
    
    // Simple payout calculation based on pool ratio
    const payout = amount * (totalPool / (choicePool + amount));
    return parseFloat(payout.toFixed(2));
  };
  
  const yesPayout = calculatePayout("yes");
  const noPayout = calculatePayout("no");
  
  return (
    <MorphCard className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline">{event.category}</Badge>
            <Badge variant={event.status === "active" ? "default" : "secondary"}>
              {event.status === "active" ? "Active" : "Resolved"}
            </Badge>
          </div>
          <h3 className="text-xl font-semibold mb-2">{event.question}</h3>
          <p className="text-sm text-muted-foreground">{event.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-primary mr-2" />
              <div>
                <p className="text-sm text-muted-foreground">Closes on</p>
                <p className="font-medium">{new Date(event.deadline).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="h-5 w-5 text-mint-600 mr-2" />
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="font-medium">{event.participants}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gold-500 mr-2" />
              <div>
                <p className="text-sm text-muted-foreground">Total Pool</p>
                <p className="font-medium">₹{totalPool.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Current Distribution</h4>
            <div className="w-full bg-secondary rounded-full h-4">
              <div 
                className="bg-primary h-4 rounded-full" 
                style={{ width: `${yesPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <div>Yes: {yesPercentage}% (₹{event.currentPool.yes.toLocaleString()})</div>
              <div>No: {noPercentage}% (₹{event.currentPool.no.toLocaleString()})</div>
            </div>
          </div>
        </div>

        <div>
          {event.status === "active" ? (
            <div className="space-y-4">
              <h4 className="font-medium">Place Your Trade</h4>
              
              <div className="flex gap-3">
                <Button 
                  variant={prediction === "yes" ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => onPredictionChange("yes")}
                >
                  <CheckCircle className="h-4 w-4" />
                  Yes
                </Button>
                <Button 
                  variant={prediction === "no" ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => onPredictionChange("no")}
                >
                  <XCircle className="h-4 w-4" />
                  No
                </Button>
              </div>
              
              <div>
                <p className="text-sm mb-1">Amount (min ₹{event.minTradeAmount})</p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                    <Input
                      type="text"
                      className="pl-8"
                      value={tradeAmount}
                      onChange={(e) => onTradeAmountChange(e.target.value)}
                      placeholder={`${event.minTradeAmount}`}
                    />
                  </div>
                  <Button 
                    onClick={onPlaceTrade}
                    disabled={!prediction || !tradeAmount || parseFloat(tradeAmount) < event.minTradeAmount}
                  >
                    Place Trade
                  </Button>
                </div>
              </div>
              
              {prediction && tradeAmount && parseFloat(tradeAmount) >= event.minTradeAmount && (
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Potential Payout</h5>
                  {prediction === "yes" ? (
                    <p>If "Yes" is correct: ₹{yesPayout.toFixed(2)}</p>
                  ) : (
                    <p>If "No" is correct: ₹{noPayout.toFixed(2)}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on current pool distribution
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Event Resolved</h4>
              <p className="font-bold">
                Outcome: {event.outcome === "yes" ? "Yes" : "No"}
              </p>
              <Separator className="my-2" />
              <p className="text-sm text-muted-foreground">
                This event has been resolved and trading is closed.
              </p>
            </div>
          )}
        </div>
      </div>
    </MorphCard>
  );
};

export default OpinionTradingGame;
