
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OpinionEventTabsProps {
  activeOpinionTab: string;
  onOpinionTabChange: (value: string) => void;
  categories: string[]; // Pass categories as a prop
}

const OpinionEventTabs = ({ 
  activeOpinionTab, 
  onOpinionTabChange, 
  categories 
}: OpinionEventTabsProps) => {
  return (
    <Tabs value={activeOpinionTab} onValueChange={onOpinionTabChange}>
      <TabsList className="mb-4 w-full overflow-x-auto justify-start sm:justify-center"> {/* Added overflow and justify */}
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
  );
};

export default OpinionEventTabs;
