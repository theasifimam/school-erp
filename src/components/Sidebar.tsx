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
  IndianRupee,
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
          className="bg-white text-gray-900 hover:bg-gray-100 shadow-sm"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed lg:relative h-screen bg-white text-gray-900 border-r border-gray-100 transition-all duration-300 z-40",
          isOpen ? "w-64" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {isOpen ? (
            <div className="flex items-center gap-2">
              <School className="text-indigo-500" size={24} />
              <h1 className="text-xl font-semibold">EduFlow</h1>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-full">
                  <School className="text-indigo-500" size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">EduFlow System</TooltipContent>
            </Tooltip>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-900 hover:bg-gray-100"
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 bg-gray-50 border-gray-200 focus:border-indigo-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Sidebar Navigation */}
        <nav className="flex flex-col mt-2 px-2 overflow-y-auto h-[calc(100vh-180px)]">
          <SidebarItem
            icon={<Home className="text-gray-600" />}
            label="Dashboard"
            route="/"
            isOpen={isOpen}
            isActive={pathname === "/"}
          />

          <SidebarItem
            icon={<GraduationCap className="text-gray-600" />}
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
                icon: <User size={16} className="text-gray-500" />,
                route: "/students/all",
              },
              {
                label: "New Admissions",
                icon: <Plus size={16} className="text-gray-500" />,
                route: "/students/admissions",
                badge: 5,
              },
              {
                label: "Attendance",
                icon: <ClipboardList size={16} className="text-gray-500" />,
                route: "/students/attendance",
              },
            ]}
          />

          <SidebarItem
            icon={<User className="text-gray-600" />}
            label="Faculty"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "faculty"}
            onSubmenuToggle={() => toggleSubmenu("faculty")}
            isActive={pathname?.startsWith("/faculty")}
            submenu={[
              {
                label: "All Teachers",
                icon: <User size={16} className="text-gray-500" />,
                route: "/faculty/all",
              },
              {
                label: "Assign Classes",
                icon: <BookOpen size={16} className="text-gray-500" />,
                route: "/faculty/assign",
              },
            ]}
          />

          <SidebarItem
            icon={<BookOpen className="text-gray-600" />}
            label="Academics"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "academics"}
            onSubmenuToggle={() => toggleSubmenu("academics")}
            isActive={pathname?.startsWith("/academics")}
            submenu={[
              {
                label: "Classes",
                icon: <BookOpen size={16} className="text-gray-500" />,
                route: "/academics/classes",
              },
              {
                label: "Timetable",
                icon: <Clock size={16} className="text-gray-500" />,
                route: "/academics/timetable",
              },
              {
                label: "Subjects",
                icon: <Library size={16} className="text-gray-500" />,
                route: "/academics/subjects",
              },
            ]}
          />

          <SidebarItem
            icon={<IndianRupee className="text-gray-600" />}
            label="Finance"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "finance"}
            onSubmenuToggle={() => toggleSubmenu("finance")}
            isActive={pathname?.startsWith("/finance")}
            submenu={[
              {
                label: "Fees",
                icon: <IndianRupee size={16} className="text-gray-500" />,
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

          <SidebarItem
            icon={<Calendar className="text-gray-600" />}
            label="Calendar"
            route="/calendar"
            isOpen={isOpen}
            isActive={pathname === "/calendar"}
          />

          <SidebarItem
            icon={<ClipboardList className="text-gray-600" />}
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

          <div className="mt-4 mb-2">
            <Separator className="bg-gray-100" />
          </div>

          <SidebarItem
            icon={<Settings className="text-gray-600" />}
            label="Settings"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "settings"}
            onSubmenuToggle={() => toggleSubmenu("settings")}
            isActive={pathname?.startsWith("/settings")}
            submenu={[
              {
                label: "School Info",
                icon: <School size={16} className="text-gray-500" />,
                route: "/settings/school",
              },
              {
                label: "User Management",
                icon: <Shield size={16} className="text-gray-500" />,
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
            icon={<HelpCircle className="text-gray-600" />}
            label="Help & Support"
            route="/support"
            isOpen={isOpen}
            isActive={pathname === "/support"}
          />
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="cursor-pointer h-9 w-9">
                  <AvatarImage
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Principal"
                  />
                  <AvatarFallback className="bg-indigo-100 text-indigo-600">
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
                    <span className="font-medium truncate">
                      Principal Smith
                    </span>
                    <span className="text-xs text-gray-500 truncate">
                      principal@edufow.edu
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => router.push("/logout")}
                  >
                    <LogOut size={16} />
                    <span className="sr-only">Logout</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Sidebar Item Component
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
                "flex items-center justify-center p-3 mx-1 my-1 rounded-3xl relative",
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <div className="w-5 h-5">{icon}</div>
              {badge && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-indigo-500">
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
            "flex items-center p-3 mx-1 my-1 rounded-3xl relative",
            isActive
              ? "bg-indigo-50 text-black-900 font-semibold"
              : "text-gray-600 hover:bg-gray-100",
            hasSubmenu && "cursor-pointer"
          )}
          onClick={hasSubmenu ? onSubmenuToggle : undefined}
        >
          <div className="w-5 h-5">{icon}</div>
          {isOpen && (
            <>
              <span className="ml-3 flex-1 truncate">{label}</span>
              {badge && (
                <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-0 bg-indigo-500">
                  {badge}
                </Badge>
              )}
              {hasSubmenu && (
                <div className="ml-2 text-gray-400">
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
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <div className="w-4 h-4 mr-3">{item.icon}</div>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-0 bg-indigo-500">
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
