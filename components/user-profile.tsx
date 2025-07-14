"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  GraduationCap,
  Shield,
  Edit,
  Camera,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import type { User as UserType } from "../lib/auth-context"

interface UserProfileProps {
  onBack: () => void
  user: UserType
}

export function UserProfile({ onBack, user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    studentId: user.studentId,
    gcashNumber: user.gcashNumber,
  })

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false)
    // Show success message
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      studentId: user.studentId,
      gcashNumber: user.gcashNumber,
    })
    setIsEditing(false)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 pb-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your personal information</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Profile Header */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-gray-200 dark:ring-gray-700">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-2xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Student ID: {user.studentId}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {user.isEmailVerified && (
                    <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/20">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Email Verified
                    </Badge>
                  )}
                  {user.isGcashVerified && (
                    <Badge variant="secondary" className="text-blue-600 bg-blue-100 dark:bg-blue-900/20">
                      <Shield className="h-3 w-3 mr-1" />
                      GCash Verified
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-purple-600 bg-purple-100 dark:bg-purple-900/20">
                    Active Student
                  </Badge>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
                className={isEditing ? "border-gray-200 dark:border-gray-700" : "bg-blue-600 hover:bg-blue-700"}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your basic account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="pl-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Student ID
                </Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    disabled={true}
                    className="pl-11 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-700 text-gray-500"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Student ID cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  University Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="pl-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                {!user.isEmailVerified && (
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs">Email verification pending</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gcash" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  GCash Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="gcash"
                    value={formData.gcashNumber}
                    onChange={(e) => setFormData({ ...formData, gcashNumber: e.target.value })}
                    disabled={!isEditing}
                    className="pl-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                {!user.isGcashVerified && (
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs">GCash verification pending</span>
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700 bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Statistics */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Account Statistics</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your account activity overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">₱{user.balance.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Balance</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">23</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">₱15,240</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Verification Status</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your account verification progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    user.isEmailVerified ? "bg-green-100 dark:bg-green-900/20" : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <Mail className={`h-5 w-5 ${user.isEmailVerified ? "text-green-600" : "text-gray-400"}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email Verification</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Verify your university email</p>
                </div>
              </div>
              {user.isEmailVerified ? (
                <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  Verify Now
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    user.isGcashVerified ? "bg-green-100 dark:bg-green-900/20" : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <Shield className={`h-5 w-5 ${user.isGcashVerified ? "text-green-600" : "text-gray-400"}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">GCash Verification</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Verify your GCash account</p>
                </div>
              </div>
              {user.isGcashVerified ? (
                <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  Verify Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
