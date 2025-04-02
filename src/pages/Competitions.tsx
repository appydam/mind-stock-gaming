
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
import { Search, Filter, Trophy, Calendar, TrendingUp, Bitcoin, MessageSquare } from "lucide-react";
import { BACKEND_HOST } from "@/constants/config";
import { toast } from "sonner";

const Competitions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const typeFromUrl = queryParams.get("type");
  const gameTypeFromUrl = queryParams.get("gameType");

  const [activeTab, setActiveTab] = useState<string>(typeFromUrl || "all");
  const [activeGameType, setActiveGameType] = useState<string>(gameTypeFromUrl || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [filteredCompetitions, setFilteredCompetitions] = useState<CompetitionProps[]>([]);
  const [allCompetitions, setAllCompetitions] = useState<CompetitionProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define the mock competitions function only once
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
        id: "crypto-1",
        name: "Alt Coin Championship",
        description: "Select 5 alternative coins that will outperform Bitcoin",
        entryFee: 150,
        maxParticipants: 400,
        currentParticipants: 287,
        status: "open",
        prizePool: 38000,
        deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        type: "custom",
        gameType: "crypto"
      },
      {
        id: "crypto-2",
        name: "DeFi Protocol Performance",
        description: "Predict which DeFi tokens will lead the market",
        entryFee: 100,
        maxParticipants: 600,
        currentParticipants: 412,
        status: "open",
        prizePool: 51000,
        deadline: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
        type: "predefined",
        gameType: "crypto"
      },
      {
        id: "crypto-3",
        name: "Top 10 Crypto Challenge",
        description: "Select from the top 10 cryptocurrencies by market cap",
        entryFee: 200,
        maxParticipants: 300,
        currentParticipants: 189,
        status: "open",
        prizePool: 37800,
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        type: "predefined",
        gameType: "crypto"
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

  useEffect(() => {
    if (typeFromUrl) {
      setActiveTab(typeFromUrl);
    }
    if (gameTypeFromUrl) {
      setActiveGameType(gameTypeFromUrl);
    }
  }, [typeFromUrl, gameTypeFromUrl]);

  useEffect(() => {
    filterCompetitions();
  }, [activeTab, activeGameType, searchQuery, sortBy, allCompetitions]);

  const filterCompetitions = () => {
    let filtered = [...allCompetitions];

    if (activeGameType !== "all") {
      filtered = filtered.filter(comp => comp.gameType === activeGameType);
    }

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
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newParams = new URLSearchParams(location.search);
    if (value === "all") {
      newParams.delete("type");
    } else {
      newParams.set("type", value);
    }
    navigate(`/competitions?${newParams.toString()}`);
  };

  const handleGameTypeChange = (value: string) => {
    setActiveGameType(value);
    const newParams = new URLSearchParams(location.search);
    if (value === "all") {
      newParams.delete("gameType");
    } else {
      newParams.set("gameType", value);
    }
    navigate(`/competitions?${newParams.toString()}`);
  };

  // Removed the duplicate getMockCompetitions function that was here

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
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
              <TabsTrigger value="all" className="gap-2">
                All Games
              </TabsTrigger>
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

          {activeGameType !== "opinion" && (
            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="custom">Custom Basket</TabsTrigger>
                <TabsTrigger value="predefined">Predefined Basket</TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          {filteredCompetitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompetitions.map(competition => (
                <CompetitionCard key={competition.id} {...competition} />
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

export default Competitions;
