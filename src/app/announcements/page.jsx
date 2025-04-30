"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast, Toaster } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Bell,
  BellOff,
  Calendar as CalendarIcon,
  CheckCircle2,
  Loader2,
  Mail,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

const mockAnnouncements = [
  {
    id: "ann-001",
    title: "Sports Day Announcement",
    content:
      "The annual sports day will be held on June 15th. All students are required to participate.",
    author: {
      id: "t123",
      name: "Mr. Johnson",
      role: "teacher",
      avatar: "/avatars/teacher1.jpg",
    },
    audience: "all",
    priority: "high",
    publishedAt: new Date(2023, 5, 1),
    expiresAt: new Date(2023, 5, 16),
    isActive: true,
    attachments: [
      {
        name: "Sports Day Schedule.pdf",
        url: "#",
        type: "pdf",
      },
    ],
  },
  {
    id: "ann-002",
    title: "Parent-Teacher Meeting",
    content: "Scheduled for June 20th from 4-6 PM in the school auditorium.",
    author: {
      id: "a101",
      name: "Principal Wilson",
      role: "admin",
      avatar: "/avatars/admin1.jpg",
    },
    audience: "parents",
    priority: "medium",
    publishedAt: new Date(2023, 5, 2),
    expiresAt: new Date(2023, 5, 21),
    isActive: true,
  },
  {
    id: "ann-003",
    title: "Library Closure Notice",
    content: "The library will be closed for maintenance on June 10th.",
    author: {
      id: "t124",
      name: "Ms. Thompson",
      role: "teacher",
    },
    audience: "students",
    priority: "low",
    publishedAt: new Date(2023, 5, 3),
    expiresAt: new Date(2023, 5, 11),
    isActive: true,
  },
];

const audienceOptions = [
  { value: "all", label: "Everyone" },
  { value: "staff", label: "Staff Only" },
  { value: "students", label: "Students Only" },
  { value: "parents", label: "Parents Only" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] =
    (useState < "all") | "active" | ("expired" > "all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    audience: "all",
    priority: "medium",
    expiresAt: "",
    attachments: [],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnouncements(mockAnnouncements);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && announcement.isActive) ||
      (filter === "expired" &&
        announcement.expiresAt &&
        new Date(announcement.expiresAt) < new Date());

    return matchesSearch && matchesFilter;
  });

  const deleteAnnouncement = (id, title) => {
    setAnnouncements(announcements.filter((ann) => ann.id !== id));

    toast.custom(
      (t) => (
        <div className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <Trash2 className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <p className="font-medium">Announcement Deleted</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              "{title}" has been removed
            </p>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Add undo logic here if needed
                  toast.dismiss(t);
                }}
              >
                Undo
              </Button>
            </div>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );
  };

  const toggleAnnouncementStatus = (id, isActive, title) => {
    setAnnouncements(
      announcements.map((ann) =>
        ann.id === id ? { ...ann, isActive: !ann.isActive } : ann
      )
    );

    toast.custom(
      (t) => (
        <div className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {isActive ? (
            <BellOff className="h-5 w-5 text-yellow-500 mt-0.5" />
          ) : (
            <Bell className="h-5 w-5 text-green-500 mt-0.5" />
          )}
          <div>
            <p className="font-medium">
              Announcement {isActive ? "Deactivated" : "Activated"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              "{title}" is now {isActive ? "hidden" : "visible"} to users
            </p>
          </div>
        </div>
      ),
      {
        duration: 3000,
      }
    );
  };

  const handleCreateAnnouncement = () => {
    const newAnn = {
      id: `ann-${Math.random().toString(36).substring(2, 9)}`,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      author: {
        id: "t123",
        name: "Mr. Johnson",
        role: "teacher",
      },
      audience: newAnnouncement.audience,
      priority: newAnnouncement.priority,
      publishedAt: new Date(),
      expiresAt: newAnnouncement.expiresAt
        ? new Date(newAnnouncement.expiresAt)
        : undefined,
      isActive: true,
      attachments: newAnnouncement.attachments,
    };

    setAnnouncements([newAnn, ...announcements]);
    setShowCreateDialog(false);

    toast.custom(
      (t) => (
        <div className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <p className="font-medium">Announcement Published</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              "{newAnnouncement.title}" is now live
            </p>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // View announcement logic
                  toast.dismiss(t);
                }}
              >
                View
              </Button>
            </div>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );

    setNewAnnouncement({
      title: "",
      content: "",
      audience: "all",
      priority: "medium",
      expiresAt: "",
      attachments: [],
    });
  };

  return (
    <div className="container mx-auto p-10">
      {/* <Toaster position="top-right" richColors closeButton /> */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="text-gray-600">
            Important notices and updates for the school community
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="rounded-3xl">
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newAnnouncement.title}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter announcement title"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newAnnouncement.content}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        content: e.target.value,
                      })
                    }
                    placeholder="Write your announcement here..."
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="audience">Audience</Label>
                    <Select
                      value={newAnnouncement.audience}
                      onValueChange={(value) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          audience: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {audienceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newAnnouncement.priority}
                      onValueChange={(value) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          priority: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
                  <Input
                    id="expiresAt"
                    type="date"
                    value={newAnnouncement.expiresAt}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        expiresAt: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Attachments (Coming Soon)</Label>
                  <div className="border rounded-md p-4 text-center text-gray-500">
                    <p>File upload functionality will be added soon</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="rounded-3xl"
                  onClick={() => setShowCreateDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-3xl"
                  onClick={handleCreateAnnouncement}
                >
                  Publish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search announcements..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Announcements</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="expired">Expired Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : filteredAnnouncements.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BellOff className="mx-auto h-8 w-8 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No announcements found</h3>
            <p className="text-gray-500 mt-1">
              {searchTerm
                ? "Try adjusting your search or filter"
                : "Create a new announcement to get started"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className={
                announcement.priority === "high"
                  ? "border-red-200"
                  : announcement.priority === "medium"
                  ? "border-yellow-200"
                  : "border-gray-200"
              }
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle>{announcement.title}</CardTitle>
                      <Badge
                        variant={
                          announcement.priority === "high"
                            ? "destructive"
                            : announcement.priority === "medium"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={announcement.author.avatar} />
                          <AvatarFallback>
                            {announcement.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{announcement.author.name}</span>
                      </div>
                      <span>•</span>
                      <span>
                        {format(
                          new Date(announcement.publishedAt),
                          "MMM d, yyyy"
                        )}
                      </span>
                      {announcement.expiresAt && (
                        <>
                          <span>•</span>
                          <span>
                            Expires:{" "}
                            {format(
                              new Date(announcement.expiresAt),
                              "MMM d, yyyy"
                            )}
                          </span>
                        </>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Switch
                      checked={announcement.isActive}
                      onCheckedChange={() =>
                        toggleAnnouncementStatus(
                          announcement.id,
                          announcement.isActive,
                          announcement.title
                        )
                      }
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        deleteAnnouncement(announcement.id, announcement.title)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{announcement.content}</p>
                {announcement.attachments &&
                  announcement.attachments.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Attachments</h4>
                      <div className="flex flex-wrap gap-2">
                        {announcement.attachments.map((file, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            <span>{file.name}</span>
                            <span className="text-xs text-gray-500">
                              ({file.type})
                            </span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Badge variant="outline">
                  {audienceOptions.find(
                    (a) => a.value === announcement.audience
                  )?.label || "Custom Audience"}
                </Badge>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Notification
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
