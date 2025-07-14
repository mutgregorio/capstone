"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  DollarSign,
  Shield,
  Settings,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
} from "lucide-react"

interface NotificationCenterProps {
  onBack: () => void
}

const mockNotifications = [
  {
    id: "1",
    type: "payment",
    title: "Payment Successful",
    message: "Your payment of ₱2,500 for Registration Fee has been processed successfully.",
    time: "2 minutes ago",
    read: false,
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    id: "2",
    type: "security",
    title: "New Login Detected",
    message: "A new login was detected from Chrome on Windows. If this wasn't you, please secure your account.",
    time: "1 hour ago",
    read: false,
    icon: Shield,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    id: "3",
    type: "reminder",
    title: "Payment Due Soon",
    message: "Your Laboratory Fee of ₱750 is due in 3 days. Don't forget to make your payment.",
    time: "3 hours ago",
    read: true,
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
  },
  {
    id: "4",
    type: "info",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur on Sunday, 2:00 AM - 4:00 AM. Services may be temporarily unavailable.",
    time: "1 day ago",
    read: true,
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    id: "5",
    type: "payment",
    title: "Low Balance Alert",
    message: "Your GCash balance is running low (₱450). Consider adding funds to avoid payment failures.",
    time: "2 days ago",
    read: true,
    icon: DollarSign,
    color: "text-red-600",
    bgColor: "bg-red-100 dark:bg-red-900/20",
  },
]

export function NotificationCenter({ onBack }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")
  const [notificationSettings, setNotificationSettings] = useState({
    payments: true,
    security: true,
    reminders: true,
    system: true,
  })

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.read
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAsUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: false } : notification)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 pb-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Stay updated with your account activities
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter(filter === "all" ? "unread" : "all")}
            className="border-gray-200 dark:border-gray-700"
          >
            {filter === "all" ? "Show Unread" : "Show All"}
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="border-gray-200 dark:border-gray-700 bg-transparent"
            >
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Notification Settings */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Choose which notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Payment Notifications</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Successful payments, failures, reminders</p>
                </div>
                <Switch
                  checked={notificationSettings.payments}
                  onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, payments: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Security Alerts</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Login attempts, account changes</p>
                </div>
                <Switch
                  checked={notificationSettings.security}
                  onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, security: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Payment Reminders</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Due dates, low balance alerts</p>
                </div>
                <Switch
                  checked={notificationSettings.reminders}
                  onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, reminders: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">System Updates</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Maintenance, new features</p>
                </div>
                <Switch
                  checked={notificationSettings.system}
                  onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, system: checked }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Notifications
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {filteredNotifications.length} notifications
                  {filter === "unread" && " (unread only)"}
                </CardDescription>
              </div>
              {notifications.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {filteredNotifications.length > 0 ? (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const Icon = notification.icon
                  return (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                        !notification.read ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.bgColor}`}
                      >
                        <Icon className={`h-5 w-5 ${notification.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                          {!notification.read && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            Mark Read
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsUnread(notification.id)}
                            className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                          >
                            <MarkAsUnread className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {filter === "unread" ? "No unread notifications" : "No notifications"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {filter === "unread"
                    ? "All caught up! You have no unread notifications."
                    : "You're all caught up! New notifications will appear here."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
