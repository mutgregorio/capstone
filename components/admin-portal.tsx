"use client"

import { useState } from "react"
import { AdminDashboard } from "./admin/admin-dashboard"
import { StudentManagement } from "./admin/student-management"
import { PaymentManagement } from "./admin/payment-management"
import { AdminSidebar } from "./admin/admin-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useAdminAuth } from "@/lib/admin-auth-context"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export type AdminViewType = "dashboard" | "student-management" | "payment-management"

export default function AdminPortal() {
  const [currentView, setCurrentView] = useState<AdminViewType>("dashboard")
  const { adminUser } = useAdminAuth()

  const getPageTitle = () => {
    switch (currentView) {
      case "dashboard":
        return "Dashboard"
      case "student-management":
        return "Student Management"
      case "payment-management":
        return "Payment Management"
      default:
        return "Dashboard"
    }
  }

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <AdminDashboard onNavigate={setCurrentView} />
      case "student-management":
        return <StudentManagement onBack={() => setCurrentView("dashboard")} />
      case "payment-management":
        return <PaymentManagement onBack={() => setCurrentView("dashboard")} />
      default:
        return <AdminDashboard onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="dark min-h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarProvider>
        <AdminSidebar currentView={currentView} onNavigate={setCurrentView} adminUser={adminUser!} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 bg-white dark:bg-gray-900">
            <SidebarTrigger className="-ml-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-gray-300 dark:bg-gray-600" />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="#"
                    onClick={() => setCurrentView("dashboard")}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    GCash Admin Portal
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-gray-400 dark:text-gray-500" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">
                    {getPageTitle()}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="relative text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  5
                </span>
              </Button>
            </div>
          </header>
          {renderContent()}
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
