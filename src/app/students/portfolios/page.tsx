import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, BookOpen, Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with your actual data fetching
const students = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/avatars/alex.jpg",
    grade: "Grade 11",
    gpa: 3.8,
    subjects: ["Math", "Physics", "Chemistry"],
    awards: ["Science Fair Winner", "Math Olympiad Finalist"],
  },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "/avatars/maria.jpg",
    grade: "Grade 12",
    gpa: 4.0,
    subjects: ["Biology", "Literature", "History"],
    awards: ["Debate Champion", "National Merit Scholar"],
  },
  {
    id: 3,
    name: "Jamal Williams",
    avatar: "/avatars/jamal.jpg",
    grade: "Grade 10",
    gpa: 3.5,
    subjects: ["Computer Science", "Algebra", "Spanish"],
    awards: ["Robotics Competition Winner"],
  },
  {
    id: 4,
    name: "Sophia Chen",
    avatar: "/avatars/sophia.jpg",
    grade: "Grade 12",
    gpa: 3.9,
    subjects: ["Calculus", "Economics", "Art"],
    awards: ["Art Exhibition Gold Medal", "Student Council President"],
  },
];

export default function StudentsPortfoliosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Students Portfolios</h1>
          <p className="text-muted-foreground">
            Browse and manage student portfolios
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search students..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {students.map((student) => (
          <StudentPortfolioCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

function StudentPortfolioCard({ student }: { student: (typeof students)[0] }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={student.avatar} alt={student.name} />
          <AvatarFallback>
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{student.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{student.grade}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-primary" />
          <span>
            GPA: <strong>{student.gpa}</strong>
          </span>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Subjects:</p>
          <div className="flex flex-wrap gap-1">
            {student.subjects.map((subject, i) => (
              <Badge key={i} variant="outline">
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        {student.awards.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1 flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              Awards:
            </p>
            <ul className="text-sm space-y-1">
              {student.awards.map((award, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-muted-foreground mr-1">•</span>
                  {award}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <a href={`/students/portfolios/${student.id}`}>View Portfolio</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
