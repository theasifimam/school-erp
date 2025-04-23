"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AcademicPerformance() {
  const subjects = [
    { name: "Mathematics", grade: "A", progress: 90 },
    { name: "Science", grade: "B+", progress: 85 },
    { name: "History", grade: "A-", progress: 88 },
    { name: "English", grade: "A", progress: 92 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Academic Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">GPA</span>
            </div>
            <span className="font-bold">3.8 / 4.0</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Rank</span>
            </div>
            <span className="font-bold">Top 15%</span>
          </div>

          <div className="pt-4">
            <h4 className="text-sm font-medium mb-3">Subject Grades</h4>
            <div className="space-y-3">
              {subjects.map((subject, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{subject.name}</span>
                    <span className="font-medium">{subject.grade}</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
