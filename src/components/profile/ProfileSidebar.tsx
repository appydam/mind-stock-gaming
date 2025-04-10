import { useState, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MorphCard from "@/components/ui/MorphCard";
import { Wallet, Info, User, Mail, Phone, Clock, PlusCircle, MinusCircle, Share2, Copy, ExternalLink, Download } from "lucide-react";
import ShareModal from './ShareModal';
import ProfileShareCard from './ProfileShareCard';

interface User {
  name: string;
  emailId: string;
  age: string;
  phoneNo: string;
  username: string;
  profileImage: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  virtualBalance?: number;
}

interface ProfileSidebarProps {
  user: User;
  onDepositClick: () => void;
  onWithdrawClick: () => void;
  totalProfit?: number;
  completedContests?: number;
  activeContests?: number;
}

const ProfileSidebar = ({ 
  user, 
  onDepositClick, 
  onWithdrawClick,
  totalProfit = 0,
  completedContests = 0,
  activeContests = 0
}: ProfileSidebarProps) => {
  const [isSharingEnabled, setIsSharingEnabled] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const handleShareLink = () => {
    if (!isLinkGenerated) {
      const userId = user.username || Math.random().toString(36).substring(2, 8);
      const generatedLink = `${window.location.origin}/shared-profile/${userId}`;
      setShareLink(generatedLink);
      setIsLinkGenerated(true);
    } else {
      navigator.clipboard.writeText(shareLink);
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to clipboard.",
        variant: "default",
      });
    }
  };

  const handleToggleSharing = (checked: boolean) => {
    setIsSharingEnabled(checked);
    if (checked && !isLinkGenerated) {
      const userId = user.username || Math.random().toString(36).substring(2, 8);
      const generatedLink = `${window.location.origin}/shared-profile/${userId}`;
      setShareLink(generatedLink);
      setIsLinkGenerated(true);
    }

    toast({
      title: checked ? "Profile sharing enabled" : "Profile sharing disabled",
      description: checked
        ? "Your profile is now publicly accessible via share link"
        : "Your profile is now private",
      variant: "default",
    });
  };

  const handleShareProfile = () => {
    setIsShareModalOpen(true);
  };

  
  return (
    <MorphCard className="p-6 sticky top-24">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage
            src={user.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt="User Avatar"
          />
          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground">@{user.username}</p>

        <div className="flex mt-2 space-x-2">
          <Badge variant="secondary">Trader</Badge>
          {user.isActive && <Badge variant="outline" className="text-green-500 border-green-200">Active</Badge>}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-3 text-xs"
          onClick={handleShareProfile}
        >
          <Share2 className="h-3.5 w-3.5 mr-1.5" />
          Share Profile
        </Button>
      </div>

      
      <MorphCard className="p-4 mb-6 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Wallet className="h-5 w-5 mr-2 text-primary" />
            <h3 className="text-sm font-medium">Available Balance</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Your available balance for participating in contests</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-3xl font-bold text-primary">₹{user.balance.toLocaleString()}</p>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button
            variant="default"
            className="w-full bg-green-500 hover:bg-green-700 flex items-center justify-center"
            onClick={onDepositClick}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Deposit
          </Button>
          <Button
            variant="outline"
            className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 flex items-center justify-center"
            onClick={onWithdrawClick}
          >
            <MinusCircle className="h-4 w-4 mr-2" />
            Withdraw
          </Button>
        </div>
      </MorphCard>

      <Separator className="my-4" />

      <div className="space-y-4">
        <div className="flex items-center">
          <User className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Mail className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.emailId}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Phone className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{user.phoneNo || 'Not provided'}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Clock className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <p className="text-sm text-muted-foreground">Member Since</p>
            <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Share Your Profile</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="sharing-toggle"
              checked={isSharingEnabled}
              onCheckedChange={handleToggleSharing}
            />
            <Label htmlFor="sharing-toggle">Enable Profile Sharing</Label>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Turn on to share your profile publicly</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {isLinkGenerated && (
          <div className="mt-2 p-3 bg-muted rounded-md flex items-center justify-between">
            <p className="text-sm truncate">{shareLink}</p>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2"
              onClick={() => {
                navigator.clipboard.writeText(shareLink);
                toast({
                  title: "Link copied!",
                  description: "Profile link has been copied to clipboard.",
                  variant: "default",
                });
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Button
          onClick={handleShareLink}
          className={`w-full ${isLinkGenerated ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
          disabled={!isSharingEnabled}
        >
          {isLinkGenerated ? (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4 mr-2" />
              Generate Share Link
            </>
          )}
        </Button>

        {isSharingEnabled && isLinkGenerated && (
          <a
            href={shareLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-blue-500 hover:underline text-sm mt-1"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Preview your public profile
          </a>
        )}
      </div>

      
      <ShareModal 
        open={isShareModalOpen} 
        onOpenChange={setIsShareModalOpen}
        title="Share Your Profile"
        shareText={`Check out my trading profile on MindStock! ${totalProfit >= 0 ? 'Made' : 'Currently at'} ${Math.abs(totalProfit).toFixed(2)}₹ overall.`}
      >
        <ProfileShareCard 
          user={user}
          totalProfit={totalProfit}
          completedContests={completedContests}
          activeContests={activeContests}
        />
      </ShareModal>
    </MorphCard>
  );
};

export default ProfileSidebar;
