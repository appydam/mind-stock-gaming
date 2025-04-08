import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search, Filter, Trophy, Calendar } from "lucide-react";

interface CompetitionFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const CompetitionFilters = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: CompetitionFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search competitions..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <div className="w-full md:w-auto">
          <Select value={sortBy} onValueChange={onSortChange}>
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
  );
};

export default CompetitionFilters;
