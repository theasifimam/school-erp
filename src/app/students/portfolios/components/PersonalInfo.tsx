import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, Calendar, Bookmark, Mail, Phone, Home } from "lucide-react";

export default function PersonalInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>student@school.edu</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Home className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p>123 School Street, Education City</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p>January 15, 2005</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Bookmark className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Student ID</p>
              <p>STU20230045</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
