"use client";

import React, { useState, useEffect } from "react";
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
  GitGraph,
  LineChart,
  CircleUserIcon,
  UsersRound,
  BookPlus,
  Menu,
  X,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This is the shared layout component for all curriculum pages
export default function ClassesCurriculumLayout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Define our tabs with their paths and icons
  const tabs = [
    {
      name: "Library Books",
      path: "/library/books",
      icon: <BookPlus className="mr-2 h-4 w-4" />,
      shortName: "Books",
    },
    {
      name: "Books Issue",
      path: "/library/issue-book",
      icon: <Clock className="mr-2 h-4 w-4" />,
      shortName: "Issues",
    },
    {
      name: "Books Returns",
      path: "/library/return-book",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      shortName: "Returns",
    },
    {
      name: "Students",
      path: "/library/students",
      icon: <UsersRound className="mr-2 h-4 w-4" />,
      shortName: "Students",
    },
    {
      name: "Analytics",
      path: "/library/analytics",
      icon: <LineChart className="mr-2 h-4 w-4" />,
      shortName: "Analytics",
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
    if (path === "/library" && pathname === "/library") {
      return true;
    }
    return path !== "/library" && pathname.startsWith(path);
  };

  // Get current active tab
  const activeTab = tabs.find((tab) => isActiveTab(tab.path));

  // Mobile Navigation Component with Bottom Sheet
  const MobileNavigation = () => (
    <div className="md:hidden">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-50">
        <div>
          <h1 className="text-lg font-bold">Library System</h1>
          <p className="text-xs text-gray-500">
            {activeTab ? activeTab.name : "Dashboard"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Bottom Sheet Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 shadow-2xl "
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-white rounded-t-4xl shadow-2xl transform transition-all duration-300 ease-out z-50",
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
            <h2 className="text-xl font-semibold">Navigation</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full"
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
                  "flex items-center px-4 py-4 rounded-full font-medium text-sm transition-all duration-200",
                  isActiveTab(tab.path)
                    ? "bg-blue-50 text-blue-600 border-2 border-blue-200 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 active:bg-gray-100 border-2 border-transparent"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg mr-3",
                    isActiveTab(tab.path) ? "bg-blue-100" : "bg-gray-100"
                  )}
                >
                  {React.cloneElement(tab.icon, {
                    className: cn(
                      "h-5 w-5",
                      isActiveTab(tab.path) ? "text-blue-600" : "text-gray-600"
                    ),
                    style: { margin: 0 },
                  })}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{tab.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {isActiveTab(tab.path)
                      ? "Currently active"
                      : "Tap to navigate"}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Action Buttons Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="justify-start gap-3 h-12 text-left"
              >
                <div className="p-1.5 bg-green-100 rounded-lg">
                  <DownloadIcon className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Export Data</div>
                  <div className="text-xs text-gray-500">Download reports</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-3 h-12 text-left"
              >
                <div className="p-1.5 bg-purple-100 rounded-lg">
                  <Upload className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Import Data</div>
                  <div className="text-xs text-gray-500">Upload files</div>
                </div>
              </Button>
              <Button className="justify-start gap-3 h-12 bg-black text-white text-left">
                <div className="p-1.5 bg-white bg-opacity-20 rounded-lg">
                  <UsersRound className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-sm">Add Student</div>
                  <div className="text-xs text-white text-opacity-80">
                    Create new profile
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
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">
            Library Management System
          </h1>
          <p className="text-gray-400 text-sm lg:text-base">
            Manage books, track issues, and monitor library resources
          </p>
        </div>

        {/* Desktop Action Buttons */}
        <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
          <Button variant="outline" className="rounded-full gap-1 text-sm">
            <DownloadIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button variant="outline" className="rounded-full gap-1 text-sm">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Import</span>
          </Button>
          <Button
            variant="primary"
            className="rounded-full bg-black text-white text-sm"
          >
            <span className="hidden sm:inline">Add Student</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Desktop Navigation Tabs */}
      <div className="border-b mb-6 sticky top-0 bg-white z-30 overflow-x-auto">
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              href={tab.path}
              className={cn(
                "px-3 lg:px-4 py-3 flex items-center font-medium text-sm whitespace-nowrap transition-colors focus:outline-none",
                isActiveTab(tab.path)
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              )}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.name}</span>
              <span className="sm:hidden">{tab.shortName}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto lg:p-6">
        {/* Mobile Navigation */}
        <MobileNavigation />

        {/* Desktop Navigation */}
        <DesktopNavigation />

        {/* Page Content */}
        <div className="px-4 md:px-0 pb-20 md:pb-0">{children}</div>

        {/* Bottom Navigation for Mobile */}
        <BottomNavigation />
      </div>
    </div>
  );
}
// Bottom Navigation for Mobile (Alternative approach)
const BottomNavigation = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
    <div className="flex">
      {tabs.slice(0, 4).map((tab) => (
        <Link
          key={tab.path}
          href={tab.path}
          className={cn(
            "flex-1 flex flex-col items-center py-2 px-1 text-xs transition-colors",
            isActiveTab(tab.path) ? "text-blue-600" : "text-gray-600"
          )}
        >
          <div className="mb-1">
            {React.cloneElement(tab.icon, {
              className: "h-5 w-5",
              style: { margin: 0 },
            })}
          </div>
          <span className="truncate w-full text-center">{tab.shortName}</span>
        </Link>
      ))}

      {/* More button for additional tabs */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex-1 flex flex-col items-center py-2 px-1 text-xs text-gray-600">
            <MoreHorizontal className="h-5 w-5 mb-1" />
            <span>More</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {tabs.slice(4).map((tab) => (
            <DropdownMenuItem key={tab.path} asChild>
              <Link href={tab.path} className="flex items-center">
                {tab.icon}
                {tab.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);
