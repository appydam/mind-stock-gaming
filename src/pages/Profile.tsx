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
import { Trophy, Calendar, CreditCard, TrendingUp, TrendingDown, User, Mail, Phone, Clock, Wallet, PlusCircle, MinusCircle, ArrowUpRight, ArrowDownLeft, Info } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
        // profileImage: "https://media.licdn.com/dms/image/v2/D5603AQFrqHpmzYsqog/profile-displayphoto-shrink_800_800/B56ZOrwvNbGwAc-/0/1733753501751?e=1746662400&v=beta&t=-4nwDd81AjGTMK-CJ0ZaOA0aS1kZ4vEUIghnsWdSIXg", // Default profile image
        balance: 2500, // Setting a default balance
        createdAt: new Date().toISOString(), // Setting a default creation date
        updatedAt: new Date().toISOString(), // Setting a default updated date
        isActive: true, // Setting a default active status
    });
    const [participations, setParticipations] = useState(mockParticipations);
    const [transactions, setTransactions] = useState(mockTransactions);
    const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
    const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");

    const totalPnL = participations.reduce((sum, contest) => {
        return sum + (contest.entry_fee * contest.returns / 100);
    }, 0);

    const activeContests = participations.filter(p => p.status === "active");
    const completedContests = participations.filter(p => p.status === "completed");

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
                                                    ₹{Math.abs(totalPnL).toFixed(2)}
                                                </span>
                                            </div>
                                        </MorphCard>

                                        <MorphCard className="p-4">
                                            <h3 className="text-sm text-muted-foreground mb-1">Active Contests</h3>
                                            <div className="flex items-center">
                                                <Trophy className="h-5 w-5 text-amber-500 mr-2" />
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
                                                        <p className="font-medium">₹{participation.entry_fee}</p>
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

                                <TabsContent value="transactions">
                                    {transactions.length > 0 ? (
                                        <div className="space-y-4">
                                            <div className="rounded-lg border overflow-hidden">
                                                <table className="w-full">
                                                    <thead className="bg-muted/50">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                                                            <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                                                            <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                                                            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {transactions.map((transaction) => (
                                                            <tr key={transaction.id} className="border-t">
                                                                <td className="px-4 py-3 text-sm">
                                                                    {new Date(transaction.date).toLocaleDateString()}
                                                                </td>
                                                                <td className="px-4 py-3 text-sm">
                                                                    <div className="flex items-center">
                                                                        {transaction.type === 'deposit' ? (
                                                                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-2" />
                                                                        ) : transaction.type === 'withdrawal' ? (
                                                                            <ArrowDownLeft className="h-4 w-4 text-blue-500 mr-2" />
                                                                        ) : (
                                                                            <Trophy className="h-4 w-4 text-amber-500 mr-2" />
                                                                        )}
                                                                        <span className="capitalize">{transaction.type}</span>
                                                                    </div>
                                                                    {transaction.contestName && (
                                                                        <div className="text-xs text-muted-foreground ml-6">
                                                                            {transaction.contestName}
                                                                        </div>
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-3 text-sm">
                                                                    <span className={transaction.type === 'deposit' ? 'text-green-500' : 'text-muted-foreground'}>
                                                                        {transaction.type === 'deposit' ? '+' : '-'}₹{transaction.amount}
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 py-3 text-sm">
                                                                    <Badge variant="outline" className="capitalize">
                                                                        {transaction.status}
                                                                    </Badge>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-secondary/40 rounded-lg">
                                            <h3 className="text-xl font-medium mb-2">No Transactions</h3>
                                            <p className="text-muted-foreground">
                                                You don't have any transactions yet.
                                            </p>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>

            <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deposit Funds</DialogTitle>
                        <DialogDescription>
                            Add money to your account to participate in contests.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="amount" className="text-sm font-medium leading-none">
                                Amount (₹)
                            </label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="Enter amount to deposit"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                className="col-span-3"
                                min={1}
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {[500, 1000, 2000, 5000].map((amount) => (
                                <Button
                                    key={amount}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setDepositAmount(amount.toString())}
                                    className="h-9"
                                >
                                    ₹{amount}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDepositDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleDeposit} className="bg-green-600 hover:bg-green-700">
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
                            Withdraw money from your account to your bank account.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-md">
                            <span className="text-sm">Available Balance</span>
                            <span className="font-medium">₹{user.balance.toLocaleString()}</span>
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="withdraw-amount" className="text-sm font-medium leading-none">
                                Amount (₹)
                            </label>
                            <Input
                                id="withdraw-amount"
                                type="number"
                                placeholder="Enter amount to withdraw"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                className="col-span-3"
                                min={1}
                                max={user.balance}
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {[100, 500, 1000, 2000].map((amount) => (
                                <Button
                                    key={amount}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setWithdrawAmount(amount.toString())}
                                    className="h-9"
                                    disabled={amount > user.balance}
                                >
                                    ₹{amount}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleWithdraw} className="bg-blue-500 hover:bg-blue-600">
                            Withdraw
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

export default Profile;
