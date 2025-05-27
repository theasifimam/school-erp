// Modified main page with attendance trends
// AttendancePage.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  User,
  Check,
  X,
  Clock,
  Download,
  ChevronDown,
  BarChart2,
  FileText,
  Bell,
  BedDoubleIcon,
  FileUserIcon,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendanceModal } from "@/components/students/AttendanceModal"; // You'd need to create this
import { toast } from "sonner";

// Mock data - replace with API calls in real implementation
const faculties = [
  { id: 1, name: "Alice Johnson", class: "Grade 10-A", rollNumber: "101" },
  { id: 2, name: "Bob Smith", class: "Grade 10-A", rollNumber: "102" },
  { id: 3, name: "Charlie Brown", class: "Grade 10-A", rollNumber: "103" },
  { id: 4, name: "Diana Prince", class: "Grade 10-A", rollNumber: "104" },
  { id: 5, name: "Ethan Hunt", class: "Grade 10-A", rollNumber: "105" },
  { id: 6, name: "Fiona Gallagher", class: "Grade 10-B", rollNumber: "201" },
  { id: 7, name: "George Wilson", class: "Grade 10-B", rollNumber: "202" },
  { id: 8, name: "Hannah Baker", class: "Grade 10-B", rollNumber: "203" },
  { id: 9, name: "Asif Imam", class: "Grade 10-A", rollNumber: "204" },
  { id: 10, name: "Hannah Rahmani", class: "Grade 10-B", rollNumber: "205" },
  { id: 11, name: "Hannan Ibrahim", class: "Grade 10-A", rollNumber: "206" },
  { id: 12, name: "Bablu Shah", class: "Grade 10-A", rollNumber: "207" },
];

const initialAttendanceRecords = [
  { facultyId: 1, date: "2023-06-01", status: "present" },
  { facultyId: 2, date: "2023-06-01", status: "absent" },
  { facultyId: 3, date: "2023-06-01", status: "present" },
  { facultyId: 4, date: "2023-06-01", status: "late" },
  { facultyId: 5, date: "2023-06-01", status: "present" },
  { facultyId: 1, date: "2023-06-02", status: "present" },
  { facultyId: 2, date: "2023-06-02", status: "present" },
  { facultyId: 3, date: "2023-06-02", status: "absent" },
  { facultyId: 4, date: "2023-06-02", status: "present" },
  { facultyId: 5, date: "2023-06-02", status: "present" },
];

// Generate mock data for attendance trends
const generateMockTrendData = () => {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    return date.toISOString().split("T")[0];
  });

  return dates.map((date) => ({
    date,
    present: Math.floor(Math.random() * 20) + 10,
    absent: Math.floor(Math.random() * 5),
    late: Math.floor(Math.random() * 3),
  }));
};

export default function AttendancePage() {
  const [date, setDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState("Grade 10-A");
  const [searchQuery, setSearchQuery] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeView, setActiveView] = useState("daily");
  const [trendData, setTrendData] = useState(generateMockTrendData());

  // Format date as YYYY-MM-DD for consistent comparison
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Filter students based on search query and selected class
  const filteredFaculties = useMemo(() => {
    return faculties.filter(
      (faculty) =>
        faculty.class === selectedClass &&
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedClass, searchQuery]);

  // Navigate to previous day
  const prevDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
  };

  // Navigate to next day
  const nextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  };

  // Handle attendance change from modal
  const handleAttendanceChange = (newAttendance) => {
    setAttendance(newAttendance);
    return Promise.resolve(); // Simulate async operation
  };

  // Get attendance status for a student on the current date
  const getAttendanceStatus = (facultyId) => {
    const currentDate = formatDate(date);
    const record = attendance.find(
      (item) => item.facultyId === facultyId && item.date === currentDate
    );
    return record ? record.status : null;
  };

  // Save attendance handler
  const handleSaveAttendance = () => {
    // In a real app, this would be an API call
    setIsLoading(true);

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        setSaveSuccess(true);
        toast.success("Attendance saved!", {
          description: "All records have been successfully submitted.",
          icon: <BedDoubleIcon className="h-4 w-4" />,
        });

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);

        resolve();
      }, 800);
    });
  };

  // Export attendance data as CSV
  const exportAttendanceData = () => {
    const currentDate = formatDate(date);
    const records = filteredFaculties.map((faculty) => {
      const status = getAttendanceStatus(faculty.id) || "not marked";
      return {
        name: faculty.name,
        rollNumber: faculty.rollNumber,
        class: faculty.class,
        date: currentDate,
        status: status,
      };
    });

    // Create CSV content
    const headers = ["Name", "Roll Number", "Class", "Date", "Status"];
    const csvContent = [
      headers.join(","),
      ...records.map((record) =>
        [
          record.name,
          record.rollNumber,
          record.class,
          record.date,
          record.status,
        ].join(",")
      ),
    ].join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `attendance_${selectedClass}_${currentDate}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate attendance stats for current filtered view
  const stats = useMemo(() => {
    if (filteredFaculties.length === 0) {
      return { present: 0, absent: 0, late: 0, total: 0, percentage: 0 };
    }

    const presentCount = filteredFaculties.filter(
      (faculty) => getAttendanceStatus(faculty.id) === "present"
    ).length;

    const lateCount = filteredFaculties.filter(
      (faculty) => getAttendanceStatus(faculty.id) === "late"
    ).length;

    const absentCount = filteredFaculties.filter(
      (faculty) => getAttendanceStatus(faculty.id) === "absent"
    ).length;

    const markedFaculties = presentCount + lateCount + absentCount;

    return {
      present: presentCount,
      late: lateCount,
      absent: absentCount,
      total: filteredFaculties.length,
      marked: markedFaculties,
      percentage:
        markedFaculties > 0
          ? Math.round(((presentCount + lateCount) / markedFaculties) * 100)
          : 0,
    };
  }, [filteredFaculties, attendance, date]);

  // Calculate monthly absence data
  const absenteeData = useMemo(() => {
    return faculties
      .filter((faculty) => {
        const records = attendance.filter(
          (record) =>
            record.facultyId === faculty.id && record.status === "absent"
        );
        return records.length > 0;
      })
      .map((faculty) => {
        const absences = attendance.filter(
          (record) =>
            record.facultyId === faculty.id && record.status === "absent"
        );

        return {
          ...faculty,
          absenceCount: absences.length,
          recentAbsence: absences.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )[0]?.date,
        };
      })
      .sort((a, b) => b.absenceCount - a.absenceCount);
  }, [attendance]);

  // Load attendance data (in a real app, this would be an API call)
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        setAttendance(initialAttendanceRecords);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load attendance data. Please try again.");
        setIsLoading(false);
      }
    }, 800);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Modal for taking attendance */}
      <AttendanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        students={faculties}
        date={date}
        selectedClass={selectedClass}
        attendance={attendance}
        onSave={handleSaveAttendance}
        onAttendanceChange={handleAttendanceChange}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileUserIcon className="h-6 w-6" />
          Faculty Attendance
        </h1>
        <p className="text-gray-500">
          Manage and view faculty attendance records
        </p>
      </div>

      {/* Main tabs */}
      <Tabs
        defaultValue="daily"
        className="w-full"
        value={activeView}
        onValueChange={setActiveView}
      >
        <TabsList className="grid grid-cols-3 md:w-[400px] mb-6">
          <TabsTrigger value="daily" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span className="hidden md:inline">Daily View</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-1">
            <BarChart2 className="h-4 w-4" />
            <span className="hidden md:inline">Trends</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Reports</span>
          </TabsTrigger>
        </TabsList>

        {/* Daily View */}
        <TabsContent value="daily">
          {/* Filters and Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 p-3 rounded-3xl shadow-sm">
              {/* Date + Controls */}
              <div className="flex items-center gap-1 col-span-2">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <span className="font-medium whitespace-nowrap">
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <div className="flex gap-1 ml-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={prevDay}
                    aria-label="Previous day"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => setDate(new Date())}
                  >
                    Today
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={nextDay}
                    aria-label="Next day"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Class Select */}
              <div className="col-span-1">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade 10-A">Grade 10-A</SelectItem>
                    <SelectItem value="Grade 10-B">Grade 10-B</SelectItem>
                    <SelectItem value="Grade 11-A">Grade 11-A</SelectItem>
                    <SelectItem value="Grade 11-B">Grade 11-B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div className="col-span-1 md:col-span-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="col-span-2 flex gap-2 justify-end items-center">
                <Button
                  className="flex-1 md:flex-none rounded-3xl"
                  onClick={() => setIsModalOpen(true)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Take Attendance"
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="hidden rounded-3xl md:flex"
                    >
                      Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={exportAttendanceData}>
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" />
                      Notify Parents
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Faculties
                </CardTitle>
                <User className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.marked} marked today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Present</CardTitle>
                <Check className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.present}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.total > 0
                    ? Math.round((stats.present / stats.total) * 100)
                    : 0}
                  % of class
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Absent</CardTitle>
                <X className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.absent}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.total > 0
                    ? Math.round((stats.absent / stats.total) * 100)
                    : 0}
                  % of class
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Late</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.late}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.marked > 0 ? stats.percentage : 0}% attendance rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Table */}
          <Card className="px-4 py-2">
            <Table>
              <TableHeader className="">
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Faculty Name</TableHead>
                  <TableHead>Faculty ID</TableHead>
                  <TableHead className="hidden md:table-cell">Class</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading state
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <TableRow key={`skeleton-${index}`}>
                        <TableCell>
                          <div className="h-4 w-4 bg-gray-200 rounded-3xl animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-32 bg-gray-200 rounded-3xl animate-pulse"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-16 bg-gray-200 rounded-3xl animate-pulse"></div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="h-4 w-20 bg-gray-200 rounded-3xl animate-pulse"></div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="h-6 w-16 bg-gray-200 rounded-3xl animate-pulse ml-auto"></div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : filteredFaculties.length > 0 ? (
                  filteredFaculties.map((faculty, index) => {
                    const status = getAttendanceStatus(faculty.id);
                    return (
                      <TableRow key={faculty.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">
                          {faculty.name}
                        </TableCell>
                        <TableCell>{faculty.rollNumber}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {faculty.class}
                        </TableCell>
                        <TableCell className="text-right">
                          {status === "present" && (
                            <Badge className="bg-green-100 text-green-800">
                              Present
                            </Badge>
                          )}
                          {status === "absent" && (
                            <Badge className="bg-red-100 text-red-800">
                              Absent
                            </Badge>
                          )}
                          {status === "late" && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Late
                            </Badge>
                          )}
                          {!status && (
                            <span className="text-gray-400">Not marked</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No faculties found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>

          {/* Attendance Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Attendance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Overall Attendance Rate
                    </span>
                    <div className="relative w-32 h-6 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-green-500"
                        style={{ width: `${stats.percentage}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {stats.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Faculties Present
                    </span>
                    <div className="relative w-32 h-6 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-green-500"
                        style={{
                          width: `${
                            stats.total > 0
                              ? (stats.present / stats.total) * 100
                              : 0
                          }%`,
                        }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {stats.present}/{stats.total}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">
                      Status Distribution
                    </h4>
                    <div className="flex gap-2">
                      {stats.present > 0 && (
                        <div className="flex-1 p-2 bg-green-50 rounded-md border border-green-100">
                          <p className="text-xs text-green-800 font-medium">
                            Present
                          </p>
                          <p className="text-lg font-bold text-green-800">
                            {stats.present}
                          </p>
                        </div>
                      )}

                      {stats.absent > 0 && (
                        <div className="flex-1 p-2 bg-red-50 rounded-md border border-red-100">
                          <p className="text-xs text-red-800 font-medium">
                            Absent
                          </p>
                          <p className="text-lg font-bold text-red-800">
                            {stats.absent}
                          </p>
                        </div>
                      )}

                      {stats.late > 0 && (
                        <div className="flex-1 p-2 bg-yellow-50 rounded-md border border-yellow-100">
                          <p className="text-xs text-yellow-800 font-medium">
                            Late
                          </p>
                          <p className="text-lg font-bold text-yellow-800">
                            {stats.late}
                          </p>
                        </div>
                      )}

                      {stats.present === 0 &&
                        stats.absent === 0 &&
                        stats.late === 0 && (
                          <div className="flex-1 p-2 bg-gray-50 rounded-md border border-gray-200 text-center">
                            <p className="text-sm text-gray-500">
                              No attendance data
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Recent Absences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    // Loading state
                    Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={`skeleton-absence-${index}`}
                          className="flex items-center gap-4"
                        >
                          <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                          <div className="flex-1">
                            <div className="h-4 w-32 bg-gray-200 rounded-3xl animate-pulse mb-2"></div>
                            <div className="h-3 w-24 bg-gray-200 rounded-3xl animate-pulse"></div>
                          </div>
                        </div>
                      ))
                  ) : absenteeData.length > 0 ? (
                    absenteeData.slice(0, 5).map((faculty) => (
                      <div key={faculty.id} className="flex items-center gap-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{faculty.name}</p>
                          <p className="text-sm text-gray-500">
                            {faculty.absenceCount}{" "}
                            {faculty.absenceCount === 1
                              ? "absence"
                              : "absences"}{" "}
                            - Last on{" "}
                            {new Date(
                              faculty.recentAbsence
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-full"
                        >
                          <Bell className="h-3 w-3 mr-1" />
                          Notify
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No recent absences found
                    </p>
                  )}

                  {absenteeData.length > 5 && (
                    <div className="pt-2 text-center">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-indigo-600"
                      >
                        View all {absenteeData.length} faculties with absences
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends">
          <div className="bg-white p-6 rounded-3xl shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Weekly Attendance Trends
            </h2>

            {/* Simple bar chart representation - in a real app, use recharts or other charting library */}
            <div className="h-64 flex items-end justify-between gap-2">
              {trendData.map((day, index) => {
                const total = day.present + day.absent + day.late;
                const presentPercentage =
                  total > 0 ? (day.present / total) * 100 : 0;
                const latePercentage = total > 0 ? (day.late / total) * 100 : 0;
                const absentPercentage =
                  total > 0 ? (day.absent / total) * 100 : 0;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full h-48 flex flex-col-reverse">
                      {absentPercentage > 0 && (
                        <div
                          className="w-full bg-red-400"
                          style={{ height: `${absentPercentage * 0.48}px` }}
                        ></div>
                      )}
                      {latePercentage > 0 && (
                        <div
                          className="w-full bg-yellow-400"
                          style={{ height: `${latePercentage * 0.48}px` }}
                        ></div>
                      )}
                      {presentPercentage > 0 && (
                        <div
                          className="w-full bg-green-400"
                          style={{ height: `${presentPercentage * 0.48}px` }}
                        ></div>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center mt-4 gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 mr-2"></div>
                <span className="text-sm">Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 mr-2"></div>
                <span className="text-sm">Late</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 mr-2"></div>
                <span className="text-sm">Absent</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance by Class</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Grade 10-A", "Grade 10-B", "Grade 11-A", "Grade 11-B"].map(
                    (classname) => {
                      const percentage = Math.floor(Math.random() * 30) + 70; // Random percentage between 70-100%
                      return (
                        <div key={classname} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              {classname}
                            </span>
                            <span className="text-sm text-gray-500">
                              {percentage}%
                            </span>
                          </div>
                          <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`absolute top-0 left-0 h-full ${
                                percentage > 90
                                  ? "bg-green-500"
                                  : percentage > 80
                                  ? "bg-green-400"
                                  : percentage > 70
                                  ? "bg-yellow-400"
                                  : "bg-red-400"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chronic Absenteeism</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {absenteeData.slice(0, 5).map((faculty) => (
                    <div
                      key={faculty.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{faculty.name}</p>
                          <p className="text-xs text-gray-500">
                            {faculty.class}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          faculty.absenceCount > 5
                            ? "bg-red-100 text-red-800"
                            : faculty.absenceCount > 3
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {faculty.absenceCount} absences
                      </Badge>
                    </div>
                  ))}

                  {absenteeData.length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                      No chronic absences detected
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">
                        Report Type
                      </label>
                      <Select defaultValue="daily">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">
                            Daily Attendance
                          </SelectItem>
                          <SelectItem value="weekly">Weekly Summary</SelectItem>
                          <SelectItem value="monthly">
                            Monthly Overview
                          </SelectItem>
                          <SelectItem value="absence">
                            Absence Analysis
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">
                        Select Class
                      </label>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Classes</SelectItem>
                          <SelectItem value="Grade 10-A">Grade 10-A</SelectItem>
                          <SelectItem value="Grade 10-B">Grade 10-B</SelectItem>
                          <SelectItem value="Grade 11-A">Grade 11-A</SelectItem>
                          <SelectItem value="Grade 11-B">Grade 11-B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">
                        From Date
                      </label>
                      <div className="flex">
                        <input
                          type="date"
                          className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm"
                          defaultValue={
                            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                              .toISOString()
                              .split("T")[0]
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">
                        To Date
                      </label>
                      <div className="flex">
                        <input
                          type="date"
                          className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm"
                          defaultValue={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" className="rounded-full">
                      Preview
                    </Button>
                    <Button className="rounded-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-full py-3 px-5 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium">Monthly Overview</h4>
                      <p className="text-xs text-gray-500">
                        All Classes • March 2023
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="border rounded-full py-3 px-5 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium">Weekly Summary</h4>
                      <p className="text-xs text-gray-500">
                        Grade 10-A • Week 12
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="border rounded-full py-3 px-5 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium">Absence Analysis</h4>
                      <p className="text-xs text-gray-500">
                        Grade 11-B • Quarter 1
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
