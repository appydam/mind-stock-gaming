
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MoneyManagementDialogsProps {
  isDepositDialogOpen: boolean;
  setIsDepositDialogOpen: (open: boolean) => void;
  isWithdrawDialogOpen: boolean;
  setIsWithdrawDialogOpen: (open: boolean) => void;
  userBalance: number;
  onDeposit: (amount: string) => void;
  onWithdraw: (amount: string) => void;
}

const MoneyManagementDialogs = ({
  isDepositDialogOpen,
  setIsDepositDialogOpen,
  isWithdrawDialogOpen,
  setIsWithdrawDialogOpen,
  userBalance,
  onDeposit,
  onWithdraw
}: MoneyManagementDialogsProps) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleDeposit = () => {
    onDeposit(depositAmount);
    setDepositAmount("");
  };

  const handleWithdraw = () => {
    onWithdraw(withdrawAmount);
    setWithdrawAmount("");
  };

  return (
    <>
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
            Available balance: ₹{userBalance.toLocaleString()}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleWithdraw}
              disabled={parseFloat(withdrawAmount) > userBalance || parseFloat(withdrawAmount) <= 0}
            >
              Withdraw
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MoneyManagementDialogs;
