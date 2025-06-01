"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
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
  Library,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import SidebarSection, {
  MobileNavigation,
  MobileMenuToggle,
} from "./SidebarSection";

export default function Sidebar({ isOpen, isMobileOpen, setIsMobileOpen }) {
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

  // Filter main navigation items for mobile bottom navigation
  const mainNavItems = [
    { icon: <Home size={20} />, label: "Dashboard", route: "/" },
    { icon: <Calendar size={20} />, label: "Calendar", route: "/calendar" },
    {
      icon: <Megaphone size={20} />,
      label: "Updates",
      route: "/announcements",
      badge: 3,
    },
    {
      icon: <MessageSquareDot size={20} />,
      label: "Messages",
      route: "/communication/messages",
      badge: 5,
    },
    { icon: <User size={20} />, label: "Profile", route: "/profile" },
  ];

  return (
    <>
      {/* Improved Mobile Menu Button with better accessibility */}
      <MobileMenuToggle
        onClick={() => setIsMobileOpen(true)}
        isOpen={isMobileOpen}
      />

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed lg:relative h-screen-[20px] m-[10px] mr-[0] transition-all duration-300 ease-in-out z-40 shadow-lg",
          isOpen ? "w-72" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          " text-black rounded-4xl border-2 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
        )}
        aria-label="Main Navigation"
        role="navigation"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between  h-16 p-4">
          {isOpen ? (
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-gray-800 to-black p-1.5 rounded-full">
                <School className="text-white" size={24} aria-hidden="true" />
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Imam's Academy
              </h1>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-full">
                  <div className="bg-gradient-to-br from-gray-800 to-black p-1.5 rounded-full shadow-md">
                    <School
                      className="text-white"
                      size={24}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-white text-black border-gray-200"
              >
                Imam's Academy
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
              aria-label="Close sidebar"
            >
              <X size={20} aria-hidden="true" />
            </Button>
          )}
        </div>

        {/* Search Bar */}
        {isOpen && (
          <div className="p-3">
            <div className="relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 bg-gray-50 border-gray-200 dark:border-gray-900 focus:border-gray-800 text-black placeholder:text-gray-400 rounded-full transition-all focus:ring-2 focus:ring-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
            </div>
          </div>
        )}

        {/* Sidebar Navigation */}
        <nav
          className="flex flex-col mt-2 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent h-[calc(100vh-180px)] hover:scrollbar-thumb-gray-400 transition-all duration-300"
          aria-label="Sidebar navigation"
        >
          <SidebarSection title="Main" isOpen={isOpen}>
            <SidebarItem
              icon={
                <Home
                  className={
                    pathname === "/" ? "text-white-600" : "text-gray-600"
                  }
                  aria-hidden="true"
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
                  aria-hidden="true"
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
                  aria-hidden="true"
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
                  aria-hidden="true"
                />
              }
              label="School Calendar"
              route="/calendar"
              isOpen={isOpen}
              isActive={pathname === "/calendar"}
            />
          </SidebarSection>

          {/* Keep the original sidebar sections unchanged... */}
          {/* Academic Section */}
          <SidebarSection title="Academic" isOpen={isOpen}>
            <SidebarItem
              icon={
                <GraduationCap
                  className={
                    pathname?.startsWith("/students")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                  aria-hidden="true"
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

            {/* Additional academic items... */}
            <SidebarItem
              icon={
                <User
                  className={
                    pathname?.startsWith("/faculty")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                  aria-hidden="true"
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
                  aria-hidden="true"
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
                  aria-hidden="true"
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
                <Library
                  className={
                    pathname === "/library" ? "text-white-600" : "text-gray-600"
                  }
                  aria-hidden="true"
                />
              }
              label="Library Management"
              route="/library"
              isOpen={isOpen}
              isActive={pathname === "/library"}
            />
          </SidebarSection>

          {/* Administration section */}
          <SidebarSection title="Administration" isOpen={isOpen}>
            <SidebarItem
              icon={
                <HeartPulse
                  className={
                    pathname?.startsWith("/health")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                  aria-hidden="true"
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
                  aria-hidden="true"
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
                  aria-hidden="true"
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

          {/* Other sections - Finance, Communication, etc. */}
          <SidebarSection title="Finance" isOpen={isOpen}>
            <SidebarItem
              icon={
                <DollarSign
                  className={
                    pathname?.startsWith("/finance")
                      ? "text-white-600"
                      : "text-gray-600"
                  }
                  aria-hidden="true"
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
                  aria-hidden="true"
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
                  aria-hidden="true"
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
                aria-hidden="true"
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
                aria-hidden="true"
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
                aria-hidden="true"
              />
            }
            label="Help & Support"
            route="/support"
            isOpen={isOpen}
            isActive={pathname === "/support"}
          />
        </nav>

        {/* User Profile & Quick Actions */}
        {/* <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white dark:bg-background">
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Avatar className="cursor-pointer border-2 border-gray-200 hover:border-gray-500 transition-colors rounded-full">
                    <AvatarImage
                      src="https://randomuser.me/api/portraits/women/45.jpg"
                      alt="Principal"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-gray-800 to-black rounded-full">
                      PS
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
                    aria-hidden="true"
                  ></div>
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
                    <span className="font-semibold truncate text-black dark:text-white">
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
                          aria-label="Notifications"
                        >
                          <Bell size={16} aria-hidden="true" />
                          <span
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                            aria-hidden="true"
                          >
                            4
                          </span>
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
                          aria-label="Messages"
                        >
                          <MessageSquare size={16} aria-hidden="true" />
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
                          aria-label="Logout"
                        >
                          <LogOut size={16} aria-hidden="true" />
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
        </div> */}
      </div>

      {/* Mobile Navigation Bar - Only shown on small screens */}
      <MobileNavigation pathname={pathname} router={router} />
    </>
  );
}
