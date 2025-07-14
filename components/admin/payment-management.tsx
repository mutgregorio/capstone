"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, Download, Eye, Check, X, Banknote, Receipt, CreditCard } from "lucide-react" // Added Banknote
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PaymentManagementProps {
  onBack: () => void
}

const payments = [
  {
    id: "PAY001",
    studentName: "Juan Dela Cruz",
    studentId: "S001",
    type: "Tuition Fee", // Updated type
    amount: 15000,
    date: "2024-01-20",
    status: "completed",
    category: "tuition", // New category
  },
  {
    id: "PAY002",
    studentName: "Maria Santos",
    studentId: "S002",
    type: "Registration Fee",
    amount: 2500,
    date: "2024-01-15",
    status: "completed",
    category: "fees",
  },
  {
    id: "PAY003",
    studentName: "Pedro Reyes",
    studentId: "S003",
    type: "Library Fee",
    amount: 500,
    date: "2024-01-12",
    status: "pending",
    category: "fees",
  },
  {
    id: "PAY004",
    studentName: "Anna Lim",
    studentId: "S004",
    type: "Lab Fee",
    amount: 750,
    date: "2024-01-08",
    status: "completed",
    category: "fees",
  },
  {
    id: "PAY005",
    studentName: "Crisostomo Ibarra",
    studentId: "S005",
    type: "Miscellaneous Fee",
    amount: 1200,
    date: "2024-01-03",
    status: "failed",
    category: "fees",
  },
]

export function PaymentManagement({ onBack }: PaymentManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus
    const matchesCategory = filterCategory === "all" || payment.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/20">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20">
            Pending
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fees":
        return <Receipt className="h-4 w-4 text-green-600" />
      case "tuition":
        return <Banknote className="h-4 w-4 text-purple-600" />
      default:
        return <CreditCard className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-3 md:p-4">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg md:text-xl font-semibold text-foreground">Payment Management</h1>
      </div>

      <div className="max-w-full mx-auto w-full">
        {/* Filters and Actions */}
        <Card className="bg-card border-border mb-4">
          <CardContent className="pt-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments by name, ID, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border text-foreground"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fees">School Fees</SelectItem>
                  <SelectItem value="tuition">Tuition</SelectItem> {/* New filter item */}
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full md:w-auto bg-background border-border text-foreground">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment List Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">All Payments</CardTitle>
            <CardDescription>Detailed list of all student payments and their statuses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.studentName}</TableCell>
                        <TableCell>{payment.studentId}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          {getCategoryIcon(payment.category)}
                          {payment.type}
                        </TableCell>
                        <TableCell className="text-right">₱{payment.amount.toLocaleString()}.00</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                            {payment.status === "pending" && (
                              <>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                                  <Check className="h-4 w-4" />
                                  <span className="sr-only">Approve</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Reject</span>
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No payments found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
