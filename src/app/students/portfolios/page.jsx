"use client";

import { useEffect, useState } from "react";
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
  BookOpen,
  Calendar,
  FileText,
  Folder,
  GraduationCap,
  Medal,
  PieChart as PieChartIcon,
  Search,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchParams, useRouter } from "next/navigation";

// Sample data
const students = [
  {
    id: "s101",
    name: "Alex Johnson",
    avatar: "/avatars/student1.jpg",
    grade: "10-A",
    gpa: 3.8,
    status: "Honor Roll",
    statusTrend: "improving",
    achievements: 15,
    projects: 8,
    subjectScores: [
      { name: "Mathematics", score: 92, trend: "up" },
      { name: "Science", score: 88, trend: "up" },
      { name: "English", score: 90, trend: "stable" },
      { name: "History", score: 85, trend: "stable" },
      { name: "Art", score: 94, trend: "up" },
    ],
    portfolioItems: [
      {
        date: "2025-03-12",
        type: "Project",
        title: "Ecosystem Research Paper",
        description: "Research on local forest ecosystem",
        grade: "A",
      },
      {
        date: "2025-03-15",
        type: "Award",
        title: "Science Fair First Place",
        description: "Water purification experiment",
        grade: "N/A",
      },
      {
        date: "2025-04-01",
        type: "Project",
        title: "Historical Analysis Essay",
        description: "Analysis of Industrial Revolution",
        grade: "A-",
      },
      {
        date: "2025-04-10",
        type: "Competition",
        title: "Math Olympiad",
        description: "Regional finalist",
        grade: "N/A",
      },
    ],
  },
  {
    id: "s102",
    name: "Maria Garcia",
    avatar: "/avatars/student2.jpg",
    grade: "10-A",
    gpa: 4.0,
    status: "Distinguished Scholar",
    statusTrend: "stable",
    achievements: 22,
    projects: 10,
    subjectScores: [
      { name: "Mathematics", score: 98, trend: "stable" },
      { name: "Science", score: 96, trend: "stable" },
      { name: "English", score: 97, trend: "up" },
      { name: "History", score: 100, trend: "stable" },
      { name: "Art", score: 95, trend: "stable" },
    ],
    portfolioItems: [
      {
        date: "2025-02-28",
        type: "Competition",
        title: "Debate Tournament",
        description: "First place in regional championship",
        grade: "N/A",
      },
      {
        date: "2025-03-10",
        type: "Project",
        title: "Novel Analysis",
        description: "Critical analysis of 'To Kill a Mockingbird'",
        grade: "A+",
      },
      {
        date: "2025-03-25",
        type: "Award",
        title: "Perfect Attendance",
        description: "Full academic year",
        grade: "N/A",
      },
      {
        date: "2025-04-05",
        type: "Project",
        title: "Advanced Chemistry Research",
        description: "Study on sustainable polymers",
        grade: "A+",
      },
    ],
  },
  {
    id: "s103",
    name: "Jamie Smith",
    avatar: "/avatars/student3.jpg",
    grade: "10-B",
    gpa: 3.2,
    status: "Developing",
    statusTrend: "improving",
    achievements: 8,
    projects: 6,
    subjectScores: [
      { name: "Mathematics", score: 75, trend: "up" },
      { name: "Science", score: 78, trend: "up" },
      { name: "English", score: 85, trend: "stable" },
      { name: "History", score: 80, trend: "up" },
      { name: "Art", score: 90, trend: "up" },
    ],
    portfolioItems: [
      {
        date: "2025-02-15",
        type: "Project",
        title: "Short Story Collection",
        description: "Series of original short stories",
        grade: "B+",
      },
      {
        date: "2025-02-27",
        type: "Award",
        title: "Most Improved - English",
        description: "Recognized for significant improvement",
        grade: "N/A",
      },
      {
        date: "2025-03-05",
        type: "Project",
        title: "Algebra Portfolio",
        description: "Application of algebraic concepts",
        grade: "B",
      },
      {
        date: "2025-03-20",
        type: "Competition",
        title: "Art Exhibition",
        description: "Featured in school exhibition",
        grade: "N/A",
      },
    ],
  },
  {
    id: "s104",
    name: "Daniel Lee",
    avatar: "/avatars/student4.jpg",
    grade: "10-A",
    gpa: 3.9,
    status: "Honor Roll",
    statusTrend: "improving",
    achievements: 18,
    projects: 9,
    subjectScores: [
      { name: "Mathematics", score: 95, trend: "up" },
      { name: "Science", score: 93, trend: "up" },
      { name: "English", score: 87, trend: "stable" },
      { name: "History", score: 89, trend: "stable" },
      { name: "Art", score: 92, trend: "up" },
    ],
    portfolioItems: [
      {
        date: "2025-03-02",
        type: "Project",
        title: "Robotics Design",
        description: "Autonomous robot for environmental cleanup",
        grade: "A",
      },
      {
        date: "2025-03-15",
        type: "Competition",
        title: "Coding Challenge",
        description: "Second place in state competition",
        grade: "N/A",
      },
      {
        date: "2025-03-28",
        type: "Project",
        title: "Physics Research Paper",
        description: "Study on renewable energy applications",
        grade: "A",
      },
      {
        date: "2025-04-10",
        type: "Award",
        title: "STEM Excellence Award",
        description: "Recognized for outstanding achievement",
        grade: "N/A",
      },
    ],
  },
  {
    id: "s105",
    name: "Sophia Williams",
    avatar: "/avatars/student5.jpg",
    grade: "10-B",
    gpa: 3.7,
    status: "Honor Roll",
    statusTrend: "stable",
    achievements: 14,
    projects: 7,
    subjectScores: [
      { name: "Mathematics", score: 88, trend: "stable" },
      { name: "Science", score: 86, trend: "stable" },
      { name: "English", score: 94, trend: "up" },
      { name: "History", score: 92, trend: "stable" },
      { name: "Art", score: 95, trend: "up" },
    ],
    portfolioItems: [
      {
        date: "2025-02-18",
        type: "Project",
        title: "Documentary Film",
        description: "Short documentary on local history",
        grade: "A",
      },
      {
        date: "2025-03-05",
        type: "Competition",
        title: "Creative Writing Contest",
        description: "First place in poetry category",
        grade: "N/A",
      },
      {
        date: "2025-03-22",
        type: "Project",
        title: "Global Studies Presentation",
        description: "Analysis of international trade policies",
        grade: "A-",
      },
      {
        date: "2025-04-08",
        type: "Award",
        title: "Arts Achievement Award",
        description: "Excellence in visual and performing arts",
        grade: "N/A",
      },
    ],
  },
  {
    id: "s106",
    name: "Noah Chen",
    avatar: "/avatars/student6.jpg",
    grade: "10-A",
    gpa: 3.5,
    status: "Achievement",
    statusTrend: "improving",
    achievements: 10,
    projects: 8,
    subjectScores: [
      { name: "Mathematics", score: 90, trend: "up" },
      { name: "Science", score: 85, trend: "stable" },
      { name: "English", score: 82, trend: "up" },
      { name: "History", score: 78, trend: "up" },
      { name: "Art", score: 88, trend: "stable" },
    ],
    portfolioItems: [
      {
        date: "2025-02-22",
        type: "Project",
        title: "Mobile App Development",
        description: "Study scheduler application",
        grade: "A-",
      },
      {
        date: "2025-03-10",
        type: "Competition",
        title: "Science Bowl",
        description: "Team placed third in regional competition",
        grade: "N/A",
      },
      {
        date: "2025-03-28",
        type: "Project",
        title: "Statistical Analysis Study",
        description: "Survey of student study habits",
        grade: "B+",
      },
      {
        date: "2025-04-12",
        type: "Award",
        title: "Technology Innovation Award",
        description: "For creative use of technology",
        grade: "N/A",
      },
    ],
  },
];

const categories = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Art",
  "All Subjects",
];

const classes = [
  "01-A",
  "01-B",
  "02-A",
  "02-B",
  "03-A",
  "03-B",
  "04-A",
  "04-B",
  "05-A",
  "05-B",
  "06-A",
  "06-B",
  "07-A",
  "07-B",
  "08-A",
  "08-B",
  "09-A",
  "09-B",
  "10-A",
  "10-B",
  "11-A",
  "11-B",
  "12-A",
  "12-B",
];

const portfolioTypeDistribution = [
  { name: "Projects", value: 32 },
  { name: "Awards", value: 24 },
  { name: "Competitions", value: 18 },
  { name: "Research", value: 15 },
  { name: "Community Service", value: 11 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const academicProgressData = [
  { month: "Sep", gpa: 3.2, projects: 2, achievements: 1 },
  { month: "Oct", gpa: 3.3, projects: 3, achievements: 2 },
  { month: "Nov", gpa: 3.4, projects: 2, achievements: 3 },
  { month: "Dec", gpa: 3.5, projects: 4, achievements: 2 },
  { month: "Jan", gpa: 3.6, projects: 3, achievements: 4 },
  { month: "Feb", gpa: 3.7, projects: 5, achievements: 3 },
  { month: "Mar", gpa: 3.8, projects: 4, achievements: 5 },
  { month: "Apr", gpa: 3.9, projects: 6, achievements: 4 },
];
const tabs = ["overview", "portfolio", "analytics"];

export default function StudentPortfoliosPage() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [selectedCategory, setSelectedCategory] = useState("All Subjects");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryTab = searchParams.get("tab") || "overview";
  const [tab, setTab] = useState(queryTab);

  const handleTabChange = (value) => {
    setTab(value);
    const newParams = new URLSearchParams(Array.from(searchParams.entries())); // clone current params
    newParams.set("tab", value);
    router.push(`?${newParams.toString()}`);
  };

  // Sync state with search params on initial render
  useEffect(() => {
    if (tabs.includes(queryTab)) {
      setTab(queryTab);
    }
  }, [queryTab]);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(selectedClass.toLowerCase())
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
      case "Distinguished Scholar":
        return "default";
      case "Honor Roll":
        return "secondary";
      case "Achievement":
        return "outline";
      case "Developing":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPortfolioItemIcon = (type) => {
    switch (type) {
      case "Project":
        return <Folder className="h-4 w-4 text-blue-500" />;
      case "Award":
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case "Competition":
        return <Medal className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-10 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Student Portfolios</h1>
          <p className="text-gray-600">
            Showcase of student achievements and academic progress
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
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedClass}
            onValueChange={(value) => setSelectedClass(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {"Grade " + grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        defaultValue={tab}
        value={tab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Directory</CardTitle>
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
                        <Badge variant={getBadgeVariant(student.status)}>
                          {student.status}
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
                        {selectedStudent.statusTrend === "improving"
                          ? "Performance improving"
                          : selectedStudent.statusTrend === "declining"
                          ? "Performance declining"
                          : "Performance stable"}
                      </CardDescription>
                    </div>
                    <Button className="rounded-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Portfolio Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Academic Status
                      </h3>
                      <div className="text-xl font-bold">
                        {selectedStudent.status}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">GPA</h3>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(selectedStudent.gpa / 4) * 100}
                          className="h-2"
                        />
                        <span className="text-sm font-medium">
                          {selectedStudent.gpa}/4.0
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Portfolio</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">
                            {selectedStudent.achievements}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Folder className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">
                            {selectedStudent.projects}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium mb-3">
                    Academic Performance
                  </h3>
                  <div className="space-y-4">
                    {selectedStudent.subjectScores
                      .filter(
                        (subject) =>
                          selectedCategory === "All Subjects" ||
                          subject.name === selectedCategory
                      )
                      .map((subject) => (
                        <div key={subject.name} className="flex items-center">
                          <div className="w-32">
                            <p className="text-sm">{subject.name}</p>
                          </div>
                          <div className="flex-1 flex items-center gap-2">
                            <Progress value={subject.score} className="h-2" />
                            <div className="w-16 flex justify-between">
                              <span className="text-sm font-medium">
                                {subject.score}/100
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
                  <CardTitle>Academic Progress</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={academicProgressData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" domain={[0, 5]} />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 10]}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="gpa"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="GPA"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="projects"
                        stroke="#82ca9d"
                        name="Projects"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="achievements"
                        stroke="#ffc658"
                        name="Achievements"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Portfolio Showcase</CardTitle>
                    <CardDescription>
                      Academic work and achievements for {selectedStudent.name}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Folder className="h-4 w-4 mr-2" />
                    Add Portfolio Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="w-full">
                        Title & Description
                      </TableHead>
                      <TableHead>Grade/Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedStudent.portfolioItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {getPortfolioItemIcon(item.type)}
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.grade !== "N/A" ? (
                            <span className="font-medium">{item.grade}</span>
                          ) : (
                            <Badge variant="secondary">Recognition</Badge>
                          )}
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
                  <CardTitle>Academic Strengths</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      outerRadius={90}
                      data={selectedStudent.subjectScores}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar
                        name="Subject Performance"
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
                  <CardTitle>Portfolio Growth</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          semester: "Fall '23",
                          projects: 2,
                          awards: 1,
                          competitions: 1,
                        },
                        {
                          semester: "Spring '24",
                          projects: 3,
                          awards: 2,
                          competitions: 2,
                        },
                        {
                          semester: "Fall '24",
                          projects: 4,
                          awards: 3,
                          competitions: 2,
                        },
                        {
                          semester: "Spring '25",
                          projects: 5,
                          awards: 3,
                          competitions: 3,
                        },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="semester" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="projects" fill="#8884d8" name="Projects" />
                      <Bar dataKey="awards" fill="#82ca9d" name="Awards" />
                      <Bar
                        dataKey="competitions"
                        fill="#ffc658"
                        name="Competitions"
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
                <CardTitle>Portfolio Item Distribution</CardTitle>
                <CardDescription>
                  Types of portfolio items across all students
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioTypeDistribution}
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
                      {portfolioTypeDistribution.map((entry, index) => (
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
                <CardTitle>Class GPA Comparison</CardTitle>
                <CardDescription>Average GPA by class</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "10-A", average: 3.7 },
                      { name: "10-B", average: 3.4 },
                      { name: "11-A", average: 3.6 },
                      { name: "11-B", average: 3.5 },
                      { name: "12-A", average: 3.8 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[3.0, 4.0]} />
                    <Tooltip />
                    <Bar dataKey="average" fill="#8884d8" name="Average GPA" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Student Portfolio Analytics</CardTitle>
              <CardDescription>
                Individual student academic metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Achievements</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Top Subject</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const topSubject = student.subjectScores.reduce(
                      (max, subject) =>
                        subject.score > max.score ? subject : max,
                      student.subjectScores[0]
                    );

                    return (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-500">
                                Grade {student.grade}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{student.gpa}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(student.status)}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span>{student.achievements}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Folder className="h-4 w-4 text-blue-500" />
                            <span>{student.projects}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">
                              {topSubject.name}
                            </span>
                            <span className="text-sm">{topSubject.score}%</span>
                            {getTrendIcon(topSubject.trend)}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                Showing {students.length} students in total
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm">Class Average GPA: 3.7</span>
                </div>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Analytics
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Portfolio Summary</h2>
            <p className="text-sm text-gray-500">
              Last updated: April 24, 2025
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Spring Semester</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{students.length} Students</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span className="text-sm">10 Teachers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
