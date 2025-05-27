"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Calendar,
  FileQuestion,
  GraduationCap,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  Download,
  Upload,
  Plus,
  Menu,
  X,
  Timer,
  Trophy,
  BookOpen,
  Target,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// This is the shared layout component for all examination pages
export default function ExaminationLayout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Define our examination tabs with their paths and icons
  const tabs = [
    {
      name: "Exam Schedule",
      path: "/examination/schedule",
      icon: <Calendar className="mr-2 h-4 w-4" />,
      shortName: "Schedule",
      description: "Manage exam dates and timetables",
    },
    {
      name: "Question Bank",
      path: "/examination/questions",
      icon: <FileQuestion className="mr-2 h-4 w-4" />,
      shortName: "Questions",
      description: "Create and organize exam questions",
    },
    {
      name: "Online Tests",
      path: "/examination/online-tests",
      icon: <GraduationCap className="mr-2 h-4 w-4" />,
      shortName: "Tests",
      description: "Conduct digital examinations",
    },
    {
      name: "Results",
      path: "/examination/results",
      icon: <Trophy className="mr-2 h-4 w-4" />,
      shortName: "Results",
      description: "View and manage exam results",
    },
    {
      name: "Students",
      path: "/examination/students",
      icon: <Users className="mr-2 h-4 w-4" />,
      shortName: "Students",
      description: "Manage student registrations",
    },
    {
      name: "Analytics",
      path: "/examination/analytics",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
      shortName: "Analytics",
      description: "Performance insights and reports",
    },
    {
      name: "Settings",
      path: "/examination/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      shortName: "Settings",
      description: "Configure exam parameters",
    },
  ];

  // Quick stats for dashboard display
  const quickStats = [
    {
      label: "Active Exams",
      value: "12",
      icon: Timer,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Total Students",
      value: "248",
      icon: Users,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Completed Tests",
      value: "156",
      icon: CheckCircle,
      color: "text-purple-600 bg-purple-50",
    },
    {
      label: "Pending Results",
      value: "8",
      icon: AlertCircle,
      color: "text-orange-600 bg-orange-50",
    },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Function to check if a tab is active
  const isActiveTab = (path) => {
    if (path === "/examination" && pathname === "/examination") {
      return true;
    }
    return path !== "/examination" && pathname.startsWith(path);
  };

  // Get current active tab
  const activeTab = tabs.find((tab) => isActiveTab(tab.path));

  // Mobile Navigation Component with Bottom Sheet
  const MobileNavigation = () => (
    <div className="md:hidden">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-50 shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-gray-900">
            Examination Portal
          </h1>
          <p className="text-xs text-gray-500">
            {activeTab ? activeTab.name : "Dashboard"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Quick Stats Bar for Mobile */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {quickStats.slice(0, 2).map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-sm min-w-fit"
            >
              <div className={cn("p-1.5 rounded-md", stat.color)}>
                <stat.icon className="h-3 w-3" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sheet Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-all duration-300 ease-out z-50",
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        {/* Bottom Sheet Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Bottom Sheet Header */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Navigation</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Choose a section to navigate
          </p>
        </div>

        {/* Navigation Items */}
        <div className="px-6 pb-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 gap-3">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                href={tab.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-4 rounded-xl font-medium text-sm transition-all duration-200 border-2",
                  isActiveTab(tab.path)
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 active:bg-gray-100 border-transparent hover:border-gray-200"
                )}
              >
                <div
                  className={cn(
                    "p-2.5 rounded-lg mr-3 transition-colors",
                    isActiveTab(tab.path)
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  {React.cloneElement(tab.icon, {
                    className: "h-5 w-5",
                    style: { margin: 0 },
                  })}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{tab.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {tab.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="justify-start gap-3 h-14 text-left border-2 hover:border-green-200 hover:bg-green-50"
              >
                <div className="p-2 bg-green-100 rounded-lg">
                  <Plus className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Create Exam</div>
                  <div className="text-xs text-gray-500">
                    Schedule new examination
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-3 h-14 text-left border-2 hover:border-purple-200 hover:bg-purple-50"
              >
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Download className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Export Results</div>
                  <div className="text-xs text-gray-500">Download reports</div>
                </div>
              </Button>
              <Button className="justify-start gap-3 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-left border-0">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-sm">Start Online Test</div>
                  <div className="text-xs text-white text-opacity-80">
                    Begin examination session
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Safe area for devices with home indicator */}
        <div className="h-6 bg-white"></div>
      </div>
    </div>
  );

  // Desktop Navigation Component
  const DesktopNavigation = () => (
    <div className="hidden md:block">
      {/* Desktop Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8 gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Examination Management System
          </h1>
          <p className="text-gray-600 text-base lg:text-lg">
            Comprehensive platform for managing exams, assessments, and student
            evaluations
          </p>
        </div>

        {/* Desktop Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="outline"
            className="rounded-full gap-2 text-sm hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export Data</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-full gap-2 text-sm hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Import Questions</span>
          </Button>
          <Button className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm hover:from-blue-700 hover:to-indigo-700 gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Exam</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-full px-6 py-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
              <div className={cn("p-3 rounded-full", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Navigation Tabs */}
      {/* Navigation Tabs */}
      <div className="flex border-b mb-6 bg-gray-50 dark:bg-background">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            href={tab.path}
            className={cn(
              "px-4 py-2 flex items-center sticky top-0 font-medium text-sm transition-colors",
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
    </div>
  );

  return (
    <div className="container mx-auto">
      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Desktop Navigation */}
      <DesktopNavigation />

      {/* Page Content */}
      <div className="px-4 md:px-0 pb-20 md:pb-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 min-h-[600px]">
          {children}
        </div>
      </div>
    </div>
  );
}
