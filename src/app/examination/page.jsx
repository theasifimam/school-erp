"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Download,
  Upload,
  Bell,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Settings,
  FileText,
  GraduationCap,
  School,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ExamSchedulePage() {
  const [viewMode, setViewMode] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for exam schedules
  const examSchedules = [
    {
      id: 1,
      title: "Mathematics Final Exam",
      subject: "Mathematics",
      class: "Class 10-A",
      date: "2025-05-28",
      time: "09:00 AM - 12:00 PM",
      duration: "3 hours",
      room: "Room 101",
      invigilator: "Prof. Smith",
      totalMarks: "100",
      students: 35,
      status: "scheduled",
      examType: "Final Exam",
      instructions: "Bring calculator, no mobile phones allowed",
      createdBy: "Admin",
      createdDate: "2025-05-20",
    },
    {
      id: 2,
      title: "Physics Unit Test",
      subject: "Physics",
      class: "Class 11-B",
      date: "2025-05-29",
      time: "02:00 PM - 04:00 PM",
      duration: "2 hours",
      room: "Lab 202",
      invigilator: "Dr. Johnson",
      totalMarks: "75",
      students: 28,
      status: "scheduled",
      examType: "Unit Test",
      instructions: "Formula sheet will be provided",
      createdBy: "Teacher",
      createdDate: "2025-05-22",
    },
    {
      id: 3,
      title: "English Literature Quiz",
      subject: "English",
      class: "Class 9-A",
      date: "2025-05-30",
      time: "10:00 AM - 11:30 AM",
      duration: "1.5 hours",
      room: "Room 205",
      invigilator: "Ms. Brown",
      totalMarks: "50",
      students: 32,
      status: "completed",
      examType: "Quiz",
      instructions: "Open book exam",
      createdBy: "Teacher",
      createdDate: "2025-05-18",
    },
    {
      id: 4,
      title: "Chemistry Practical",
      subject: "Chemistry",
      class: "Class 12-A",
      date: "2025-06-02",
      time: "09:00 AM - 12:00 PM",
      duration: "3 hours",
      room: "Chemistry Lab",
      invigilator: "Prof. Wilson",
      totalMarks: "50",
      students: 25,
      status: "pending",
      examType: "Practical",
      instructions: "Lab coat mandatory, safety goggles required",
      createdBy: "Lab Assistant",
      createdDate: "2025-05-23",
    },
    {
      id: 5,
      title: "History Mid-term",
      subject: "History",
      class: "Class 8-B",
      date: "2025-06-05",
      time: "11:00 AM - 01:00 PM",
      duration: "2 hours",
      room: "Room 301",
      invigilator: "Mr. Davis",
      totalMarks: "80",
      students: 30,
      status: "scheduled",
      examType: "Mid-term",
      instructions: "Atlas allowed for map questions",
      createdBy: "Teacher",
      createdDate: "2025-05-24",
    },
  ];

  const classes = [
    "Class 8-A",
    "Class 8-B",
    "Class 9-A",
    "Class 9-B",
    "Class 10-A",
    "Class 10-B",
    "Class 11-A",
    "Class 11-B",
    "Class 12-A",
    "Class 12-B",
  ];
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Computer Science",
  ];

  // Filter exams based on search and filters
  const filteredExams = examSchedules.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || exam.class === filterClass;
    const matchesSubject =
      filterSubject === "all" || exam.subject === filterSubject;
    const matchesStatus =
      filterStatus === "all" || exam.status === filterStatus;

    return matchesSearch && matchesClass && matchesSubject && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "scheduled":
        return <Clock className="w-3 h-3" />;
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      case "pending":
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  // Calendar component for monthly view
  const CalendarView = () => {
    const today = new Date();
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      calendarDays.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    const getExamsForDate = (day) => {
      if (!day) return [];
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      return examSchedules.filter((exam) => exam.date === dateStr);
    };

    const navigateMonth = (direction) => {
      const newDate = new Date(selectedDate);
      newDate.setMonth(newDate.getMonth() + direction);
      setSelectedDate(newDate);
    };

    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                Exam Schedule Calendar
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(-1)}
                className="text-white hover:bg-white/10 rounded-full h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDate(new Date())}
                className="text-white hover:bg-white/10 rounded-full text-xs px-3"
              >
                Today
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth(1)}
                className="text-white hover:bg-white/10 rounded-full h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              const examsForDay = getExamsForDate(day);
              const isToday =
                day &&
                currentYear === today.getFullYear() &&
                currentMonth === today.getMonth() &&
                day === today.getDate();

              return (
                <div
                  key={index}
                  className={`min-h-[80px] p-2 rounded-xl border transition-all hover:shadow-sm cursor-pointer ${
                    !day
                      ? "border-transparent"
                      : isToday
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  {day && (
                    <>
                      <div
                        className={`text-sm font-medium mb-1 ${
                          isToday ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {day}
                      </div>
                      <div className="space-y-1">
                        {examsForDay.slice(0, 2).map((exam) => (
                          <div
                            key={exam.id}
                            className={`text-xs px-2 py-1 rounded-full border text-center truncate ${
                              isToday
                                ? "bg-white/20 text-white border-white/30"
                                : getStatusColor(exam.status)
                            }`}
                            title={exam.title}
                          >
                            {exam.subject}
                          </div>
                        ))}
                        {examsForDay.length > 2 && (
                          <div
                            className={`text-xs text-center ${
                              isToday ? "text-white/80" : "text-gray-500"
                            }`}
                          >
                            +{examsForDay.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Create/Edit Exam Dialog
  const ExamDialog = ({ exam, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      title: exam?.title || "",
      subject: exam?.subject || "",
      class: exam?.class || "",
      date: exam?.date || "",
      time: exam?.time || "",
      duration: exam?.duration || "",
      room: exam?.room || "",
      invigilator: exam?.invigilator || "",
      totalMarks: exam?.totalMarks || "",
      examType: exam?.examType || "",
      instructions: exam?.instructions || "",
    });

    const handleSubmit = () => {
      console.log("Exam data:", formData);
      onClose();
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {exam ? "Edit Exam Schedule" : "Create New Exam Schedule"}
            </DialogTitle>
            <DialogDescription>
              Configure the exam details and schedule information.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Exam Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter exam title"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="examType">Exam Type</Label>
                <Select
                  value={formData.examType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, examType: value })
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Final Exam">Final Exam</SelectItem>
                    <SelectItem value="Mid-term">Mid-term</SelectItem>
                    <SelectItem value="Unit Test">Unit Test</SelectItem>
                    <SelectItem value="Quiz">Quiz</SelectItem>
                    <SelectItem value="Practical">Practical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) =>
                    setFormData({ ...formData, subject: value })
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select
                  value={formData.class}
                  onValueChange={(value) =>
                    setFormData({ ...formData, class: value })
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Exam Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  placeholder="09:00 AM - 12:00 PM"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="3 hours"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  value={formData.room}
                  onChange={(e) =>
                    setFormData({ ...formData, room: e.target.value })
                  }
                  placeholder="Room 101"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invigilator">Invigilator</Label>
                <Input
                  id="invigilator"
                  value={formData.invigilator}
                  onChange={(e) =>
                    setFormData({ ...formData, invigilator: e.target.value })
                  }
                  placeholder="Prof. Smith"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalMarks">Total Marks</Label>
                <Input
                  id="totalMarks"
                  value={formData.totalMarks}
                  onChange={(e) =>
                    setFormData({ ...formData, totalMarks: e.target.value })
                  }
                  placeholder="100"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) =>
                  setFormData({ ...formData, instructions: e.target.value })
                }
                placeholder="Enter any special instructions for the exam..."
                className="rounded-xl min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-black hover:bg-gray-800 rounded-full"
            >
              {exam ? "Update Exam" : "Create Exam"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Exam Schedule Management
          </h1>
          <p className="text-gray-600">
            Organize and manage examination schedules, rooms, and invigilators
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full gap-2">
            <Download className="h-4 w-4" />
            Export Schedule
          </Button>
          <Button variant="outline" className="rounded-full gap-2">
            <Bell className="h-4 w-4" />
            Send Notifications
          </Button>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-black hover:bg-gray-800 rounded-full gap-2"
          >
            <Plus className="h-4 w-4" />
            Schedule Exam
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Scheduled Exams</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">This Week</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">15</p>
                <p className="text-sm text-gray-600">Available Rooms</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Invigilators</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="rounded-2xl border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search exams, subjects, or classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 rounded-xl"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-40 rounded-xl">
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-40 rounded-xl">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 rounded-xl">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 border rounded-xl px-3">
                <Button
                  variant={viewMode === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                  className={`rounded-lg ${
                    viewMode === "calendar" ? "bg-black text-white" : ""
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-lg ${
                    viewMode === "list" ? "bg-black text-white" : ""
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      {viewMode === "calendar" ? (
        <CalendarView />
      ) : (
        <Card className="rounded-2xl border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              Exam Schedule List
            </CardTitle>
            <CardDescription>
              Detailed view of all scheduled examinations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="font-semibold text-gray-900">
                      Exam Details
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Class & Subject
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Date & Time
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Room & Invigilator
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map((exam) => (
                    <TableRow
                      key={exam.id}
                      className="border-gray-100 hover:bg-gray-50"
                    >
                      <TableCell className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {exam.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {exam.examType} • {exam.totalMarks} marks
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {exam.class}
                          </p>
                          <p className="text-sm text-gray-500">
                            {exam.subject} • {exam.students} students
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {exam.date}
                          </p>
                          <p className="text-sm text-gray-500">{exam.time}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {exam.room}
                          </p>
                          <p className="text-sm text-gray-500">
                            {exam.invigilator}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          className={`rounded-full border ${getStatusColor(
                            exam.status
                          )}`}
                        >
                          <div className="flex items-center gap-1">
                            {getStatusIcon(exam.status)}
                            <span className="capitalize">{exam.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 rounded-full"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="rounded-xl"
                          >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="rounded-lg">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="rounded-lg"
                              onClick={() => {
                                setSelectedExam(exam);
                                setIsCreateDialogOpen(true);
                              }}
                            >
                              <Edit3 className="mr-2 h-4 w-4" />
                              Edit Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg">
                              <Bell className="mr-2 h-4 w-4" />
                              Send Notification
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="rounded-lg text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Exam
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Exams Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="rounded-2xl border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {examSchedules.filter(
                (exam) => exam.date === new Date().toISOString().split("T")[0]
              ).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No exams scheduled for today</p>
                </div>
              ) : (
                examSchedules
                  .filter(
                    (exam) =>
                      exam.date === new Date().toISOString().split("T")[0]
                  )
                  .map((exam) => (
                    <div
                      key={exam.id}
                      className="p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {exam.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {exam.class} • {exam.subject}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {exam.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {exam.room}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {exam.students} students
                            </span>
                          </div>
                        </div>
                        <Badge
                          className={`rounded-full border ${getStatusColor(
                            exam.status
                          )}`}
                        >
                          {exam.status}
                        </Badge>
                      </div>
                    </div>
                  ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="rounded-2xl border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-3 bg-black hover:bg-gray-800 rounded-xl h-12">
                <Plus className="h-4 w-4" />
                Schedule New Exam
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 rounded-xl h-12"
              >
                <Download className="h-4 w-4" />
                Export Schedule
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 rounded-xl h-12"
              >
                <Bell className="h-4 w-4" />
                Send Reminders
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 rounded-xl h-12"
              >
                <Settings className="h-4 w-4" />
                Exam Settings
              </Button>
            </CardContent>
          </Card>

          {/* Room Availability */}
          <Card className="rounded-2xl border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Room Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  room: "Room 101",
                  status: "occupied",
                  time: "09:00 AM - 12:00 PM",
                },
                {
                  room: "Room 102",
                  status: "available",
                  time: "Available all day",
                },
                {
                  room: "Lab 201",
                  status: "occupied",
                  time: "02:00 PM - 04:00 PM",
                },
                {
                  room: "Room 205",
                  status: "available",
                  time: "Available after 3 PM",
                },
                {
                  room: "Hall A",
                  status: "maintenance",
                  time: "Under maintenance",
                },
              ].map((room, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-900">{room.room}</p>
                    <p className="text-xs text-gray-500">{room.time}</p>
                  </div>
                  <Badge
                    className={`rounded-full border text-xs ${
                      room.status === "available"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : room.status === "occupied"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : "bg-orange-100 text-orange-800 border-orange-200"
                    }`}
                  >
                    {room.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="rounded-2xl border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  action: "Mathematics Final Exam scheduled",
                  time: "2 hours ago",
                  icon: Plus,
                },
                {
                  action: "Physics Unit Test completed",
                  time: "4 hours ago",
                  icon: CheckCircle,
                },
                {
                  action: "Room 101 booking confirmed",
                  time: "6 hours ago",
                  icon: MapPin,
                },
                {
                  action: "Exam notifications sent",
                  time: "1 day ago",
                  icon: Bell,
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="p-2 bg-white rounded-lg">
                    <activity.icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create/Edit Exam Dialog */}
      <ExamDialog
        exam={selectedExam}
        isOpen={isCreateDialogOpen}
        onClose={() => {
          setIsCreateDialogOpen(false);
          setSelectedExam(null);
        }}
      />
    </div>
  );
}
