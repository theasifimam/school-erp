"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clock,
  BookOpen,
  Users,
  FileText,
  PenTool,
  DownloadIcon,
  Upload,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import StudentFormModal from "@/app/students/components/StudentFormModal";
import { useDraftStatus, clearDraftFromStorage } from "@/lib/utils/draft.utils";

// This is the shared layout component for all curriculum pages
export default function StudentsLayout({ children }) {
  const pathname = usePathname();
  const [addStudent, setAddStudent] = useState(false);

  // Use the draft status hook
  const { draftExists, draftInfo, refresh } = useDraftStatus();

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

  // Check if there's any existing form data
  const hasExistingData = () => {
    return draftExists;
  };

  // Handle opening the add student modal
  const handleAddStudent = () => {
    setAddStudent(true);
  };

  // Handle starting a new application (clearing existing data)
  const handleStartNewApplication = () => {
    const result = clearDraftFromStorage();
    if (result.success) {
      refresh(); // Refresh the draft status
      setAddStudent(true);
      toast.success("Started new application");
    } else {
      toast.error("Failed to start new application");
    }
  };

  // Handle modal close
  const handleModalClose = (submittedData) => {
    if (submittedData) {
      console.log("Student application submitted:", submittedData);

      if (submittedData.referenceNumber) {
        // Application was successfully submitted to backend
        toast.success("Application submitted successfully!", {
          description: `Reference Number: ${submittedData.referenceNumber}`,
          duration: 5000,
        });
      } else if (submittedData.submitted) {
        toast.success("Student added successfully!");
      }

      // Trigger refresh of student list if needed
      // You can emit a custom event or call a callback here
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("studentAdded", { detail: submittedData })
        );
      }

      // Update draft status
      refresh();
    }
    setAddStudent(false);
  };

  // Mock fetchStudents function - replace with your actual implementation
  const fetchStudents = () => {
    // This should be your actual fetch function
    console.log("Fetching students...");
    // You might want to refresh the current page data or call a parent callback
  };

  return (
    <div className="mx-auto container">
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

          {/* Show different button based on existing data */}
          {hasExistingData() ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
                onClick={handleAddStudent}
              >
                <AlertCircle className="h-4 w-4 mr-1" />
                Continue Draft
              </Button>
              <Button
                variant="primary"
                className="bg-black text-white"
                onClick={handleStartNewApplication}
              >
                New Application
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              className="bg-black text-white"
              onClick={handleAddStudent}
            >
              Add Student
            </Button>
          )}
        </div>
      </div>

      {/* Show draft notification if there's existing data */}
      {hasExistingData() && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-50 rounded-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-orange-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-orange-800">
                  Incomplete Application Draft
                </p>
                <p className="text-xs text-orange-600">
                  {draftInfo.lastSaved
                    ? `Last saved: ${draftInfo.lastSaved.toLocaleString()}`
                    : "You have an unsaved application. Continue where you left off or start fresh."}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-orange-700 dark:text-orange-400 border-orange-300 dark:bg-orange-100 hover:bg-orange-100"
                onClick={handleAddStudent}
              >
                Continue
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleStartNewApplication}
                class="dark:bg-orange-900 px-3 bg-orange-800 text-white hover:bg-orange-600 rounded-full"
              >
                Start New
              </Button>
            </div>
          </div>
        </div>
      )}

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

      {/* Integrated Student Form Modal */}
      <StudentFormModal
        isOpen={addStudent}
        onClose={handleModalClose}
        studentData={null}
        mode="add"
        enableDraftSaving={true} // Enable localStorage draft saving
      />
    </div>
  );
}
