
import { TrendingUp, Bitcoin, MessageSquare } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import MorphCard from "@/components/ui/MorphCard";

interface GameTypeToggleProps {
    selectedGameType: "equity" | "crypto" | "opinion";
    onSelectGameType: (gameType: "equity" | "crypto" | "opinion") => void;
}

const GameTypeToggle = ({ selectedGameType, onSelectGameType }: GameTypeToggleProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-6">Choose Your Game</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                <MorphCard
                    className={`p-6 cursor-pointer transition-all duration-300 ${selectedGameType === "equity"
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                            : "hover:shadow-md"
                        }`}
                    onClick={() => onSelectGameType("equity")}
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="rounded-full p-3 bg-primary/10 mb-4">
                            <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium text-lg mb-1">Equity Basket</h3>
                        <p className="text-sm text-muted-foreground">Compete with stock selections</p>
                        <div className="mt-4">
                            <Switch
                                checked={selectedGameType === "equity"}
                                onCheckedChange={() => onSelectGameType("equity")}
                            />
                        </div>
                    </div>
                </MorphCard>

                <MorphCard
                    className={`p-6 cursor-pointer transition-all duration-300 ${selectedGameType === "crypto"
                            ? "ring-2 ring-gold-500 ring-offset-2 ring-offset-background"
                            : "hover:shadow-md"
                        }`}
                    onClick={() => onSelectGameType("crypto")}
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="rounded-full p-3 bg-gold-500/10 mb-4">
                            <Bitcoin className="h-6 w-6 text-gold-500" />
                        </div>
                        <h3 className="font-medium text-lg mb-1">Crypto Basket</h3>
                        <p className="text-sm text-muted-foreground">Trade with cryptocurrency baskets</p>
                        <div className="mt-4">
                            <Switch
                                checked={selectedGameType === "crypto"}
                                onCheckedChange={() => onSelectGameType("crypto")}
                            />
                        </div>
                    </div>
                </MorphCard>

                <MorphCard
                    className={`p-6 cursor-pointer transition-all duration-300 ${selectedGameType === "opinion"
                            ? "ring-2 ring-mint-600 ring-offset-2 ring-offset-background"
                            : "hover:shadow-md"
                        }`}
                    onClick={() => onSelectGameType("opinion")}
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="rounded-full p-3 bg-mint-600/10 mb-4">
                            <MessageSquare className="h-6 w-6 text-mint-600" />
                        </div>
                        <h3 className="font-medium text-lg mb-1">Opinion Trading</h3>
                        <p className="text-sm text-muted-foreground">Predict real-world events</p>
                        <div className="mt-4">
                            <Switch
                                checked={selectedGameType === "opinion"}
                                onCheckedChange={() => onSelectGameType("opinion")}
                            />
                        </div>
                    </div>
                </MorphCard>
            </div>

            <div className="mt-8 hidden md:block">
                <ToggleGroup type="single" value={selectedGameType} onValueChange={(value) => value && onSelectGameType(value as any)}>
                    <ToggleGroupItem value="equity" className="px-6">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Equity
                    </ToggleGroupItem>
                    <ToggleGroupItem value="crypto" className="px-6">
                        <Bitcoin className="mr-2 h-4 w-4" />
                        Crypto
                    </ToggleGroupItem>
                    <ToggleGroupItem value="opinion" className="px-6">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Opinion
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </div>
    );
};

export default GameTypeToggle;