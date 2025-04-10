
import { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProfileHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  overviewContent: ReactNode;
  transactionsContent: ReactNode;
}

const ProfileHeader = ({ 
  activeTab, 
  setActiveTab, 
  overviewContent, 
  transactionsContent 
}: ProfileHeaderProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList className="grid grid-cols-2 w-full max-w-md">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="transactions">
        {transactionsContent}
      </TabsContent>
    </Tabs>
  );
};

export default ProfileHeader;
