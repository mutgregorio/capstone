"use client"

import { useState } from "react"
import { AppSidebar } from "./components/app-sidebar"
import { DashboardContent } from "./components/dashboard-content"
import { PaymentForm } from "./components/payment-form"
import { TransactionHistory } from "./components/transaction-history"
import { WalletManagement } from "./components/wallet-management"
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
import { useAuth } from "./lib/auth-context"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type ViewType = "dashboard" | "payment" | "history" | "wallet" | "school-fees" | "allowance"

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")
  const { user } = useAuth()

  const getPageTitle = () => {
    switch (currentView) {
      case "dashboard":
        return "Dashboard"
      case "payment":
        return "Make Payment"
      case "history":
        return "Transaction History"
      case "wallet":
        return "My Wallet"
      case "school-fees":
        return "School Fees"
      case "allowance":
        return "Request Allowance"
      default:
        return "Dashboard"
    }
  }

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardContent onNavigate={setCurrentView} balance={user?.balance || 0} />
      case "payment":
      case "school-fees":
        return (
          <PaymentForm type={currentView} onBack={() => setCurrentView("dashboard")} balance={user?.balance || 0} />
        )
      case "history":
        return <TransactionHistory onBack={() => setCurrentView("dashboard")} />
      case "wallet":
        return <WalletManagement onBack={() => setCurrentView("dashboard")} balance={user?.balance || 0} />
      case "allowance":
        return <PaymentForm type="allowance" onBack={() => setCurrentView("dashboard")} balance={user?.balance || 0} />
      default:
        return <DashboardContent onNavigate={setCurrentView} balance={user?.balance || 0} />
    }
  }

  return (
    <div className="dark min-h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarProvider>
        <AppSidebar currentView={currentView} onNavigate={setCurrentView} balance={user?.balance || 0} user={user!} />
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
                    GCash Student Portal
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
                  placeholder="Search transactions..."
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
                  2
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
