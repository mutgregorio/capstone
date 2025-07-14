"use client"

import { AdminLogin } from "./admin-login"
import { useAdminAuth } from "../../lib/admin-auth-context"
import AdminPortal from "../admin-portal"

export function AdminWrapper() {
  const { admin } = useAdminAuth()

  // Show login form if no admin user
  if (!admin) {
    return <AdminLogin />
  }

  // Show admin portal if authenticated
  return <AdminPortal />
}
