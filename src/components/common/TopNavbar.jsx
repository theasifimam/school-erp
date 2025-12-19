"use client";

import { useState } from "react";
import { School, X, ChevronRight, Menu, Sun, Moon } from "lucide-react";
// import NotificationsDropdown from "../navbar/NotificationsDropdown";
import { Button } from "@/components/ui/button";
import AvatarDropdown from "../navbar/AvatarDropdown";
import { MobileMenuToggle } from "./SidebarSection";
import { useTheme } from "next-themes";
import GlobalSearchModal from "./GlobalSearchModal";
// import NavTodoList from "../tasks/NavTodoList";

export default function TopNavbar({
  isMobileOpen,
  setIsMobileOpen,
  isOpen,
  setIsOpen,
}) {
  const { setTheme, theme } = useTheme();
  // To-Do List State

  // Notifications State
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New student enrollment request",
      time: "5 min ago",
      type: "info",
    },
    {
      id: 2,
      text: "Staff meeting reminder",
      time: "1 hour ago",
      type: "reminder",
    },
    {
      id: 3,
      text: "Fee payment pending for Grade 10",
      time: "2 hours ago",
      type: "alert",
    },
  ]);

  // Toggle sidebar function
  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      // lg breakpoint
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Main Navigation Bar */}
      <nav className=" text-gray-800 px-4 flex justify-between border-l-0 items-center h-16 border-b border-gray-200/50 dark:border-gray-900 sticky top-0 z-50 ">
        {/* Left side - Logo/Brand and Main Nav Links */}
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-black hover:bg-gray-100 rounded-full"
            onClick={toggleSidebar}
          >
            {isMobileOpen ? (
              <X size={20} />
            ) : window.innerWidth < 1024 ? (
              <Menu size={20} />
            ) : isOpen ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronRight size={20} className="rotate-180" />
            )}
          </Button>
          <div className="flex items-center gap-2">
            <School className="text-black-600 w-6 h-6" />
            <h1 className="text-xl dark:text-white font-semibold hidden md:block">
              Imam's Academy
            </h1>
          </div>

          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="text-gray-100" /> : <Moon />}
          </Button>
        </div>

        <MobileMenuToggle
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          isOpen={isMobileOpen}
        />

        {/* Right side - Search, Notifications, ToDo, User */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <GlobalSearchModal />

          {/* Todo List Button */}
          {/* <NavTodoList notifOpen={notifOpen} /> */}

          {/* Notifications */}
          {/* <NotificationsDropdown
            {...{ notifications, setNotifications, setNotifOpen, notifOpen }}
          /> */}

          {/* Avatar Dropdown */}
          <AvatarDropdown />
        </div>
      </nav>
    </div>
  );
}
