import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Bell, FileText, Info } from "lucide-react";

export default function DefaultDashboard() {
  const announcements = [
    {
      title: "School Assembly",
      date: "Dec 15, 2025",
      description: "Annual day celebration",
    },
    {
      title: "Holiday Notice",
      date: "Dec 25, 2025",
      description: "Christmas holiday",
    },
    {
      title: "Parent Meeting",
      date: "Dec 20, 2025",
      description: "Quarterly review",
    },
  ];

  const quickLinks = [
    {
      title: "View Calendar",
      icon: Calendar,
      description: "Check school events",
    },
    {
      title: "Announcements",
      icon: Bell,
      description: "View all announcements",
    },
    {
      title: "Documents",
      icon: FileText,
      description: "Access important files",
    },
    { title: "Help & Support", icon: Info, description: "Get assistance" },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Info className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome to Your Dashboard</h2>
              <p className="text-muted-foreground mt-1">
                Access your personalized information and school updates
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLinks.map((link, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <link.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{link.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {link.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {announcement.description}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-nowrap">
                    {announcement.date}
                  </div>
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
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No upcoming events at this time</p>
            <p className="text-sm mt-1">Check back later for updates</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
