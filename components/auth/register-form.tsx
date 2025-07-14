"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, Phone, Loader2, ArrowRight, ArrowLeft } from "lucide-react"
import { useAuth } from "../../lib/auth-context"

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    studentId: "",
    gcashNumber: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")

  const { register, isLoading } = useAuth()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.name || !formData.studentId || !formData.gcashNumber) {
      return "Please fill in all fields"
    }

    if (!formData.email.endsWith("@university.edu.ph")) {
      return "Please use your university email address"
    }

    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long"
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match"
    }

    if (!/^09\d{9}$/.test(formData.gcashNumber)) {
      return "Please enter a valid GCash number (09XXXXXXXXX)"
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    const result = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      studentId: formData.studentId,
      gcashNumber: formData.gcashNumber,
    })

    if (!result.success) {
      setError(result.error || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold text-xl border border-white/30">
                G
              </div>
              <div>
                <h1 className="text-2xl font-bold">GCash Student</h1>
                <p className="text-emerald-100">Payment Portal</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Join Thousands of
              <br />
              Verified Students
            </h2>
            <p className="text-xl text-emerald-100 leading-relaxed">
              Create your secure account and start managing your educational payments with confidence and ease.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <span className="text-emerald-100">University Email Verification</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <span className="text-emerald-100">GCash Account Integration</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <span className="text-emerald-100">Secure Payment Processing</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm" />
        <div className="absolute bottom-20 right-32 w-20 h-20 rounded-full bg-white/5 backdrop-blur-sm" />
        <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm" />
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-xl">
                G
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create your account</h2>
            <p className="text-gray-600 dark:text-gray-400">Join the secure student payment platform</p>
          </div>

          <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/20">
                    <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Juan Dela Cruz"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="pl-11 h-11 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-800"
                        disabled={isLoading}
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
                        type="text"
                        placeholder="2024-00123"
                        value={formData.studentId}
                        onChange={(e) => handleChange("studentId", e.target.value)}
                        className="pl-11 h-11 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-800"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    University Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.name@university.edu.ph"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="pl-11 h-11 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-800"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gcashNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    GCash Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="gcashNumber"
                      type="tel"
                      placeholder="09171234567"
                      value={formData.gcashNumber}
                      onChange={(e) => handleChange("gcashNumber", e.target.value)}
                      className="pl-11 h-11 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-800"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        className="pl-11 pr-11 h-11 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-800"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        className="pl-11 pr-11 h-11 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-gray-800"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={onSwitchToLogin}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Already have an account? Sign in
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
