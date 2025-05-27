import {
  ArrowUp,
  BookOpen,
  ClipboardList,
  Clock,
  User,
  Users,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";

export const data = {
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

// Teacher Dashboard Component
export default function TeacherDashboard() {
  const { theme } = useTheme();

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-900 shadow-sm">
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

        <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-900 shadow-sm">
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

        <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-900 shadow-sm">
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

        <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-900 shadow-sm">
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
        <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-900 shadow-sm">
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.classSchedule.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 pr-6 border rounded-full"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 rounded-full ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-100"
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
        <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-900 shadow-sm">
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
                  stroke={theme === "dark" ? "#374151" : "#E5E7EB"}
                />
                <XAxis
                  dataKey="name"
                  stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
                    borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
                    borderRadius: "1rem",
                  }}
                />
                <Bar
                  dataKey="students"
                  name="Students"
                  fill={theme === "dark" ? "white" : "#000000"} // bar color changed to black
                  radius={[26, 26, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Assignments to Grade */}
      <Card className="bg-white dark:bg-black border-gray-200 dark:border-gray-900 shadow-sm">
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
                <tr className={`border-b dark:border-gray-700 border-gray-200`}>
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
                    className={`border-b dark:border-gray-700 dark:hover:bg-gray-700
                        border-gray-200 hover:bg-gray-50`}
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
