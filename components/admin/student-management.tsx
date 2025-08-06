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
  Filter,
  Users,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Phone,
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AdminViewType } from "../admin-portal"
import StudentRegistrationForm from "./student-registration-form"

interface StudentManagementProps {
  onBack: () => void
  onNavigate: (view: AdminViewType) => void
}

const mockStudents = [
  {
    id: "1",
    name: "Juan Dela Cruz",
    studentId: "2024-00123",
    email: "juan.delacruz@university.edu.ph",
    gcashNumber: "09171234567",
    status: "verified",
    balance: 2450,
    totalSpent: 15240,
    lastActive: "2 hours ago",
    registrationDate: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "Maria Santos",
    studentId: "2024-00124",
    email: "maria.santos@university.edu.ph",
    gcashNumber: "09181234567",
    status: "pending",
    balance: 0,
    totalSpent: 0,
    lastActive: "1 day ago",
    registrationDate: "Jan 16, 2024",
  },
  {
    id: "3",
    name: "Pedro Rodriguez",
    studentId: "2024-00125",
    email: "pedro.rodriguez@university.edu.ph",
    gcashNumber: "09191234567",
    status: "verified",
    balance: 1200,
    totalSpent: 8500,
    lastActive: "30 minutes ago",
    registrationDate: "Jan 14, 2024",
  },
  {
    id: "4",
    name: "Ana Garcia",
    studentId: "2024-00126",
    email: "ana.garcia@university.edu.ph",
    gcashNumber: "09201234567",
    status: "suspended",
    balance: 500,
    totalSpent: 3200,
    lastActive: "3 days ago",
    registrationDate: "Jan 12, 2024",
  },
]

export function StudentManagement({ onBack, onNavigate }: StudentManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/20">
            <Shield className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20">
            Pending
          </Badge>
        )
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStats = () => {
    const total = mockStudents.length
    const verified = mockStudents.filter((s) => s.status === "verified").length
    const pending = mockStudents.filter((s) => s.status === "pending").length
    const suspended = mockStudents.filter((s) => s.status === "suspended").length

    return { total, verified, pending, suspended }
  }

  const stats = getStats()

  function handleRegistrationSuccess() {
    setShowRegistrationForm(false)
    // TODO: Refresh student list from backend after registration
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 pb-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Student Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage student accounts and verification status</p>
          </div>
          <Button onClick={() => setShowRegistrationForm(true)}>Register New Student</Button>
        </div>
      </div>

      {showRegistrationForm && (
        <StudentRegistrationForm
          onSuccess={handleRegistrationSuccess}
          onCancel={() => setShowRegistrationForm(false)}
        />
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Students</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.verified}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Verified</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Users className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Pending</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.suspended}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Suspended</p>
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
                placeholder="Search students by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Students</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {filteredStudents.length} of {mockStudents.length} students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold flex items-center justify-center">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{student.name}</p>
                      {getStatusBadge(student.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {student.studentId}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {student.gcashNumber}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-400 dark:text-gray-500 mt-2">
                      <span>Balance: ₱{student.balance.toLocaleString()}</span>
                      <span>Spent: ₱{student.totalSpent.toLocaleString()}</span>
                      <span>Last active: {student.lastActive}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Student
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {student.status === "pending" && (
                        <DropdownMenuItem className="text-green-600">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Approve Account
                        </DropdownMenuItem>
                      )}
                      {student.status === "verified" && (
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend Account
                        </DropdownMenuItem>
                      )}
                      {student.status === "suspended" && (
                        <DropdownMenuItem className="text-green-600">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Reactivate Account
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No students found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
