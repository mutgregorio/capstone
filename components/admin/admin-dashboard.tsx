"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  UserCheck,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import type { AdminViewType } from "../admin-portal"

interface AdminDashboardProps {
  onNavigate: (view: AdminViewType) => void
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 pb-8 bg-gray-50 dark:bg-gray-900">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Maria! 👋</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Here's what's happening in your system today</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => onNavigate("students")} className="bg-slate-800 hover:bg-slate-900 text-white">
            <Users className="h-4 w-4 mr-2" />
            Manage Students
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate("payments")}
            className="border-gray-200 dark:border-gray-700"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            View Payments
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Students</p>
              <p className="text-xs text-blue-600 font-medium">+23 this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,198</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Verified Accounts</p>
              <p className="text-xs text-green-600 font-medium">96.1% verified</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱2.4M</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Payments</p>
              <p className="text-xs text-emerald-600 font-medium">+18% this semester</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <Badge variant="destructive" className="text-xs">
                Needs Attention
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">49</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Pending Approvals</p>
              <p className="text-xs text-orange-600 font-medium">Requires review</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Latest system activities</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("activities")}
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
                  type: "approval",
                  desc: "New student registration approved",
                  user: "Juan Dela Cruz (2024-00123)",
                  time: "2 minutes ago",
                  color: "green",
                },
                {
                  type: "payment",
                  desc: "Payment processed successfully",
                  user: "Maria Santos - ₱2,500",
                  time: "5 minutes ago",
                  color: "blue",
                },
                {
                  type: "verification",
                  desc: "GCash account verified",
                  user: "Pedro Rodriguez (2024-00124)",
                  time: "10 minutes ago",
                  color: "emerald",
                },
                {
                  type: "alert",
                  desc: "Failed payment attempt",
                  user: "Ana Garcia - ₱1,200",
                  time: "15 minutes ago",
                  color: "red",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.color === "green"
                        ? "bg-green-100 dark:bg-green-900/20"
                        : activity.color === "blue"
                          ? "bg-blue-100 dark:bg-blue-900/20"
                          : activity.color === "emerald"
                            ? "bg-emerald-100 dark:bg-emerald-900/20"
                            : "bg-red-100 dark:bg-red-900/20"
                    }`}
                  >
                    {activity.type === "approval" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : activity.type === "payment" ? (
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    ) : activity.type === "verification" ? (
                      <UserCheck className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{activity.desc}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{activity.user}</p>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Overview */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Payment Overview</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Today's payment summary</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("reports")}
                className="border-gray-200 dark:border-gray-700"
              >
                View Reports
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowDownRight className="h-4 w-4 text-green-600 rotate-180" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">Successful</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">₱124,500</p>
                  <p className="text-xs text-green-700 dark:text-green-300">89 transactions</p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowUpRight className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800 dark:text-red-200">Failed</span>
                  </div>
                  <p className="text-2xl font-bold text-red-900 dark:text-red-100">₱8,200</p>
                  <p className="text-xs text-red-700 dark:text-red-300">7 transactions</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">School Fees</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">₱89,200</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                      style={{ width: "72%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Lab Fees</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">₱23,100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                      style={{ width: "18%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Library Fees</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">₱12,200</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-orange-500 transition-all duration-300"
                      style={{ width: "10%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Pending Approvals</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Student registrations requiring approval
              </CardDescription>
            </div>
            <Badge variant="destructive" className="text-sm">
              49 Pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Juan Dela Cruz",
                studentId: "2024-00125",
                email: "juan.delacruz@university.edu.ph",
                gcash: "09171234567",
                submitted: "2 hours ago",
              },
              {
                name: "Maria Santos",
                studentId: "2024-00126",
                email: "maria.santos@university.edu.ph",
                gcash: "09181234567",
                submitted: "4 hours ago",
              },
              {
                name: "Pedro Rodriguez",
                studentId: "2024-00127",
                email: "pedro.rodriguez@university.edu.ph",
                gcash: "09191234567",
                submitted: "6 hours ago",
              },
            ].map((student, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold flex items-center justify-center text-sm">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{student.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ID: {student.studentId}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <p>Email: {student.email}</p>
                    <p>GCash: {student.gcash}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-400 dark:text-gray-500 mr-4">{student.submitted}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => onNavigate("students")}
              className="border-gray-200 dark:border-gray-700"
            >
              View All Pending Approvals
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
