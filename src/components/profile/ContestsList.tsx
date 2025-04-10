
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ContestType } from "@/components/profile/data/mockProfileData";
import ContestCard from "./ContestCard";
import ShareModal from "./ShareModal";
import ContestShareCard from "./ContestShareCard";

interface ContestsListProps {
  participations: ContestType[];
  onEditStocks: (contest: ContestType) => void;
  isAuthenticated: boolean;
  hasUserContests: boolean;
}

const ContestsList = ({ participations, onEditStocks, isAuthenticated, hasUserContests }: ContestsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [contestType, setContestType] = useState<"all" | "equity" | "opinion">("all");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState<ContestType | null>(null);
  const itemsPerPage = 3;

  // Filter contests by type
  const filteredContests = contestType === "all" 
    ? participations 
    : participations.filter(contest => {
        const gameType = contest.gameType || "equity"; // Default to equity if not specified
        return contestType === gameType;
      });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContests.length / itemsPerPage);

  const handleTypeChange = (value: string) => {
    if (value) {
      setContestType(value as "all" | "equity" | "opinion");
      setCurrentPage(1); // Reset to first page when changing filter
    }
  };

  const handleShareContest = (contest: ContestType) => {
    setSelectedContest(contest);
    setIsShareModalOpen(true);
  };

  // Custom message based on authentication status and contests availability
  const getEmptyMessage = () => {
    if (isAuthenticated && !hasUserContests) {
      return (
        <>
          <h3 className="text-xl font-medium mb-2">No Contests</h3>
          <p className="text-muted-foreground">
            🚀 Play some contests and make your profile yourself! 🎯
          </p>
        </>
      );
    }
    
    return (
      <>
        <h3 className="text-xl font-medium mb-2">No Contests</h3>
        <p className="text-muted-foreground">
          You haven't participated in any contests yet.
        </p>
      </>
    );
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
                onShare={handleShareContest}
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
          {getEmptyMessage()}
        </div>
      )}

      {/* Share Modal */}
      {selectedContest && (
        <ShareModal 
          open={isShareModalOpen} 
          onOpenChange={setIsShareModalOpen}
          title="Share Contest Achievement"
          shareText={`I ${selectedContest.returns >= 0 ? 'made' : 'lost'} ${Math.abs(selectedContest.returns).toFixed(2)}% on ${selectedContest.contest_name} contest at MindStock!`}
        >
          <ContestShareCard contest={selectedContest} />
        </ShareModal>
      )}
    </div>
  );
};

export default ContestsList;
