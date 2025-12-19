"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  Settings,
  X,
  Search,
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
import { roleBasedSidebarConfig } from "@/lib/data/controlData";
import { useSession } from "next-auth/react";

export default function Sidebar({ isOpen, isMobileOpen, setIsMobileOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const user = session?.user;

  const userRole = user?.role || "guest";
  const roleConfig =
    roleBasedSidebarConfig[userRole] || roleBasedSidebarConfig.guest;

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

  // Check if section should be visible for current role
  const canAccessSection = (section) => {
    return roleConfig.sections.includes(section);
  };

  // Check if specific item should be visible
  const canAccessItem = (section, itemKey) => {
    if (roleConfig.hasFullAccess) return true;
    if (!roleConfig.limitedItems) return true;
    if (!roleConfig.limitedItems[section]) return false;
    return roleConfig.limitedItems[section].includes(itemKey);
  };

  if (status === "loading") {
    // show skeleton of the same ui
    return (
      <div className="animate-pulse fixed lg:relative h-screen-[20px] m-[10px] mr-[0] transition-all duration-300 ease-in-out z-40 shadow-lg w-20 text-black rounded-4xl border-2 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between  h-16 p-4">
          <div className="h-6 w-32 bg-gray-300 rounded-md dark:bg-gray-600"></div>
        </div>
        <div className="mt-2 mb-1">
          <Separator className="bg-gray-200" />
        </div>
        <div className="flex flex-col">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {" "}
              <div className="h-5 w-5 bg-gray-300 rounded-md dark:bg-gray-600"></div>
              <div className="h-4 w-20 bg-gray-300 rounded-md dark:bg-gray-600"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
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
          {/* Main Section */}
          {canAccessSection("main") && (
            <SidebarSection title="Main" isOpen={isOpen}>
              {canAccessItem("main", "dashboard") && (
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
              )}

              {canAccessItem("main", "tasks") && (
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
              )}

              {canAccessItem("main", "calendar") && (
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
              )}
            </SidebarSection>
          )}

          {/* Academic Section */}
          {canAccessSection("academic") && (
            <SidebarSection title="Academic" isOpen={isOpen}>
              {canAccessItem("academic", "students") && (
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
              )}

              {canAccessItem("academic", "faculty") && (
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
              )}

              {canAccessItem("academic", "classes") && (
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
              )}

              {canAccessItem("academic", "exams") && (
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
              )}

              {canAccessItem("academic", "library") && (
                <SidebarItem
                  icon={
                    <Library
                      className={
                        pathname === "/library"
                          ? "text-white-600"
                          : "text-gray-600"
                      }
                      aria-hidden="true"
                    />
                  }
                  label="Library Management"
                  route="/library"
                  isOpen={isOpen}
                  isActive={pathname === "/library"}
                />
              )}
            </SidebarSection>
          )}

          {/* Administration Section */}
          {canAccessSection("administration") && (
            <SidebarSection title="Administration" isOpen={isOpen}>
              {canAccessItem("administration", "health") && (
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
              )}

              {canAccessItem("administration", "transport") && (
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
              )}

              {canAccessItem("administration", "food") && (
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
              )}
            </SidebarSection>
          )}

          {/* Finance Section */}
          {canAccessSection("finance") && (
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
          )}

          {/* Communication Section */}
          {canAccessSection("communication") && (
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

              {(roleConfig.hasFullAccess ||
                userRole === "admin" ||
                userRole === "principal") && (
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
              )}
            </SidebarSection>
          )}

          {/* System Section */}
          {canAccessSection("system") && (
            <>
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
            </>
          )}

          {/* Help & Support - Available to all roles */}
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
      </div>
      {/* Mobile Navigation Bar - Only shown on small screens */}
      <MobileNavigation pathname={pathname} router={router} />
    </>
  );
}
