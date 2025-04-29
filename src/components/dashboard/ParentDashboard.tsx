import { ArrowUp, ClipboardList, Mail, User, Users } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";

const data = {
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

// Parent Dashboard Component
export default function ParentDashboard({ darkMode }: { darkMode: boolean }) {
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
