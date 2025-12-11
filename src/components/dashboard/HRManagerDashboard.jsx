import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, FileText, Calendar } from "lucide-react";

export default function HRManagerDashboard() {
  const stats = [
    {
      title: "Total Employees",
      value: "124",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Present Today",
      value: "118",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "Leave Requests",
      value: "7",
      icon: FileText,
      color: "text-orange-600",
    },
    {
      title: "Interviews Scheduled",
      value: "3",
      icon: Calendar,
      color: "text-purple-600",
    },
  ];

  const leaveRequests = [
    {
      name: "Dr. Smith",
      department: "Science",
      type: "Sick Leave",
      days: "2 days",
      date: "Dec 15-16",
    },
    {
      name: "Prof. Johnson",
      department: "Math",
      type: "Casual Leave",
      days: "1 day",
      date: "Dec 18",
    },
    {
      name: "Mrs. Williams",
      department: "English",
      type: "Personal",
      days: "3 days",
      date: "Dec 20-22",
    },
  ];

  const upcomingInterviews = [
    {
      candidate: "Michael Brown",
      position: "Chemistry Teacher",
      time: "10:00 AM",
      date: "Dec 13",
    },
    {
      candidate: "Sarah Wilson",
      position: "Physics Teacher",
      time: "02:00 PM",
      date: "Dec 14",
    },
    {
      candidate: "David Martinez",
      position: "Lab Assistant",
      time: "11:00 AM",
      date: "Dec 15",
    },
  ];

  const recentHires = [
    { name: "Emily Clark", position: "Math Teacher", joinDate: "Dec 1, 2025" },
    {
      name: "James Anderson",
      position: "Sports Coach",
      joinDate: "Dec 5, 2025",
    },
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
              Pending Leave Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaveRequests.map((request, index) => (
                <div key={index} className="p-2 border rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{request.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {request.department}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {request.date}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-1 text-xs">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      {request.type}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {request.days}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingInterviews.map((interview, index) => (
                <div
                  key={index}
                  className="p-2 border rounded border-purple-200 bg-purple-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">
                        {interview.candidate}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {interview.position}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">
                        {interview.time}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {interview.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recent Hires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recentHires.map((hire, index) => (
              <div key={index} className="p-3 border rounded">
                <div className="font-medium">{hire.name}</div>
                <div className="text-sm text-muted-foreground">
                  {hire.position}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Joined: {hire.joinDate}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
