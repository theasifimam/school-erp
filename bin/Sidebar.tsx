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
  Bus,
  Utensils,
  Medal,
  HeartPulse,
  MessageSquareDot,
  Coffee,
  LucideIcon,
  Building,
  FileBarChart,
  Megaphone,
  Image,
  Video,
  Mail,
  UserPlus,
  Briefcase,
  AlertTriangle,
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
import { useTheme } from "next-themes";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else if (window.innerWidth >= 1280) {
        setIsOpen(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar on navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Close submenus when sidebar collapses
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
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          className="bg-gradient-to-br from-indigo-800 to-indigo-900 text-white border-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-md"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed lg:relative h-screen transition-all duration-300 ease-in-out z-40 shadow-xl",
          isOpen ? "w-72" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "bg-gradient-to-b from-indigo-900 to-indigo-950 text-white"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-800/50">
          {isOpen ? (
            <div className="flex items-center gap-2">
              <div className="bg-indigo-800/30 p-1.5 rounded-lg shadow-inner">
                <School className="text-yellow-400" size={24} />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-indigo-200 bg-clip-text text-transparent">
                EduManage Pro
              </h1>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-full">
                  <div className="bg-indigo-800/30 p-1.5 rounded-lg shadow-inner">
                    <School className="text-yellow-400" size={24} />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-indigo-800 text-white border-indigo-700"
              >
                EduManage Pro
              </TooltipContent>
            </Tooltip>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-indigo-300 hover:text-white hover:bg-indigo-800/50 rounded-lg"
            onClick={() =>
              isMobileOpen ? closeMobileSidebar() : setIsOpen(!isOpen)
            }
          >
            {isMobileOpen ? (
              <X size={20} />
            ) : isOpen ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronRight size={20} className="rotate-180" />
            )}
          </Button>
        </div>

        {/* Search Bar */}
        {isOpen && (
          <div className="p-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-300 group-focus-within:text-yellow-400 transition-colors" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 bg-indigo-800/30 border-indigo-700/50 focus:border-yellow-400 text-white placeholder:text-indigo-300 rounded-lg transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Badge for notification count near profile */}
        {!isOpen && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2">
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">
              12
            </Badge>
          </div>
        )}

        {/* Sidebar Navigation */}
        <nav className="flex flex-col mt-2 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-transparent h-[calc(100vh-180px)]">
          <SidebarSection title="Main" isOpen={isOpen}>
            <SidebarItem
              icon={<Home className="text-yellow-400" />}
              label="Dashboard"
              route="/"
              isOpen={isOpen}
              isActive={pathname === "/"}
            />

            <SidebarItem
              icon={<Megaphone className="text-pink-300" />}
              label="Announcements"
              route="/announcements"
              isOpen={isOpen}
              isActive={pathname === "/announcements"}
              badge={3}
            />

            <SidebarItem
              icon={<Calendar className="text-blue-300" />}
              label="School Calendar"
              route="/calendar"
              isOpen={isOpen}
              isActive={pathname === "/calendar"}
            />
          </SidebarSection>

          <SidebarSection title="Academic" isOpen={isOpen}>
            <SidebarItem
              icon={<GraduationCap className="text-purple-300" />}
              label="Students"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "students"}
              onSubmenuToggle={() => toggleSubmenu("students")}
              isActive={pathname?.startsWith("/students")}
              badge={12}
              submenu={[
                {
                  label: "All Students",
                  icon: <Users size={16} />,
                  route: "/students/all",
                },
                {
                  label: "New Admissions",
                  icon: <UserPlus size={16} />,
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
                {
                  label: "Behavior Record",
                  icon: <AlertTriangle size={16} />,
                  route: "/students/behavior",
                  badge: 2,
                },
                {
                  label: "Student Portfolios",
                  icon: <Briefcase size={16} />,
                  route: "/students/portfolios",
                },
              ]}
            />

            <SidebarItem
              icon={<User className="text-emerald-300" />}
              label="Teachers"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "teachers"}
              onSubmenuToggle={() => toggleSubmenu("teachers")}
              isActive={pathname?.startsWith("/teachers")}
              submenu={[
                {
                  label: "All Teachers",
                  icon: <Users size={16} />,
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
                {
                  label: "Performance Review",
                  icon: <FileBarChart size={16} />,
                  route: "/teachers/performance",
                },
                {
                  label: "Professional Development",
                  icon: <BookOpen size={16} />,
                  route: "/teachers/development",
                },
              ]}
            />

            <SidebarItem
              icon={<BookOpen className="text-blue-300" />}
              label="Classes & Curriculum"
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
                {
                  label: "Lesson Plans",
                  icon: <FileText size={16} />,
                  route: "/classes/lessons",
                },
                {
                  label: "Curriculum Builder",
                  icon: <BookOpen size={16} />,
                  route: "/classes/curriculum",
                },
              ]}
            />

            <SidebarItem
              icon={<Medal className="text-amber-300" />}
              label="Examinations"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "exams"}
              onSubmenuToggle={() => toggleSubmenu("exams")}
              isActive={pathname?.startsWith("/exams")}
              submenu={[
                {
                  label: "Exam Schedule",
                  icon: <Calendar size={16} />,
                  route: "/exams/schedule",
                },
                {
                  label: "Results",
                  icon: <FileBarChart size={16} />,
                  route: "/exams/results",
                },
                {
                  label: "Grade Reports",
                  icon: <FileText size={16} />,
                  route: "/exams/grades",
                },
                {
                  label: "Question Banks",
                  icon: <Library size={16} />,
                  route: "/exams/question-banks",
                },
                {
                  label: "Online Tests",
                  icon: <BookOpen size={16} />,
                  route: "/exams/online-tests",
                },
              ]}
            />
          </SidebarSection>

          <SidebarSection title="Administration" isOpen={isOpen}>
            <SidebarItem
              icon={<HeartPulse className="text-red-300" />}
              label="Health Services"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "health"}
              onSubmenuToggle={() => toggleSubmenu("health")}
              isActive={pathname?.startsWith("/health")}
              submenu={[
                {
                  label: "Medical Records",
                  icon: <FileText size={16} />,
                  route: "/health/records",
                },
                {
                  label: "Nurse Schedule",
                  icon: <Calendar size={16} />,
                  route: "/health/schedule",
                },
                {
                  label: "Incidents",
                  icon: <AlertTriangle size={16} />,
                  route: "/health/incidents",
                  badge: 1,
                },
                {
                  label: "Vaccinations",
                  icon: <Shield size={16} />,
                  route: "/health/vaccinations",
                },
              ]}
            />

            <SidebarItem
              icon={<Bus className="text-orange-300" />}
              label="Transportation"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "transport"}
              onSubmenuToggle={() => toggleSubmenu("transport")}
              isActive={pathname?.startsWith("/transport")}
              submenu={[
                {
                  label: "Bus Routes",
                  icon: <FileText size={16} />,
                  route: "/transport/routes",
                },
                {
                  label: "Drivers",
                  icon: <User size={16} />,
                  route: "/transport/drivers",
                },
                {
                  label: "Vehicle Maintenance",
                  icon: <Settings size={16} />,
                  route: "/transport/maintenance",
                },
                {
                  label: "Transport Tracking",
                  icon: <Search size={16} />,
                  route: "/transport/tracking",
                },
              ]}
            />

            <SidebarItem
              icon={<Utensils className="text-green-300" />}
              label="Food Services"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "food"}
              onSubmenuToggle={() => toggleSubmenu("food")}
              isActive={pathname?.startsWith("/food")}
              submenu={[
                {
                  label: "Cafeteria Menu",
                  icon: <FileText size={16} />,
                  route: "/food/menu",
                },
                {
                  label: "Dietary Information",
                  icon: <HeartPulse size={16} />,
                  route: "/food/dietary",
                },
                {
                  label: "Meal Payments",
                  icon: <CreditCard size={16} />,
                  route: "/food/payments",
                },
              ]}
            />
          </SidebarSection>

          <SidebarSection title="Finance" isOpen={isOpen}>
            <SidebarItem
              icon={<DollarSign className="text-lime-300" />}
              label="Financial Management"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "finance"}
              onSubmenuToggle={() => toggleSubmenu("finance")}
              isActive={pathname?.startsWith("/finance")}
              submenu={[
                {
                  label: "Student Fees",
                  icon: <CreditCard size={16} />,
                  route: "/finance/fees",
                  badge: 8,
                },
                {
                  label: "Payments",
                  icon: <DollarSign size={16} />,
                  route: "/finance/payments",
                },
                {
                  label: "Financial Reports",
                  icon: <FileBarChart size={16} />,
                  route: "/finance/reports",
                },
                {
                  label: "Budget Planning",
                  icon: <FileText size={16} />,
                  route: "/finance/budget",
                },
                {
                  label: "Scholarships",
                  icon: <Medal size={16} />,
                  route: "/finance/scholarships",
                },
              ]}
            />
          </SidebarSection>

          <SidebarSection title="Communication" isOpen={isOpen}>
            <SidebarItem
              icon={<MessageSquareDot className="text-cyan-300" />}
              label="Communication"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "communication"}
              onSubmenuToggle={() => toggleSubmenu("communication")}
              isActive={pathname?.startsWith("/communication")}
              badge={5}
              submenu={[
                {
                  label: "Messages",
                  icon: <MessageSquare size={16} />,
                  route: "/communication/messages",
                  badge: 3,
                },
                {
                  label: "Email",
                  icon: <Mail size={16} />,
                  route: "/communication/email",
                  badge: 2,
                },
                {
                  label: "Parent Portal",
                  icon: <Users size={16} />,
                  route: "/communication/parent-portal",
                },
                {
                  label: "Announcements",
                  icon: <Megaphone size={16} />,
                  route: "/communication/announcements",
                },
                {
                  label: "School Events",
                  icon: <Calendar size={16} />,
                  route: "/communication/events",
                },
              ]}
            />

            <SidebarItem
              icon={<Image className="text-pink-300" />}
              label="Media Center"
              isOpen={isOpen}
              hasSubmenu
              isSubmenuOpen={openSubmenu === "media"}
              onSubmenuToggle={() => toggleSubmenu("media")}
              isActive={pathname?.startsWith("/media")}
              submenu={[
                {
                  label: "Photo Gallery",
                  icon: <Image size={16} />,
                  route: "/media/photos",
                },
                {
                  label: "Video Library",
                  icon: <Video size={16} />,
                  route: "/media/videos",
                },
                {
                  label: "School Publications",
                  icon: <FileText size={16} />,
                  route: "/media/publications",
                },
              ]}
            />
          </SidebarSection>

          <div className="mt-4 mb-2">
            <Separator className="bg-indigo-800/50" />
          </div>

          <SidebarItem
            icon={<Building className="text-gray-300" />}
            label="School Administration"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "administration"}
            onSubmenuToggle={() => toggleSubmenu("administration")}
            isActive={pathname?.startsWith("/administration")}
            submenu={[
              {
                label: "School Profile",
                icon: <School size={16} />,
                route: "/administration/profile",
              },
              {
                label: "Staff Directory",
                icon: <Users size={16} />,
                route: "/administration/staff",
              },
              {
                label: "Facilities Management",
                icon: <Building size={16} />,
                route: "/administration/facilities",
              },
              {
                label: "Resource Allocation",
                icon: <Briefcase size={16} />,
                route: "/administration/resources",
              },
            ]}
          />

          <SidebarItem
            icon={<Settings className="text-gray-300" />}
            label="System Settings"
            isOpen={isOpen}
            hasSubmenu
            isSubmenuOpen={openSubmenu === "settings"}
            onSubmenuToggle={() => toggleSubmenu("settings")}
            isActive={pathname?.startsWith("/settings")}
            submenu={[
              {
                label: "User Management",
                icon: <Users size={16} />,
                route: "/settings/users",
              },
              {
                label: "Security Settings",
                icon: <Shield size={16} />,
                route: "/settings/security",
              },
              {
                label: "System Preferences",
                icon: <Settings size={16} />,
                route: "/settings/preferences",
              },
              {
                label: "Customization",
                icon: <Briefcase size={16} />,
                route: "/settings/customization",
              },
            ]}
          />

          <SidebarItem
            icon={<HelpCircle className="text-gray-300" />}
            label="Help & Support"
            route="/support"
            isOpen={isOpen}
            isActive={pathname === "/support"}
          />
        </nav>

        {/* User Profile & Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-indigo-800/50 bg-gradient-to-b from-indigo-900/50 to-indigo-950 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Avatar className="cursor-pointer border-2 border-indigo-700/50 hover:border-yellow-400 transition-colors">
                    <AvatarImage
                      src="https://randomuser.me/api/portraits/women/45.jpg"
                      alt="Principal"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-indigo-600">
                      PS
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-indigo-900 rounded-full"></div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-indigo-800 text-white border-indigo-700"
              >
                User Profile
              </TooltipContent>
            </Tooltip>

            {isOpen && (
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col truncate">
                    <span className="font-semibold truncate text-white">
                      Dr. Emily Smith
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
                          className="h-8 w-8 text-indigo-300 hover:text-white hover:bg-indigo-800/50 relative"
                        >
                          <Bell size={16} />
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 text-xs rounded-full flex items-center justify-center">
                            4
                          </span>
                          <span className="sr-only">Notifications</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-indigo-800 text-white border-indigo-700"
                      >
                        Notifications
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-indigo-300 hover:text-white hover:bg-indigo-800/50"
                        >
                          <MessageSquare size={16} />
                          <span className="sr-only">Messages</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-indigo-800 text-white border-indigo-700"
                      >
                        Messages
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-indigo-300 hover:text-white hover:bg-indigo-800/50"
                          onClick={() => router.push("/logout")}
                        >
                          <LogOut size={16} />
                          <span className="sr-only">Logout</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-indigo-800 text-white border-indigo-700"
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
function SidebarSection({
  title,
  children,
  isOpen,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
}) {
  return (
    <div className="mt-2 mb-1">
      {isOpen && (
        <div className="px-3 py-1.5">
          <h2 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
            {title}
          </h2>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

// Enhanced Sidebar Item Component
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

  const handleItemClick = (e: React.MouseEvent) => {
    if (hasSubmenu && onSubmenuToggle) {
      e.preventDefault();
      onSubmenuToggle();
    }
  };

  // Collapsed sidebar item view
  if (!isOpen && !hasSubmenu) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={route || "#"} passHref>
            <div
              className={cn(
                "flex items-center justify-center p-3 mx-1 my-1 rounded-lg relative transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-indigo-700 to-indigo-800 text-white shadow-md"
                  : "text-indigo-300 hover:bg-indigo-800/40 hover:text-white"
              )}
            >
              <div className="w-5 h-5">{icon}</div>
              {badge && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-yellow-500 hover:bg-yellow-600">
                  {badge}
                </Badge>
              )}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-indigo-800 text-white border-indigo-700"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  // Collapsed sidebar with submenu
  if (!isOpen && hasSubmenu) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center justify-center p-3 mx-1 my-1 rounded-lg relative cursor-pointer transition-all duration-200",
              isActive
                ? "bg-gradient-to-r from-indigo-700 to-indigo-800 text-white shadow-md"
                : "text-indigo-300 hover:bg-indigo-800/40 hover:text-white"
            )}
            onClick={onSubmenuToggle}
          >
            <div className="w-5 h-5">{icon}</div>
            {badge && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-yellow-500 hover:bg-yellow-600">
                {badge}
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="p-0 bg-indigo-800 border-indigo-700 overflow-hidden"
        >
          <div className="py-1 px-2">
            <p className="font-semibold text-white border-b border-indigo-700 pb-1">
              {label}
            </p>
            <div className="space-y-1 mt-1">
              {submenu.map((item, index) => (
                <Link key={index} href={item.route} passHref>
                  <div className="flex items-center gap-2 p-1.5 rounded hover:bg-indigo-700 text-sm whitespace-nowrap">
                    <span className="text-indigo-300">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-1 h-4 min-w-4 flex items-center justify-center p-0 text-xs bg-yellow-500">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  // Expanded sidebar item view (with or without submenu)
  return (
    <div>
      <div
        className={cn(
          "flex items-center p-3 mx-1 my-1 rounded-lg relative cursor-pointer transition-all duration-200 group",
          isActive
            ? "bg-gradient-to-r from-indigo-700 to-indigo-800 text-white shadow-md"
            : "text-indigo-300 hover:bg-indigo-800/40 hover:text-white"
        )}
        onClick={handleItemClick}
      >
        <div className="w-5 h-5 group-hover:transform group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {isOpen && (
          <>
            <span className="ml-3 flex-1 truncate">{label}</span>
            {badge && (
              <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-0 bg-yellow-500 hover:bg-yellow-600">
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

      {/* Submenu Items */}
      {hasSubmenu && isSubmenuOpen && isOpen && (
        <div className="ml-6 space-y-1 pl-2 border-l-2 border-indigo-800/30 animate-fadeIn">
          {submenu.map((item, index) => (
            <Link key={index} href={item.route} passHref>
              <div
                className={cn(
                  "flex items-center p-2 pl-3 rounded-lg text-sm transition-all duration-200",
                  pathname === item.route
                    ? "bg-indigo-800/50 text-white"
                    : "text-indigo-300 hover:bg-indigo-800/30 hover:text-white"
                )}
              >
                <div className="w-4 h-4 mr-3 text-indigo-400">{item.icon}</div>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-0 bg-yellow-500 hover:bg-yellow-600">
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
