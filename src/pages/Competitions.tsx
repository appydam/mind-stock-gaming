
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CompetitionProps, OpinionEvent } from "@/types/competitions";
import { fetchCompetitionsData } from "@/services/competitionsService";
import GameTypeTabs from "@/components/competitions/GameTypeTabs";
import EquityCompetitionTabs from "@/components/competitions/EquityCompetitionTabs";
import OpinionEventTabs from "@/components/competitions/OpinionEventTabs";
import CompetitionFilters from "@/components/competitions/CompetitionFilters";
import CompetitionListDisplay from "@/components/competitions/CompetitionListDisplay";

const Competitions = () => {
  // Router related hooks
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const gameTypeFromUrl = queryParams.get("gameType");

  // State management
  const [activeGameType, setActiveGameType] = useState<string>(gameTypeFromUrl || "equity");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [equityCompetitions, setEquityCompetitions] = useState<CompetitionProps[]>([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState<CompetitionProps[]>([]);
  const [opinionEvents, setOpinionEvents] = useState<OpinionEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<OpinionEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Settings for equity and opinion contests
  const [activeTab, setActiveTab] = useState<string>(
    activeGameType === "equity" ? (queryParams.get("type") || "all") : "all"
  );
  const [activeOpinionTab, setActiveOpinionTab] = useState<string>("all");

  // Calculate opinion event categories for filtering
  const categories = Array.from(
    new Set(opinionEvents.map(event => event.category.toLowerCase()))
  );

  // Fetch competitions data
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
      } catch (err) {
        console.error("Error loading competitions:", err);
        setError("Failed to load competitions data");
      } finally {
        setIsLoading(false);
      }
    };

    loadCompetitionsData();
  }, []);

  // Handle URL params and update
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

  // Sync with URL parameters
  useEffect(() => {
    // Handle URL parameters
    const gameType = queryParams.get("gameType") || "equity";
    setActiveGameType(gameType);
    
    // Only set activeTab if we're on equity game type
    if (gameType === "equity") {
      setActiveTab(queryParams.get("type") || "all");
    }
  }, [location.search]);

  // Filter competitions based on activeGameType and activeTab
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
  }, [activeGameType, activeTab, searchQuery, sortBy, equityCompetitions]);
  
  // Filter opinion events
  useEffect(() => {
    if (activeGameType === "opinion") {
      let filtered = [...opinionEvents];
      
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
  }, [activeGameType, activeOpinionTab, searchQuery, opinionEvents]);

  // Event handlers
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

  const handleOpinionTabChange = (value: string) => {
    setActiveOpinionTab(value);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  // Handle opinion answer submission - refetch data
  const handleOpinionAnswerSubmitted = async () => {
    try {
      const { opinionEvents: freshEvents } = await fetchCompetitionsData();
      setOpinionEvents(freshEvents);
    } catch (err) {
      console.error("Failed to refresh data after submission:", err);
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
            onOpinionAnswerSubmitted={handleOpinionAnswerSubmitted}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Competitions;
