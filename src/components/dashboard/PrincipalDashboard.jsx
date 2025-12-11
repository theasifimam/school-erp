import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  TrendingUp,
  Calendar,
  FileText,
  Award,
} from "lucide-react";

export default function PrincipalDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,245",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Faculty",
      value: "87",
      icon: GraduationCap,
      color: "text-green-600",
    },
    {
      title: "Academic Performance",
      value: "92%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Attendance Rate",
      value: "94%",
      icon: Calendar,
      color: "text-orange-600",
    },
  ];

  const recentActivities = [
    "Board meeting scheduled for Dec 15, 2025",
    "Annual sports day approved for Jan 10, 2026",
    "Budget proposal submitted to board",
    "New STEM lab inauguration planned",
  ];

  const pendingApprovals = [
    "Leave request from 3 teachers",
    "Budget approval for library renovation",
    "Student disciplinary case review",
    "New curriculum proposal from HODs",
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {pendingApprovals.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
