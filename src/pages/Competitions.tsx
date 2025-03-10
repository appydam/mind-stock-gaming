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
import { Search, Filter, Trophy, Calendar } from "lucide-react";

const Competitions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const typeFromUrl = queryParams.get("type");

  const [activeTab, setActiveTab] = useState<string>(typeFromUrl || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [filteredCompetitions, setFilteredCompetitions] = useState<CompetitionProps[]>([]);
  const [allCompetitions, setAllCompetitions] = useState<CompetitionProps[]>([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const apiPath = '/api/competitions'; // For Vite

        // const response = await fetch("http://localhost:8082/competitions");
        const response = await fetch(apiPath, {
          method: "GET",
          credentials: "include", // Include credentials to send the stockplay cookie
        });
        console.log('response = ', response);
        const data = await response.json();
        if (data.code === 200 && data.data.competitions) {
          const competitions = data.data.competitions.map((comp: any) => ({
            id: comp.id.toString(),
            name: comp.name,
            description: comp.description,
            entryFee: comp.entry_fee,
            maxParticipants: comp.max_participants,
            currentParticipants: comp.current_participants,
            status: comp.status,
            prizePool: comp.current_participants * comp.entry_fee,
            deadline: new Date(new Date(comp.created_at).getTime() + 15 * 60 * 60 * 1000).toISOString(),
            type: comp.basket_type === "Custom Basket" ? "custom" : "predefined",
          }));
          setAllCompetitions(competitions);
        } else {
          console.error("Failed to fetch competitions:", data);
        }
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, []);

  useEffect(() => {
    if (typeFromUrl) {
      setActiveTab(typeFromUrl);
    }
  }, [typeFromUrl]);

  useEffect(() => {
    filterCompetitions();
  }, [activeTab, searchQuery, sortBy, allCompetitions]);

  const filterCompetitions = () => {
    let filtered = [...allCompetitions];

    // Filter by type
    if (activeTab !== "all") {
      filtered = filtered.filter(comp => comp.type === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(comp =>
        comp.name.toLowerCase().includes(query) ||
        comp.description.toLowerCase().includes(query)
      );
    }

    // Sort competitions
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
    navigate(`/competitions${value === "all" ? "" : `?type=${value}`}`);
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

          {/* Filters and Search */}
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

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="custom">Custom Basket</TabsTrigger>
              <TabsTrigger value="predefined">Predefined Basket</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Competitions Grid */}
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
