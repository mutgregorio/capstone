"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  RefreshCw,
} from "lucide-react"
import type { AdminViewType } from "../admin-portal"

interface PaymentManagementProps {
  onBack: () => void
  onNavigate: (view: AdminViewType) => void
}

const mockPayments = [
  {
    id: "PAY001",
    studentName: "Juan Dela Cruz",
    studentId: "2024-00123",
    amount: 2500,
    type: "School Fees",
    status: "completed",
    method: "GCash",
    date: "2024-01-15 14:30",
    reference: "GC123456789",
  },
  {
    id: "PAY002",
    studentName: "Maria Santos",
    studentId: "2024-00124",
    amount: 1200,
    type: "Library Fee",
    status: "pending",
    method: "GCash",
    date: "2024-01-15 13:45",
    reference: "GC123456790",
  },
  {
    id: "PAY003",
    studentName: "Pedro Rodriguez",
    studentId: "2024-00125",
    amount: 750,
    type: "Lab Fee",
    status: "failed",
    method: "GCash",
    date: "2024-01-15 12:20",
    reference: "GC123456791",
  },
  {
    id: "PAY004",
    studentName: "Ana Garcia",
    studentId: "2024-00126",
    amount: 3000,
    type: "Allowance Request",
    status: "completed",
    method: "Parent Transfer",
    date: "2024-01-15 11:15",
    reference: "PT123456792",
  },
]

export function PaymentManagement({ onBack, onNavigate }: PaymentManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesType = typeFilter === "all" || payment.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20">
            <RefreshCw className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStats = () => {
    const total = mockPayments.reduce((sum, payment) => sum + payment.amount, 0)
    const completed = mockPayments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
    const pending = mockPayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)
    const failed = mockPayments.filter((p) => p.status === "failed").reduce((sum, p) => sum + p.amount, 0)

    return { total, completed, pending, failed, count: mockPayments.length }
  }

  const stats = getStats()

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 pb-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Payment Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor and manage all student payments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱{stats.total.toLocaleString()}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Volume</p>
              <p className="text-xs text-blue-600 font-medium">{stats.count} transactions</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱{stats.completed.toLocaleString()}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-xs text-green-600 font-medium">
                {Math.round((stats.completed / stats.total) * 100)}% success rate
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <RefreshCw className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱{stats.pending.toLocaleString()}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-xs text-yellow-600 font-medium">Requires attention</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₱{stats.failed.toLocaleString()}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Failed</p>
              <p className="text-xs text-red-600 font-medium">Needs review</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by student name, ID, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="School Fees">School Fees</SelectItem>
                <SelectItem value="Library Fee">Library Fee</SelectItem>
                <SelectItem value="Lab Fee">Lab Fee</SelectItem>
                <SelectItem value="Allowance Request">Allowance</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-gray-200 dark:border-gray-700 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment List */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Transactions</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {filteredPayments.length} of {mockPayments.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold flex items-center justify-center">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{payment.studentName}</p>
                      {getStatusBadge(payment.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>ID: {payment.studentId}</span>
                      <span>Type: {payment.type}</span>
                      <span>Method: {payment.method}</span>
                      <span>Ref: {payment.reference}</span>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{payment.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">₱{payment.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{payment.id}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No payments found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
