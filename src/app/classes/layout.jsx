"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Plus,
  Download,
  Clock,
  BookOpen,
  Users,
  FileText,
  PenTool,
  LucideBookUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";

// This is the shared layout component for all curriculum pages
export default function ClassesCurriculumLayout({ children }) {
  const pathname = usePathname();

  // Define our tabs with their paths and icons
  const tabs = [
    {
      name: "Classes",
      path: "/classes",
      icon: <LucideBookUser className="mr-2 h-4 w-4" />,
    },
    {
      name: "Grades",
      path: "/classes/grades",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      name: "Timetable",
      path: "/classes/timetable",
      icon: <Clock className="mr-2 h-4 w-4" />,
    },
    {
      name: "Subjects",
      path: "/classes/subjects",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      name: "Lesson Plans",
      path: "/classes/lessons",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      name: "Curriculum Builder",
      path: "/classes/curriculum",
      icon: <PenTool className="mr-2 h-4 w-4" />,
    },
  ];

  // Function to check if a tab is active
  const isActiveTab = (path) => {
    if (path === "/classes" && pathname === "/classes") {
      return true;
    }
    return path !== "/classes" && pathname.startsWith(path);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Classes & Curriculum</h1>
          <p className="text-gray-500">
            Manage classes, timetables, subjects, lesson plans, and curriculum
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>

      {/* Navigation Tabs using shadcn */}
      <Tabs defaultValue={tabs[0].path} className="sticky top-3 z-10 mb-4">
        <TabsList className="">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.path} value={tab.path} asChild>
              <Link href={tab.path} className="flex items-center gap-2">
                {tab.icon}
                {tab.name}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Page Content */}
      {children}
    </div>
  );
}
