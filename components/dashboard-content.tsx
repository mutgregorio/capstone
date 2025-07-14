"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  DollarSign,
  GraduationCap,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Send,
} from "lucide-react"
import type { ViewType } from "../dashboard"

interface DashboardContentProps {
  onNavigate: (view: ViewType) => void
  balance: number
}

export function DashboardContent({ onNavigate, balance }: DashboardContentProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 pb-8 bg-gray-50 dark:bg-gray-900">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Good morning, Juan! 👋</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Here's your financial overview for today</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => onNavigate("wallet")} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Cash In
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate("payment")}
            className="border-gray-200 dark:border-gray-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Pay Now
          </Button>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white border-0 shadow-xl">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-blue-100 text-sm font-medium">Available Balance</p>
                <p className="text-xs text-blue-200">GCash Wallet</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Verified
            </Badge>
          </div>
          <div className="mb-6">
            <div className="text-3xl md:text-4xl font-bold mb-2">₱{balance.toLocaleString()}.00</div>
            <p className="text-blue-100 text-sm">Ready for payments and transfers</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate("wallet")}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Money
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("wallet")}
              className="text-white border-white/30 hover:bg-white/10 bg-transparent"
            >
              <Send className="h-4 w-4 mr-2" />
              Transfer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱15,240</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Spent</p>
              <p className="text-xs text-green-600 font-medium">+12% from last semester</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">23</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Transactions</p>
              <p className="text-xs text-blue-600 font-medium">+3 from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <GraduationCap className="h-5 w-5 text-orange-600" />
              </div>
              <Badge variant="destructive" className="text-xs">
                Due Soon
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱2,500</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">School Fees</p>
              <p className="text-xs text-orange-600 font-medium">Due in 10 days</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱1,200</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Emergency Fund</p>
              <p className="text-xs text-purple-600 font-medium">Growing steadily</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Common payment options for students
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start h-auto p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 border border-green-200 dark:border-green-800 text-left"
              variant="outline"
              onClick={() => onNavigate("school-fees")}
            >
              <div className="flex items-center gap-4 w-full">
                <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">School Fees</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Library, Lab, Registration fees</div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-400" />
              </div>
            </Button>

            <Button
              className="w-full justify-start h-auto p-4 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 dark:hover:from-orange-900/30 dark:hover:to-amber-900/30 border border-orange-200 dark:border-orange-800 text-left"
              variant="outline"
              onClick={() => onNavigate("allowance")}
            >
              <div className="flex items-center gap-4 w-full">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/40 rounded-xl">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">Request Allowance</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">From parents or guardians</div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-400" />
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Your latest transactions</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("history")}
                className="border-gray-200 dark:border-gray-700"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "expense", desc: "Tuition Payment - Semester 1", amount: -8500, date: "Jan 15", color: "red" },
                { type: "expense", desc: "Library Fee", amount: -500, date: "Jan 12", color: "red" },
                { type: "income", desc: "Allowance Received", amount: 3000, date: "Jan 10", color: "green" },
                { type: "expense", desc: "Lab Fee - Chemistry", amount: -750, date: "Jan 8", color: "red" },
              ].map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.color === "green"
                        ? "bg-green-100 dark:bg-green-900/20"
                        : "bg-red-100 dark:bg-red-900/20"
                    }`}
                  >
                    {transaction.color === "green" ? (
                      <ArrowDownRight className="h-5 w-5 text-green-600 rotate-180" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{transaction.desc}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}, 2024</p>
                  </div>
                  <div className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    {transaction.amount > 0 ? "+" : ""}₱{Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Semester Progress</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Track your payment completion for this semester
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Laboratory Fees", progress: 75, color: "bg-blue-500" },
              { name: "Library Fees", progress: 100, color: "bg-green-500" },
              { name: "Miscellaneous Fees", progress: 50, color: "bg-orange-500" },
            ].map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${item.color}`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Payments */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Payments</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Don't miss these important deadlines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Laboratory Equipment Fee", amount: 2500, due: "February 15, 2024", days: 15, urgent: true },
              { name: "Registration Fee", amount: 1200, due: "February 20, 2024", days: 20, urgent: false },
            ].map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{payment.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Due: {payment.due}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">₱{payment.amount.toLocaleString()}</p>
                  <Badge variant={payment.urgent ? "destructive" : "secondary"} className="mt-1">
                    {payment.days} days left
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
