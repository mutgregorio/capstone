"use client"

import type * as React from "react"
import { CreditCard, DollarSign, History, Home, Receipt, Settings, Wallet, LogOut, Shield, Bell } from "lucide-react"
import type { ViewType } from "../dashboard"
import type { User } from "../lib/auth-context"
import { useAuth } from "../lib/auth-context"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentView: ViewType
  onNavigate: (view: ViewType) => void
  balance: number
  user: User
}

export function AppSidebar({ currentView, onNavigate, balance, user, ...props }: AppSidebarProps) {
  const { logout } = useAuth()

  const data = {
    navMain: [
      {
        title: "Dashboard",
        view: "dashboard" as ViewType,
        icon: Home,
      },
      {
        title: "Make Payment",
        view: "payment" as ViewType,
        icon: CreditCard,
      },
      {
        title: "Transaction History",
        view: "history" as ViewType,
        icon: History,
      },
      {
        title: "My Wallet",
        view: "wallet" as ViewType,
        icon: Wallet,
      },
    ],
    navSecondary: [
      {
        title: "School Fees",
        view: "school-fees" as ViewType,
        icon: Receipt,
      },
      {
        title: "Allowance",
        view: "allowance" as ViewType,
        icon: DollarSign,
      },
    ],
  }

  return (
    <Sidebar variant="inset" className="border-r-gray-200 dark:border-r-gray-800 bg-white dark:bg-gray-900" {...props}>
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-lg shadow-lg">
            G
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base font-bold text-gray-900 dark:text-white truncate">GCash Student</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">Payment Portal</span>
          </div>
          {user.isGcashVerified && (
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-600" />
              <Badge
                variant="secondary"
                className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              >
                Verified
              </Badge>
            </div>
          )}
        </div>

        {/* Balance display in sidebar for mobile */}
        <div className="px-3 pb-4 md:hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs opacity-90 font-medium">Available Balance</div>
              <Wallet className="h-4 w-4 opacity-75" />
            </div>
            <div className="text-xl font-bold">₱{balance.toLocaleString()}.00</div>
            {user.isGcashVerified && (
              <Badge variant="secondary" className="mt-2 text-xs bg-white/20 text-white border-white/30">
                <Shield className="h-3 w-3 mr-1" />
                Verified Account
              </Badge>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white dark:bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={currentView === item.view}
                    onClick={() => onNavigate(item.view)}
                    className={`cursor-pointer mx-2 rounded-lg transition-all duration-200 ${
                      currentView === item.view
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">
            Quick Pay
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={currentView === item.view}
                    onClick={() => onNavigate(item.view)}
                    className={`cursor-pointer mx-2 rounded-lg transition-all duration-200 ${
                      currentView === item.view
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer mx-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Avatar className="h-10 w-10 ring-2 ring-gray-200 dark:ring-gray-700">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 text-left min-w-0">
                    <span className="truncate font-semibold text-gray-900 dark:text-white">{user.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="truncate text-xs text-gray-500 dark:text-gray-400">ID: {user.studentId}</span>
                      {user.isGcashVerified && <Shield className="h-3 w-3 text-green-600 flex-shrink-0" />}
                    </div>
                  </div>
                  <Settings className="h-5 w-5 flex-shrink-0 text-gray-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <DropdownMenuItem className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
