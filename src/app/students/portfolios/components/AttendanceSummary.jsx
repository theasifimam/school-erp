import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

export default function AttendanceSummary() {
  const attendanceData = [
    { month: "September", present: 22, absent: 1, late: 2 },
    { month: "October", present: 20, absent: 3, late: 0 },
    { month: "November", present: 23, absent: 0, late: 1 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Attendance Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Overall Attendance</span>
            </div>
            <span className="font-bold">93%</span>
          </div>

          <div className="pt-4">
            <h4 className="text-sm font-medium mb-3">Monthly Breakdown</h4>
            <div className="space-y-3">
              {attendanceData.map((month, index) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between font-medium mb-1">
                    <span>{month.month}</span>
                    <span>
                      {Math.round(
                        (month.present / (month.present + month.absent)) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-xs">
                    <span>Present: {month.present}</span>
                    <span>Absent: {month.absent}</span>
                    <span>Late: {month.late}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
