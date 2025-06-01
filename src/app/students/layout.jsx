"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Clock,
  BookOpen,
  Users,
  FileText,
  PenTool,
  DownloadIcon,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StudentFormModal from "@/components/students/StudentFormModal";

// This is the shared layout component for all curriculum pages
export default function ClassesCurriculumLayout({ children }) {
  const pathname = usePathname();
  const [addStudent, setAddStudent] = useState(false);

  // Define our tabs with their paths and icons
  const tabs = [
    {
      name: "Overview",
      path: "/students/all",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      name: "Admissions",
      path: "/students/admissions",
      icon: <Clock className="mr-2 h-4 w-4" />,
    },
    {
      name: "Attendance",
      path: "/students/attendance",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      name: "Behavior Records",
      path: "/students/behavior",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      name: "Student Portfolio",
      path: "/students/portfolios",
      icon: <PenTool className="mr-2 h-4 w-4" />,
    },
  ];

  // Function to check if a tab is active
  const isActiveTab = (path) => {
    if (path === "/students" && pathname === "/students") {
      return true;
    }
    return path !== "/students" && pathname.startsWith(path);
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center my-6">
        <div>
          <h1 className="text-2xl font-bold">Student Management</h1>
          <p className="text-gray-500">
            Manage all student records and applications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full gap-1">
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="rounded-full gap-1">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button
            variant="primary"
            className="bg-black text-white"
            onClick={() => {
              setAddStudent(true);
            }}
          >
            Add Student
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

      <StudentFormModal
        isOpen={addStudent}
        onClose={() => setAddStudent(false)}
        onSuccess={() => {
          setAddStudent(false);
          fetchStudents();
        }}
      />
    </div>
  );
}
