"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Wallet, Plus, Send, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WalletManagementProps {
  onBack: () => void
  balance: number
}

export function WalletManagement({ onBack, balance }: WalletManagementProps) {
  const [activeTab, setActiveTab] = useState<"cash-in" | "transfer">("cash-in")
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleTransaction = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsProcessing(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setSuccess(true)
    setAmount("")

    // Reset success message
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 md:p-4">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg md:text-xl font-semibold text-foreground">My Wallet</h1>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₱{balance.toLocaleString()}.00</div>
            <p className="text-blue-100 mt-2">Available for payments and transfers</p>
          </CardContent>
        </Card>

        {/* Success Message */}
        {success && (
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 mb-4">
            <CardContent className="pt-4">
              <p className="text-green-800 dark:text-green-200 text-center">
                {activeTab === "cash-in" ? "Cash in successful!" : "Transfer completed!"}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tab Navigation */}
        <div className="flex mb-4 bg-muted rounded-lg p-1">
          <Button
            variant={activeTab === "cash-in" ? "default" : "ghost"}
            onClick={() => setActiveTab("cash-in")}
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-2" />
            Cash In
          </Button>
          <Button
            variant={activeTab === "transfer" ? "default" : "ghost"}
            onClick={() => setActiveTab("transfer")}
            className="flex-1"
          >
            <Send className="h-4 w-4 mr-2" />
            Transfer
          </Button>
        </div>

        {/* Transaction Form */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              {activeTab === "cash-in" ? (
                <>
                  <Plus className="h-5 w-5 text-green-600" />
                  Cash In to Wallet
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 text-blue-600" />
                  Transfer Money
                </>
              )}
            </CardTitle>
            <CardDescription>
              {activeTab === "cash-in"
                ? "Add money to your GCash wallet from your bank account"
                : "Send money to another GCash user or bank account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-foreground">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₱</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 bg-background border-border text-foreground"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={() => setAmount("1000")} className="text-xs">
                  ₱1,000
                </Button>
                <Button variant="outline" size="sm" onClick={() => setAmount("2000")} className="text-xs">
                  ₱2,000
                </Button>
                <Button variant="outline" size="sm" onClick={() => setAmount("5000")} className="text-xs">
                  ₱5,000
                </Button>
              </div>
            </div>

            {/* Source/Destination */}
            <div className="space-y-2">
              <Label className="text-foreground">{activeTab === "cash-in" ? "From" : "To"}</Label>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-muted/20">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {activeTab === "cash-in" ? "GCash Account" : "Juan Dela Cruz"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === "cash-in" ? "09171234567" : "+63 917 123 4567"}
                  </p>
                </div>
                <Badge variant="secondary">Verified</Badge>
              </div>
            </div>

            {/* Transaction Summary */}
            <div className="border border-border rounded-lg p-3 space-y-2 bg-muted/20">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-foreground">₱{amount || "0.00"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee</span>
                <span className="text-foreground">₱0.00</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">₱{amount || "0.00"}</span>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleTransaction}
              disabled={
                !amount ||
                Number.parseFloat(amount) <= 0 ||
                isProcessing ||
                (activeTab === "transfer" && balance < Number.parseFloat(amount || "0"))
              }
              className="w-full"
            >
              {isProcessing ? "Processing..." : activeTab === "cash-in" ? "Cash In Now" : "Send Money"}
            </Button>

            {activeTab === "transfer" && balance < Number.parseFloat(amount || "0") && amount && (
              <p className="text-sm text-red-500 text-center">Insufficient balance for this transfer.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card border-border mt-6">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Wallet Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Plus className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Cash In from GCash</p>
                    <p className="text-xs text-muted-foreground">Jan 10, 2024</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">+₱5,000</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Send className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Transfer to Maria Santos</p>
                    <p className="text-xs text-muted-foreground">Jan 8, 2024</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-red-600">-₱1,500</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
