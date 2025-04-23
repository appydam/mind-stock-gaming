
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PolyContestTabsProps {
  activePolyTab: string;
  onPolyTabChange: (value: string) => void;
  categories: string[];
}

const PolyContestTabs = ({ activePolyTab, onPolyTabChange, categories }: PolyContestTabsProps) => {
  return (
    <div className="mb-6">
      <Tabs value={activePolyTab} onValueChange={onPolyTabChange} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 w-full h-auto bg-transparent">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          
          {/* Status-based tabs */}
          <TabsTrigger 
            value="active" 
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Active
          </TabsTrigger>
          <TabsTrigger 
            value="resolved" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Resolved
          </TabsTrigger>

          {/* Category-based tabs */}
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category.toLowerCase()} 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white capitalize"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PolyContestTabs;
