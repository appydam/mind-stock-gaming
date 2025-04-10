
import React from 'react';
import MorphCard from "@/components/ui/MorphCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, TrendingDown, Calendar, Trophy, User, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface User {
  name: string;
  username: string;
  profileImage: string;
  createdAt: string;
  virtualBalance?: number;
}

interface ProfileShareCardProps {
  user: User;
  totalProfit?: number;
  completedContests?: number;
  activeContests?: number;
}

const ProfileShareCard = ({ 
  user, 
  totalProfit = 0,
  completedContests = 0,
  activeContests = 0 
}: ProfileShareCardProps) => {
  const isProfitable = totalProfit >= 0;
  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short'
  });
  
  return (
    <MorphCard className="p-5 overflow-hidden bg-white dark:bg-gray-800">
      {/* App branding */}
      <div className="absolute top-3 right-3 flex items-center">
        <span className="text-xs font-semibold text-muted-foreground">MindStock</span>
      </div>
      
      <div className="flex flex-col items-center mb-5">
        <Avatar className="h-16 w-16 mb-3">
          <AvatarImage
            src={user.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt={user.name}
          />
          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <h2 className="text-xl font-bold mb-1">{user.name}</h2>
        <div className="flex items-center text-muted-foreground text-sm">
          <User className="h-3.5 w-3.5 mr-1" />
          @{user.username}
        </div>
        
        <div className="flex mt-2 space-x-2">
          <Badge variant="secondary">Trader</Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Since {memberSince}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-secondary/30 p-3 rounded-md text-center">
          <div className="flex justify-center">
            {isProfitable ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </div>
          <p className={`font-bold text-lg ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
            {isProfitable ? '+' : ''}{totalProfit.toFixed(2)}₹
          </p>
          <p className="text-xs text-muted-foreground">Total P&L</p>
        </div>
        
        <div className="bg-secondary/30 p-3 rounded-md text-center">
          <div className="flex justify-center">
            <Trophy className="h-5 w-5 text-amber-500" />
          </div>
          <p className="font-bold text-lg">{completedContests}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
        
        <div className="bg-secondary/30 p-3 rounded-md text-center">
          <div className="flex justify-center">
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <p className="font-bold text-lg">{activeContests}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
      </div>
      
      <div className="text-center pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-muted-foreground">
          Join MindStock - The Mind Sport of Stock Trading
        </p>
      </div>
    </MorphCard>
  );
};

export default ProfileShareCard;
