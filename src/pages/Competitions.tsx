
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompetitionCard, { CompetitionProps } from "@/components/CompetitionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search, Filter, Trophy, Calendar, TrendingUp, Bitcoin, MessageSquare, Clock, Users, CheckCircle, XCircle } from "lucide-react";
import { BACKEND_HOST } from "@/constants/config";
import { toast } from "sonner";
import MorphCard from "@/components/ui/MorphCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Opinion event type definition
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

const Competitions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const gameTypeFromUrl = queryParams.get("gameType");

  const [activeGameType, setActiveGameType] = useState<string>(gameTypeFromUrl || "equity");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [filteredCompetitions, setFilteredCompetitions] = useState<CompetitionProps[]>([]);
  const [allCompetitions, setAllCompetitions] = useState<CompetitionProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Settings for equity contests
  const [activeTab, setActiveTab] = useState<string>(queryParams.get("type") || "all");
  
  // Opinion events state
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
  
  // Opinion event filter state
  const [filteredEvents, setFilteredEvents] = useState<OpinionEvent[]>(events);
  const [activeOpinionTab, setActiveOpinionTab] = useState<string>("all");

  const getMockCompetitions = (): CompetitionProps[] => {
    return [
      {
        id: "comp-1",
        name: "Weekly Tech Stocks Challenge",
        description: "Select 5 tech stocks and compete for the highest returns",
        entryFee: 100,
        maxParticipants: 500,
        currentParticipants: 324,
        status: "open",
        prizePool: 45000,
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        type: "custom",
        gameType: "equity"
      },
      {
        id: "comp-2",
        name: "Banking Sector Prediction",
        description: "Will banking stocks go up or down? Place your prediction.",
        entryFee: 50,
        maxParticipants: 1000,
        currentParticipants: 879,
        status: "open",
        prizePool: 35000,
        deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        type: "predefined",
        gameType: "equity"
      },
      {
        id: "comp-3",
        name: "Pharma Giants Showdown",
        description: "Select pharmaceutical stocks that will outperform the market",
        entryFee: 200,
        maxParticipants: 300,
        currentParticipants: 142,
        status: "open",
        prizePool: 50000,
        deadline: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        type: "custom",
        gameType: "equity"
      },
      
      {
        id: "opinion-1",
        name: "IPL Match Predictions",
        description: "Will Mumbai Indians win their next match?",
        entryFee: 10,
        maxParticipants: 2000,
        currentParticipants: 1756,
        status: "open",
        prizePool: 15000,
        deadline: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        type: "opinion",
        gameType: "opinion"
      },
      {
        id: "opinion-2",
        name: "Budget Policy Impact",
        description: "Will the new budget policies improve the Sensex by 5% in 30 days?",
        entryFee: 20,
        maxParticipants: 1500,
        currentParticipants: 982,
        status: "open",
        prizePool: 25000,
        deadline: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        type: "opinion",
        gameType: "opinion"
      },
      {
        id: "opinion-3",
        name: "Cricket World Cup Final Outcome",
        description: "Will India win the Cricket World Cup final?",
        entryFee: 25,
        maxParticipants: 3000,
        currentParticipants: 2870,
        status: "open",
        prizePool: 71750,
        deadline: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString(),
        type: "opinion",
        gameType: "opinion"
      }
    ];
  };

  useEffect(() => {
    const fetchCompetitions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiPath = BACKEND_HOST + 'competitions';
        const response = await fetch(apiPath, {
          method: "GET",
          credentials: "include",
        });
        
        if (!response.ok) {
          if (response.status >= 400 && response.status < 500) {
            console.error("API returned client error. Using mock data instead.");
            setAllCompetitions(getMockCompetitions());
            return;
          }
          
          throw new Error(`API returned status ${response.status}`);
        }
        
        const data = await response.json();
        if (data.code === 200 && data.data.competitions) {
          const competitions = data.data.competitions.map((comp: any) => ({
            id: String(comp.id),
            name: comp.name,
            description: comp.description,
            entryFee: comp.entry_fee,
            maxParticipants: comp.max_participants,
            currentParticipants: comp.current_participants,
            status: comp.status,
            prizePool: comp.prize_pool,
            deadline: new Date(comp.deadline).toISOString(),
            type: comp.type,
            gameType: comp.game_type || "equity"
          }));
          setAllCompetitions(competitions);
        } else {
          console.error("API returned unexpected data format. Using mock data instead.");
          setAllCompetitions(getMockCompetitions());
        }
      } catch (error) {
        console.error("Error fetching competitions:", error);
        toast.error("Failed to load competitions. Using sample data instead.");
        setAllCompetitions(getMockCompetitions());
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  // Calculate opinion event categories for filtering
  const categories = Array.from(new Set(events.map(event => event.category.toLowerCase())));

  useEffect(() => {
    // Update URL with game type
    const newParams = new URLSearchParams();
    
    if (activeGameType !== "equity") {
      newParams.set("gameType", activeGameType);
    }
    
    // Only add type parameter for equity games
    if (activeGameType === "equity" && activeTab !== "all") {
      newParams.set("type", activeTab);
    }
    
    const search = newParams.toString();
    navigate(`/competitions${search ? `?${search}` : ''}`, { replace: true });
  }, [activeGameType, activeTab, navigate]);

  useEffect(() => {
    // Handle URL parameters
    const gameType = queryParams.get("gameType") || "equity";
    setActiveGameType(gameType);
    
    // Only set activeTab if we're on equity game type
    if (gameType === "equity") {
      setActiveTab(queryParams.get("type") || "all");
    }
  }, [location.search]);

  useEffect(() => {
    // Filter competitions based on activeGameType and activeTab
    if (activeGameType === "equity") {
      let filtered = allCompetitions.filter(comp => comp.gameType === "equity");
      
      if (activeTab !== "all") {
        filtered = filtered.filter(comp => comp.type === activeTab);
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(comp =>
          comp.name.toLowerCase().includes(query) ||
          comp.description.toLowerCase().includes(query)
        );
      }
      
      // Sort filtered competitions
      filtered.sort((a, b) => {
        if (sortBy === "deadline") {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        } else if (sortBy === "prizePool") {
          return b.prizePool - a.prizePool;
        } else if (sortBy === "entryFee") {
          return a.entryFee - b.entryFee;
        } else if (sortBy === "popularity") {
          return (b.currentParticipants / b.maxParticipants) - (a.currentParticipants / a.maxParticipants);
        }
        return 0;
      });
      
      setFilteredCompetitions(filtered);
    }
  }, [activeGameType, activeTab, searchQuery, sortBy, allCompetitions]);
  
  // Filter opinion events
  useEffect(() => {
    if (activeGameType === "opinion") {
      let filtered = [...events];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(event =>
          event.question.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query)
        );
      }
      
      // Filter by tab
      if (activeOpinionTab !== "all") {
        filtered = filtered.filter(event => 
          activeOpinionTab === event.category.toLowerCase() || 
          activeOpinionTab === event.status
        );
      }
      
      setFilteredEvents(filtered);
    }
  }, [activeGameType, activeOpinionTab, searchQuery, events]);

  const handleOpinionTabChange = (value: string) => {
    setActiveOpinionTab(value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleGameTypeChange = (value: string) => {
    setActiveGameType(value);
    // Reset other filters when changing game type
    setSearchQuery("");
    
    if (value === "equity") {
      setActiveTab("all");
    } else if (value === "opinion") {
      setActiveOpinionTab("all");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="font-display text-4xl font-bold mb-4">Competitions</h1>
            <p className="text-muted-foreground text-lg">
              Browse available competitions and put your market knowledge to the test
            </p>
          </div>

          <Tabs value={activeGameType} onValueChange={handleGameTypeChange} className="mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="equity" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Equity
              </TabsTrigger>
              <TabsTrigger value="crypto" className="gap-2">
                <Bitcoin className="h-4 w-4" />
                Crypto
              </TabsTrigger>
              <TabsTrigger value="opinion" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Opinion
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search competitions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="w-full md:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deadline">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Closing Soon
                      </div>
                    </SelectItem>
                    <SelectItem value="prizePool">
                      <div className="flex items-center">
                        <Trophy className="mr-2 h-4 w-4" />
                        Prize Pool (High to Low)
                      </div>
                    </SelectItem>
                    <SelectItem value="entryFee">
                      <div className="flex items-center">
                        <span className="mr-2 font-semibold">₹</span>
                        Entry Fee (Low to High)
                      </div>
                    </SelectItem>
                    <SelectItem value="popularity">
                      <div className="flex items-center">
                        <span className="mr-2 font-semibold">👥</span>
                        Popularity
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Conditional UI based on active game type */}
          {activeGameType === "equity" && (
            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="custom">Custom Basket</TabsTrigger>
                <TabsTrigger value="predefined">Predefined Basket</TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          {activeGameType === "opinion" && (
            <Tabs value={activeOpinionTab} onValueChange={handleOpinionTabChange}>
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
          )}

          {/* Crypto Coming Soon */}
          {activeGameType === "crypto" ? (
            <div className="text-center py-16 my-4 bg-secondary/40 rounded-lg">
              <Bitcoin className="h-12 w-12 mx-auto mb-4 text-amber-500 animate-pulse" />
              <h3 className="text-2xl font-medium mb-2">Crypto Contests Coming Soon!</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                We're working hard to bring you exciting cryptocurrency trading contests. 
                Stay tuned for updates!
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Expected launch: Q2 2025</span>
              </div>
            </div>
          ) : activeGameType === "equity" && filteredCompetitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompetitions.map(competition => (
                <CompetitionCard key={competition.id} {...competition} />
              ))}
            </div>
          ) : activeGameType === "opinion" && filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map(event => (
                <OpinionEventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 my-4 bg-secondary/40 rounded-lg">
              <h3 className="text-xl font-medium mb-2">No competitions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search criteria
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Opinion Event Card Component
interface OpinionEventCardProps {
  event: OpinionEvent;
}

const OpinionEventCard = ({ event }: OpinionEventCardProps) => {
  const totalVotes = event.currentPool.yes + event.currentPool.no;
  const yesVotes = event.currentPool.yes / 100; // Converting from amount to people count
  const noVotes = event.currentPool.no / 100;
  
  return (
    <MorphCard className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline">{event.category}</Badge>
            <Badge variant={event.status === "active" ? "default" : "secondary"}>
              {event.status === "active" ? "Active" : "Resolved"}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mb-1">{event.question}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-primary mr-1" />
            <span>Closes: {new Date(event.deadline).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 text-mint-600 mr-1" />
            <span>{event.participants} participants</span>
          </div>
        </div>
        
        <div className="mt-1">
          <p className="text-xs font-medium mb-1">Current Distribution</p>
          <div className="flex justify-between text-xs mb-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Yes: {Math.round(yesVotes)} people</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-destructive"></div>
              <span>No: {Math.round(noVotes)} people</span>
            </div>
          </div>
          
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${(yesVotes / (yesVotes + noVotes)) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Entry Fee</p>
            <p className="font-medium">₹{event.minTradeAmount}</p>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <CheckCircle className="h-3 w-3" />
              Yes
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <XCircle className="h-3 w-3" />
              No
            </Button>
          </div>
        </div>
      </div>
    </MorphCard>
  );
};

export default Competitions;
