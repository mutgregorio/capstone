"use client"

import { AdminAuthProvider } from "../../lib/admin-auth-context"
import { AdminWrapper } from "../../components/admin/admin-wrapper"

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <AdminWrapper />
    </AdminAuthProvider>
  )
}
