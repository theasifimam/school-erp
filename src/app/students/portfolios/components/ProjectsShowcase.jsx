import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Github, Link } from "lucide-react";

export default function ProjectsShowcase() {
  const projects = [
    {
      title: "Science Fair Project",
      description: "Research on renewable energy sources and their efficiency",
      date: "November 2023",
      link: "#",
      github: "#",
    },
    {
      title: "History Research Paper",
      description: "Analysis of economic factors in ancient civilizations",
      date: "October 2023",
      link: "#",
      github: null,
    },
    {
      title: "Math Modeling Project",
      description: "Statistical analysis of sports performance data",
      date: "December 2023",
      link: "#",
      github: "#",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects & Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {project.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
