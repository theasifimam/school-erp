import { ArrowUp, BookOpen, ClipboardList, Clock, User } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";

const data = {
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

// Student Dashboard Component
export default function StudentDashboard({ darkMode }) {
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
            {data.schedule.map((cls, index) => (
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
              {data.assignmentsDue.map((assignment, index) => (
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
