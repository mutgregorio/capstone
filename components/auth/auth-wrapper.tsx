"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { GcashVerification } from "./gcash-verification"
import { useAuth } from "../../lib/auth-context"

export function AuthWrapper() {
  const [isLogin, setIsLogin] = useState(true)
  const { user } = useAuth()

  // Show GCash verification if user is logged in but not verified
  if (user && !user.isGcashVerified) {
    return <GcashVerification />
  }

  // Show login/register forms if no user
  if (isLogin) {
    return <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
  }

  return <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
}
