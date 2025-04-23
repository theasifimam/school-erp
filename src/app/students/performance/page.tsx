"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Bookmark,
  Clock,
  FileText,
  Filter,
  GraduationCap,
  Search,
  Star,
  User,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample data
const students = [
  {
    id: "s101",
    name: "Alex Johnson",
    avatar: "/avatars/student1.jpg",
    grade: "10-A",
    attendance: 92,
    overallGrade: "A-",
    performanceTrend: "improving",
    subjects: [
      { name: "Mathematics", grade: "A", progress: 88, trend: "up" },
      { name: "Science", grade: "B+", progress: 82, trend: "up" },
      { name: "English", grade: "A-", progress: 85, trend: "stable" },
      { name: "History", grade: "B", progress: 78, trend: "down" },
      { name: "Art", grade: "A", progress: 92, trend: "up" },
    ],
  },
  {
    id: "s102",
    name: "Maria Garcia",
    avatar: "/avatars/student2.jpg",
    grade: "10-A",
    attendance: 95,
    overallGrade: "A",
    performanceTrend: "stable",
    subjects: [
      { name: "Mathematics", grade: "A+", progress: 96, trend: "stable" },
      { name: "Science", grade: "A", progress: 91, trend: "stable" },
      { name: "English", grade: "A", progress: 90, trend: "up" },
      { name: "History", grade: "A-", progress: 87, trend: "stable" },
      { name: "Art", grade: "B+", progress: 84, trend: "down" },
    ],
  },
  {
    id: "s103",
    name: "Jamie Smith",
    avatar: "/avatars/student3.jpg",
    grade: "10-B",
    attendance: 88,
    overallGrade: "B+",
    performanceTrend: "improving",
    subjects: [
      { name: "Mathematics", grade: "B", progress: 75, trend: "up" },
      { name: "Science", grade: "B+", progress: 82, trend: "up" },
      { name: "English", grade: "A-", progress: 86, trend: "stable" },
      { name: "History", grade: "B-", progress: 72, trend: "up" },
      { name: "Art", grade: "A", progress: 93, trend: "up" },
    ],
  },
];

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Art",
  "All Subjects",
];

const gradeDistributionData = [
  { name: "A+", value: 12 },
  { name: "A", value: 28 },
  { name: "A-", value: 22 },
  { name: "B+", value: 18 },
  { name: "B", value: 12 },
  { name: "B-", value: 5 },
  { name: "C+", value: 3 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const performanceOverTimeData = [
  { name: "Sep", math: 75, science: 70, english: 78 },
  { name: "Oct", math: 78, science: 72, english: 80 },
  { name: "Nov", math: 82, science: 75, english: 82 },
  { name: "Dec", math: 80, science: 78, english: 83 },
  { name: "Jan", math: 85, science: 80, english: 85 },
  { name: "Feb", math: 88, science: 82, english: 86 },
];

export default function StudentPerformancePage() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <span className="text-green-500">↑</span>;
      case "down":
        return <span className="text-red-500">↓</span>;
      default:
        return <span className="text-gray-500">→</span>;
    }
  };

  return (
    <div className="container mx-auto py-8 px-10 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Student Performance</h1>
          <p className="text-gray-600">
            Track and analyze student academic progress
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search students..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={selectedSubject}
            onValueChange={(value) => setSelectedSubject(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger className="rounded-full" value="overview">
            <User className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BookOpen className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="comparison">
            <GraduationCap className="h-4 w-4 mr-2" />
            Class Comparison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student List</CardTitle>
                <CardDescription>
                  {filteredStudents.length} students found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`flex items-center p-3 rounded-full cursor-pointer transition-colors ${
                        selectedStudent.id === student.id
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {student.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Grade {student.grade}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Badge variant="outline">{student.overallGrade}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{selectedStudent.name}</CardTitle>
                      <CardDescription>
                        Grade {selectedStudent.grade} •{" "}
                        {selectedStudent.performanceTrend === "improving"
                          ? "Performance improving"
                          : selectedStudent.performanceTrend === "declining"
                          ? "Performance declining"
                          : "Performance stable"}
                      </CardDescription>
                    </div>
                    <Button className="rounded-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Overall Grade
                      </h3>
                      <div className="text-3xl font-bold">
                        {selectedStudent.overallGrade}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Attendance</h3>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={selectedStudent.attendance}
                          className="h-2"
                        />
                        <span className="text-sm font-medium">
                          {selectedStudent.attendance}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium mb-3">Subject Grades</h3>
                  <div className="space-y-4">
                    {selectedStudent.subjects
                      .filter(
                        (subject) =>
                          selectedSubject === "All Subjects" ||
                          subject.name === selectedSubject
                      )
                      .map((subject) => (
                        <div key={subject.name} className="flex items-center">
                          <div className="w-32">
                            <p className="text-sm">{subject.name}</p>
                          </div>
                          <div className="flex-1 flex items-center gap-2">
                            <Progress
                              value={subject.progress}
                              className="h-2"
                            />
                            <div className="w-12 flex justify-between">
                              <span className="text-sm font-medium">
                                {subject.grade}
                              </span>
                              {getTrendIcon(subject.trend)}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceOverTimeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="math"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="Mathematics"
                      />
                      <Line
                        type="monotone"
                        dataKey="science"
                        stroke="#82ca9d"
                        name="Science"
                      />
                      <Line
                        type="monotone"
                        dataKey="english"
                        stroke="#ffc658"
                        name="English"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>
                  Class-wide grade distribution across all subjects
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {gradeDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>
                  Average grades by subject area
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Math", average: 82 },
                      { name: "Science", average: 78 },
                      { name: "English", average: 85 },
                      { name: "History", average: 76 },
                      { name: "Art", average: 89 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Bar
                      dataKey="average"
                      fill="#8884d8"
                      name="Average Grade"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Performance</CardTitle>
              <CardDescription>
                Individual student performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Mathematics</TableHead>
                    <TableHead>Science</TableHead>
                    <TableHead>English</TableHead>
                    <TableHead>History</TableHead>
                    <TableHead>Art</TableHead>
                    <TableHead>Attendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {student.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge>{student.overallGrade}</Badge>
                      </TableCell>
                      {student.subjects.map((subject) => (
                        <TableCell key={subject.name}>
                          <div className="flex items-center gap-1">
                            {subject.grade}
                            {getTrendIcon(subject.trend)}
                          </div>
                        </TableCell>
                      ))}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={student.attendance}
                            className="h-2 w-20"
                          />
                          <span className="text-sm">{student.attendance}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Comparison</CardTitle>
              <CardDescription>
                Compare performance across different classes
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "10-A", math: 82, science: 78, english: 85 },
                    { name: "10-B", math: 76, science: 72, english: 80 },
                    { name: "11-A", math: 85, science: 80, english: 88 },
                    { name: "11-B", math: 78, science: 75, english: 82 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="math" fill="#8884d8" name="Mathematics" />
                  <Bar dataKey="science" fill="#82ca9d" name="Science" />
                  <Bar dataKey="english" fill="#ffc658" name="English" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
