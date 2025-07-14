"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface AdminUser {
  id: string
  email: string
  name: string
  role: "super_admin" | "admin" | "finance_officer"
  department: string
  avatar?: string
  permissions: string[]
}

interface AdminAuthContextType {
  admin: AdminUser | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem("gcash-admin")
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock validation
    if (email === "admin@university.edu.ph" && password === "admin123") {
      const adminData: AdminUser = {
        id: "admin_123",
        email,
        name: "Maria Santos",
        role: "super_admin",
        department: "Finance Office",
        permissions: ["manage_students", "manage_payments", "view_reports", "system_settings"],
      }

      setAdmin(adminData)
      localStorage.setItem("gcash-admin", JSON.stringify(adminData))
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Invalid email or password" }
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem("gcash-admin")
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
