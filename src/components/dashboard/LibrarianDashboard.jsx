import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, AlertTriangle, TrendingUp } from "lucide-react";

export default function LibrarianDashboard() {
  const stats = [
    {
      title: "Total Books",
      value: "8,542",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Books Issued",
      value: "342",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Overdue Books",
      value: "23",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "New Arrivals",
      value: "45",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const recentIssues = [
    { student: "John Doe", book: "Advanced Mathematics", due: "Dec 20, 2025" },
    {
      student: "Jane Smith",
      book: "Physics Fundamentals",
      due: "Dec 18, 2025",
    },
    {
      student: "Mike Wilson",
      book: "Chemistry Lab Manual",
      due: "Dec 22, 2025",
    },
    {
      student: "Sarah Johnson",
      book: "English Literature",
      due: "Dec 19, 2025",
    },
  ];

  const overdueList = [
    { student: "Alex Brown", book: "Biology Textbook", days: "5 days" },
    { student: "Emma Davis", book: "History of Science", days: "3 days" },
    { student: "Chris Lee", book: "World Geography", days: "7 days" },
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
              <BookOpen className="h-5 w-5" />
              Recent Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentIssues.map((issue, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-2 border rounded"
                >
                  <div>
                    <div className="font-medium text-sm">{issue.student}</div>
                    <div className="text-sm text-muted-foreground">
                      {issue.book}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {issue.due}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Overdue Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueList.map((overdue, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-2 border rounded border-red-200 bg-red-50"
                >
                  <div>
                    <div className="font-medium text-sm">{overdue.student}</div>
                    <div className="text-sm text-muted-foreground">
                      {overdue.book}
                    </div>
                  </div>
                  <div className="text-xs font-medium text-red-600">
                    {overdue.days}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
