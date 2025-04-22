"use client";

import { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  User,
  Check,
  X,
  Clock,
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with API calls in real implementation
const students = [
  { id: 1, name: "Alice Johnson", class: "Grade 10-A", rollNumber: "101" },
  { id: 2, name: "Bob Smith", class: "Grade 10-A", rollNumber: "102" },
  { id: 3, name: "Charlie Brown", class: "Grade 10-A", rollNumber: "103" },
  { id: 4, name: "Diana Prince", class: "Grade 10-A", rollNumber: "104" },
  { id: 5, name: "Ethan Hunt", class: "Grade 10-A", rollNumber: "105" },
];

const attendanceRecords = [
  { studentId: 1, date: "2023-06-01", status: "present" },
  { studentId: 2, date: "2023-06-01", status: "absent" },
  { studentId: 3, date: "2023-06-01", status: "present" },
  { studentId: 4, date: "2023-06-01", status: "late" },
  { studentId: 5, date: "2023-06-01", status: "present" },
  // Add more records for different dates
];

export default function AttendancePage() {
  const [date, setDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState("Grade 10-A");
  const [searchQuery, setSearchQuery] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

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

  // Toggle attendance status for a student
  const toggleAttendance = (studentId, status) => {
    setAttendance((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.studentId === studentId && item.date === formatDate(date)
      );

      if (existingIndex >= 0) {
        // Update existing record
        const updated = [...prev];
        updated[existingIndex].status = status;
        return updated;
      } else {
        // Add new record
        return [
          ...prev,
          {
            studentId,
            date: formatDate(date),
            status,
          },
        ];
      }
    });
  };

  // Get attendance status for a student on the current date
  const getAttendanceStatus = (studentId) => {
    const record = attendance.find(
      (item) => item.studentId === studentId && item.date === formatDate(date)
    );
    return record ? record.status : null;
  };

  // Calculate attendance stats
  const calculateStats = () => {
    const presentCount = filteredStudents.filter((student) => {
      const status = getAttendanceStatus(student.id);
      return status === "present" || status === "late";
    }).length;

    const absentCount = filteredStudents.filter((student) => {
      const status = getAttendanceStatus(student.id);
      return status === "absent";
    }).length;

    return {
      present: presentCount,
      absent: absentCount,
      total: filteredStudents.length,
      percentage:
        Math.round((presentCount / filteredStudents.length) * 100) || 0,
    };
  };

  const stats = calculateStats();

  // Load attendance data (in a real app, this would be an API call)
  useEffect(() => {
    // Combine existing records with any new attendance being taken
    setAttendance([...attendanceRecords]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6 text-indigo-600" />
          Student Attendance
        </h1>
        <p className="text-gray-500">
          Manage and view student attendance records
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <span className="font-medium">
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
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setDate(new Date())}
              >
                Today
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={nextDay}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

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

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Button
          className="md:w-auto bg-indigo-600 hover:bg-indigo-700"
          onClick={() => setIsTakingAttendance(!isTakingAttendance)}
        >
          {isTakingAttendance ? "Save Attendance" : "Take Attendance"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <User className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.present}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.absent}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance %</CardTitle>
            <span className="text-xs font-medium">Today</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.percentage}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Class</TableHead>
              <TableHead className="text-right">Status</TableHead>
              {isTakingAttendance && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => {
                const status = getAttendanceStatus(student.id);
                return (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.class}</TableCell>
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
                    {isTakingAttendance && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant={
                              status === "present" ? "default" : "outline"
                            }
                            size="sm"
                            className="h-8 px-3"
                            onClick={() =>
                              toggleAttendance(student.id, "present")
                            }
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Present
                          </Button>
                          <Button
                            variant={
                              status === "absent" ? "default" : "outline"
                            }
                            size="sm"
                            className="h-8 px-3"
                            onClick={() =>
                              toggleAttendance(student.id, "absent")
                            }
                          >
                            <X className="h-3 w-3 mr-1" />
                            Absent
                          </Button>
                          <Button
                            variant={status === "late" ? "default" : "outline"}
                            size="sm"
                            className="h-8 px-3"
                            onClick={() => toggleAttendance(student.id, "late")}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            Late
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={isTakingAttendance ? 6 : 5}
                  className="h-24 text-center"
                >
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Attendance Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Monthly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              [Monthly attendance chart placeholder]
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
              {students
                .filter((student) => {
                  const records = attendance.filter(
                    (record) =>
                      record.studentId === student.id &&
                      record.status === "absent"
                  );
                  return records.length > 0;
                })
                .slice(0, 3)
                .map((student) => (
                  <div key={student.id} className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">
                        {
                          attendance.filter(
                            (record) =>
                              record.studentId === student.id &&
                              record.status === "absent"
                          ).length
                        }{" "}
                        absences this month
                      </p>
                    </div>
                  </div>
                ))}
              {students.filter((student) => {
                const records = attendance.filter(
                  (record) =>
                    record.studentId === student.id &&
                    record.status === "absent"
                );
                return records.length > 0;
              }).length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No recent absences found
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
