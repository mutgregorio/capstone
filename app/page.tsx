"use client"

import { AuthProvider, useAuth } from "../lib/auth-context"
import { AuthWrapper } from "../components/auth/auth-wrapper"
import Dashboard from "../dashboard"

function AppContent() {
  const { user } = useAuth()

  // Show auth forms if no user or user not verified
  if (!user || !user.isGcashVerified) {
    return <AuthWrapper />
  }

  // Show dashboard if user is authenticated and verified
  return <Dashboard />
}

export default function Page() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
