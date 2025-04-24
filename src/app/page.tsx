"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Sun,
  Moon,
  ArrowUp,
  ArrowDown,
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  Bell,
  Search,
  Mail,
  FileText,
  CreditCard,
  Home,
  User,
  Book,
  ClipboardList,
  PieChart as PieChartIcon,
  Settings,
} from "lucide-react";
import Link from "next/link";

// Sample data for different roles
const adminData = {
  students: 1250,
  teachers: 85,
  classes: 42,
  revenue: 185000,
  attendanceData: [
    { month: "Jan", present: 85, absent: 15 },
    { month: "Feb", present: 88, absent: 12 },
    { month: "Mar", present: 82, absent: 18 },
    { month: "Apr", present: 90, absent: 10 },
    { month: "May", present: 87, absent: 13 },
  ],
  feeCollection: [
    { name: "Paid", value: 75, color: "#10B981" },
    { name: "Pending", value: 25, color: "#F59E0B" },
  ],
};

const teacherData = {
  classes: 5,
  students: 120,
  assignments: 8,
  attendance: 92,
  classSchedule: [
    { day: "Mon", subject: "Math", time: "9:00 AM" },
    { day: "Tue", subject: "Science", time: "10:30 AM" },
    { day: "Wed", subject: "History", time: "9:00 AM" },
    { day: "Thu", subject: "Math", time: "1:00 PM" },
    { day: "Fri", subject: "English", time: "11:00 AM" },
  ],
  studentPerformance: [
    { name: "A", students: 15 },
    { name: "B", students: 25 },
    { name: "C", students: 35 },
    { name: "D", students: 10 },
  ],
};

const studentData = {
  classes: 6,
  assignments: 5,
  attendance: 95,
  grades: "B+",
  schedule: [
    { time: "8:00", subject: "Math", room: "201" },
    { time: "9:30", subject: "Science", room: "Lab 3" },
    { time: "11:00", subject: "History", room: "105" },
    { time: "1:00", subject: "English", room: "201" },
    { time: "2:30", subject: "PE", room: "Gym" },
  ],
  assignmentsDue: [
    { subject: "Math", title: "Algebra Problems", due: "Tomorrow" },
    { subject: "Science", title: "Lab Report", due: "Friday" },
  ],
};

const parentData = {
  children: 2,
  attendance: 90,
  assignments: 7,
  messages: 3,
  childrenData: [
    { name: "Sarah", grade: "5th", teacher: "Mr. Johnson" },
    { name: "Michael", grade: "7th", teacher: "Ms. Williams" },
  ],
  feeStatus: [
    { child: "Sarah", status: "Paid", amount: "$250" },
    { child: "Michael", status: "Pending", amount: "$300" },
  ],
};

type UserRole = "admin" | "teacher" | "student" | "parent";

export default function SchoolDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>("teacher");

  // Toggle between roles for demo purposes
  const switchRole = () => {
    const roles: UserRole[] = ["admin", "teacher", "student", "parent"];
    const currentIndex = roles.indexOf(currentRole);
    const nextIndex = (currentIndex + 1) % roles.length;
    setCurrentRole(roles[nextIndex]);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      {/* Top Navigation */}
      <div
        className={`flex items-center justify-between p-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">School ERP</h1>
          <div className="flex space-x-2">
            <Button
              variant={currentRole === "admin" ? "default" : "outline"}
              onClick={() => setCurrentRole("admin")}
              className="rounded-full text-xs"
            >
              Admin
            </Button>
            <Button
              variant={currentRole === "teacher" ? "default" : "outline"}
              onClick={() => setCurrentRole("teacher")}
              className="rounded-full text-xs"
            >
              Teacher
            </Button>
            <Button
              variant={currentRole === "student" ? "default" : "outline"}
              onClick={() => setCurrentRole("student")}
              className="rounded-full text-xs"
            >
              Student
            </Button>
            <Button
              variant={currentRole === "parent" ? "default" : "outline"}
              onClick={() => setCurrentRole("parent")}
              className="rounded-full text-xs"
            >
              Parent
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Mail className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <div className="hidden md:block">
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
              {currentRole === "admin"
                ? "A"
                : currentRole === "teacher"
                ? "T"
                : currentRole === "student"
                ? "S"
                : "P"}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Role-Specific Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {currentRole === "admin"
                ? "Administrator Dashboard"
                : currentRole === "teacher"
                ? "Teacher Portal"
                : currentRole === "student"
                ? "Student Dashboard"
                : "Parent Portal"}
            </h1>
            <p className="text-gray-500">
              {currentRole === "admin"
                ? "School management overview and analytics"
                : currentRole === "teacher"
                ? "Your classes and teaching resources"
                : currentRole === "student"
                ? "Your academic progress and schedule"
                : "Your children's academic information"}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/calendar">
              <Button variant="outline" className="rounded-full">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </Link>
          </div>
        </div>

        {/* Role-Specific Dashboard Content */}
        {currentRole === "admin" && (
          <AdminDashboard darkMode={darkMode} data={adminData} />
        )}
        {currentRole === "teacher" && (
          <TeacherDashboard darkMode={darkMode} data={teacherData} />
        )}
        {currentRole === "student" && (
          <StudentDashboard darkMode={darkMode} data={studentData} />
        )}
        {currentRole === "parent" && (
          <ParentDashboard darkMode={darkMode} data={parentData} />
        )}
      </div>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard({ darkMode, data }: { darkMode: boolean; data: any }) {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Students
            </CardTitle>
            <Users className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.students}</div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                5.2%
              </span>{" "}
              vs last term
            </p>
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Teachers
            </CardTitle>
            <GraduationCap className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.teachers}</div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                2.1%
              </span>{" "}
              vs last term
            </p>
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Classes
            </CardTitle>
            <BookOpen className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.classes}</div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                3.5%
              </span>{" "}
              vs last term
            </p>
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
            <CreditCard className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${data.revenue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                12.5%
              </span>{" "}
              vs last term
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Attendance Trend Chart */}
        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Monthly attendance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data.attendanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={darkMode ? "#374151" : "#E5E7EB"}
                />
                <XAxis
                  dataKey="month"
                  stroke={darkMode ? "#9CA3AF" : "#6B7280"}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={darkMode ? "#9CA3AF" : "#6B7280"}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    borderColor: darkMode ? "#374151" : "#E5E7EB",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="present"
                  name="Present %"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="absent"
                  name="Absent %"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Collection Chart */}
        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader>
            <CardTitle>Fee Collection</CardTitle>
            <CardDescription>
              Current term fee collection status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={data.feeCollection}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={70}
                  paddingAngle={2}
                  label
                >
                  {data.feeCollection.map((entry: any, index: number) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    borderColor: darkMode ? "#374151" : "#E5E7EB",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } shadow-sm`}
      >
        <CardHeader>
          <CardTitle>Recent School Activities</CardTitle>
          <CardDescription>Latest events and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                action: "New staff member added",
                time: "Today, 10:30 AM",
                details: "Math teacher - Mr. Smith",
              },
              {
                id: 2,
                action: "Fee payment received",
                time: "Today, 9:15 AM",
                details: "$250 from John Doe (Grade 5)",
              },
              {
                id: 3,
                action: "Parent meeting scheduled",
                time: "Yesterday, 3:45 PM",
                details: "With Ms. Johnson on Friday",
              },
              {
                id: 4,
                action: "New student enrolled",
                time: "Yesterday, 11:20 AM",
                details: "Sarah Williams - Grade 3",
              },
              {
                id: 5,
                action: "School event added",
                time: "Monday, 2:00 PM",
                details: "Annual Sports Day on May 15",
              },
            ].map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <FileText className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.details}</p>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// Teacher Dashboard Component
function TeacherDashboard({
  darkMode,
  data,
}: {
  darkMode: boolean;
  data: any;
}) {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Your Classes
            </CardTitle>
            <BookOpen className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.classes}</div>
            <p className="text-xs text-gray-500 mt-1">Subjects you teach</p>
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Students
            </CardTitle>
            <Users className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.students}</div>
            <p className="text-xs text-gray-500 mt-1">Across all classes</p>
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Assignments Due
            </CardTitle>
            <ClipboardList className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.assignments}</div>
            <p className="text-xs text-gray-500 mt-1">To be graded</p>
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Attendance
            </CardTitle>
            <User className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.attendance}%</div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                2.5%
              </span>{" "}
              vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Class Schedule and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Class Schedule */}
        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.classSchedule.map((cls: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 pr-6 border rounded-full"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 rounded-full ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <Clock className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="font-medium">{cls.subject}</p>
                      <p className="text-sm text-gray-500">
                        {cls.day} at {cls.time}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-full" size="sm">
                    View Class
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Performance */}
        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
            <CardDescription>
              Grade distribution for your classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data.studentPerformance}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={darkMode ? "#374151" : "#E5E7EB"}
                />
                <XAxis
                  dataKey="name"
                  stroke={darkMode ? "#9CA3AF" : "#6B7280"}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={darkMode ? "#9CA3AF" : "#6B7280"}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    borderColor: darkMode ? "#374151" : "#E5E7EB",
                    borderRadius: "1rem",
                  }}
                />
                <Bar
                  dataKey="students"
                  name="Students"
                  fill="#000000" // bar color changed to black
                  radius={[26, 26, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Assignments to Grade */}
      <Card
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } shadow-sm mb-8`}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Assignments to Grade</CardTitle>
              <CardDescription>
                Recent student submissions awaiting your review
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-indigo-500">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Assignment
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Class
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Due Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Submissions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 1,
                    title: "Algebra Quiz",
                    class: "Math 8A",
                    due: "Today",
                    submissions: 22,
                  },
                  {
                    id: 2,
                    title: "Science Project",
                    class: "Science 8B",
                    due: "Tomorrow",
                    submissions: 18,
                  },
                  {
                    id: 3,
                    title: "History Essay",
                    class: "History 8A",
                    due: "Overdue",
                    submissions: 25,
                  },
                ].map((assignment) => (
                  <tr
                    key={assignment.id}
                    className={`border-b ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <td className="py-3 px-4 text-sm font-medium">
                      {assignment.title}
                    </td>
                    <td className="py-3 px-4 text-sm">{assignment.class}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          assignment.due === "Overdue"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : assignment.due === "Today"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {assignment.due}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {assignment.submissions}/25
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// Student Dashboard Component
function StudentDashboard({
  darkMode,
  data,
}: {
  darkMode: boolean;
  data: any;
}) {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
        <Card
          className={` ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Your Classes
            </CardTitle>
            <BookOpen className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.classes}</div>
            <p className="text-xs text-gray-500 mt-1">
              Current enrolled classes
            </p>
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Assignments Due
            </CardTitle>
            <ClipboardList className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.assignments}</div>
            <p className="text-xs text-gray-500 mt-1">Upcoming assignments</p>
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Your Attendance
            </CardTitle>
            <User className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.attendance}%</div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                3.2%
              </span>{" "}
              vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } shadow-sm mb-8`}
      >
        <CardHeader>
          <CardTitle>Today&apos;s Schedule</CardTitle>
          <CardDescription>Your classes for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.schedule.map((cls: any, index: number) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      darkMode ? "bg-gray-600" : "bg-white"
                    }`}
                  >
                    <Clock className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-medium">{cls.subject}</p>
                    <p className="text-sm text-gray-500">
                      {cls.time} • Room {cls.room}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Materials
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assignments and Grades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Assignments */}
        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Assignments due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.assignmentsDue.map((assignment: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {assignment.subject}: {assignment.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Due {assignment.due}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Your latest academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div
                  className={`text-6xl font-bold mb-2 ${
                    data.grades.includes("A")
                      ? "text-green-500"
                      : data.grades.includes("B")
                      ? "text-blue-500"
                      : data.grades.includes("C")
                      ? "text-yellow-500"
                      : data.grades.includes("D")
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {data.grades}
                </div>
                <p className="text-gray-500">Current GPA</p>
                <p className="text-sm text-green-500 mt-2 flex items-center justify-center">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  Improved from last term
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Parent Dashboard Component
function ParentDashboard({ darkMode, data }: { darkMode: boolean; data: any }) {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Your Children
            </CardTitle>
            <Users className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.children}</div>
            <p className="text-xs text-gray-500 mt-1">Enrolled in school</p>
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Attendance
            </CardTitle>
            <User className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.attendance}%</div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                2.1%
              </span>{" "}
              vs last month
            </p>
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Assignments Due
            </CardTitle>
            <ClipboardList className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.assignments}</div>
            <p className="text-xs text-gray-500 mt-1">Across all children</p>
          </CardContent>
        </Card>

        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              New Messages
            </CardTitle>
            <Mail className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.messages}</div>
            <p className="text-xs text-gray-500 mt-1">From teachers</p>
          </CardContent>
        </Card>
      </div>

      {/* Children Information */}
      <Card
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } shadow-sm mb-8`}
      >
        <CardHeader>
          <CardTitle>Your Children</CardTitle>
          <CardDescription>Academic information for each child</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.childrenData.map((child: any, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      darkMode ? "bg-gray-600" : "bg-white"
                    }`}
                  >
                    <User className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-gray-500">
                      {child.grade} Grade • Teacher: {child.teacher}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div
                    className={`p-3 rounded-lg ${
                      darkMode ? "bg-gray-600" : "bg-white"
                    }`}
                  >
                    <p className="text-sm text-gray-500">Attendance</p>
                    <p className="font-medium">92%</p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      darkMode ? "bg-gray-600" : "bg-white"
                    }`}
                  >
                    <p className="text-sm text-gray-500">GPA</p>
                    <p className="font-medium">3.4</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  View Full Report
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fee Status and Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Status */}
        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader>
            <CardTitle>Fee Payment Status</CardTitle>
            <CardDescription>Current term fee information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.feeStatus.map((fee: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{fee.child}</p>
                    <p className="text-sm text-gray-500">Term 2 Fees</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{fee.amount}</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        fee.status === "Paid"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {fee.status}
                    </span>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-2">Pay Fees Online</Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } shadow-sm`}
        >
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Communication from teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  from: "Mr. Johnson (Math)",
                  subject: "Parent-Teacher Meeting",
                  date: "Today, 10:30 AM",
                  read: false,
                },
                {
                  id: 2,
                  from: "Ms. Williams (Science)",
                  subject: "Science Fair Project",
                  date: "Yesterday, 2:15 PM",
                  read: true,
                },
                {
                  id: 3,
                  from: "School Administration",
                  subject: "Upcoming School Holiday",
                  date: "Monday, 9:00 AM",
                  read: true,
                },
              ].map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <Mail
                      className={`h-5 w-5 ${
                        message.read ? "text-gray-500" : "text-indigo-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{message.from}</p>
                    <p className="text-sm">{message.subject}</p>
                    <p className="text-xs text-gray-500">{message.date}</p>
                  </div>
                  {!message.read && (
                    <div className="h-2 w-2 rounded-full bg-indigo-500 mt-2"></div>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                View All Messages
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
