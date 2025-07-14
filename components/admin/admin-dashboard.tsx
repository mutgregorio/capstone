"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, Activity, TrendingUp, Banknote } from "lucide-react" // Added Banknote
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import type { AdminViewType } from "../admin-portal"

interface AdminDashboardProps {
  onNavigate: (view: AdminViewType) => void
}

const chartData = [
  { month: "Jan", totalPayments: 18600, pendingApprovals: 800 },
  { month: "Feb", totalPayments: 30500, pendingApprovals: 200 },
  { month: "Mar", totalPayments: 23700, pendingApprovals: 1200 },
  { month: "Apr", totalPayments: 17300, pendingApprovals: 500 },
  { month: "May", totalPayments: 20900, pendingApprovals: 900 },
  { month: "Jun", totalPayments: 21400, pendingApprovals: 300 },
]

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 -mt-2">
        Overview of school financial activities and student management.
      </p>

      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Total Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">₱45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">2,350</div>
            <p className="text-xs text-muted-foreground">+180 since last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Pending Approvals</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">+12</div>
            <p className="text-xs text-muted-foreground">+5 since last hour</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Payment Overview</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Total payments and pending approvals over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                totalPayments: {
                  label: "Total Payments",
                  color: "hsl(var(--chart-1))",
                },
                pendingApprovals: {
                  label: "Pending Approvals",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[250px] w-full"
            >
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  className="text-xs text-muted-foreground"
                />
                <YAxis className="text-xs text-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="totalPayments" fill="var(--color-totalPayments)" radius={4} />
                <Bar dataKey="pendingApprovals" fill="var(--color-pendingApprovals)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Latest actions by students and administrators.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("payment-management")}
                className="border-gray-200 dark:border-gray-700"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "payment",
                  desc: "Tuition Payment from Juan Dela Cruz",
                  amount: 15000,
                  date: "2024-01-20",
                  status: "completed",
                  icon: Banknote,
                  iconColor: "text-purple-600",
                  bgColor: "bg-purple-100 dark:bg-purple-900/20",
                }, // New tuition activity
                {
                  type: "payment",
                  desc: "Registration Fee from Maria Santos",
                  amount: 2500,
                  date: "2024-01-15",
                  status: "completed",
                  icon: CreditCard,
                  iconColor: "text-green-600",
                  bgColor: "bg-green-100 dark:bg-green-900/20",
                },
                {
                  type: "approval",
                  desc: "Account approved for Pedro Reyes",
                  date: "2024-01-14",
                  status: "approved",
                  icon: Users,
                  iconColor: "text-blue-600",
                  bgColor: "bg-blue-100 dark:bg-blue-900/20",
                },
                {
                  type: "payment",
                  desc: "Library Fee from Anna Lim",
                  amount: 500,
                  date: "2024-01-12",
                  status: "completed",
                  icon: CreditCard,
                  iconColor: "text-green-600",
                  bgColor: "bg-green-100 dark:bg-green-900/20",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bgColor}`}>
                    <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{activity.desc}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <p className="font-bold text-gray-900 dark:text-white">₱{activity.amount.toLocaleString()}</p>
                    )}
                    <Badge variant="secondary" className="mt-1 capitalize">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Account Status */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Student Account Status</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Overview of student account verification and activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Verified Accounts", count: 1800, total: 2350, color: "bg-green-500" },
              { name: "Pending Verification", count: 300, total: 2350, color: "bg-yellow-500" },
              { name: "Suspended Accounts", count: 50, total: 2350, color: "bg-red-500" },
            ].map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.count} / {item.total}
                  </span>
                </div>
                <Progress value={(item.count / item.total) * 100} className="h-2" indicatorClassName={item.color} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions for Admin */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Admin Quick Actions</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Perform common administrative tasks quickly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full justify-start h-auto p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 border border-blue-200 dark:border-blue-800 text-left"
            variant="outline"
            onClick={() => onNavigate("student-management")}
          >
            <div className="flex items-center gap-4 w-full">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Manage Students</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">View, approve, or suspend accounts</div>
              </div>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
          </Button>

          <Button
            className="w-full justify-start h-auto p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 border border-green-200 dark:border-green-800 text-left"
            variant="outline"
            onClick={() => onNavigate("payment-management")}
          >
            <div className="flex items-center gap-4 w-full">
              <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Manage Payments</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Monitor transactions and trends</div>
              </div>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
