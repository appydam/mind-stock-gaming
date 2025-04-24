import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CompetitionProps, OpinionEvent, PolyContest } from "@/types/competitions";
import { fetchCompetitionsData } from "@/services/competitionsService";
import { fetchPolyContests } from "@/services/polyContestsService";
import { fetchGeoQuestContests } from "@/services/geoQuestService";
import GameTypeTabs from "@/components/competitions/GameTypeTabs";
import EquityCompetitionTabs from "@/components/competitions/EquityCompetitionTabs";
import OpinionEventTabs from "@/components/competitions/OpinionEventTabs";
import PolyContestTabs from "@/components/competitions/PolyContestTabs";
import CompetitionFilters from "@/components/competitions/CompetitionFilters";
import CompetitionListDisplay from "@/components/competitions/CompetitionListDisplay";
import GeoQuestTabs from "@/components/competitions/GeoQuestTabs";
import GeoQuestCard from "@/components/competitions/GeoQuestCard";
import { Globe } from "lucide-react";

const Competitions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const gameTypeFromUrl = queryParams.get("gameType");

  const [activeGameType, setActiveGameType] = useState<string>(gameTypeFromUrl || "equity");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  
  const [equityCompetitions, setEquityCompetitions] = useState<CompetitionProps[]>([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState<CompetitionProps[]>([]);
  const [opinionEvents, setOpinionEvents] = useState<OpinionEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<OpinionEvent[]>([]);
  const [polyContests, setPolyContests] = useState<PolyContest[]>([]);
  const [filteredPolyContests, setFilteredPolyContests] = useState<PolyContest[]>([]);
  const [geoQuestContests, setGeoQuestContests] = useState<any[]>([]);
  const [filteredGeoQuestContests, setFilteredGeoQuestContests] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<string>(
    activeGameType === "equity" ? (queryParams.get("type") || "all") : "all"
  );
  const [activeOpinionTab, setActiveOpinionTab] = useState<string>("all");
  const [activePolyTab, setActivePolyTab] = useState<string>("all");
  const [activeGeoQuestTab, setActiveGeoQuestTab] = useState<string>("all");

  const opinionCategories = Array.from(
    new Set(opinionEvents.map(event => event.category.toLowerCase()))
  );

  const polyCategories = Array.from(
    new Set(polyContests.map(contest => contest.category.toLowerCase()))
  );

  const geoQuestThemes = Array.from(
    new Set(geoQuestContests.map(contest => contest.theme.toLowerCase()))
  );

  useEffect(() => {
    const loadCompetitionsData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { equityCompetitions: equity, opinionEvents: opinion, error: apiError } = 
          await fetchCompetitionsData();
        
        setEquityCompetitions(equity);
        setOpinionEvents(opinion);
        
        if (apiError) {
          setError(apiError);
        }
        
        if (activeGameType === "poly") {
          const { polyContests: poly, error: polyError } = await fetchPolyContests();
          setPolyContests(poly);
          
          if (polyError) {
            setError(polyError);
          }
        }
        
        if (activeGameType === "geoquest") {
          const { contests, error: geoQuestError } = await fetchGeoQuestContests();
          setGeoQuestContests(contests);
          
          if (geoQuestError) {
            setError(geoQuestError);
          }
        }
      } catch (err) {
        console.error("Error loading competitions:", err);
        setError("Failed to load competitions data");
      } finally {
        setIsLoading(false);
      }
    };

    loadCompetitionsData();
  }, [activeGameType]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (activeGameType !== "equity") {
      newParams.set("gameType", activeGameType);
    }
    
    if (activeGameType === "equity" && activeTab !== "all") {
      newParams.set("type", activeTab);
    }
    
    const search = newParams.toString();
    navigate(`/competitions${search ? `?${search}` : ''}`, { replace: true });
  }, [activeGameType, activeTab, navigate]);

  useEffect(() => {
    const gameType = queryParams.get("gameType") || "equity";
    setActiveGameType(gameType);
    
    if (gameType === "equity") {
      setActiveTab(queryParams.get("type") || "all");
    }
  }, [location.search]);

  useEffect(() => {
    if (activeGameType === "equity") {
      let filtered = [...equityCompetitions];
      
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
    }
  }, [activeGameType, activeTab, searchQuery, sortBy, equityCompetitions]);

  useEffect(() => {
    if (activeGameType === "opinion") {
      let filtered = [...opinionEvents];
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(event =>
          event.question.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query)
        );
      }
      
      if (activeOpinionTab !== "all") {
        filtered = filtered.filter(event => 
          activeOpinionTab === event.category.toLowerCase() || 
          activeOpinionTab === event.status
        );
      }
      
      setFilteredEvents(filtered);
    }
  }, [activeGameType, activeOpinionTab, searchQuery, opinionEvents]);

  useEffect(() => {
    if (activeGameType === "poly") {
      let filtered = [...polyContests];
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(contest =>
          contest.title.toLowerCase().includes(query) ||
          contest.description.toLowerCase().includes(query) ||
          contest.category.toLowerCase().includes(query)
        );
      }
      
      if (activePolyTab !== "all") {
        filtered = filtered.filter(contest => 
          activePolyTab === contest.category.toLowerCase() || 
          activePolyTab === contest.status
        );
      }
      
      filtered.sort((a, b) => {
        if (sortBy === "deadline") {
          return new Date(a.end_time).getTime() - new Date(b.end_time).getTime();
        } else if (sortBy === "popularity") {
          return b.participants - a.participants;
        } else if (sortBy === "volume") {
          return b.total_volume - a.total_volume;
        }
        return 0;
      });
      
      setFilteredPolyContests(filtered);
    }
  }, [activeGameType, activePolyTab, searchQuery, sortBy, polyContests]);

  useEffect(() => {
    if (activeGameType === "geoquest") {
      let filtered = [...geoQuestContests];
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(contest =>
          contest.title.toLowerCase().includes(query) ||
          contest.theme.toLowerCase().includes(query)
        );
      }
      
      if (activeGeoQuestTab === "active" || activeGeoQuestTab === "upcoming" || activeGeoQuestTab === "completed") {
        filtered = filtered.filter(contest => contest.status === activeGeoQuestTab);
      } else if (activeGeoQuestTab !== "all") {
        filtered = filtered.filter(contest => 
          contest.theme.toLowerCase() === activeGeoQuestTab
        );
      }
      
      filtered.sort((a, b) => {
        if (sortBy === "deadline") {
          return new Date(a.end_time).getTime() - new Date(b.end_time).getTime();
        } else if (sortBy === "prizePool") {
          return b.prize_pool - a.prize_pool;
        } else if (sortBy === "entryFee") {
          return a.entry_fee - b.entry_fee;
        }
        return 0;
      });
      
      setFilteredGeoQuestContests(filtered);
    }
  }, [activeGameType, activeGeoQuestTab, searchQuery, sortBy, geoQuestContests]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleGameTypeChange = (value: string) => {
    setActiveGameType(value);
    setSearchQuery("");
    
    if (value === "equity") {
      setActiveTab("all");
    } else if (value === "opinion") {
      setActiveOpinionTab("all");
    } else if (value === "poly") {
      setActivePolyTab("all");
    } else if (value === "geoquest") {
      setActiveGeoQuestTab("all");
    }
  };

  const handleOpinionTabChange = (value: string) => {
    setActiveOpinionTab(value);
  };

  const handlePolyTabChange = (value: string) => {
    setActivePolyTab(value);
  };

  const handleGeoQuestTabChange = (value: string) => {
    setActiveGeoQuestTab(value);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleOpinionAnswerSubmitted = async () => {
    try {
      const { opinionEvents: freshEvents } = await fetchCompetitionsData();
      setOpinionEvents(freshEvents);
    } catch (err) {
      console.error("Failed to refresh data after submission:", err);
    }
  };

  const handlePolyBetPlaced = async () => {
    try {
      const { polyContests: freshContests } = await fetchPolyContests();
      setPolyContests(freshContests);
    } catch (err) {
      console.error("Failed to refresh data after bet placement:", err);
    }
  };

  const handleGeoQuestContestJoined = async () => {
    try {
      const { contests } = await fetchGeoQuestContests();
      setGeoQuestContests(contests);
    } catch (err) {
      console.error("Failed to refresh data after joining contest:", err);
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

          <CompetitionFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />

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
              categories={opinionCategories}
            />
          )}

          {activeGameType === "poly" && (
            <PolyContestTabs
              activePolyTab={activePolyTab}
              onPolyTabChange={handlePolyTabChange}
              categories={polyCategories}
            />
          )}

          {activeGameType === "geoquest" && (
            <GeoQuestTabs
              activeGeoQuestTab={activeGeoQuestTab}
              onGeoQuestTabChange={handleGeoQuestTabChange}
              categories={geoQuestThemes}
            />
          )}

          {activeGameType === "geoquest" && (
            <>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3 p-4 border rounded-lg bg-card">
                      <div className="h-40 w-full rounded-xl bg-gray-200 animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                      </div>
                      <div className="h-10 w-full bg-gray-200 animate-pulse rounded mt-auto" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-6 my-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/30 mb-8">
                  <h3 className="text-xl font-medium mb-2">Error loading contests</h3>
                  <p className="text-sm">{error}</p>
                </div>
              ) : filteredGeoQuestContests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredGeoQuestContests.map((contest) => (
                    <GeoQuestCard
                      key={contest.id}
                      contest={contest}
                      onContestJoined={handleGeoQuestContestJoined}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 my-4 bg-secondary/40 rounded-lg border">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="text-xl font-medium mb-2">No GeoQuest contests found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search criteria.
                  </p>
                </div>
              )}
            </>
          )}

          {activeGameType !== "geoquest" && (
            <CompetitionListDisplay
              activeGameType={activeGameType}
              filteredCompetitions={filteredCompetitions}
              filteredEvents={filteredEvents}
              filteredPolyContests={filteredPolyContests}
              isLoading={isLoading}
              error={error}
              onOpinionAnswerSubmitted={handleOpinionAnswerSubmitted}
              onPolyBetPlaced={handlePolyBetPlaced}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Competitions;
