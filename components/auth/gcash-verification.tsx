"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Loader2, CheckCircle, ArrowRight, Smartphone } from "lucide-react"
import { useAuth } from "../../lib/auth-context"

export function GcashVerification() {
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { user, verifyGcash, sendGcashOtp } = useAuth()

  const handleSendOtp = async () => {
    if (!user?.gcashNumber) return

    setIsLoading(true)
    setError("")

    const result = await sendGcashOtp(user.gcashNumber)
    if (result.success) {
      setOtpSent(true)
    } else {
      setError("Failed to send OTP. Please try again.")
    }

    setIsLoading(false)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.gcashNumber || !otp) return

    setError("")

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    const result = await verifyGcash(user.gcashNumber, otp)
    if (!result.success) {
      setError(result.error || "Verification failed")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white border border-white/30">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Account Verification</h1>
                <p className="text-orange-100">Secure Your GCash</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Verify Your
              <br />
              GCash Account
            </h2>
            <p className="text-xl text-orange-100 leading-relaxed">
              We need to verify your GCash account to ensure secure transactions and protect your financial information.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <span className="text-orange-100">SMS Verification Code</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <span className="text-orange-100">Account Security Protection</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <span className="text-orange-100">Instant Transaction Access</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm" />
        <div className="absolute bottom-20 right-32 w-20 h-20 rounded-full bg-white/5 backdrop-blur-sm" />
        <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm" />
      </div>

      {/* Right Side - Verification Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-white">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Verify GCash Account</h2>
            <p className="text-gray-600 dark:text-gray-400">Secure your account with SMS verification</p>
          </div>

          <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
            <CardContent className="p-8">
              {!otpSent ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/40">
                        <Smartphone className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">GCash Number</p>
                        <p className="text-gray-600 dark:text-gray-400 font-mono">{user?.gcashNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Verification Required
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        We'll send a 6-digit verification code to your registered GCash number to confirm your identity
                        and secure your account.
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleSendOtp}
                    className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Code...
                      </>
                    ) : (
                      <>
                        Send Verification Code
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  {error && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/20">
                      <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3 text-green-800 dark:text-green-200">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Code Sent Successfully</p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Check your phone for the 6-digit code sent to {user?.gcashNumber}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="otp" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enter Verification Code
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="text-center text-2xl tracking-[0.5em] h-14 font-mono border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-500 bg-white dark:bg-gray-800"
                      maxLength={6}
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      Enter the 6-digit code sent to your phone
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Account
                        <Shield className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => {
                        setOtpSent(false)
                        setOtp("")
                        setError("")
                      }}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                      disabled={isLoading}
                    >
                      Change GCash Number
                    </Button>
                  </div>
                </form>
              )}

              {/* Demo OTP */}
              {otpSent && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center mb-2">Demo Code</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-mono bg-white dark:bg-gray-800 py-2 px-4 rounded border">
                    123456
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
