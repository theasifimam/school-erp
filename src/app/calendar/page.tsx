"use client";

import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isSameDay, addDays, subDays } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  ClipboardList,
  User,
  Settings,
  Bell,
  Clock,
  MapPin,
  Tag,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  FileText,
  Filter,
  Download,
  Search,
  RefreshCw,
} from "lucide-react";

// Setup the localizer with date-fns
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// User roles
const USER_ROLES = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
};

// Event types with colors
const EVENT_TYPES = {
  CLASS: { label: "Class", color: "#9C27B0" },
  EXAM: { label: "Exam", color: "#F44336" },
  EVENT: { label: "Event", color: "#2196F3" },
  LEAVE: { label: "Leave", color: "#FF9800" },
  HOLIDAY: { label: "Holiday", color: "#4CAF50" },
  MEETING: { label: "Meeting", color: "#795548" },
  DEADLINE: { label: "Deadline", color: "#607D8B" },
};

// Leave types
const LEAVE_TYPES = [
  { value: "sick", label: "Sick Leave" },
  { value: "personal", label: "Personal Leave" },
  { value: "family", label: "Family Emergency" },
  { value: "medical", label: "Medical Appointment" },
];

// Current user (mock for demo)
const currentUser = {
  role: USER_ROLES.TEACHER,
  name: "Mr. Johnson",
  id: "t123",
  class: "Grade 10-A",
  subjects: ["Mathematics", "Physics"],
  email: "mjohnson@school.edu",
  avatar: "/api/placeholder/40/40",
};

// Sample users for notifications
const users = [
  { id: "t124", name: "Ms. Thompson", role: USER_ROLES.TEACHER, class: "Grade 10-B" },
  { id: "t125", name: "Mr. Davis", role: USER_ROLES.TEACHER, class: "Grade 11-A" },
  { id: "a101", name: "Principal Wilson", role: USER_ROLES.ADMIN },
  { id: "s101", name: "Alex Smith", role: USER_ROLES.STUDENT, class: "Grade 10-A" },
  { id: "s102", name: "Jamie Lee", role: USER_ROLES.STUDENT, class: "Grade 10-A" },
];

// Sample classes
const classes = [
  { id: "g10a", name: "Grade 10-A" },
  { id: "g10b", name: "Grade 10-B" },
  { id: "g11a", name: "Grade 11-A" },
  { id: "g11b", name: "Grade 11-B" },
  { id: "g12a", name: "Grade 12-A" },
];

// Sample locations
const locations = [
  { id: "r101", name: "Room 101" },
  { id: "r102", name: "Room 102" },
  { id: "lab1", name: "Science Lab" },
  { id: "lib", name: "Library" },
  { id: "aud", name: "Auditorium" },
  { id: "gym", name: "Gymnasium" },
  { id: "fld", name: "Sports Field" },
];

// Sample subjects
const subjects = [
  { id: "math", name: "Mathematics" },
  { id: "eng", name: "English" },
  { id: "sci", name: "Science" },
  { id: "phys", name: "Physics" },
  { id: "chem", name: "Chemistry" },
  { id: "bio", name: "Biology" },
  { id: "hist", name: "History" },
  { id: "geo", name: "Geography" },
  { id: "art", name: "Art" },
  { id: "music", name: "Music" },
  { id: "pe", name: "Physical Education" },
];

// Generate additional events
const generateEvents = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const baseEvents = [
    {
      id: 1,
      title: "Sports Day",
      start: new Date(currentYear, currentMonth, 15, 9, 0),
      end: new Date(currentYear, currentMonth, 15, 15, 0),
      type: "EVENT",
      audience: "all",
      location: "School Grounds",
      description: "Annual sports competition between houses",
      organizer: "Sports Department",
      color: EVENT_TYPES.EVENT.color,
      recurring: false,
    },
    {
      id: 2,
      title: "Math Midterm",
      start: new Date(currentYear, currentMonth, 18, 10, 0),
      end: new Date(currentYear, currentMonth, 18, 11, 30),
      type: "EXAM",
      audience: "class",
      class: "Grade 10-A",
      subject: "Mathematics",
      teacherId: "t123",
      location: "Room 101",
      description: "Covers chapters 5-8",
      color: EVENT_TYPES.EXAM.color,
      recurring: false,
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      start: new Date(currentYear, currentMonth, 20, 16, 0),
      end: new Date(currentYear, currentMonth, 20, 18, 0),
      type: "MEETING",
      audience: "staff",
      location: "School Auditorium",
      description: "End of term progress updates",
      color: EVENT_TYPES.MEETING.color,
      recurring: false,
    },
    {
      id: 4,
      title: "English Class",
      start: new Date(currentYear, currentMonth, 19, 9, 0),
      end: new Date(currentYear, currentMonth, 19, 10, 0),
      type: "CLASS",
      audience: "class",
      class: "Grade 10-A",
      subject: "English",
      teacherId: "t124",
      location: "Room 102",
      description: "Shakespeare's Macbeth",
      color: EVENT_TYPES.CLASS.color,
      recurring: true,
      recurrencePattern: "weekly",
      recurrenceEndDate: addDays(today, 60),
    },
    {
      id: 5,
      title: "Science Project Deadline",
      start: new Date(currentYear, currentMonth, 22, 23, 59),
      end: new Date(currentYear, currentMonth, 22, 23, 59),
      type: "DEADLINE",
      audience: "class",
      class: "Grade 10-A",
      subject: "Science",
      teacherId: "t123",
      description: "Submit final research papers",
      color: EVENT_TYPES.DEADLINE.color,
      recurring: false,
    },
    {
      id: 6,
      title: "School Holiday - Founder's Day",
      start: new Date(currentYear, currentMonth, 25),
      end: new Date(currentYear, currentMonth, 25),
      type: "HOLIDAY",
      audience: "all",
      description: "Annual celebration of school's founding",
      allDay: true,
      color: EVENT_TYPES.HOLIDAY.color,
      recurring: false,
    },
    {
      id: 7,
      title: "Math Class",
      start: new Date(currentYear, currentMonth, today.getDate() + 1, 11, 0),
      end: new Date(currentYear, currentMonth, today.getDate() + 1, 12, 0),
      type: "CLASS",
      audience: "class",
      class: "Grade 10-A",
      subject: "Mathematics",
      teacherId: "t123",
      location: "Room 101",
      description: "Quadratic equations",
      color: EVENT_TYPES.CLASS.color,
      recurring: true,
      recurrencePattern: "weekly",
      recurrenceEndDate: addDays(today, 60),
    },
    {
      id: 8,
      title: "Physics Lab",
      start: new Date(currentYear, currentMonth, today.getDate() + 2, 14, 0),
      end: new Date(currentYear, currentMonth, today.getDate() + 2, 15, 30),
      type: "CLASS",
      audience: "class",
      class: "Grade 10-A",
      subject: "Physics",
      teacherId: "t123",
      location: "Science Lab",
      description: "Pendulum experiments",
      color: EVENT_TYPES.CLASS.color,
      recurring: true,
      recurrencePattern: "weekly",
      recurrenceEndDate: addDays(today, 60),
    },
  ];
  
  // Generate sample notifications
  const notifications = [
    {
      id: 101,
      title: "Math Midterm Reminder",
      message: "Don't forget to prepare for the Math Midterm next week",
      read: false,
      date: new Date(),
      relatedEventId: 2,
    },
    {
      id: 102,
      title: "Leave Request Approved",
      message: "Your leave request for May 5th has been approved",
      read: true,
      date: subDays(new Date(), 2),
    },
    {
      id: 103,
      title: "New Event Added",
      message: "Sports Day has been added to the calendar",
      read: false,
      date: subDays(new Date(), 1),
      relatedEventId: 1,
    },
  ];
  
  return { events: baseEvents, notifications };
};

const { events: eventsData, notifications: notificationsData } = generateEvents();

export default function ModernCalendar() {
  const [events, setEvents] = useState(eventsData);
  const [notifications, setNotifications] = useState(notificationsData);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarView, setCalendarView] = useState("month");
  const [filters, setFilters] = useState({
    types: Object.keys(EVENT_TYPES),
    classes: classes.map(c => c.id),
    subjects: subjects.map(s => s.id),
  });
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "CLASS",
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000),
    description: "",
    location: "",
    class: currentUser.class,
    subject: currentUser.subjects[0],
    recurring: false,
    recurrencePattern: "weekly",
    recurrenceEndDate: addDays(new Date(), 30),
    notifyStudents: true,
    attachments: [],
  });
  
  const [leaveRequest, setLeaveRequest] = useState({
    type: "sick",
    start: new Date(),
    end: new Date(),
    reason: "",
    documents: [],
    contactNumber: "",
  });
  
  const [searchTerm, setSearchTerm] = useState("");

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Filter events based on user role and filters
  const getFilteredEvents = (user, filterSettings, search) => {
    let filtered = events.filter((event) => {
      // Basic role-based filtering
      if (user.role === USER_ROLES.ADMIN) return true;
      if (event.audience === "all") return true;
      if (
        event.audience === "staff" &&
        (user.role === USER_ROLES.ADMIN || user.role === USER_ROLES.TEACHER)
      )
        return true;
      if (
        event.audience === "class" &&
        user.role === USER_ROLES.TEACHER &&
        (event.teacherId === user.id || event.class === user.class)
      )
        return true;
      if (
        event.audience === "class" &&
        user.role === USER_ROLES.STUDENT &&
        event.class === user.class
      )
        return true;
      if (
        event.audience === "students" &&
        (user.role === USER_ROLES.STUDENT || user.role === USER_ROLES.PARENT)
      )
        return true;
      return false;
    });
    
    // Apply type filters
    if (filterSettings.types.length > 0) {
      filtered = filtered.filter(e => filterSettings.types.includes(e.type));
    }
    
    // Apply class filters if teacher or admin
    if ((user.role === USER_ROLES.TEACHER || user.role === USER_ROLES.ADMIN) && 
        filterSettings.classes.length > 0) {
      filtered = filtered.filter(e => 
          !e.class || filterSettings.classes.includes(e.class)
      );
    }
    
    // Apply subject filters
    if (filterSettings.subjects.length > 0) {
      filtered = filtered.filter(e => 
          !e.subject || filterSettings.subjects.includes(e.subject)
      );
    }
    
    // Apply search
    if (search && search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(e => 
          e.title.toLowerCase().includes(searchLower) || 
          (e.description && e.description.toLowerCase().includes(searchLower)) ||
          (e.location && e.location.toLowerCase().includes(searchLower))
      );
    }
    
    return filtered;
  };

  const filteredEvents = getFilteredEvents(currentUser, filters, searchTerm);

  const handleSelectSlot = (slotInfo) => {
    if (
      currentUser.role === USER_ROLES.STUDENT ||
      currentUser.role === USER_ROLES.PARENT
    ) {
      setLeaveRequest({
        ...leaveRequest,
        start: slotInfo.start,
        end: slotInfo.end,
      });
      setShowLeaveModal(true);
    } else {
      setNewEvent({
        ...newEvent,
        start: slotInfo.start,
        end: slotInfo.end,
      });
      setShowEventModal(true);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventDetailsModal(true);
  };

  const handleAddEvent = () => {
    const eventColor = EVENT_TYPES[newEvent.type]?.color || "#4F46E5";
    
    const event = {
      id: Math.max(...events.map((e) => e.id), 0) + 1,
      ...newEvent,
      audience: newEvent.type === "CLASS" || newEvent.type === "EXAM" 
        ? "class" 
        : newEvent.type === "MEETING" 
        ? "staff" 
        : "all",
      color: eventColor,
      teacherId: currentUser.id,
      organizer: currentUser.name
    };
    
    // Add new notification
    const newNotification = {
      id: Math.max(...notifications.map(n => n.id), 100) + 1,
      title: `New ${EVENT_TYPES[newEvent.type]?.label} Added`,
      message: `${newEvent.title} has been scheduled for ${format(newEvent.start, "PPp")}`,
      read: false,
      date: new Date(),
      relatedEventId: event.id,
    };
    
    setEvents([...events, event]);
    setNotifications([newNotification, ...notifications]);
    setShowEventModal(false);
    setNewEvent({
      title: "",
      type: "CLASS",
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      description: "",
      location: "",
      class: currentUser.class,
      subject: currentUser.subjects[0],
      recurring: false,
      recurrencePattern: "weekly",
      recurrenceEndDate: addDays(new Date(), 30),
      notifyStudents: true,
      attachments: [],
    });
  };

  const handleSubmitLeave = () => {
    const leaveEvent = {
      id: Math.max(...events.map((e) => e.id), 0) + 1,
      title: `${currentUser.name} - ${LEAVE_TYPES.find(l => l.value === leaveRequest.type)?.label || leaveRequest.type}`,
      start: leaveRequest.start,
      end: leaveRequest.end,
      type: "LEAVE",
      status: "pending",
      reason: leaveRequest.reason,
      requester: currentUser.id,
      requesterName: currentUser.name,
      color: EVENT_TYPES.LEAVE.color,
      contactNumber: leaveRequest.contactNumber,
      audience: "staff",
      description: leaveRequest.reason,
      location: "",
      organizer: currentUser.name,
      recurring: false,
      ...(leaveRequest.start === leaveRequest.end && { allDay: true })
    };
    
    // Add new notification for admins/teachers
    const newNotification = {
      id: Math.max(...notifications.map(n => n.id), 100) + 1,
      title: "New Leave Request",
      message: `${currentUser.name} has requested ${LEAVE_TYPES.find(l => l.value === leaveRequest.type)?.label || leaveRequest.type} from ${format(leaveRequest.start, "PP")} to ${format(leaveRequest.end, "PP")}`,
      read: false,
      date: new Date(),
      relatedEventId: leaveEvent.id,
      forRole: USER_ROLES.ADMIN,
    };
    
    setEvents([...events, leaveEvent]);
    setNotifications([newNotification, ...notifications]);
    setShowLeaveModal(false);
    setLeaveRequest({
      type: "sick",
      start: new Date(),
      end: new Date(),
      reason: "",
      documents: [],
      contactNumber: "",
    });
  };
  
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
    setShowEventDetailsModal(false);
    
    // Add deletion notification
    const deletedEvent = events.find(e => e.id === eventId);
    if (deletedEvent) {
      const newNotification = {
        id: Math.max(...notifications.map(n => n.id), 100) + 1,
        title: "Event Deleted",
        message: `${deletedEvent.title} scheduled for ${format(deletedEvent.start, "PPp")} has been deleted`,
        read: false,
        date: new Date(),
      };
      setNotifications([newNotification, ...notifications]);
    }
  };
  
  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find(e => e.id === eventId);
    if (eventToEdit) {
      setNewEvent({
        ...eventToEdit,
        recurring: eventToEdit.recurring || false,
        recurrencePattern: eventToEdit.recurrencePattern || "weekly",
        recurrenceEndDate: eventToEdit.recurrenceEndDate || addDays(new Date(), 30),
        notifyStudents: eventToEdit.notifyStudents !== false,
      });
      setShowEventDetailsModal(false);
      setShowEventModal(true);
    }
  };
  
  const handleApproveLeave = (eventId) => {
    setEvents(events.map(e => 
      e.id === eventId 
        ? { ...e, status: "approved", color: "#4CAF50" } 
        : e
    ));
    
    const leaveEvent = events.find(e => e.id === eventId);
    if (leaveEvent) {
      // Add approval notification
      const newNotification = {
        id: Math.max(...notifications.map(n => n.id), 100) + 1,
        title: "Leave Request Approved",
        message: `Your leave request from ${format(leaveEvent.start, "PP")} to ${format(leaveEvent.end, "PP")} has been approved`,
        read: false,
        date: new Date(),
        relatedEventId: eventId,
        forUser: leaveEvent.requester,
      };
      setNotifications([newNotification, ...notifications]);
    }
    
    setShowEventDetailsModal(false);
  };
  
  const handleRejectLeave = (eventId) => {
    setEvents(events.map(e => 
      e.id === eventId 
        ? { ...e, status: "rejected", color: "#F44336" } 
        : e
    ));
    
    const leaveEvent = events.find(e => e.id === eventId);
    if (leaveEvent) {
      // Add rejection notification
      const newNotification = {
        id: Math.max(...notifications.map(n => n.id), 100) + 1,
        title: "Leave Request Rejected",
        message: `Your leave request from ${format(leaveEvent.start, "PP")} to ${format(leaveEvent.end, "PP")} has been rejected`,
        read: false,
        date: new Date(),
        relatedEventId: eventId,
        forUser: leaveEvent.requester,
      };
      setNotifications([newNotification, ...notifications]);
    }
    
    setShowEventDetailsModal(false);
  };
  
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };
  
  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId 
        ? { ...n, read: true } 
        : n
    ));
  };
  
  const toggleFilter = (filterType, value) => {
    setFilters(prev => {
      const currentValues = [...prev[filterType]];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }
      
      return {
        ...prev,
        [filterType]: currentValues
      };
    });
  };
  
  const clearFilters = () => {
    setFilters({
      types: Object.keys(EVENT_TYPES),
      classes: classes.map(c => c.id),
      subjects: subjects.map(s => s.id),
    });
    setSearchTerm("");
  };
  
  const exportCalendar = () => {
    // This would typically generate an iCal file
    alert("Calendar exported! (This would download an iCal file in a real implementation)");
  };

  // Custom Toolbar Component
  function CustomToolbar({ label, onNavigate, onView, view }) {
    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 py-2">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="rounded-full"
            size="sm"
            onClick={() => onNavigate("PREV")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => onNavigate("TODAY")}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => onNavigate("NEXT")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <h2 className="text-lg font-medium">{label}</h2>

        <div className="flex gap-2">
          <Button
            variant={view === "day" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              onView("day");
              setCalendarView("day");
            }}
            className="rounded-full"
          >
            Day
          </Button>
          <Button
            variant={view === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              onView("week");
              setCalendarView("week");
            }}
            className="rounded-full"
          >
            Week
          </Button>
          <Button
            variant={view === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              onView("month");
              setCalendarView("month");
            }}
            className="rounded-full"
          >
            Month
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-6">
          {/* Calendar Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <CalendarIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  School Calendar
                </h2>
                <p className="text-sm text-gray-500">
                  {currentUser.role === USER_ROLES.TEACHER
                    ? `${currentUser.name} • ${currentUser.class}`
                    : currentUser.role === USER_ROLES.ADMIN
                    ? "Administrator View"
                    : currentUser.role === USER_ROLES.STUDENT
                    ? `Student • ${currentUser.class}`
                    : `Parent View`}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 rounded-full w-full md:w-64 h-10"
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={exportCalendar}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-3 flex justify-between items-center border-b border-gray-100">
                      <h3 className="font-medium">Notifications</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs"
                        onClick={markAllNotificationsAsRead}
                      >
                        Mark all as read
                      </Button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <div 
                            key={notification.id}
                            className={`p-3 border-b border-gray-100 flex gap-3 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                          >
                            <div className="flex-shrink-0 mt-1">
                              {notification.relatedEventId ? (
                                <CalendarIcon className="h-5 w-5 text-indigo-500" />
                              ) : (
                                <Bell className="h-5 w-5 text-blue-500" />
                              )}
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm">{notification.title}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-500">
                                  {format(new Date(notification.date), "PPp")}
                                </span>
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-6"
                                    onClick={() => markNotificationAsRead(notification.id)}
                                  >
                                    Mark as read
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {(currentUser.role === USER_ROLES.ADMIN ||
                currentUser.role === USER_ROLES.TEACHER) && (
                <Button
                  onClick={() => {
                    setNewEvent({
                      title: "",
                      type: "CLASS",
                      start: new Date(),
                      end: new Date(new Date().getTime() + 60 * 60 * 1000),
                      description: "",
                      location: "",
                      class: currentUser.class,
                      subject: currentUser.subjects[0],
                      recurring: false,
                      recurrencePattern: "weekly",
                      recurrenceEndDate: addDays(new Date(), 30),
                      notifyStudents: true,
                      attachments: [],
                    });
                    setShowEventModal(true);
                  }}
                  className="rounded-full bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              )}
              {(currentUser.role === USER_ROLES.STUDENT ||
                currentUser.role === USER_ROLES.PARENT) && (
                <Button
                  onClick={() => setShowLeaveModal(true)}
                  className="rounded-full bg-amber-500 hover:bg-amber-600"
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Request Leave
                </Button>
              )}
            </div>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-800">Filter Events</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs h-7"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reset Filters
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Event Types</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(EVENT_TYPES).map(([type, details]) => (
                      <div
                        key={type}
                        className={`px-3 py-1.5 text-xs rounded-full cursor-pointer flex items-center gap-1 ${
                          filters.types.includes(type)
                            ? "bg-gray-200 font-medium"
                            : "bg-white border border-gray-200"
                        }`}
                        onClick={() => toggleFilter("types", type)}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: details.color }}
                        />
                        {details.label}
                      </div>
                    ))}
                  </div>
                </div>
                
                {(currentUser.role === USER_ROLES.ADMIN || currentUser.role === USER_ROLES.TEACHER) && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Classes</h4>
                    <div className="flex flex-wrap gap-2">
                      {classes.map((cls) => (
                        <div
                          key={cls.id}
                          className={`px-3 py-1.5 text-xs rounded-full cursor-pointer ${
                            filters.classes.includes(cls.id)
                              ? "bg-gray-200 font-medium"
                              : "bg-white border border-gray-200"
                          }`}
                          onClick={() => toggleFilter("classes", cls.id)}
                        >
                          {cls.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className={`px-3 py-1.5 text-xs rounded-full cursor-pointer ${
                          filters.subjects.includes(subject.id)
                            ? "bg-gray-200 font-medium"
                            : "bg-white border border-gray-200"
                        }`}
                        onClick={() => toggleFilter("subjects", subject.id)}
                      >
                        {subject.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Events Banner */}
          {filteredEvents.length > 0 && (
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Next event card */}
                <div className="flex items-center">
                  <div className="bg-white p-3 rounded-lg shadow-xs mr-4">
                    <CalendarIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Next Event</h3>
                    <p className="text-sm text-gray-600">
                      {filteredEvents[0]?.title || "No upcoming events"}
                    </p>
                    {filteredEvents[0] && (
                      <p className="text-xs text-indigo-600 mt-1">
                        {format(new Date(filteredEvents[0].start), "MMMM d, yyyy")} •{" "}
                        {format(new Date(filteredEvents[0].start), "h:mm a")}
                        {filteredEvents[0].location &&
                          ` • ${filteredEvents[0].location}`}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Upcoming today */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Today</h3>
                  {filteredEvents.filter(e => isSameDay(new Date(e.start), new Date())).length > 0 ? (
                    filteredEvents
                      .filter(e => isSameDay(new Date(e.start), new Date()))
                      .slice(0, 2)
                      .map(event => (
                        <div key={event.id} className="flex items-center mb-2 last:mb-0">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: event.color }} 
                          />
                          <span className="text-sm">{event.title}</span>
                          <span className="text-xs text-gray-500 ml-auto">
                            {format(new Date(event.start), "h:mm a")}
                          </span>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-gray-500">No events today</p>
                  )}
                </div>
                
                {/* Upcoming deadlines */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Upcoming Deadlines</h3>
                  {filteredEvents.filter(e => e.type === "DEADLINE" && new Date(e.start) > new Date()).length > 0 ? (
                    filteredEvents
                      .filter(e => e.type === "DEADLINE" && new Date(e.start) > new Date())
                      .sort((a, b) => new Date(a.start) - new Date(b.start))
                      .slice(0, 2)
                      .map(event => (
                        <div key={event.id} className="flex items-center mb-2 last:mb-0">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: EVENT_TYPES.DEADLINE.color }}
                          />
                          <span className="text-sm">{event.title}</span>
                          <span className="text-xs text-gray-500 ml-auto">
                            {format(new Date(event.start), "MMM d")}
                          </span>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-gray-500">No upcoming deadlines</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Calendar Container */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <Calendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color || "#4F46E5",
                  borderRadius: "8px",
                  border: "none",
                  color: "white",
                  padding: "4px 8px",
                  fontSize: "0.875rem",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  opacity: event.status === "pending" ? 0.7 : 1,
                  borderLeft:
                    event.status === "pending" ? "4px solid #FF9800" : 
                    event.status === "approved" ? "4px solid #4CAF50" :
                    event.status === "rejected" ? "4px solid #F44336" : "none",
                },
              })}
              components={{
                toolbar: (props) => (
                  <div className="p-4 border-b border-gray-200">
                    <CustomToolbar {...props} />
                  </div>
                ),
                month: {
                  header: ({ label }) => (
                    <div className="text-center py-3 font-medium text-gray-700 bg-gray-50">
                      {label}
                    </div>
                  ),
                  dateHeader: ({ date, label }) => (
                    <div className="text-center py-1 h-full flex flex-col">
                      <div
                        className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full mb-1 ${
                          isSameDay(date, new Date())
                            ? "bg-indigo-600 text-white font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {label}
                      </div>
                      <div className="flex-1 border-t border-gray-100 mt-1 pt-1"></div>
                    </div>
                  ),
                },
                week: {
                  header: ({ date }) => (
                    <div className="text-center py-2 text-sm font-medium text-gray-600 bg-gray-50">
                      {format(date, "EEE")}
                      <div
                        className={`mt-1 mx-auto w-8 h-8 flex items-center justify-center rounded-full ${
                          isSameDay(date, new Date())
                            ? "bg-indigo-600 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {format(date, "d")}
                      </div>
                    </div>
                  ),
                },
                day: {
                  header: ({ label }) => (
                    <div className="text-center py-2 text-lg font-semibold text-gray-800 bg-gray-50">
                      {label}
                    </div>
                  ),
                },
              }}
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              views={["month", "week", "day"]}
              defaultView="month"
              min={new Date(0, 0, 0, 7, 0, 0)} // 7am start
              max={new Date(0, 0, 0, 21, 0, 0)} // 9pm end
            />
          </div>

          {/* Calendar Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-800">Events Summary</h3>
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-3">
                  {Object.entries(EVENT_TYPES).map(([type, details]) => {
                    const count = filteredEvents.filter(e => e.type === type).length;
                    if (count === 0) return null;
                    
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: details.color }} 
                          />
                          <span className="text-sm">{details.label}s</span>
                        </div>
                        <span className="font-medium text-sm">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-800">Upcoming Schedule</h3>
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  {filteredEvents
                    .filter(e => new Date(e.start) > new Date())
                    .sort((a, b) => new Date(a.start) - new Date(b.start))
                    .slice(0, 4)
                    .map(event => (
                      <div key={event.id} className="text-sm">
                        <div className="flex items-center">
                          <div 
                            className="w-2 h-2 rounded-full mr-2" 
                            style={{ backgroundColor: event.color }} 
                          />
                          <span className="font-medium">{event.title}</span>
                        </div>
                        <div className="ml-4 text-xs text-gray-500 mt-0.5">
                          {format(new Date(event.start), "PPp")}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-800">
                    {currentUser.role === USER_ROLES.ADMIN || currentUser.role === USER_ROLES.TEACHER
                      ? "Leave Requests"
                      : "My Leaves"}
                  </h3>
                  <ClipboardList className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  {filteredEvents
                    .filter(e => e.type === "LEAVE")
                    .slice(0, 3)
                    .map(event => (
                      <div key={event.id} className="text-sm flex items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <Badge 
                              className={`mr-2 ${
                                event.status === "pending" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                                event.status === "approved" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                                "bg-red-100 text-red-700 hover:bg-red-100"
                              }`}
                            >
                              {event.status}
                            </Badge>
                            <span>{event.requesterName || currentUser.name}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {format(new Date(event.start), "PP")} - {format(new Date(event.end), "PP")}
                          </div>
                        </div>
                        
                        {(currentUser.role === USER_ROLES.ADMIN || currentUser.role === USER_ROLES.TEACHER) && 
                         event.status === "pending" && (
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0"
                              onClick={() => handleApproveLeave(event.id)}
                            >
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0"
                              onClick={() => handleRejectLeave(event.id)}
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Legend */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-3">Event Types</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(EVENT_TYPES).map(([type, details]) => (
                <div
                  key={type}
                  className="flex items-center px-3 py-1.5 rounded-full text-sm border border-gray-200 bg-white"
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: details.color }}
                  />
                  {details.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>);

          
