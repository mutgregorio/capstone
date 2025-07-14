"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  studentId: string
  gcashNumber: string
  isGcashVerified: boolean
  isEmailVerified: boolean
  avatar?: string
  balance: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  verifyGcash: (gcashNumber: string, otp: string) => Promise<{ success: boolean; error?: string }>
  sendGcashOtp: (gcashNumber: string) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
}

interface RegisterData {
  email: string
  password: string
  name: string
  studentId: string
  gcashNumber: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("gcash-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock validation
    if (email === "juan.delacruz@university.edu.ph" && password === "password123") {
      const userData: User = {
        id: "user_123",
        email,
        name: "Juan Dela Cruz",
        studentId: "2024-00123",
        gcashNumber: "09171234567",
        isGcashVerified: true,
        isEmailVerified: true,
        balance: 2450,
      }

      setUser(userData)
      localStorage.setItem("gcash-user", JSON.stringify(userData))
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Invalid email or password" }
  }

  const register = async (data: RegisterData) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock validation
    if (data.email === "existing@university.edu.ph") {
      setIsLoading(false)
      return { success: false, error: "Email already exists" }
    }

    const userData: User = {
      id: `user_${Date.now()}`,
      email: data.email,
      name: data.name,
      studentId: data.studentId,
      gcashNumber: data.gcashNumber,
      isGcashVerified: false,
      isEmailVerified: false,
      balance: 0,
    }

    setUser(userData)
    localStorage.setItem("gcash-user", JSON.stringify(userData))
    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("gcash-user")
  }

  const sendGcashOtp = async (gcashNumber: string) => {
    // Simulate sending OTP
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true }
  }

  const verifyGcash = async (gcashNumber: string, otp: string) => {
    setIsLoading(true)

    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (otp === "123456") {
      const updatedUser = { ...user!, isGcashVerified: true, balance: 2450 }
      setUser(updatedUser)
      localStorage.setItem("gcash-user", JSON.stringify(updatedUser))
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Invalid OTP code" }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        verifyGcash,
        sendGcashOtp,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
