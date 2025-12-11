import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, UserCheck, Calendar, AlertCircle } from "lucide-react";

export default function VicePrincipalDashboard() {
  const stats = [
    {
      title: "Daily Attendance",
      value: "96%",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "Pending Tasks",
      value: "12",
      icon: ClipboardCheck,
      color: "text-blue-600",
    },
    {
      title: "Events This Week",
      value: "5",
      icon: Calendar,
      color: "text-purple-600",
    },
    { title: "Alerts", value: "3", icon: AlertCircle, color: "text-red-600" },
  ];

  const todaySchedule = [
    { time: "09:00 AM", task: "Morning assembly coordination" },
    { time: "11:00 AM", task: "Parent-teacher meeting" },
    { time: "02:00 PM", task: "Faculty review session" },
    { time: "04:00 PM", task: "Department heads meeting" },
  ];

  const alerts = [
    "3 students absent for 3+ consecutive days",
    "Exam schedule needs final approval",
    "Security drill scheduled for tomorrow",
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
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-sm font-medium text-muted-foreground min-w-[80px]">
                    {item.time}
                  </div>
                  <div className="text-sm">{item.task}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Important Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {alerts.map((alert, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5" />
                  <span>{alert}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
