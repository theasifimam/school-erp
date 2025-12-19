import {
  ArrowUp,
  BookOpen,
  CreditCard,
  FileText,
  GraduationCap,
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
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip as RechartsTooltip } from "recharts";

// Sample data for different roles
const data = {
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
    { name: "Paid", value: 75, color: "hsl(142.1 76.2% 36.3%)" },
    { name: "Pending", value: 25, color: "hsl(24.6 95% 53.1%)" },
  ],
};

// Admin Dashboard Component
export default function AdminDashboard({ darkMode }) {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Students
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {data.students}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-primary flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                5.2%
              </span>{" "}
              vs last term
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Teachers
            </CardTitle>
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {data.teachers}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-primary flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                2.1%
              </span>{" "}
              vs last term
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Classes
            </CardTitle>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {data.classes}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-primary flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                3.5%
              </span>{" "}
              vs last term
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${data.revenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-primary flex items-center">
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
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Attendance Trend</CardTitle>
            <CardDescription className="text-muted-foreground">
              Monthly attendance percentage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data.attendanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  axisLine={false}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.5rem",
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="present"
                  name="Present %"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="absent"
                  name="Absent %"
                  fill="hsl(var(--destructive))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Collection Chart */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Fee Collection</CardTitle>
            <CardDescription className="text-muted-foreground">
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
                  {data.feeCollection.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.5rem",
                    color: "hsl(var(--foreground))",
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
      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">
            Recent School Activities
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Latest events and notifications
          </CardDescription>
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
                <div className="p-2 rounded-lg bg-secondary">
                  <FileText className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {activity.action}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.details}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
