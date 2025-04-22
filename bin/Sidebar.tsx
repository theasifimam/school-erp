"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  Home,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  Users,
  BarChart,
  Plus,
  Search,
  Bell,
  MessageSquare,
  HelpCircle,
  Lock,
  BookOpen,
  GraduationCap,
  School,
  Calendar,
  ClipboardList,
  Library,
  Bookmark,
  Clock,
  DollarSign,
  Shield,
  CreditCard,
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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      setOpenSubmenu(null);
    }
  }, [isOpen]);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          className="bg-indigo-900 text-white hover:bg-indigo-800"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed lg:relative h-screen bg-indigo-900 text-white transition-all duration-300 z-40",
          isOpen ? "w-64" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-800">
          {isOpen ? (
            <div className="flex items-center gap-2">
              <School className="text-yellow-400" size={24} />
              <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-indigo-300 bg-clip-text text-transparent">
                EduManage
              </h1>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-full">
                  <School className="text-yellow-400" size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">EduManage System</TooltipContent>
            </Tooltip>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-indigo-300 hover:text-white hover:bg-indigo-800"
            onClick={() =>
              isMobileOpen ? closeMobileSidebar() : setIsOpen(!isOpen)
            }
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Search Bar (only visible when expanded) */}
        {isOpen && (
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-300" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 bg-indigo-800 border-indigo-700 focus:border-yellow-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Sidebar Navigation */}
        <nav className="flex flex-col mt-2 px-2 overflow-y-auto h-[calc(100vh-180px)]">
          <SidebarItem
            icon={<Home className="text-yellow-400" />}
            label="Dashboard"
            route="/"
            isOpen={isOpen}
            isActive={pathname === "/"}
          />

          <SidebarItem
            icon={<GraduationCap className="text-blue-300" />}
            label="Students"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "students"}
            onSubmenuToggle={() => toggleSubmenu("students")}
            isActive={pathname?.startsWith("/students")}
            badge={5}
            submenu={[
              {
                label: "All Students",
                icon: <User size={16} />,
                route: "/students/all",
              },
              {
                label: "New Admissions",
                icon: <Plus size={16} />,
                route: "/students/admissions",
                badge: 5,
              },
              {
                label: "Attendance",
                icon: <ClipboardList size={16} />,
                route: "/students/attendance",
              },
              {
                label: "Performance",
                icon: <BarChart size={16} />,
                route: "/students/performance",
              },
            ]}
          />

          <SidebarItem
            icon={<User className="text-green-300" />}
            label="Teachers"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "teachers"}
            onSubmenuToggle={() => toggleSubmenu("teachers")}
            isActive={pathname?.startsWith("/teachers")}
            submenu={[
              {
                label: "All Teachers",
                icon: <User size={16} />,
                route: "/teachers/all",
              },
              {
                label: "Assign Classes",
                icon: <BookOpen size={16} />,
                route: "/teachers/assign",
              },
              {
                label: "Attendance",
                icon: <ClipboardList size={16} />,
                route: "/teachers/attendance",
              },
            ]}
          />

          <SidebarItem
            icon={<BookOpen className="text-purple-300" />}
            label="Classes"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "classes"}
            onSubmenuToggle={() => toggleSubmenu("classes")}
            isActive={pathname?.startsWith("/classes")}
            submenu={[
              {
                label: "All Classes",
                icon: <BookOpen size={16} />,
                route: "/classes/all",
              },
              {
                label: "Timetable",
                icon: <Clock size={16} />,
                route: "/classes/timetable",
              },
              {
                label: "Subjects",
                icon: <Library size={16} />,
                route: "/classes/subjects",
              },
            ]}
          />

          <SidebarItem
            icon={<Calendar className="text-red-300" />}
            label="Calendar"
            route="/calendar"
            isOpen={isOpen}
            isActive={pathname === "/calendar"}
          />

          <SidebarItem
            icon={<ClipboardList className="text-orange-300" />}
            label="Exams"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "exams"}
            onSubmenuToggle={() => toggleSubmenu("exams")}
            isActive={pathname?.startsWith("/exams")}
            submenu={[
              {
                label: "Schedule",
                icon: <Calendar size={16} />,
                route: "/exams/schedule",
              },
              {
                label: "Results",
                icon: <Bookmark size={16} />,
                route: "/exams/results",
              },
              {
                label: "Grades",
                icon: <FileText size={16} />,
                route: "/exams/grades",
              },
            ]}
          />

          <SidebarItem
            icon={<DollarSign className="text-emerald-300" />}
            label="Finance"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "finance"}
            onSubmenuToggle={() => toggleSubmenu("finance")}
            isActive={pathname?.startsWith("/finance")}
            submenu={[
              {
                label: "Fees",
                icon: <DollarSign size={16} />,
                route: "/finance/fees",
              },
              {
                label: "Payments",
                icon: <CreditCard size={16} />,
                route: "/finance/payments",
              },
              {
                label: "Reports",
                icon: <FileText size={16} />,
                route: "/finance/reports",
              },
            ]}
          />

          <div className="mt-4 mb-2">
            <Separator className="bg-indigo-800" />
          </div>

          <SidebarItem
            icon={<Settings className="text-indigo-300" />}
            label="Settings"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "settings"}
            onSubmenuToggle={() => toggleSubmenu("settings")}
            isActive={pathname?.startsWith("/settings")}
            submenu={[
              {
                label: "School Info",
                icon: <School size={16} />,
                route: "/settings/school",
              },
              {
                label: "User Management",
                icon: <Shield size={16} />,
                route: "/settings/users",
              },
              {
                label: "System Settings",
                icon: <Settings size={16} />,
                route: "/settings/system",
              },
            ]}
          />

          <SidebarItem
            icon={<HelpCircle className="text-blue-300" />}
            label="Help & Support"
            route="/support"
            isOpen={isOpen}
            isActive={pathname === "/support"}
          />
        </nav>

        {/* User Profile & Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-indigo-800 bg-indigo-900/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Principal"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-indigo-600">
                    PS
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">User Profile</TooltipContent>
            </Tooltip>

            {isOpen && (
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col truncate">
                    <span className="font-semibold truncate">
                      Principal Smith
                    </span>
                    <span className="text-xs text-indigo-300 truncate">
                      principal@edumanage.edu
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-indigo-300 hover:text-white hover:bg-indigo-800"
                        >
                          <Bell size={16} />
                          <span className="sr-only">Notifications</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Notifications</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-indigo-300 hover:text-white hover:bg-indigo-800"
                          onClick={() => router.push("/logout")}
                        >
                          <LogOut size={16} />
                          <span className="sr-only">Logout</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Logout</TooltipContent>
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

// Sidebar Item Component (unchanged from original)
function SidebarItem({
  icon,
  label,
  route,
  isOpen,
  isActive = false,
  hasSubmenu = false,
  isSubmenuOpen = false,
  onSubmenuToggle,
  submenu = [],
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  route?: string;
  isOpen: boolean;
  isActive?: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onSubmenuToggle?: () => void;
  submenu?: {
    label: string;
    icon: React.ReactNode;
    route: string;
    badge?: number;
  }[];
  badge?: number;
}) {
  const pathname = usePathname();

  if (!isOpen && !hasSubmenu) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={route || "#"} passHref>
            <div
              className={cn(
                "flex items-center justify-center p-3 mx-1 my-1 rounded-lg relative",
                isActive
                  ? "bg-indigo-800 text-white"
                  : "text-indigo-300 hover:bg-indigo-800 hover:text-white"
              )}
            >
              <div className="w-5 h-5">{icon}</div>
              {badge && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  {badge}
                </Badge>
              )}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div>
      <Link href={route || "#"} passHref>
        <div
          className={cn(
            "flex items-center p-3 mx-1 my-1 rounded-lg relative",
            isActive
              ? "bg-indigo-800 text-white"
              : "text-indigo-300 hover:bg-indigo-800 hover:text-white",
            hasSubmenu && "cursor-pointer"
          )}
          onClick={hasSubmenu ? onSubmenuToggle : undefined}
        >
          <div className="w-5 h-5">{icon}</div>
          {isOpen && (
            <>
              <span className="ml-3 flex-1 truncate">{label}</span>
              {badge && (
                <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-0">
                  {badge}
                </Badge>
              )}
              {hasSubmenu && (
                <div className="ml-2">
                  {isSubmenuOpen ? (
                    <ChevronDown className="h-4 w-4 transition-transform transform rotate-180" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </Link>

      {/* Submenu Items */}
      {hasSubmenu && isSubmenuOpen && isOpen && (
        <div className="ml-6 space-y-1">
          {submenu.map((item, index) => (
            <Link key={index} href={item.route} passHref>
              <div
                className={cn(
                  "flex items-center p-2 pl-3 rounded-lg text-sm",
                  pathname === item.route
                    ? "bg-indigo-800/50 text-white"
                    : "text-indigo-300 hover:bg-indigo-800/30 hover:text-white"
                )}
              >
                <div className="w-4 h-4 mr-3">{item.icon}</div>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-0">
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
