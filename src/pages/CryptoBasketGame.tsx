
import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, DollarSign, Calendar, Users, TrendingUp, PlusCircle, X } from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";
import { Input } from "@/components/ui/input";
import { BACKEND_HOST } from "@/constants/config";

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image?: string;
}

const CryptoBasketGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [selectedCryptos, setSelectedCryptos] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const competitionId = searchParams.get('id') || 'crypto-1';

  const competitionData = {
    id: competitionId,
    title: "Weekly Crypto Challenge",
    description: "Select 5 cryptocurrencies you believe will outperform over the next 7 days.",
    entryFee: 10,
    prizePool: 5000,
    participants: 287,
    startDate: "2023-09-25",
    endDate: "2023-10-02",
    maxSelectionsAllowed: 5
  };

  // Mock crypto data - in production, this would come from an API
  const availableCryptos: Crypto[] = [
    { id: "btc", symbol: "BTC", name: "Bitcoin" },
    { id: "eth", symbol: "ETH", name: "Ethereum" },
    { id: "bnb", symbol: "BNB", name: "Binance Coin" },
    { id: "sol", symbol: "SOL", name: "Solana" },
    { id: "ada", symbol: "ADA", name: "Cardano" },
    { id: "xrp", symbol: "XRP", name: "XRP" },
    { id: "dot", symbol: "DOT", name: "Polkadot" },
    { id: "doge", symbol: "DOGE", name: "Dogecoin" },
    { id: "avax", symbol: "AVAX", name: "Avalanche" },
    { id: "shib", symbol: "SHIB", name: "Shiba Inu" },
    { id: "ltc", symbol: "LTC", name: "Litecoin" },
    { id: "uni", symbol: "UNI", name: "Uniswap" },
    { id: "link", symbol: "LINK", name: "Chainlink" },
    { id: "matic", symbol: "MATIC", name: "Polygon" },
    { id: "algo", symbol: "ALGO", name: "Algorand" },
    { id: "atom", symbol: "ATOM", name: "Cosmos" },
    { id: "xlm", symbol: "XLM", name: "Stellar" },
    { id: "vet", symbol: "VET", name: "VeChain" },
    { id: "etc", symbol: "ETC", name: "Ethereum Classic" },
    { id: "fil", symbol: "FIL", name: "Filecoin" }
  ];

  const filteredCryptos = useMemo(() => {
    return availableCryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleCryptoSelectionsChange = (selections: Crypto[]) => {
    setSelectedCryptos(selections);
  };

  const handleJoinCompetition = async () => {
    if (selectedCryptos.length < competitionData.maxSelectionsAllowed) {
      toast({
        title: "Selection Incomplete",
        description: `Please select ${competitionData.maxSelectionsAllowed} cryptocurrencies for your basket.`,
        variant: "destructive"
      });
      return;
    }

    try {
      // In production, this would be an actual API call
      // const userId = Number(JSON.parse(localStorage.getItem("userId")));
      // const apiPath = BACKEND_HOST + 'enterCryptoCompetition';
      // const response = await fetch(apiPath, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     user_id: userId,
      //     contest_id: Number(competitionId),
      //     cryptos_in_basket: selectedCryptos.map(crypto => crypto.symbol),
      //   }),
      // });

      // Mock successful response
      toast({
        title: "Success!",
        description: "You've successfully joined the crypto competition.",
      });

      setTimeout(() => {
        navigate(`/competition-confirmation`);
      }, 1500);

    } catch (error) {
      console.error("API call failed:", error);
      toast({
        title: "Error",
        description: "Failed to join the competition. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddCrypto = (crypto: Crypto) => {
    if (selectedCryptos.length >= competitionData.maxSelectionsAllowed) {
      toast({
        title: "Maximum Selections Reached",
        description: `You can only select ${competitionData.maxSelectionsAllowed} cryptocurrencies.`,
        variant: "destructive"
      });
      return;
    }

    if (selectedCryptos.some(s => s.symbol === crypto.symbol)) {
      toast({
        title: "Crypto Already Selected",
        description: `You have already selected ${crypto.name}.`,
        variant: "destructive"
      });
      return;
    }

    const newSelections = [...selectedCryptos, crypto];
    setSelectedCryptos(newSelections);
    handleCryptoSelectionsChange(newSelections);
  };

  const handleRemoveCrypto = (cryptoId: string) => {
    const newSelections = selectedCryptos.filter(crypto => crypto.id !== cryptoId);
    setSelectedCryptos(newSelections);
    handleCryptoSelectionsChange(newSelections);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCryptos = filteredCryptos.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCryptos.length / pageSize);

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
                <Input
                  type="search"
                  placeholder="Search for a cryptocurrency..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  {paginatedCryptos.map(crypto => (
                    <MorphCard key={crypto.id} className="flex items-center justify-between p-3 animate-fade-in">
                      <div>
                        <div className="font-medium">{crypto.symbol}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[180px]">{crypto.name}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleAddCrypto(crypto)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </MorphCard>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  {selectedCryptos.length} of {competitionData.maxSelectionsAllowed} cryptocurrencies selected
                </div>

                {selectedCryptos.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {selectedCryptos.map(crypto => (
                      <MorphCard key={crypto.id} className="flex items-center justify-between p-3 animate-fade-in">
                        <div>
                          <div className="font-medium">{crypto.symbol}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[180px]">{crypto.name}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleRemoveCrypto(crypto.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </MorphCard>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                  <Button
                    size="lg"
                    className="w-full md:w-auto"
                    onClick={handleJoinCompetition}
                    disabled={selectedCryptos.length < competitionData.maxSelectionsAllowed}
                  >
                    Join Competition for ₹{competitionData.entryFee}
                  </Button>
                </div>
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
                      <p className="text-sm text-muted-foreground">Entry Fee</p>
                      <p className="font-medium">₹{competitionData.entryFee}</p>
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
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-gold-500 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Selection Requirement</p>
                      <p className="font-medium">{competitionData.maxSelectionsAllowed} cryptocurrencies</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h3 className="font-medium">How Scoring Works</h3>
                  <p className="text-sm text-muted-foreground">
                    Your score is calculated based on the average percentage return of your selected
                    cryptocurrencies over the competition period. The higher the return, the higher your ranking.
                  </p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h3 className="font-medium">Prize Distribution</h3>
                  <ul className="text-sm text-muted-foreground">
                    <li>1st Place: 40% of prize pool</li>
                    <li>2nd Place: 25% of prize pool</li>
                    <li>3rd Place: 15% of prize pool</li>
                    <li>4th-10th Place: 20% of prize pool distributed equally</li>
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

export default CryptoBasketGame;
