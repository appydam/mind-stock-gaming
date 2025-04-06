
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ContestType } from "@/data/mockProfileData";
import ContestCard from "./ContestCard";

interface ContestsListProps {
  participations: ContestType[];
  onEditStocks: (contest: ContestType) => void;
}

const ContestsList = ({ participations, onEditStocks }: ContestsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [contestType, setContestType] = useState<"all" | "equity" | "opinion">("all");
  const itemsPerPage = 3;

  // Filter contests by type if needed
  const filteredContests = contestType === "all" 
    ? participations 
    : participations.filter(contest => {
        const stocks = contest.stocks_in_basket;
        // Assuming opinion trading contests don't have stock symbols but have options like "Yes", "No"
        const isOpinion = stocks.some(item => item === "Yes" || item === "No" || item.startsWith("Option:"));
        return contestType === "opinion" ? isOpinion : !isOpinion;
      });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContests.length / itemsPerPage);

  const handleTypeChange = (value: string) => {
    setContestType(value as "all" | "equity" | "opinion");
    setCurrentPage(1); // Reset to first page when changing filter
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <ToggleGroup type="single" value={contestType} onValueChange={handleTypeChange}>
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="equity">Equity</ToggleGroupItem>
          <ToggleGroupItem value="opinion">Opinion</ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {filteredContests.length > 0 ? (
        <>
          <div className="space-y-4">
            {currentItems.map((contest) => (
              <ContestCard 
                key={contest.uniqueKey || contest.contest_id} 
                contest={contest} 
                onEditStocks={onEditStocks} 
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-secondary/40 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No Contests</h3>
          <p className="text-muted-foreground">
            You haven't participated in any contests yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContestsList;
