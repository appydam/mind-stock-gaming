
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GeoQuestTabsProps {
  activeGeoQuestTab: string;
  onGeoQuestTabChange: (value: string) => void;
  categories: string[];
}

const GeoQuestTabs = ({ 
  activeGeoQuestTab, 
  onGeoQuestTabChange,
  categories = []
}: GeoQuestTabsProps) => {
  return (
    <div className="mb-6">
      <Tabs value={activeGeoQuestTab} onValueChange={onGeoQuestTabChange}>
        <TabsList className="w-full flex flex-wrap">
          <TabsTrigger value="all">All Contests</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          
          {categories.map((category) => (
            <TabsTrigger key={category} value={category.toLowerCase()}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default GeoQuestTabs;
