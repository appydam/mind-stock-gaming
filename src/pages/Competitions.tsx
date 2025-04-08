
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search, Filter, Trophy, Calendar } from "lucide-react";
import { BACKEND_HOST } from "@/constants/config";
import { toast } from "sonner";
import { CompetitionProps, OpinionEvent, FullCompetitionsApiResponse } from "@/types/competitions";
import GameTypeTabs from "@/components/competitions/GameTypeTabs";
import EquityCompetitionTabs from "@/components/competitions/EquityCompetitionTabs";
import OpinionEventTabs from "@/components/competitions/OpinionEventTabs";
import CompetitionListDisplay from "@/components/competitions/CompetitionListDisplay";

const Competitions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const gameTypeFromUrl = queryParams.get("gameType");

  // State for UI control
  const [activeGameType, setActiveGameType] = useState<string>(gameTypeFromUrl || "equity");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Competition data states
  const [filteredCompetitions, setFilteredCompetitions] = useState<CompetitionProps[]>([]);
  const [allCompetitions, setAllCompetitions] = useState<CompetitionProps[]>([]);
  const [activeTab, setActiveTab] = useState<string>(queryParams.get("type") || "all");
  
  // Opinion events state
  const [events, setEvents] = useState<OpinionEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<OpinionEvent[]>([]);
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
      }
    ];
  };

  const getMockEvents = (): OpinionEvent[] => {
    return [
      {
        id: "ev-1",
        question: "Will Mumbai Indians win their next IPL match?",
        description: "Predict if Mumbai Indians will win their upcoming match against Chennai Super Kings on May 15th, 2024.",
        category: "Sports",
        deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        minTradeAmount: 0.5,
        currentPool: {
          yes: 150,
          no: 120
        },
        participants: 270,
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
          yes: 250,
          no: 300
        },
        participants: 550,
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
          yes: 450,
          no: 320
        },
        participants: 770,
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
          yes: 180,
          no: 220
        },
        participants: 400,
        status: "active"
      }
    ];
  };

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${BACKEND_HOST}isAuthenticated`, {
          method: "GET",
          credentials: "include",
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.isAuthenticated === true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchCompetitions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiPath = `${BACKEND_HOST}getAllComp`;
        console.log("Fetching competitions from:", apiPath);
        
        const response = await fetch(apiPath, {
          method: "GET",
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }
        
        const data: FullCompetitionsApiResponse = await response.json();
        console.log("API Response:", data);
        
        if (data.code === 200 && data.data) {
          // Process equity competitions
          const equityContests = data.data.equity_contests?.map(comp => ({
            id: String(comp.id),
            name: comp.name,
            description: comp.description,
            entryFee: comp.entry_fee,
            maxParticipants: comp.max_participants,
            currentParticipants: comp.current_participants,
            status: comp.status,
            prizePool: comp.max_participants * comp.entry_fee, // Calculate prize pool
            deadline: new Date(comp.start_time).toISOString(),
            type: comp.basket_type === "Custom Basket" ? "custom" : "predefined",
            gameType: "equity"
          })) || [];
          
          setAllCompetitions(equityContests);

          // Process opinion events
          const opinionEvents = data.data.opinions_contests?.map(event => ({
            id: String(event.id),
            question: event.name,
            description: event.description,
            category: event.tag,
            deadline: new Date(event.registeration_deadline).toISOString(),
            minTradeAmount: event.entry_fee,
            currentPool: {
              yes: event.participant_meta_data?.agreed || 0,
              no: event.participant_meta_data?.disagreed || 0
            },
            participants: event.participant_meta_data?.totalParticipants || 0,
            status: "active", // Default to active since API doesn't provide status
            outcome: null
          })) || [];
          
          setEvents(opinionEvents);
        } else {
          throw new Error("API returned unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching competitions:", error);
        toast.error("Failed to load competitions. Using sample data instead.");
        setError("Network or server error. Using sample data instead.");
        
        // Use mock data if API fails
        setAllCompetitions(getMockCompetitions());
        setEvents(getMockEvents());
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  // Calculate opinion event categories for filtering
  const categories = Array.from(new Set(events.map(event => event.category.toLowerCase())));

  // Update URL with game type and tab parameters
  useEffect(() => {
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

  // Handle URL parameters when page loads
  useEffect(() => {
    const gameType = queryParams.get("gameType") || "equity";
    setActiveGameType(gameType);
    
    // Only set activeTab if we're on equity game type
    if (gameType === "equity") {
      setActiveTab(queryParams.get("type") || "all");
    }
  }, [location.search]);

  // Filter equity competitions based on activeGameType, activeTab, searchQuery, and sortBy
  useEffect(() => {
    if (activeGameType === "equity") {
      let filtered = [...allCompetitions];
      
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

          <GameTypeTabs 
            activeGameType={activeGameType} 
            onGameTypeChange={handleGameTypeChange} 
          />

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
            <EquityCompetitionTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          )}

          {activeGameType === "opinion" && (
            <OpinionEventTabs 
              activeOpinionTab={activeOpinionTab}
              onOpinionTabChange={handleOpinionTabChange}
              categories={categories}
            />
          )}

          <CompetitionListDisplay 
            activeGameType={activeGameType}
            filteredCompetitions={filteredCompetitions}
            filteredEvents={filteredEvents}
            isLoading={isLoading}
            error={error}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Competitions;
