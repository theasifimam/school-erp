"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Calendar, Bell, Mail } from "lucide-react";
import Link from "next/link";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import ParentDashboard from "@/components/dashboard/ParentDashboard";

export default function SchoolDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentRole, setCurrentRole] = useState("admin"); // Default role is "admin"; // Change this to test different roles

  // Toggle between roles for demo purposes
  // const switchRole = () => {
  //   const roles: UserRole[] = ["admin", "teacher", "student", "parent"];
  //   const currentIndex = roles.indexOf(currentRole);
  //   const nextIndex = (currentIndex + 1) % roles.length;
  //   setCurrentRole(roles[nextIndex]);
  // };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "neutral-50 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      <div className="p-6">
        {/* Role-Specific Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {currentRole === "admin"
                ? "Administrator Dashboard"
                : currentRole === "teacher"
                ? "Teacher Portal"
                : currentRole === "student"
                ? "Student Dashboard"
                : "Parent Portal"}
            </h1>
            <p className="text-gray-500">
              {currentRole === "admin"
                ? "School management overview and analytics"
                : currentRole === "teacher"
                ? "Your classes and teaching resources"
                : currentRole === "student"
                ? "Your academic progress and schedule"
                : "Your children's academic information"}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <div className="hidden md:block">
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                  {currentRole === "admin"
                    ? "A"
                    : currentRole === "teacher"
                    ? "T"
                    : currentRole === "student"
                    ? "S"
                    : "P"}
                </div>
              </div>
              <Link href="/calendar">
                <Button variant="outline" className="rounded-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Role-Specific Dashboard Content */}
        {currentRole === "admin" && <AdminDashboard darkMode={darkMode} />}
        {currentRole === "teacher" && <TeacherDashboard darkMode={darkMode} />}
        {currentRole === "student" && <StudentDashboard darkMode={darkMode} />}
        {currentRole === "parent" && <ParentDashboard darkMode={darkMode} />}
      </div>
    </div>
  );
}
