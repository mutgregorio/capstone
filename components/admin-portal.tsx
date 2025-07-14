"use client"

import { useState } from "react"
import { AdminDashboard } from "./admin/admin-dashboard"
import { StudentManagement } from "./admin/student-management"
import { PaymentManagement } from "./admin/payment-management"

const AdminPortal = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "students" | "payments">("dashboard")

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <AdminDashboard onNavigate={setCurrentView} />
      case "students":
        return <StudentManagement onBack={() => setCurrentView("dashboard")} onNavigate={setCurrentView} />
      case "payments":
        return <PaymentManagement onBack={() => setCurrentView("dashboard")} onNavigate={setCurrentView} />
      default:
        return <AdminDashboard onNavigate={setCurrentView} />
    }
  }

  return <div>{renderContent()}</div>
}

export default AdminPortal
