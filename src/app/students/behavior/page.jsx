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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
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
  Award,
  Bookmark,
  Calendar,
  Clock,
  FileText,
  Filter,
  Gift,
  Heart,
  MessageSquare,
  Search,
  Star,
  ThumbsUp,
  User,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const asifimam =
  "https://scontent.fpat2-5.fna.fbcdn.net/v/t39.30808-6/348550329_123517970731107_5031092601247574056_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ZOl_MR5FC7YQ7kNvwHvEpCO&_nc_oc=AdmWRRm-l70rKHj-X3YF5dU5zVET_x43t5AK6UN67dzcB4CPH2wC41a0JBvB3h5C1a4ubM1ZMhfGQDZTUdMRCXGv&_nc_zt=23&_nc_ht=scontent.fpat2-5.fna&_nc_gid=hWPc-Wypm1TtkKioIDg5Cw&oh=00_AfGZZ_onkHzCflMxdrKd5Y5fC2odDPvHvM34c3kQZIY_-A&oe=680EE83E";
const ahad =
  "https://scontent.fpat2-3.fna.fbcdn.net/v/t39.30808-6/333048951_1185873428957055_8804346709412717345_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=38wpn1sMsHwQ7kNvwF1g0LG&_nc_oc=AdkYg7zGgH5fFKZSPisGIAZexv3Vay6I2Cp1I7-shkmpBM0FxhXBsWXrdl_MvZmqUdYeEtgFoI6YjrdS-ddda1bu&_nc_zt=23&_nc_ht=scontent.fpat2-3.fna&_nc_gid=khcFWNqn-N-LdQ_aY2ORmQ&oh=00_AfEY7KJruTpkpEULmdVz_x1IzVCShL8v5lV32M_Q9t56kg&oe=680EF6D6";

const aquib =
  "https://scontent.fpat2-4.fna.fbcdn.net/v/t39.30808-6/324439682_1264253674434859_811671014735056885_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=YCpWMCLd3s0Q7kNvwFKbAo4&_nc_oc=Adn3L4XjTksYBMLGI3p3TtCwQ-h9QSOGHl2R_mgB6cQlxQXSAA_XYI6bIo4JNcSKJKg0YxQa8z3yqg7xTZchXngH&_nc_zt=23&_nc_ht=scontent.fpat2-4.fna&_nc_gid=7hMW3HqFrAHDrininsPqJQ&oh=00_AfFP992vVxtDuAAEc_EWlfivSuNRb7hNmgrUFTvNczhABg&oe=680EEE7D";

// Sample data
const students = [
  {
    id: "s101",
    name: "Asif Imam",
    avatar: asifimam,
    grade: "10-A",
    conductScore: 92,
    overallStatus: "Excellent",
    behaviorTrend: "improving",
    merits: 15,
    demerits: 2,
    categories: [
      { name: "Attendance", score: 95, trend: "up" },
      { name: "Participation", score: 88, trend: "up" },
      { name: "Conduct", score: 90, trend: "stable" },
      { name: "Cooperation", score: 85, trend: "stable" },
      { name: "Responsibility", score: 92, trend: "up" },
    ],
    incidents: [
      {
        date: "2025-03-12",
        type: "Merit",
        description: "Helped fellow student with homework",
        points: 2,
      },
      {
        date: "2025-03-15",
        type: "Demerit",
        description: "Late to class",
        points: -1,
      },
      {
        date: "2025-04-01",
        type: "Merit",
        description: "Leadership in group project",
        points: 3,
      },
      {
        date: "2025-04-10",
        type: "Merit",
        description: "Community service",
        points: 3,
      },
    ],
  },
  {
    id: "s102",
    name: "Ahad Rahman",
    avatar: ahad,
    grade: "10-A",
    conductScore: 98,
    overallStatus: "Outstanding",
    behaviorTrend: "stable",
    merits: 18,
    demerits: 0,
    categories: [
      { name: "Attendance", score: 98, trend: "stable" },
      { name: "Participation", score: 96, trend: "stable" },
      { name: "Conduct", score: 97, trend: "up" },
      { name: "Cooperation", score: 100, trend: "stable" },
      { name: "Responsibility", score: 95, trend: "stable" },
    ],
    incidents: [
      {
        date: "2025-02-28",
        type: "Merit",
        description: "Volunteered for school event",
        points: 3,
      },
      {
        date: "2025-03-10",
        type: "Merit",
        description: "Helped organize classroom",
        points: 2,
      },
      {
        date: "2025-03-25",
        type: "Merit",
        description: "Assisted teacher with class demonstration",
        points: 2,
      },
      {
        date: "2025-04-05",
        type: "Merit",
        description: "Represented school in community event",
        points: 5,
      },
    ],
  },
  {
    id: "s103",
    name: "Jamie Smith",
    avatar: "/avatars/student3.jpg",
    grade: "10-B",
    conductScore: 75,
    overallStatus: "Needs Improvement",
    behaviorTrend: "improving",
    merits: 8,
    demerits: 7,
    categories: [
      { name: "Attendance", score: 82, trend: "up" },
      { name: "Participation", score: 70, trend: "up" },
      { name: "Conduct", score: 65, trend: "stable" },
      { name: "Cooperation", score: 80, trend: "up" },
      { name: "Responsibility", score: 78, trend: "up" },
    ],
    incidents: [
      {
        date: "2025-02-15",
        type: "Demerit",
        description: "Disrupting class",
        points: -2,
      },
      {
        date: "2025-02-27",
        type: "Merit",
        description: "Improved classroom behavior",
        points: 2,
      },
      {
        date: "2025-03-05",
        type: "Demerit",
        description: "Incomplete homework",
        points: -1,
      },
      {
        date: "2025-03-20",
        type: "Merit",
        description: "Helped new student",
        points: 3,
      },
      {
        date: "2025-04-02",
        type: "Demerit",
        description: "Using phone during class",
        points: -2,
      },
      {
        date: "2025-04-15",
        type: "Merit",
        description: "Showing improvement in conduct",
        points: 3,
      },
    ],
  },

  {
    id: "s104",
    name: "Aquib Imam",
    avatar: aquib,
    grade: "10-A",
    conductScore: 92,
    overallStatus: "Excellent",
    behaviorTrend: "improving",
    merits: 15,
    demerits: 2,
    categories: [
      { name: "Attendance", score: 95, trend: "up" },
      { name: "Participation", score: 88, trend: "up" },
      { name: "Conduct", score: 90, trend: "stable" },
      { name: "Cooperation", score: 85, trend: "stable" },
      { name: "Responsibility", score: 92, trend: "up" },
    ],
    incidents: [
      {
        date: "2025-03-12",
        type: "Merit",
        description: "Helped fellow student with homework",
        points: 2,
      },
      {
        date: "2025-03-15",
        type: "Demerit",
        description: "Late to class",
        points: -1,
      },
      {
        date: "2025-04-01",
        type: "Merit",
        description: "Leadership in group project",
        points: 3,
      },
      {
        date: "2025-04-10",
        type: "Merit",
        description: "Community service",
        points: 3,
      },
    ],
  },
  {
    id: "s105",
    name: "Maria Garcia",
    avatar: "/avatars/student2.jpg",
    grade: "10-A",
    conductScore: 98,
    overallStatus: "Outstanding",
    behaviorTrend: "stable",
    merits: 18,
    demerits: 0,
    categories: [
      { name: "Attendance", score: 98, trend: "stable" },
      { name: "Participation", score: 96, trend: "stable" },
      { name: "Conduct", score: 97, trend: "up" },
      { name: "Cooperation", score: 100, trend: "stable" },
      { name: "Responsibility", score: 95, trend: "stable" },
    ],
    incidents: [
      {
        date: "2025-02-28",
        type: "Merit",
        description: "Volunteered for school event",
        points: 3,
      },
      {
        date: "2025-03-10",
        type: "Merit",
        description: "Helped organize classroom",
        points: 2,
      },
      {
        date: "2025-03-25",
        type: "Merit",
        description: "Assisted teacher with class demonstration",
        points: 2,
      },
      {
        date: "2025-04-05",
        type: "Merit",
        description: "Represented school in community event",
        points: 5,
      },
    ],
  },
  {
    id: "s106",
    name: "Jamie Smith",
    avatar: "/avatars/student3.jpg",
    grade: "10-B",
    conductScore: 75,
    overallStatus: "Needs Improvement",
    behaviorTrend: "improving",
    merits: 8,
    demerits: 7,
    categories: [
      { name: "Attendance", score: 82, trend: "up" },
      { name: "Participation", score: 70, trend: "up" },
      { name: "Conduct", score: 65, trend: "stable" },
      { name: "Cooperation", score: 80, trend: "up" },
      { name: "Responsibility", score: 78, trend: "up" },
    ],
    incidents: [
      {
        date: "2025-02-15",
        type: "Demerit",
        description: "Disrupting class",
        points: -2,
      },
      {
        date: "2025-02-27",
        type: "Merit",
        description: "Improved classroom behavior",
        points: 2,
      },
      {
        date: "2025-03-05",
        type: "Demerit",
        description: "Incomplete homework",
        points: -1,
      },
      {
        date: "2025-03-20",
        type: "Merit",
        description: "Helped new student",
        points: 3,
      },
      {
        date: "2025-04-02",
        type: "Demerit",
        description: "Using phone during class",
        points: -2,
      },
      {
        date: "2025-04-15",
        type: "Merit",
        description: "Showing improvement in conduct",
        points: 3,
      },
    ],
  },

  {
    id: "s107",
    name: "Alex Johnson",
    avatar: "/avatars/student1.jpg",
    grade: "10-A",
    conductScore: 92,
    overallStatus: "Excellent",
    behaviorTrend: "improving",
    merits: 15,
    demerits: 2,
    categories: [
      { name: "Attendance", score: 95, trend: "up" },
      { name: "Participation", score: 88, trend: "up" },
      { name: "Conduct", score: 90, trend: "stable" },
      { name: "Cooperation", score: 85, trend: "stable" },
      { name: "Responsibility", score: 92, trend: "up" },
    ],
    incidents: [
      {
        date: "2025-03-12",
        type: "Merit",
        description: "Helped fellow student with homework",
        points: 2,
      },
      {
        date: "2025-03-15",
        type: "Demerit",
        description: "Late to class",
        points: -1,
      },
      {
        date: "2025-04-01",
        type: "Merit",
        description: "Leadership in group project",
        points: 3,
      },
      {
        date: "2025-04-10",
        type: "Merit",
        description: "Community service",
        points: 3,
      },
    ],
  },
  {
    id: "s108",
    name: "Maria Garcia",
    avatar: "/avatars/student2.jpg",
    grade: "10-A",
    conductScore: 98,
    overallStatus: "Outstanding",
    behaviorTrend: "stable",
    merits: 18,
    demerits: 0,
    categories: [
      { name: "Attendance", score: 98, trend: "stable" },
      { name: "Participation", score: 96, trend: "stable" },
      { name: "Conduct", score: 97, trend: "up" },
      { name: "Cooperation", score: 100, trend: "stable" },
      { name: "Responsibility", score: 95, trend: "stable" },
    ],
    incidents: [
      {
        date: "2025-02-28",
        type: "Merit",
        description: "Volunteered for school event",
        points: 3,
      },
      {
        date: "2025-03-10",
        type: "Merit",
        description: "Helped organize classroom",
        points: 2,
      },
      {
        date: "2025-03-25",
        type: "Merit",
        description: "Assisted teacher with class demonstration",
        points: 2,
      },
      {
        date: "2025-04-05",
        type: "Merit",
        description: "Represented school in community event",
        points: 5,
      },
    ],
  },
  {
    id: "s109",
    name: "Jamie Smith",
    avatar: "/avatars/student3.jpg",
    grade: "10-B",
    conductScore: 75,
    overallStatus: "Needs Improvement",
    behaviorTrend: "improving",
    merits: 8,
    demerits: 7,
    categories: [
      { name: "Attendance", score: 82, trend: "up" },
      { name: "Participation", score: 70, trend: "up" },
      { name: "Conduct", score: 65, trend: "stable" },
      { name: "Cooperation", score: 80, trend: "up" },
      { name: "Responsibility", score: 78, trend: "up" },
    ],
    incidents: [
      {
        date: "2025-02-15",
        type: "Demerit",
        description: "Disrupting class",
        points: -2,
      },
      {
        date: "2025-02-27",
        type: "Merit",
        description: "Improved classroom behavior",
        points: 2,
      },
      {
        date: "2025-03-05",
        type: "Demerit",
        description: "Incomplete homework",
        points: -1,
      },
      {
        date: "2025-03-20",
        type: "Merit",
        description: "Helped new student",
        points: 3,
      },
      {
        date: "2025-04-02",
        type: "Demerit",
        description: "Using phone during class",
        points: -2,
      },
      {
        date: "2025-04-15",
        type: "Merit",
        description: "Showing improvement in conduct",
        points: 3,
      },
    ],
  },
];

const categories = [
  "Attendance",
  "Participation",
  "Conduct",
  "Cooperation",
  "Responsibility",
  "All Categories",
];

const incidentDistributionData = [
  { name: "Disruption", value: 12 },
  { name: "Tardiness", value: 18 },
  { name: "Homework", value: 15 },
  { name: "Helpfulness", value: 28 },
  { name: "Leadership", value: 22 },
];

const COLORS = ["#FF8042", "#FFBB28", "#FF6242", "#00C49F", "#0088FE"];

const behaviorOverTimeData = [
  { name: "Sep", conduct: 75, attendance: 80, participation: 70 },
  { name: "Oct", conduct: 78, attendance: 82, participation: 73 },
  { name: "Nov", conduct: 80, attendance: 85, participation: 76 },
  { name: "Dec", conduct: 82, attendance: 87, participation: 79 },
  { name: "Jan", conduct: 85, attendance: 90, participation: 82 },
  { name: "Feb", conduct: 88, attendance: 92, participation: 85 },
];

export default function StudentBehaviorPage() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <span className="text-green-500">↑</span>;
      case "down":
        return <span className="text-red-500">↓</span>;
      default:
        return <span className="text-gray-500">→</span>;
    }
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case "Outstanding":
        return "default";
      case "Excellent":
        return "secondary";
      case "Good":
        return "outline";
      case "Fair":
        return "destructive";
      case "Needs Improvement":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Student Behavior Record</h1>
          <p className="text-gray-600">
            Track and analyze student behavior patterns
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
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">
            <User className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="incidents">
            <MessageSquare className="h-4 w-4 mr-2" />
            Incidents
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Users className="h-4 w-4 mr-2" />
            Class Analysis
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
                        <Badge variant={getBadgeVariant(student.overallStatus)}>
                          {student.overallStatus}
                        </Badge>
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
                        {selectedStudent.behaviorTrend === "improving"
                          ? "Behavior improving"
                          : selectedStudent.behaviorTrend === "declining"
                          ? "Behavior declining"
                          : "Behavior stable"}
                      </CardDescription>
                    </div>
                    <Button className="rounded-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Conduct Rating
                      </h3>
                      <div className="text-3xl font-bold">
                        {selectedStudent.overallStatus}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Conduct Score
                      </h3>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={selectedStudent.conductScore}
                          className="h-2"
                        />
                        <span className="text-sm font-medium">
                          {selectedStudent.conductScore}/100
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Merit Balance
                      </h3>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-500">
                          +{selectedStudent.merits}
                        </span>
                        <span className="text-sm text-gray-400">|</span>
                        <span className="text-sm font-medium text-red-500">
                          -{selectedStudent.demerits}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium mb-3">
                    Behavior Categories
                  </h3>
                  <div className="space-y-4">
                    {selectedStudent.categories
                      .filter(
                        (category) =>
                          selectedCategory === "All Categories" ||
                          category.name === selectedCategory
                      )
                      .map((category) => (
                        <div key={category.name} className="flex items-center">
                          <div className="w-32">
                            <p className="text-sm">{category.name}</p>
                          </div>
                          <div className="flex-1 flex items-center gap-2">
                            <Progress value={category.score} className="h-2" />
                            <div className="w-16 flex justify-between">
                              <span className="text-sm font-medium">
                                {category.score}/100
                              </span>
                              {getTrendIcon(category.trend)}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Behavior Over Time</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={behaviorOverTimeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="conduct"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="Conduct"
                      />
                      <Line
                        type="monotone"
                        dataKey="attendance"
                        stroke="#82ca9d"
                        name="Attendance"
                      />
                      <Line
                        type="monotone"
                        dataKey="participation"
                        stroke="#ffc658"
                        name="Participation"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Incidents</CardTitle>
                    <CardDescription>
                      Behavior incidents for {selectedStudent.name}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Award className="h-4 w-4 mr-2" />
                    Add New Incident
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="w-full">Description</TableHead>
                      <TableHead>Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedStudent.incidents.map((incident, index) => (
                      <TableRow key={index}>
                        <TableCell>{incident.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              incident.type === "Merit"
                                ? "outline"
                                : "destructive"
                            }
                          >
                            {incident.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{incident.description}</TableCell>
                        <TableCell
                          className={
                            incident.points > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {incident.points > 0
                            ? `+${incident.points}`
                            : incident.points}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Behavioral Strengths & Weaknesses</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      outerRadius={90}
                      data={selectedStudent.categories}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar
                        name="Student Skills"
                        dataKey="score"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Merit & Demerit Trends</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { month: "Sep", merits: 2, demerits: 1 },
                        { month: "Oct", merits: 3, demerits: 2 },
                        { month: "Nov", merits: 2, demerits: 0 },
                        { month: "Dec", merits: 1, demerits: 1 },
                        { month: "Jan", merits: 4, demerits: 0 },
                        { month: "Feb", merits: 3, demerits: 0 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="merits"
                        stackId="a"
                        fill="#82ca9d"
                        name="Merits"
                      />
                      <Bar
                        dataKey="demerits"
                        stackId="a"
                        fill="#ff8042"
                        name="Demerits"
                      />
                    </BarChart>
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
                <CardTitle>Incident Distribution</CardTitle>
                <CardDescription>
                  Types of behavior incidents across all students
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incidentDistributionData}
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
                      {incidentDistributionData.map((entry, index) => (
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
                <CardTitle>Class Behavior Comparison</CardTitle>
                <CardDescription>
                  Average behavior scores by class
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "10-A", average: 90 },
                      { name: "10-B", average: 82 },
                      { name: "11-A", average: 88 },
                      { name: "11-B", average: 85 },
                      { name: "12-A", average: 92 },
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
                      name="Average Behavior Score"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Behavior Analytics</CardTitle>
              <CardDescription>
                Individual student behavior metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Participation</TableHead>
                    <TableHead>Conduct</TableHead>
                    <TableHead>Cooperation</TableHead>
                    <TableHead>Responsibility</TableHead>
                    <TableHead>Merits/Demerits</TableHead>
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
                        <Badge variant={getBadgeVariant(student.overallStatus)}>
                          {student.overallStatus}
                        </Badge>
                      </TableCell>
                      {student.categories.map((category) => (
                        <TableCell key={category.name}>
                          <div className="flex items-center gap-1">
                            {category.score}
                            {getTrendIcon(category.trend)}
                          </div>
                        </TableCell>
                      ))}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">
                            +{student.merits}
                          </span>
                          <span>/</span>
                          <span className="text-red-500">
                            -{student.demerits}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
