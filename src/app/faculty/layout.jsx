"use client";

import React from "react";
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
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// This is the shared layout component for all curriculum pages
export default function ClassesCurriculumLayout({ children }) {
  const pathname = usePathname();

  // Define our tabs with their paths and icons
  const tabs = [
    {
      name: "Overview",
      path: "/faculty/all",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      name: "Assign Classes",
      path: "/faculty/assign",
      icon: <Clock className="mr-2 h-4 w-4" />,
    },
    {
      name: "Attendance",
      path: "/faculty/attendance",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      name: "Performance Review",
      path: "/faculty/performance",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      name: "Professional Development",
      path: "/faculty/development",
      icon: <PenTool className="mr-2 h-4 w-4" />,
    },
  ];

  // Function to check if a tab is active
  const isActiveTab = (path) => {
    if (path === "/faculty" && pathname === "/faculty") {
      return true;
    }
    return path !== "/faculty" && pathname.startsWith(path);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-indigo-600" />
            Faculties, Classes, Attendances and Performances
          </h1>
          <p className="text-gray-500">
            Manage faculty information and records
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
            className="rounded-full bg-black text-white"
            // onClick={() => {
            //   setSelectedUser(null);
            //   setAddStudent(true);
            // }}
          >
            Add Student
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6 sticky top-0 bg-gray-50 dark:bg-background">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            href={tab.path}
            className={cn(
              "px-4 py-2 flex items-center font-medium text-sm transition-colors focus:outline-none ",
              isActiveTab(tab.path)
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            )}
          >
            {tab.icon}
            {tab.name}
          </Link>
        ))}
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
}
