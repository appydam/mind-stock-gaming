
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ProfileHeader = ({ activeTab, setActiveTab }: ProfileHeaderProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList className="grid grid-cols-2 w-full max-w-md">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ProfileHeader;
