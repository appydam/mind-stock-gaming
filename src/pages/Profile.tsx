import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MorphCard from "@/components/ui/MorphCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trophy, Calendar, CreditCard, TrendingUp, TrendingDown, User, Mail, Phone, Clock, Wallet, PlusCircle, MinusCircle, ArrowUpRight, ArrowDownLeft, Info, Share2, Link, Copy, ExternalLink, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import EditStocksDialog from "@/components/EditStocksDialog";

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
    },
    {
        contest_id: 104,
        user_id: 1,
        contest_name: "Energy Sector Battle",
        stocks_in_basket: ["XOM", "CVX", "COP", "EOG", "BP"],
        join_time: "2023-07-20T14:15:00Z",
        status: "active",
        returns: 5.2,
        entry_fee: 20,
        rank: 8,
        totalParticipants: 64
    },
    {
        contest_id: 105,
        user_id: 1,
        contest_name: "Consumer Brands Showdown",
        stocks_in_basket: ["PG", "KO", "PEP", "MCD", "NKE"],
        join_time: "2023-07-10T11:30:00Z",
        status: "active",
        returns: -1.8,
        entry_fee: 15,
        rank: 25,
        totalParticipants: 82
    },
    {
        contest_id: 106,
        user_id: 1,
        contest_name: "Semiconductor Titans",
        stocks_in_basket: ["INTC", "AMD", "TSM", "AMAT", "LRCX"],
        join_time: "2023-06-28T09:45:00Z",
        status: "completed",
        returns: 9.6,
        entry_fee: 30,
        rank: 3,
        totalParticipants: 110
    },
    {
        contest_id: 107,
        user_id: 1,
        contest_name: "Electric Vehicle Revolution",
        stocks_in_basket: ["TSLA", "NIO", "LCID", "RIVN", "LI"],
        join_time: "2023-06-15T13:20:00Z",
        status: "active",
        returns: 7.3,
        entry_fee: 25,
        rank: 15,
        totalParticipants: 95
    }
];

const mockTransactions = [
    {
        id: 'tx1',
        type: 'deposit',
        amount: 1000,
        date: '2023-09-01T10:30:00Z',
        status: 'completed'
    },
    {
        id: 'tx2',
        type: 'withdrawal',
        amount: 250,
        date: '2023-08-25T14:15:00Z',
        status: 'completed'
    },
    {
        id: 'tx3',
        type: 'deposit',
        amount: 500,
        date: '2023-08-10T09:45:00Z',
        status: 'completed'
    },
    {
        id: 'tx4',
        type: 'contest entry',
        amount: 25,
        date: '2023-09-02T16:20:00Z',
        status: 'completed',
        contestName: 'Monthly Finance Leaders'
    },
];

const Profile = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [user, setUser] = useState({
        name: JSON.parse(localStorage.getItem("userName") || '""'),
        emailId: JSON.parse(localStorage.getItem("userEmail") || '""'),
        age: JSON.parse(localStorage.getItem("userAge") || '""'),
        phoneNo: JSON.parse(localStorage.getItem("userPhone") || '""'),
        username: JSON.parse(localStorage.getItem("userUsername") || '""'),
        profileImage: "",
        balance: 2500,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
    });
    const [participations, setParticipations] = useState(mockParticipations);
    const [transactions, setTransactions] = useState(mockTransactions);
    const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
    const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");

    const [isSharingEnabled, setIsSharingEnabled] = useState(false);
    const [shareLink, setShareLink] = useState("");
    const [isLinkGenerated, setIsLinkGenerated] = useState(false);

    const [currentOverviewPage, setCurrentOverviewPage] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [historyPage, setHistoryPage] = useState(1);
    const itemsPerPage = 3;

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedContest, setSelectedContest] = useState(null);

    const totalPnL = participations.reduce((sum, contest) => {
        return sum + (contest.entry_fee * contest.returns / 100);
    }, 0);

    const activeContests = participations.filter(p => p.status === "active");
    const completedContests = participations.filter(p => p.status === "completed");

    const indexOfLastOverviewItem = currentOverviewPage * itemsPerPage;
    const indexOfFirstOverviewItem = indexOfLastOverviewItem - itemsPerPage;
    const currentOverviewItems = participations.slice(indexOfFirstOverviewItem, indexOfLastOverviewItem);

    const indexOfLastActiveItem = activePage * itemsPerPage;
    const indexOfFirstActiveItem = indexOfLastActiveItem - itemsPerPage;
    const currentActiveItems = activeContests.slice(indexOfFirstActiveItem, indexOfLastActiveItem);

    const indexOfLastHistoryItem = historyPage * itemsPerPage;
    const indexOfFirstHistoryItem = indexOfLastHistoryItem - itemsPerPage;
    const currentHistoryItems = completedContests.slice(indexOfFirstHistoryItem, indexOfLastHistoryItem);

    const totalOverviewPages = Math.ceil(participations.length / itemsPerPage);
    const totalActivePages = Math.ceil(activeContests.length / itemsPerPage);
    const totalHistoryPages = Math.ceil(completedContests.length / itemsPerPage);

    const [totalProfit, setTotalProfit] = useState(0);
    const [activeContestNumber, setActiveContestNumber] = useState(0);
    const [completedContestsNumber, setCompletedContestsNumber] = useState(0);


    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await fetch('http://localhost:8082/recentContests', {
                    method: 'POST',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
                        'DNT': '1',
                        'Referer': 'http://localhost:8080/competitions',
                        'Content-Type': 'application/json',
                    },
                    // const userId = Number(JSON.parse(localStorage.getItem("userId")));
                    body: JSON.stringify({ userId: Number(JSON.parse(localStorage.getItem("userId"))) })
                });

                const result = await response.json();
                if (result.code === 200) {
                    // Transform API data without deduplication
                    const transformedData = result.data.recentContests.map((contest, index) => ({
                        contest_id: contest.contestId,
                        user_id: Number(JSON.parse(localStorage.getItem("userId"))),
                        contest_name: contest.contestName,
                        stocks_in_basket: contest.bucket,
                        join_time: contest.joinedTime,
                        status: contest.status === 'open' ? 'active' : 'completed',
                        returns: contest.pnl ? (contest.pnl / contest.entryFee * 100) : 0,
                        entry_fee: contest.entryFee,
                        rank: contest.rank || 0,
                        totalParticipants: 0,
                        uniqueKey: `${contest.contestId}-${index}` // Unique key for rendering
                    }));

                    setTotalProfit(result.data.totalProfit);
                    setActiveContestNumber(result.data.activeContest);
                    setCompletedContestsNumber(result.data.completedContest);

                    setParticipations(transformedData);
                }
            } catch (error) {
                console.error('Error fetching contests:', error);
                setParticipations(mockParticipations);
            }
        };

        fetchContests();
    }, []);




    const handleEditStocks = (contest) => {
        setSelectedContest(contest);
        setIsEditDialogOpen(true);
    };

    const handleUpdateStocks = (contestId, newStocks) => {
        const updatedParticipations = participations.map(p => {
            if (p.contest_id === contestId) {
                return { ...p, stocks_in_basket: newStocks };
            }
            return p;
        });

        setParticipations(updatedParticipations);
        setIsEditDialogOpen(false);

        toast({
            title: "Stocks updated",
            description: "Your stock selection has been updated successfully.",
            variant: "default",
        });
    };

    const handleDeposit = () => {
        const amount = parseFloat(depositAmount);
        if (isNaN(amount) || amount <= 0) {
            toast({
                title: "Invalid amount",
                description: "Please enter a valid amount to deposit.",
                variant: "destructive",
            });
            return;
        }

        const newBalance = user.balance + amount;
        setUser({ ...user, balance: newBalance });

        const newTransaction = {
            id: `tx${transactions.length + 1}`,
            type: 'deposit',
            amount: amount,
            date: new Date().toISOString(),
            status: 'completed'
        };
        setTransactions([newTransaction, ...transactions]);

        toast({
            title: "Deposit successful",
            description: `₹${amount} has been added to your balance.`,
            variant: "default",
        });

        setIsDepositDialogOpen(false);
        setDepositAmount("");
    };

    const handleWithdraw = () => {
        const amount = parseFloat(withdrawAmount);
        if (isNaN(amount) || amount <= 0) {
            toast({
                title: "Invalid amount",
                description: "Please enter a valid amount to withdraw.",
                variant: "destructive",
            });
            return;
        }

        if (amount > user.balance) {
            toast({
                title: "Insufficient balance",
                description: "You don't have enough balance to withdraw this amount.",
                variant: "destructive",
            });
            return;
        }

        const newBalance = user.balance - amount;
        setUser({ ...user, balance: newBalance });

        const newTransaction = {
            id: `tx${transactions.length + 1}`,
            type: 'withdrawal',
            amount: amount,
            date: new Date().toISOString(),
            status: 'completed'
        };
        setTransactions([newTransaction, ...transactions]);

        toast({
            title: "Withdrawal successful",
            description: `₹${amount} has been withdrawn from your balance.`,
            variant: "default",
        });

        setIsWithdrawDialogOpen(false);
        setWithdrawAmount("");
    };

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

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-28 pb-16">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4">
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
                                            onClick={() => setIsDepositDialogOpen(true)}
                                        >
                                            <PlusCircle className="h-4 w-4 mr-2" />
                                            Deposit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 flex items-center justify-center"
                                            onClick={() => setIsWithdrawDialogOpen(true)}
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
                            </MorphCard>
                        </div>

                        <div className="lg:col-span-8">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                                <TabsList className="grid grid-cols-4 w-full max-w-md">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="active">Active Contests</TabsTrigger>
                                    <TabsTrigger value="history">History</TabsTrigger>
                                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
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
                                                    {/* ₹{Math.abs(totalPnL).toFixed(2)} */}
                                                    {/* TODO: fix negative profits display */}
                                                    ₹{Math.abs(totalProfit).toFixed(2)}
                                                </span>
                                            </div>
                                        </MorphCard>

                                        <MorphCard className="p-4">
                                            <h3 className="text-sm text-muted-foreground mb-1">Active Contests</h3>
                                            <div className="flex items-center">
                                                <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                                                {/* <span className="text-2xl font-bold">{activeContests.length}</span> */}
                                                <span className="text-2xl font-bold">{activeContestNumber}</span>
                                            </div>
                                        </MorphCard>

                                        <MorphCard className="p-4">
                                            <h3 className="text-sm text-muted-foreground mb-1">Completed Contests</h3>
                                            <div className="flex items-center">
                                                <Calendar className="h-5 w-5 text-primary mr-2" />
                                                {/* <span className="text-2xl font-bold">{completedContests.length}</span> */}
                                                <span className="text-2xl font-bold">{completedContestsNumber}</span>
                                            </div>
                                        </MorphCard>
                                    </div>

                                    <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
                                    <div className="space-y-4">
                                        {currentOverviewItems.map((participation) => (
                                            <MorphCard
                                                key={participation.uniqueKey} // Use uniqueKey instead of contest_id-index
                                                className="p-4 animate-fade-in"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-medium">{participation.contest_name}</h3>
                                                    <div className="flex items-center gap-2">
                                                        {participation.status === 'active' && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex items-center gap-1 text-blue-500 border-blue-500 hover:bg-blue-50"
                                                                onClick={() => handleEditStocks(participation)}
                                                            >
                                                                <Edit className="h-3.5 w-3.5" />
                                                                Edit Stocks
                                                            </Button>
                                                        )}
                                                        <Badge variant={participation.status === 'active' ? 'secondary' : 'outline'}>
                                                            {participation.status === 'active' ? 'In Progress' : 'Completed'}
                                                        </Badge>
                                                    </div>
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
                                                        <p className="font-medium">₹{participation.entry_fee}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Return</p>
                                                        <p className={`font-medium ${participation.returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                            {participation.returns >= 0 ? '+' : ''}{participation.returns.toFixed(2)}%
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Rank</p>
                                                        <p className="font-medium">
                                                            {participation.rank > 0 ? `${participation.rank}` : 'N/A'}
                                                            {participation.totalParticipants > 0 ? ` / ${participation.totalParticipants}` : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            </MorphCard>
                                        ))}
                                    </div>

                                    {totalOverviewPages > 1 && (
                                        <Pagination className="mt-6">
                                            <PaginationContent>
                                                {currentOverviewPage > 1 && (
                                                    <PaginationItem>
                                                        <PaginationPrevious
                                                            onClick={() => setCurrentOverviewPage(prev => Math.max(prev - 1, 1))}
                                                        />
                                                    </PaginationItem>
                                                )}

                                                {Array.from({ length: totalOverviewPages }).map((_, index) => (
                                                    <PaginationItem key={index}>
                                                        <PaginationLink
                                                            isActive={currentOverviewPage === index + 1}
                                                            onClick={() => setCurrentOverviewPage(index + 1)}
                                                        >
                                                            {index + 1}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}

                                                {currentOverviewPage < totalOverviewPages && (
                                                    <PaginationItem>
                                                        <PaginationNext
                                                            onClick={() => setCurrentOverviewPage(prev => Math.min(prev + 1, totalOverviewPages))}
                                                        />
                                                    </PaginationItem>
                                                )}
                                            </PaginationContent>
                                        </Pagination>
                                    )}
                                </TabsContent>

                                {/* <TabsContent value="active">
                                    {activeContests.length > 0 ? (
                                        <div className="space-y-4">
                                            {currentActiveItems.map((participation) => (
                                                <MorphCard key={participation.contest_id} className="p-4 animate-fade-in">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="font-medium">{participation.contest_name}</h3>
                                                        <div className="flex items-center gap-2">
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm" 
                                                                className="flex items-center gap-1 text-blue-500 border-blue-500 hover:bg-blue-50"
                                                                onClick={() => handleEditStocks(participation)}
                                                            >
                                                                <Edit className="h-3.5 w-3.5" />
                                                                Edit Stocks
                                                            </Button>
                                                            <Badge variant="secondary">In Progress</Badge>
                                                        </div>
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
                                                            <p className="font-medium">₹{participation.entry_fee}</p>
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
                                            
                                            {totalActivePages > 1 && (
                                                <Pagination className="mt-6">
                                                    <PaginationContent>
                                                        {activePage > 1 && (
                                                            <PaginationItem>
                                                                <PaginationPrevious 
                                                                    onClick={() => setActivePage(prev => Math.max(prev - 1, 1))} 
                                                                />
                                                            </PaginationItem>
                                                        )}
                                                        
                                                        {Array.from({ length: totalActivePages }).map((_, index) => (
                                                            <PaginationItem key={index}>
                                                                <PaginationLink 
                                                                    isActive={activePage === index + 1}
                                                                    onClick={() => setActivePage(index + 1)}
                                                                >
                                                                    {index + 1}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        ))}
                                                        
                                                        {activePage < totalActivePages && (
                                                            <PaginationItem>
                                                                <PaginationNext 
                                                                    onClick={() => setActivePage(prev => Math.min(prev + 1, totalActivePages))} 
                                                                />
                                                            </PaginationItem>
                                                        )}
                                                    </PaginationContent>
                                                </Pagination>
                                            )}
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
                                            {currentHistoryItems.map((participation) => (
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
                                                            <p className="font-medium">₹{participation.entry_fee}</p>
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
                                            
                                            {totalHistoryPages > 1 && (
                                                <Pagination className="mt-6">
                                                    <PaginationContent>
                                                        {historyPage > 1 && (
                                                            <PaginationItem>
                                                                <PaginationPrevious 
                                                                    onClick={() => setHistoryPage(prev => Math.max(prev - 1, 1))} 
                                                                />
                                                            </PaginationItem>
                                                        )}
                                                        
                                                        {Array.from({ length: totalHistoryPages }).map((_, index) => (
                                                            <PaginationItem key={index}>
                                                                <PaginationLink 
                                                                    isActive={historyPage === index + 1}
                                                                    onClick={() => setHistoryPage(index + 1)}
                                                                >
                                                                    {index + 1}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        ))}
                                                        
                                                        {historyPage < totalHistoryPages && (
                                                            <PaginationItem>
                                                                <PaginationNext 
                                                                    onClick={() => setHistoryPage(prev => Math.min(prev + 1, totalHistoryPages))} 
                                                                />
                                                            </PaginationItem>
                                                        )}
                                                    </PaginationContent>
                                                </Pagination>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-secondary/40 rounded-lg">
                                            <h3 className="text-xl font-medium mb-2">No Completed Contests</h3>
                                            <p className="text-muted-foreground">
                                                You haven't completed any contests yet.
                                            </p>
                                        </div>
                                    )}
                                </TabsContent> */}

                                <TabsContent value="transactions">
                                    <h2 className="text-xl font-bold mb-4">Transaction History</h2>
                                    {transactions.length > 0 ? (
                                        <div className="space-y-3">
                                            {transactions.map((tx) => (
                                                <MorphCard key={tx.id} className="p-4 animate-fade-in">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            {tx.type === 'deposit' ? (
                                                                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                                                                    <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                                </div>
                                                            ) : tx.type === 'withdrawal' ? (
                                                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                                                                    <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                                </div>
                                                            ) : (
                                                                <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
                                                                    <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <p className="font-medium capitalize">{tx.type}</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {new Date(tx.date).toLocaleDateString()} at {new Date(tx.date).toLocaleTimeString()}
                                                                </p>
                                                                {tx.contestName && (
                                                                    <p className="text-xs text-muted-foreground">
                                                                        Contest: {tx.contestName}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <p className={`font-medium ${tx.type === 'deposit' ? 'text-green-500' : 'text-blue-500'}`}>
                                                            {tx.type === 'deposit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </MorphCard>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-secondary/40 rounded-lg">
                                            <h3 className="text-xl font-medium mb-2">No Transactions</h3>
                                            <p className="text-muted-foreground">
                                                You haven't made any transactions yet.
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

            <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deposit Funds</DialogTitle>
                        <DialogDescription>
                            Enter the amount you want to deposit to your account.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-4 border rounded-md">
                        <div className="flex items-center">
                            <span className="text-2xl font-semibold mr-2">₹</span>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDepositDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleDeposit}>
                            Deposit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                        <DialogDescription>
                            Enter the amount you want to withdraw from your account.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-4 border rounded-md">
                        <div className="flex items-center">
                            <span className="text-2xl font-semibold mr-2">₹</span>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Available balance: ₹{user.balance.toLocaleString()}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleWithdraw}
                            disabled={parseFloat(withdrawAmount) > user.balance || parseFloat(withdrawAmount) <= 0}
                        >
                            Withdraw
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <EditStocksDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                contest={selectedContest}
                onUpdate={handleUpdateStocks}
            />
        </div>
    );
};

export default Profile;
