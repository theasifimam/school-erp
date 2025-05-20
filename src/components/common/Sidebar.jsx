"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Home,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  MessageSquare,
  HelpCircle,
  BookOpen,
  GraduationCap,
  School,
  Calendar,
  DollarSign,
  Bus,
  Utensils,
  Medal,
  HeartPulse,
  MessageSquareDot,
  Building,
  Megaphone,
  Image,
  LucideWorkflow,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  classSubmenu,
  communicationSubmenu,
  examSubmenu,
  facultySubmenu,
  financeSubmenu,
  foodSubmenu,
  healthSubmenu,
  mediaSubmenu,
  schoolAdminSubmenu,
  settingsSubmenu,
  studentSubmenu,
  transportationSubmenu,
} from "../navbar/navData";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

export default function Sidebar({
  isOpen,
  setIsOpen,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close submenus when sidebar collapses
  useEffect(() => {
    if (!isOpen) {
      setOpenSubmenu(null);
    }
  }, [isOpen]);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          className="bg-white shadow-md text-black border-gray-200 hover:bg-gray-100 rounded-full"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed lg:relative h-screen transition-all duration-300 ease-in-out z-40 shadow-lg",
          isOpen ? "w-72" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "bg-white text-black rounded-r-3xl"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {isOpen ? (
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-gray-800 to-black p-1.5 rounded-full shadow-md">
                <School className="text-white" size={24} />
              </div>
              <h1 className="text-xl font-bold text-gray-800">EduManage Pro</h1>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-full">
                  <div className="bg-gradient-to-br from-gray-800 to-black p-1.5 rounded-full shadow-md">
                    <School className="text-white" size={24} />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-white text-black border-gray-200"
              >
                EduManage Pro
              </TooltipContent>
            </Tooltip>
          )}

          {/* Mobile close button */}
          {isOpen && isMobileOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-500 hover:text-black hover:bg-gray-100 rounded-full"
              onClick={() => setIsMobileOpen(false)}
            >
              <X size={20} />
            </Button>
          )}
        </div>

        {/* Search Bar */}
        {isOpen && (
          <div className="p-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 bg-gray-50 border-gray-200 focus:border-gray-500 text-black placeholder:text-gray-400 rounded-full transition-all focus:ring-2 focus:ring-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Sidebar Navigation */}
        <nav className="flex flex-col mt-2 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent h-[calc(100vh-180px)]">
          <SidebarSection title="Main" isOpen={isOpen}>
            <SidebarItem
              icon={
                <Home
                  className={
                    pathname === "/" ? "text-white-600" : "text-gray-600"
                  }
                />
              }
              label="Dashboard"
              route="/"
              isOpen={isOpen}
              isActive={pathname === "/"}
            />

            <SidebarItem
              icon={
                <Megaphone
                  className={
                    pathname?.startsWith("/announcements")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Announcements"
              route="/announcements"
              isOpen={isOpen}
              isActive={pathname === "/announcements"}
              badge={3}
            />

            <SidebarItem
              icon={
                <LucideWorkflow
                  className={
                    pathname?.startsWith("/tasks")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Task"
              route="/tasks"
              isOpen={isOpen}
              isActive={pathname === "/tasks"}
              badge={3}
            />

            <SidebarItem
              icon={
                <Calendar
                  className={
                    pathname?.startsWith("/calendar")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="School Calendar"
              route="/calendar"
              isOpen={isOpen}
              isActive={pathname === "/calendar"}
            />
          </SidebarSection>

          <SidebarSection title="Academic" isOpen={isOpen}>
            <SidebarItem
              icon={
                <GraduationCap
                  className={
                    pathname?.startsWith("/students")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Students"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "students"}
              onSubmenuToggle={() => toggleSubmenu("students")}
              isActive={pathname?.startsWith("/students")}
              badge={12}
              submenu={studentSubmenu}
            />

            <SidebarItem
              icon={
                <User
                  className={
                    pathname?.startsWith("/faculty")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Faculties"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "faculty"}
              onSubmenuToggle={() => toggleSubmenu("faculty")}
              isActive={pathname?.startsWith("/faculty")}
              submenu={facultySubmenu}
            />

            <SidebarItem
              icon={
                <BookOpen
                  className={
                    pathname?.startsWith("/classes")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Classes & Curriculum"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "classes"}
              onSubmenuToggle={() => toggleSubmenu("classes")}
              isActive={pathname?.startsWith("/classes")}
              submenu={classSubmenu}
            />

            <SidebarItem
              icon={
                <Medal
                  className={
                    pathname?.startsWith("/exams")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Examinations"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "exams"}
              onSubmenuToggle={() => toggleSubmenu("exams")}
              isActive={pathname?.startsWith("/exams")}
              submenu={examSubmenu}
            />

            <SidebarItem
              icon={
                <Medal
                  className={
                    pathname?.startsWith("/library")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Library Management"
              isOpen={isOpen}
              isActive={pathname?.startsWith("/exams")}
              // hasSubmenu
              // isSubmenuOpen={openSubmenu === "exams"}
              // onSubmenuToggle={() => toggleSubmenu("exams")}
              // submenu={examSubmenu}
            />
          </SidebarSection>

          <SidebarSection title="Administration" isOpen={isOpen}>
            <SidebarItem
              icon={
                <HeartPulse
                  className={
                    pathname?.startsWith("/health")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Health Services"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "health"}
              onSubmenuToggle={() => toggleSubmenu("health")}
              isActive={pathname?.startsWith("/health")}
              submenu={healthSubmenu}
            />

            <SidebarItem
              icon={
                <Bus
                  className={
                    pathname?.startsWith("/transport")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Transportation"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "transport"}
              onSubmenuToggle={() => toggleSubmenu("transport")}
              isActive={pathname?.startsWith("/transport")}
              submenu={transportationSubmenu}
            />

            <SidebarItem
              icon={
                <Utensils
                  className={
                    pathname?.startsWith("/food")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Food Services"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "food"}
              onSubmenuToggle={() => toggleSubmenu("food")}
              isActive={pathname?.startsWith("/food")}
              submenu={foodSubmenu}
            />
          </SidebarSection>

          <SidebarSection title="Finance" isOpen={isOpen}>
            <SidebarItem
              icon={
                <DollarSign
                  className={
                    pathname?.startsWith("/finance")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Financial Management"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "finance"}
              onSubmenuToggle={() => toggleSubmenu("finance")}
              isActive={pathname?.startsWith("/finance")}
              submenu={financeSubmenu}
            />
          </SidebarSection>

          <SidebarSection title="Communication" isOpen={isOpen}>
            <SidebarItem
              icon={
                <MessageSquareDot
                  className={
                    pathname?.startsWith("/communication")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Communication"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "communication"}
              onSubmenuToggle={() => toggleSubmenu("communication")}
              isActive={pathname?.startsWith("/communication")}
              badge={5}
              submenu={communicationSubmenu}
            />

            <SidebarItem
              icon={
                <Image
                  className={
                    pathname?.startsWith("/media")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                />
              }
              label="Media Center"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "media"}
              onSubmenuToggle={() => toggleSubmenu("media")}
              isActive={pathname?.startsWith("/media")}
              submenu={mediaSubmenu}
            />
          </SidebarSection>

          <div className="mt-4 mb-2">
            <Separator className="bg-gray-200" />
          </div>

          <SidebarItem
            icon={
              <Building
                className={
                  pathname?.startsWith("/administration")
                    ? "text-white-600"
                    : "text-gray-600"
                }
              />
            }
            label="School Administration"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "administration"}
            onSubmenuToggle={() => toggleSubmenu("administration")}
            isActive={pathname?.startsWith("/administration")}
            submenu={schoolAdminSubmenu}
          />

          <SidebarItem
            icon={
              <Settings
                className={
                  pathname?.startsWith("/settings")
                    ? "text-white-600"
                    : "text-gray-600"
                }
              />
            }
            label="System Settings"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "settings"}
            onSubmenuToggle={() => toggleSubmenu("settings")}
            isActive={pathname?.startsWith("/settings")}
            submenu={settingsSubmenu}
          />

          <SidebarItem
            icon={
              <HelpCircle
                className={
                  pathname?.startsWith("/support")
                    ? "text-white-600"
                    : "text-gray-600"
                }
              />
            }
            label="Help & Support"
            route="/support"
            isOpen={isOpen}
            isActive={pathname === "/support"}
          />
        </nav>

        {/* User Profile & Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Avatar className="cursor-pointer border-2 border-gray-200 hover:border-gray-500 transition-colors rounded-full">
                    <AvatarImage
                      src="https://randomuser.me/api/portraits/women/45.jpg"
                      alt="Principal"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-gray-800 to-black rounded-full text-white">
                      PS
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-white text-black border-gray-200"
              >
                User Profile
              </TooltipContent>
            </Tooltip>

            {isOpen && (
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col truncate">
                    <span className="font-semibold truncate text-black">
                      Asif Imam
                    </span>
                    <span className="text-xs text-gray-500 truncate">
                      asifimam@hustleCode.dev
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-black hover:bg-gray-100 relative rounded-full"
                        >
                          <Bell size={16} />
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            4
                          </span>
                          <span className="sr-only">Notifications</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-white text-black border-gray-200"
                      >
                        Notifications
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full"
                        >
                          <MessageSquare size={16} />
                          <span className="sr-only">Messages</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-white text-black border-gray-200"
                      >
                        Messages
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full"
                          onClick={() => router.push("/logout")}
                        >
                          <LogOut size={16} />
                          <span className="sr-only">Logout</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-white text-black border-gray-200"
                      >
                        Logout
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Section component to group menu items
