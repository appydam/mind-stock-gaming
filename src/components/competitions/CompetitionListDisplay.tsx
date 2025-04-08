import CompetitionCard from "@/components/CompetitionCard"; // Remove type import
import OpinionEventCard from "@/components/OpinionEventCard"; // Remove type import
import { CompetitionProps, OpinionEvent } from "@/types/competitions"; // Import types from central file
import { Bitcoin as BitcoinIcon, Clock } from "lucide-react"; 
import { Skeleton } from "@/components/ui/skeleton"; 

interface CompetitionListDisplayProps {
  activeGameType: string;
  filteredCompetitions: CompetitionProps[];
  filteredEvents: OpinionEvent[];
  isLoading: boolean; 
  error: string | null; 
}

const CompetitionListDisplay = ({
  activeGameType,
  filteredCompetitions,
  filteredEvents,
  isLoading,
  error,
}: CompetitionListDisplayProps) => {
  
  // Loading State
  if (isLoading) {
    // Show skeletons based on the expected layout
    const skeletonCount = activeGameType === 'equity' ? 3 : 2;
    const gridClasses = activeGameType === 'equity' 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
      : "grid grid-cols-1 md:grid-cols-2 gap-6";
      
    return (
      <div className={gridClasses}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3 p-4 border rounded-lg bg-card">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
             <Skeleton className="h-8 w-[100px] mt-auto" />
          </div>
        ))}
      </div>
    );
  }

  // Error State
  // Note: The main component still handles setting mock data on error, 
  // but we show a message if error state was explicitly set.
  if (error && !isLoading) { // Only show error if not loading (avoid brief flash)
     return (
      <div className="text-center py-12 my-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/30">
        <h3 className="text-xl font-medium mb-2">Error loading competitions</h3>
        <p className="text-sm">{error}</p>
        <p className="text-sm mt-1">Displaying sample data instead.</p> 
      </div>
    );
  }

  // Crypto Coming Soon
  if (activeGameType === "crypto") {
    return (
      <div className="text-center py-16 my-4 bg-secondary/40 rounded-lg border">
        <BitcoinIcon className="h-12 w-12 mx-auto mb-4 text-amber-500 animate-pulse" />
        <h3 className="text-2xl font-medium mb-2">Crypto Contests Coming Soon!</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          We're working hard to bring you exciting cryptocurrency trading contests. 
          Stay tuned for updates!
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Expected launch: Q2 2025</span>
        </div>
      </div>
    );
  }

  // Equity List
  if (activeGameType === "equity") {
    if (filteredCompetitions.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompetitions.map(competition => (
            <CompetitionCard key={competition.id} {...competition} />
          ))}
        </div>
      );
    } else {
      // No Equity competitions found message
      return (
        <div className="text-center py-12 my-4 bg-secondary/40 rounded-lg border">
          <h3 className="text-xl font-medium mb-2">No equity competitions found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search criteria.
          </p>
        </div>
      );
    }
  }

  // Opinion List
  if (activeGameType === "opinion") {
    if (filteredEvents.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <OpinionEventCard key={event.id} event={event} />
          ))}
        </div>
      );
    } else {
       // No Opinion events found message
      return (
        <div className="text-center py-12 my-4 bg-secondary/40 rounded-lg border">
          <h3 className="text-xl font-medium mb-2">No opinion events found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search criteria.
          </p>
        </div>
      );
    }
  }

  // Fallback (shouldn't normally be reached if activeGameType is handled)
   if (!isLoading) { // Avoid showing this during initial load
    return (
      <div className="text-center py-12 my-4">
          <p>Select a game type to view competitions.</p>
        </div>
    );
  }

  return null; // Return null during loading or if no other condition matches
};

export default CompetitionListDisplay;
// Remove type re-export
