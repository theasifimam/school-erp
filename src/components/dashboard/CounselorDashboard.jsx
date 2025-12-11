import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, FileText, TrendingUp } from "lucide-react";

export default function CounselorDashboard() {
  const stats = [
    { title: "Active Cases", value: "28", icon: Users, color: "text-blue-600" },
    {
      title: "Sessions Today",
      value: "5",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Pending Reports",
      value: "3",
      icon: FileText,
      color: "text-orange-600",
    },
    {
      title: "This Month",
      value: "47",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const todaySessions = [
    {
      time: "10:00 AM",
      student: "John Doe",
      class: "Class 10-A",
      type: "Academic",
    },
    {
      time: "11:30 AM",
      student: "Jane Smith",
      class: "Class 9-B",
      type: "Career",
    },
    {
      time: "02:00 PM",
      student: "Mike Wilson",
      class: "Class 11-C",
      type: "Personal",
    },
    {
      time: "03:30 PM",
      student: "Sarah Johnson",
      class: "Class 12-A",
      type: "College Prep",
    },
  ];

  const priorityCases = [
    {
      student: "Alex Brown",
      class: "Class 10-B",
      issue: "Academic stress",
      status: "Ongoing",
    },
    {
      student: "Emma Davis",
      class: "Class 11-A",
      issue: "Career guidance",
      status: "Follow-up",
    },
    {
      student: "Chris Lee",
      class: "Class 9-C",
      issue: "Social adjustment",
      status: "New",
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
              <Calendar className="h-5 w-5" />
              Today's Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySessions.map((session, index) => (
                <div key={index} className="p-2 border rounded">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <div className="font-medium text-sm">
                        {session.student}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {session.class}
                      </div>
                    </div>
                    <div className="text-xs font-medium text-blue-600">
                      {session.time}
                    </div>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                    {session.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Priority Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {priorityCases.map((caseItem, index) => (
                <div
                  key={index}
                  className="p-2 border rounded border-orange-200 bg-orange-50"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <div className="font-medium text-sm">
                        {caseItem.student}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {caseItem.class}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        caseItem.status === "New"
                          ? "bg-red-100 text-red-700"
                          : caseItem.status === "Follow-up"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {caseItem.status}
                    </span>
                  </div>
                  <div className="text-sm">{caseItem.issue}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
