import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EquityCompetitionTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const EquityCompetitionTabs = ({ activeTab, onTabChange }: EquityCompetitionTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-8">
      <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="custom">Custom Basket</TabsTrigger>
        <TabsTrigger value="predefined">Predefined Basket</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default EquityCompetitionTabs;
