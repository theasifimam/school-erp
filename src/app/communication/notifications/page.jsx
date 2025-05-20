"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Check,
  Clock,
  ChevronDown,
  X,
  Filter,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);

  // Mock data for notifications
  useEffect(() => {
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          title: "Fee Payment Reminder",
          content:
            "The last date for payment of term fees is May 25, 2025. Please make the payment to avoid late fees.",
          type: "reminder",
          isRead: false,
          priority: "high",
          timestamp: "2025-05-15T09:30:00",
          actions: [
            { label: "Pay Now", url: "/payments" },
            { label: "View Details", url: "/fee-structure" },
          ],
        },
        {
          id: 2,
          title: "Parent-Teacher Meeting",
          content:
            "The Parent-Teacher Meeting is scheduled for May 30, 2025. Please book your slot.",
          type: "event",
          isRead: true,
          priority: "medium",
          timestamp: "2025-05-14T10:15:00",
          actions: [{ label: "Book Slot", url: "/ptm-booking" }],
        },
        {
          id: 3,
          title: "New Assignment Posted",
          content:
            "Your Mathematics teacher has posted a new assignment. Submission deadline: May 22, 2025.",
          type: "academic",
          isRead: false,
          priority: "medium",
          timestamp: "2025-05-14T08:45:00",
          actions: [{ label: "View Assignment", url: "/assignments/math-101" }],
        },
        {
          id: 4,
          title: "Report Card Available",
          content: "Your Term 1 Report Card is now available for download.",
          type: "academic",
          isRead: true,
          priority: "high",
          timestamp: "2025-05-12T16:20:00",
          actions: [
            { label: "Download", url: "/reports/term1" },
            { label: "View Online", url: "/reports/view/term1" },
          ],
        },
        {
          id: 5,
          title: "School Trip Registration",
          content:
            "Registration for the Annual School Trip to Science Museum is now open.",
          type: "event",
          isRead: false,
          priority: "low",
          timestamp: "2025-05-10T11:30:00",
          actions: [{ label: "Register", url: "/events/school-trip" }],
        },
        {
          id: 6,
          title: "Holiday Announcement",
          content:
            "The school will remain closed on May 24, 2025 due to maintenance work.",
          type: "announcement",
          isRead: true,
          priority: "medium",
          timestamp: "2025-05-09T14:10:00",
          actions: [],
        },
        {
          id: 7,
          title: "Library Book Return Reminder",
          content: "Please return the borrowed books by May 21, 2025.",
          type: "reminder",
          isRead: false,
          priority: "low",
          timestamp: "2025-05-07T09:15:00",
          actions: [{ label: "View Borrowed Books", url: "/library/borrowed" }],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-blue-100 text-blue-800",
  };

  const typeIcons = {
    academic: <Bell className="h-4 w-4" />,
    event: <Clock className="h-4 w-4" />,
    announcement: <ExternalLink className="h-4 w-4" />,
    reminder: <Clock className="h-4 w-4" />,
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "unread") return !notification.isRead;
    return notification.type === selectedTab;
  });

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const confirmDelete = (id) => {
    setNotificationToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const deleteNotification = () => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationToDelete)
    );
    setIsDeleteDialogOpen(false);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-gray-500">
            Manage all your school notifications in one place
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedTab("high")}>
                High Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedTab("medium")}>
                Medium Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedTab("low")}>
                Low Priority
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="announcement">Announcements</TabsTrigger>
          <TabsTrigger value="reminder">Reminders</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <Bell className="h-12 w-12 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-600">
              No notifications
            </h2>
            <p className="text-gray-500">You're all caught up!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md ${
                !notification.isRead ? "border-l-4 border-primary" : ""
              }`}
            >
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">
                      {notification.title}
                    </CardTitle>
                    <Badge className={priorityColors[notification.priority]}>
                      {notification.priority.charAt(0).toUpperCase() +
                        notification.priority.slice(1)}
                    </Badge>
                    {!notification.isRead && (
                      <Badge variant="default" className="bg-primary">
                        New
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    {typeIcons[notification.type]}
                    <span className="capitalize">
                      {notification.type}
                    </span> •{" "}
                    {new Date(notification.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => confirmDelete(notification.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p>{notification.content}</p>
              </CardContent>
              {notification.actions.length > 0 && (
                <>
                  <Separator />
                  <CardFooter className="pt-4 flex gap-2 justify-end">
                    {notification.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={index === 0 ? "default" : "outline"}
                        size="sm"
                        asChild
                      >
                        <a href={action.url}>{action.label}</a>
                      </Button>
                    ))}
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
        </div>
      )}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Notification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this notification? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteNotification}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive important notifications via SMS
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notification Preferences</h3>
                  <p className="text-sm text-gray-500">
                    Customize which notifications you want to receive
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
