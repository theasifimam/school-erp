import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, FileText, TrendingUp } from "lucide-react";

export default function HODDashboard() {
  const stats = [
    {
      title: "Department Faculty",
      value: "12",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Courses",
      value: "24",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Pending Reviews",
      value: "8",
      icon: FileText,
      color: "text-orange-600",
    },
    {
      title: "Dept. Performance",
      value: "88%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const facultyPerformance = [
    { name: "Dr. Smith", courses: 3, rating: "4.8/5" },
    { name: "Prof. Johnson", courses: 2, rating: "4.6/5" },
    { name: "Dr. Williams", courses: 3, rating: "4.9/5" },
    { name: "Prof. Brown", courses: 2, rating: "4.7/5" },
  ];

  const upcomingTasks = [
    "Submit quarterly report by Dec 20",
    "Faculty performance review meeting",
    "Curriculum update for next semester",
    "Department budget planning",
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
              <Users className="h-5 w-5" />
              Faculty Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {facultyPerformance.map((faculty, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <div>
                    <div className="font-medium">{faculty.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {faculty.courses} courses
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    {faculty.rating}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
