"use client"

import type * as React from "react"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  FileText,
  Shield,
  LogOut,
  Activity,
} from "lucide-react"
import type { AdminViewType } from "../admin-portal"
import type { AdminUser } from "../../lib/admin-auth-context"
import { useAdminAuth } from "../../lib/admin-auth-context"

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

interface AdminSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentView: AdminViewType
  onNavigate: (view: AdminViewType) => void
  admin: AdminUser
}

export function AdminSidebar({ currentView, onNavigate, admin, ...props }: AdminSidebarProps) {
  const { logout } = useAdminAuth()

  const data = {
    navMain: [
      {
        title: "Dashboard",
        view: "dashboard" as AdminViewType,
        icon: LayoutDashboard,
      },
      {
        title: "Students",
        view: "students" as AdminViewType,
        icon: Users,
      },
      {
        title: "Payments",
        view: "payments" as AdminViewType,
        icon: CreditCard,
      },
      {
        title: "Reports",
        view: "reports" as AdminViewType,
        icon: BarChart3,
      },
      {
        title: "Activities",
        view: "activities" as AdminViewType,
        icon: Activity,
      },
    ],
    navSecondary: [
      {
        title: "Fee Structure",
        view: "fees" as AdminViewType,
        icon: FileText,
      },
      {
        title: "Notifications",
        view: "notifications" as AdminViewType,
        icon: Bell,
      },
      {
        title: "Settings",
        view: "settings" as AdminViewType,
        icon: Settings,
      },
    ],
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return (
          <Badge variant="secondary" className="text-purple-600 bg-purple-100 dark:bg-purple-900/20 text-xs">
            Super Admin
          </Badge>
        )
      case "admin":
        return (
          <Badge variant="secondary" className="text-blue-600 bg-blue-100 dark:bg-blue-900/20 text-xs">
            Admin
          </Badge>
        )
      case "finance_officer":
        return (
          <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/20 text-xs">
            Finance Officer
          </Badge>
        )
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  return (
    <Sidebar variant="inset" className="border-r-gray-200 dark:border-r-gray-800 bg-white dark:bg-gray-900" {...props}>
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white font-bold text-lg shadow-lg">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base font-bold text-gray-900 dark:text-white truncate">Admin Portal</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">GCash Student System</span>
          </div>
          {getRoleBadge(admin.role)}
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
                        ? "bg-slate-50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
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
            Management
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
                        ? "bg-slate-50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
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
                    <AvatarImage src={admin.avatar || "/placeholder.svg"} alt={admin.name} />
                    <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-800 text-white font-semibold">
                      {admin.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 text-left min-w-0">
                    <span className="truncate font-semibold text-gray-900 dark:text-white">{admin.name}</span>
                    <span className="truncate text-xs text-gray-500 dark:text-gray-400">{admin.department}</span>
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
                  Admin Settings
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
