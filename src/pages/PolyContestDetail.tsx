import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { PolyContest, PriceHistoryPoint } from "@/types/competitions";
import { getPolyContestById, getPolyPriceHistory, placePolyBet } from "@/services/polyContestsService";
import { ChartContainer } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart2,
  Share2,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Percent,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Plus,
  Minus,
  ChevronLeft
} from "lucide-react";
import { format } from "date-fns";

const PolyContestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [contest, setContest] = useState<PolyContest | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no">("yes");
  const [betAmount, setBetAmount] = useState<number>(100);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<string>("all");
  
  useEffect(() => {
    const loadContestData = async () => {
      if (!id) {
        setError("Contest ID is missing");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const { contest: contestData, error: contestError } = await getPolyContestById(id);
        
        if (contestError || !contestData) {
          setError(contestError || "Failed to load contest details");
          setIsLoading(false);
          return;
        }
        
        setContest(contestData);
        
        const { priceHistory: historyData, error: historyError } = await getPolyPriceHistory(id);
        
        if (historyError) {
          console.error("Error loading price history:", historyError);
          // Don't set error state here, we can still show the contest without history
        }
        
        if (historyData) {
          setPriceHistory(historyData);
        }
        
      } catch (err) {
        console.error("Error loading contest details:", err);
        setError("Failed to load contest details");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContestData();
  }, [id]);

  const getFilteredPriceHistory = () => {
    if (!priceHistory.length) return [];
    
    const now = new Date();
    let cutoff = new Date();
    
    switch (timeRange) {
      case "1h":
        cutoff.setHours(now.getHours() - 1);
        break;
      case "6h":
        cutoff.setHours(now.getHours() - 6);
        break;
      case "1d":
        cutoff.setDate(now.getDate() - 1);
        break;
      case "1w":
        cutoff.setDate(now.getDate() - 7);
        break;
      case "1m":
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case "all":
      default:
        return priceHistory;
    }
    
    return priceHistory.filter(
      point => new Date(point.timestamp) >= cutoff
    );
  };

  const handlePlaceBet = async () => {
    if (!contest || !id) return;
    
    setIsSubmitting(true);
    
    try {
      // Mock user ID for demo
      const userId = localStorage.getItem('userId') || 'demo-user';
      
      const result = await placePolyBet(userId, id, selectedOutcome, betAmount);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }
      
      toast.success(`Successfully placed ${selectedOutcome.toUpperCase()} bet for ₹${betAmount}`);
      
      const { contest: refreshedContest } = await getPolyContestById(id);
      if (refreshedContest) {
        setContest(refreshedContest);
      }
      
    } catch (err) {
      console.error("Error placing bet:", err);
      toast.error("Failed to place bet");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (!contest) return;
    
    const shareText = `I'm predicting "${contest.title}" on Mind Stock. Join me!`;
    const shareUrl = `${window.location.origin}/competitions/poly/${contest.id}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Mind Stock Prediction',
          text: shareText,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

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
    if (!contest) return 0;

    const price =
      selectedOutcome === "yes"
        ? contest.yes_price
        : contest.no_price;

    return (betAmount / price).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-6xl mx-auto">
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-4 w-full mb-8" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Skeleton className="h-64 w-full rounded-xl mb-6" />
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-64 w-full rounded-xl mb-4" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-6xl mx-auto text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Contest Not Found</h2>
              <p className="text-muted-foreground mb-6">{error || "Unable to load the contest details"}</p>
              <Button onClick={() => navigate('/competitions?gameType=poly')}>
                Back to Contests
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6 text-amber-600 hover:text-amber-700 hover:bg-amber-50 -ml-2" 
              onClick={() => navigate('/competitions?gameType=poly')}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Poly Contests
            </Button>
            
            <div className="mb-8">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge variant="outline" className="bg-white/80">
                  {contest.category}
                </Badge>
                <Badge 
                  variant={contest.status === "active" ? "default" : "secondary"}
                  className={contest.status === "active" ? "bg-green-600" : ""}
                >
                  {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
                </Badge>
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 border-amber-500 text-amber-600 hover:bg-amber-50"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-3">{contest.title}</h1>
              <p className="text-muted-foreground">{contest.description}</p>
              
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-muted-foreground">Closes {format(new Date(contest.end_time), "PP")}</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-muted-foreground">{contest.participants} participants</span>
                </div>
                
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-muted-foreground">₹{contest.total_volume.toLocaleString()} volume</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg flex items-center">
                      <BarChart2 className="h-5 w-5 mr-2 text-amber-600" />
                      Price History
                    </h3>
                    
                    <Tabs 
                      value={timeRange} 
                      onValueChange={setTimeRange} 
                      className="h-8"
                    >
                      <TabsList className="bg-secondary/50">
                        <TabsTrigger value="1h" className="text-xs px-2">1H</TabsTrigger>
                        <TabsTrigger value="6h" className="text-xs px-2">6H</TabsTrigger>
                        <TabsTrigger value="1d" className="text-xs px-2">1D</TabsTrigger>
                        <TabsTrigger value="1w" className="text-xs px-2">1W</TabsTrigger>
                        <TabsTrigger value="1m" className="text-xs px-2">1M</TabsTrigger>
                        <TabsTrigger value="all" className="text-xs px-2">ALL</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="h-64">
                    {priceHistory.length > 0 ? (
                      <ChartContainer
                        className="h-64"
                        config={{
                          yes: {
                            color: "#10B981",
                          },
                          no: {
                            color: "#EF4444",
                          },
                        }}
                      >
                        <AreaChart data={getFilteredPriceHistory()}>
                          <defs>
                            <linearGradient id="yes-gradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="no-gradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(timestamp) => {
                              return format(new Date(timestamp), "HH:mm");
                            }}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                          />
                          <YAxis
                            tickFormatter={(value) => `₹${value.toFixed(2)}`}
                            domain={[0, 1]}
                            tickLine={false}
                            axisLine={false}
                            dx={-10}
                          />
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <Tooltip 
                            content={(props: any) => {
                              const { active, payload } = props;
                              if (
                                active &&
                                payload &&
                                payload.length &&
                                typeof payload[0].value === "number" &&
                                typeof payload[1]?.value === "number"
                              ) {
                                return (
                                  <div className="bg-white p-3 border rounded-md shadow-sm">
                                    <p className="text-xs font-medium mb-1">
                                      {format(new Date(payload[0].payload.timestamp), "PPp")}
                                    </p>
                                    <p className="text-sm flex items-center text-green-600">
                                      <TrendingUp className="h-3 w-3 mr-1" />
                                      Yes: ₹{Number(payload[0].value).toFixed(2)}
                                    </p>
                                    <p className="text-sm flex items-center text-red-600">
                                      <TrendingDown className="h-3 w-3 mr-1" />
                                      No: ₹{Number(payload[1].value).toFixed(2)}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="yes_price"
                            stroke="#10B981"
                            fill="url(#yes-gradient)"
                            name="Yes"
                            activeDot={{ r: 6, fill: "#10B981" }}
                            isAnimationActive={false}
                          />
                          <Area
                            type="monotone"
                            dataKey="no_price"
                            stroke="#EF4444"
                            fill="url(#no-gradient)"
                            name="No"
                            activeDot={{ r: 6, fill: "#EF4444" }}
                            isAnimationActive={false}
                          />
                        </AreaChart>
                      </ChartContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">No price history data available</p>
                      </div>
                    )}
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Current Prediction Pool</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-green-50 z-0" 
                        style={{ width: `${contest.yes_price * 100}%` }}
                      />
                      <div className="relative z-10">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-lg text-green-700">YES</span>
                          <span className="flex items-center text-green-700">
                            <Percent className="h-3.5 w-3.5 mr-1" />
                            {(contest.yes_price * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Current Price</span>
                          <span className="text-green-700 font-medium">₹{contest.yes_price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-red-50 z-0" 
                        style={{ width: `${contest.no_price * 100}%` }}
                      />
                      <div className="relative z-10">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-lg text-red-700">NO</span>
                          <span className="flex items-center text-red-700">
                            <Percent className="h-3.5 w-3.5 mr-1" />
                            {(contest.no_price * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Current Price</span>
                          <span className="text-red-700 font-medium">₹{contest.no_price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
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
                      <span className="font-medium">₹{selectedOutcome === "yes" ? contest.yes_price.toFixed(2) : contest.no_price.toFixed(2)}</span>
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
                    onClick={handlePlaceBet}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Bet"}
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolyContestDetail;
