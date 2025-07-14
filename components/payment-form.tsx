"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CreditCard, Receipt, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ViewType } from "../dashboard"

interface PaymentFormProps {
  type: ViewType
  onBack: () => void
  balance: number
}

export function PaymentForm({ type, onBack, balance }: PaymentFormProps) {
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const getPaymentInfo = () => {
    switch (type) {
      case "school-fees":
        return {
          title: "School Fees",
          icon: Receipt,
          description: "Pay laboratory, library, registration and miscellaneous fees",
          suggestedAmount: "2500",
          color: "text-green-600",
        }
      case "allowance":
        return {
          title: "Request Allowance",
          icon: DollarSign,
          description: "Request allowance from parents",
          suggestedAmount: "3000",
          color: "text-orange-600",
        }
      default:
        return {
          title: "Make Payment",
          icon: CreditCard,
          description: "Make a payment",
          suggestedAmount: "1000",
          color: "text-blue-600",
        }
    }
  }

  const paymentInfo = getPaymentInfo()
  const Icon = paymentInfo.icon

  const handlePayment = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setPaymentSuccess(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setPaymentSuccess(false)
      onBack()
    }, 3000)
  }

  if (paymentSuccess) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card border-border">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className={`h-8 w-8 text-green-600`} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {type === "allowance" ? "Request Sent!" : "Payment Successful!"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {type === "allowance"
                ? `Allowance request of ₱${amount} has been sent to your parents.`
                : `Your payment of ₱${amount} has been processed successfully.`}
            </p>
            <Badge variant="secondary" className="mb-4">
              Transaction ID: TXN{Date.now().toString().slice(-6)}
            </Badge>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 md:p-4">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg md:text-xl font-semibold text-foreground">{paymentInfo.title}</h1>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Icon className={`h-5 w-5 ${paymentInfo.color}`} />
              {paymentInfo.title}
            </CardTitle>
            <CardDescription>{paymentInfo.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Balance Display */}
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground">Available Balance</div>
              <div className="text-lg font-semibold text-foreground">₱{balance.toLocaleString()}.00</div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-foreground">
                {type === "allowance" ? "Request Amount" : "Payment Amount"}
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(paymentInfo.suggestedAmount)}
                  className="text-xs"
                >
                  ₱{paymentInfo.suggestedAmount}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setAmount("1000")} className="text-xs">
                  ₱1,000
                </Button>
                <Button variant="outline" size="sm" onClick={() => setAmount("5000")} className="text-xs">
                  ₱5,000
                </Button>
              </div>
            </div>

            {/* Payment Method */}
            {type !== "allowance" && (
              <div className="space-y-2">
                <Label className="text-foreground">Payment Method</Label>
                <Select defaultValue="gcash">
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gcash">GCash Wallet</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Payment Summary */}
            <div className="border border-border rounded-lg p-3 space-y-2 bg-muted/20">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {type === "allowance" ? "Request Amount" : "Payment Amount"}
                </span>
                <span className="text-foreground">₱{amount || "0.00"}</span>
              </div>
              {type !== "allowance" && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span className="text-foreground">₱0.00</span>
                </div>
              )}
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">₱{amount || "0.00"}</span>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handlePayment}
              disabled={
                !amount ||
                Number.parseFloat(amount) <= 0 ||
                isProcessing ||
                (type !== "allowance" && balance < Number.parseFloat(amount || "0"))
              }
              className="w-full"
            >
              {isProcessing ? "Processing..." : type === "allowance" ? "Send Request" : "Pay Now"}
            </Button>

            {type !== "allowance" && balance < Number.parseFloat(amount || "0") && amount && (
              <p className="text-sm text-red-500 text-center">
                Insufficient balance. Please cash in or reduce the amount.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
