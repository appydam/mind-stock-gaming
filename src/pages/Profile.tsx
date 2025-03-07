
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MorphCard from "@/components/ui/MorphCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, CreditCard, TrendingUp, TrendingDown, User, Mail, Phone, Clock } from "lucide-react";

// Mock user data - in a real app, this would come from an API
const mockUser = {
    id: 1,
    name: "Jane Smith",
    emailId: "jane.smith@example.com",
    age: 28,
    phoneNo: "+1234567890",
    username: "janesmith",
    isActive: true,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-08-20T14:45:00Z"
};

// Mock participation data - in a real app, this would come from an API
const mockParticipations = [
    {
        contest_id: 101,
        user_id: 1,
        contest_name: "Weekly Tech Titans Challenge",
        stocks_in_basket: ["AAPL", "MSFT", "NVDA", "GOOGL", "META"],
        join_time: "2023-09-01T15:20:00Z",
        status: "active",
        returns: 12.4,
        entry_fee: 10,
        rank: 5,
        totalParticipants: 128
    },
    {
        contest_id: 102,
        user_id: 1,
        contest_name: "Monthly Finance Leaders",
        stocks_in_basket: ["JPM", "BAC", "GS", "WFC", "C"],
        join_time: "2023-08-15T10:10:00Z",
        status: "completed",
        returns: -3.2,
        entry_fee: 25,
        rank: 42,
        totalParticipants: 97
    },
    {
        contest_id: 103,
        user_id: 1,
        contest_name: "Healthcare Basket Challenge",
        stocks_in_basket: ["JNJ", "PFE", "MRK", "ABBV", "UNH"],
        join_time: "2023-08-05T09:30:00Z",
        status: "completed",
        returns: 8.7,
        entry_fee: 15,
        rank: 12,
        totalParticipants: 76
    }
];

const Profile = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [user, setUser] = useState(mockUser);
    const [participations, setParticipations] = useState(mockParticipations);
    
    // Calculate total P&L
    const totalPnL = participations.reduce((sum, contest) => {
        // Calculate approximate P&L based on returns and entry fee
        return sum + (contest.entry_fee * contest.returns / 100);
    }, 0);

    // Get active and completed contests
    const activeContests = participations.filter(p => p.status === "active");
    const completedContests = participations.filter(p => p.status === "completed");

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            
            <main className="flex-grow pt-28 pb-16">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* User Profile Sidebar */}
                        <div className="lg:col-span-4">
                            <MorphCard className="p-6 sticky top-24">
                                <div className="flex flex-col items-center mb-6">
                                    <Avatar className="h-24 w-24 mb-4">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-2xl font-bold">{user.name}</h2>
                                    <p className="text-muted-foreground">@{user.username}</p>
                                    
                                    <div className="flex mt-2 space-x-2">
                                        <Badge variant="secondary">Trader</Badge>
                                        {user.isActive && <Badge variant="outline" className="text-green-500 border-green-200">Active</Badge>}
                                    </div>
                                </div>
                                
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
                            </MorphCard>
                        </div>
                        
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                                <TabsList className="grid grid-cols-3 w-full max-w-md">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="active">Active Contests</TabsTrigger>
                                    <TabsTrigger value="history">History</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="overview">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                        <MorphCard className="p-4">
                                            <h3 className="text-sm text-muted-foreground mb-1">Total P&L</h3>
                                            <div className="flex items-center">
                                                {totalPnL >= 0 ? (
                                                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                                                ) : (
                                                    <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                                                )}
                                                <span className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                    ${Math.abs(totalPnL).toFixed(2)}
                                                </span>
                                            </div>
                                        </MorphCard>
                                        
                                        <MorphCard className="p-4">
                                            <h3 className="text-sm text-muted-foreground mb-1">Active Contests</h3>
                                            <div className="flex items-center">
                                                <Trophy className="h-5 w-5 text-gold-500 mr-2" />
                                                <span className="text-2xl font-bold">{activeContests.length}</span>
                                            </div>
                                        </MorphCard>
                                        
                                        <MorphCard className="p-4">
                                            <h3 className="text-sm text-muted-foreground mb-1">Completed Contests</h3>
                                            <div className="flex items-center">
                                                <Calendar className="h-5 w-5 text-primary mr-2" />
                                                <span className="text-2xl font-bold">{completedContests.length}</span>
                                            </div>
                                        </MorphCard>
                                    </div>
                                    
                                    <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
                                    <div className="space-y-4">
                                        {participations.slice(0, 3).map((participation) => (
                                            <MorphCard key={participation.contest_id} className="p-4 animate-fade-in">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-medium">{participation.contest_name}</h3>
                                                    <Badge variant={participation.status === 'active' ? 'secondary' : 'outline'}>
                                                        {participation.status === 'active' ? 'In Progress' : 'Completed'}
                                                    </Badge>
                                                </div>
                                                
                                                <div className="text-sm text-muted-foreground mb-3">
                                                    Joined: {new Date(participation.join_time).toLocaleDateString()}
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {participation.stocks_in_basket.map((stock) => (
                                                        <Badge key={stock} variant="outline" className="bg-background">{stock}</Badge>
                                                    ))}
                                                </div>
                                                
                                                <div className="grid grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-muted-foreground">Entry Fee</p>
                                                        <p className="font-medium">${participation.entry_fee}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Return</p>
                                                        <p className={`font-medium ${participation.returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                            {participation.returns >= 0 ? '+' : ''}{participation.returns}%
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Rank</p>
                                                        <p className="font-medium">{participation.rank} / {participation.totalParticipants}</p>
                                                    </div>
                                                </div>
                                            </MorphCard>
                                        ))}
                                    </div>
                                </TabsContent>
                                
                                <TabsContent value="active">
                                    {activeContests.length > 0 ? (
                                        <div className="space-y-4">
                                            {activeContests.map((participation) => (
                                                <MorphCard key={participation.contest_id} className="p-4 animate-fade-in">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="font-medium">{participation.contest_name}</h3>
                                                        <Badge variant="secondary">In Progress</Badge>
                                                    </div>
                                                    
                                                    <div className="text-sm text-muted-foreground mb-3">
                                                        Joined: {new Date(participation.join_time).toLocaleDateString()}
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {participation.stocks_in_basket.map((stock) => (
                                                            <Badge key={stock} variant="outline" className="bg-background">{stock}</Badge>
                                                        ))}
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-muted-foreground">Entry Fee</p>
                                                            <p className="font-medium">${participation.entry_fee}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Current Return</p>
                                                            <p className={`font-medium ${participation.returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                                {participation.returns >= 0 ? '+' : ''}{participation.returns}%
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Current Rank</p>
                                                            <p className="font-medium">{participation.rank} / {participation.totalParticipants}</p>
                                                        </div>
                                                    </div>
                                                </MorphCard>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-secondary/40 rounded-lg">
                                            <h3 className="text-xl font-medium mb-2">No Active Contests</h3>
                                            <p className="text-muted-foreground">
                                                You are not participating in any active contests right now.
                                            </p>
                                        </div>
                                    )}
                                </TabsContent>
                                
                                <TabsContent value="history">
                                    {completedContests.length > 0 ? (
                                        <div className="space-y-4">
                                            {completedContests.map((participation) => (
                                                <MorphCard key={participation.contest_id} className="p-4 animate-fade-in">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="font-medium">{participation.contest_name}</h3>
                                                        <Badge variant="outline">Completed</Badge>
                                                    </div>
                                                    
                                                    <div className="text-sm text-muted-foreground mb-3">
                                                        Participated: {new Date(participation.join_time).toLocaleDateString()}
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {participation.stocks_in_basket.map((stock) => (
                                                            <Badge key={stock} variant="outline" className="bg-background">{stock}</Badge>
                                                        ))}
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-muted-foreground">Entry Fee</p>
                                                            <p className="font-medium">${participation.entry_fee}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Final Return</p>
                                                            <p className={`font-medium ${participation.returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                                {participation.returns >= 0 ? '+' : ''}{participation.returns}%
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Final Rank</p>
                                                            <p className="font-medium">{participation.rank} / {participation.totalParticipants}</p>
                                                        </div>
                                                    </div>
                                                </MorphCard>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-secondary/40 rounded-lg">
                                            <h3 className="text-xl font-medium mb-2">No Contest History</h3>
                                            <p className="text-muted-foreground">
                                                You haven't participated in any completed contests yet.
                                            </p>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Profile;
