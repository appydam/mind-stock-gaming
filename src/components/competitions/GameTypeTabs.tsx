
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Bitcoin, MessageSquare, BarChart2, Globe } from "lucide-react";

interface GameTypeTabsProps {
  activeGameType: string;
  onGameTypeChange: (value: string) => void;
}

const GameTypeTabs = ({ activeGameType, onGameTypeChange }: GameTypeTabsProps) => {
  return (
    <Tabs value={activeGameType} onValueChange={onGameTypeChange} className="mb-8">
      <TabsList className="grid grid-cols-5 w-full max-w-xl mx-auto">
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
        <TabsTrigger value="poly" className="gap-2">
          <BarChart2 className="h-4 w-4" />
          Poly
        </TabsTrigger>
        <TabsTrigger value="geoquest" className="gap-2">
          <Globe className="h-4 w-4" />
          GeoQuest
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default GameTypeTabs;
