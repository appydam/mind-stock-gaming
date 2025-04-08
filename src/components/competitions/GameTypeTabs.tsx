import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Bitcoin, MessageSquare } from "lucide-react";

interface GameTypeTabsProps {
  activeGameType: string;
  onGameTypeChange: (value: string) => void;
}

const GameTypeTabs = ({ activeGameType, onGameTypeChange }: GameTypeTabsProps) => {
  return (
    <Tabs value={activeGameType} onValueChange={onGameTypeChange} className="mb-8">
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
  );
};

export default GameTypeTabs;
