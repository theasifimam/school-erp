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
          className="bg-white/10 backdrop-blur-md text-slate-100 border-slate-700/30 hover:bg-white/20 shadow-lg rounded-xl"
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
          "fixed lg:relative h-screen transition-all duration-300 ease-in-out z-40 shadow-2xl",
          isOpen ? "w-72" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "bg-gradient-to-b from-slate-900/95 via-slate-900 to-slate-950 backdrop-blur-xl text-white rounded-r-2xl"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800/30">
          {isOpen ? (
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-1.5 rounded-xl shadow-lg">
                <School className="text-white" size={24} />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                EduManage Pro
              </h1>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-full">
                  <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-1.5 rounded-xl shadow-lg">
                    <School className="text-white" size={24} />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-slate-800 text-white border-slate-700"
              >
                EduManage Pro
              </TooltipContent>
            </Tooltip>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl"
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sky-400 transition-colors" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 bg-slate-800/30 border-slate-700/30 focus:border-sky-400 text-white placeholder:text-slate-400 rounded-xl transition-all focus:ring-2 focus:ring-sky-400/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Badge for notification count near profile */}
        {!isOpen && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2">
            <Badge className="bg-rose-500 hover:bg-rose-600 text-xs rounded-full">
              12
            </Badge>
          </div>
        )}

        {/* Sidebar Navigation */}
        <nav className="flex flex-col mt-2 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent h-[calc(100vh-180px)]">
          <SidebarSection title="Main" isOpen={isOpen}>
            <SidebarItem
              icon={<Home className="text-sky-400" />}
              label="Dashboard"
              route="/"
              isOpen={isOpen}
              isActive={pathname === "/"}
            />

            <SidebarItem
              icon={<Megaphone className="text-rose-400" />}
              label="Announcements"
              route="/announcements"
              isOpen={isOpen}
              isActive={pathname === "/announcements"}
              badge={3}
            />

            <SidebarItem
              icon={<Calendar className="text-violet-400" />}
              label="School Calendar"
              route="/calendar"
              isOpen={isOpen}
              isActive={pathname === "/calendar"}
            />
          </SidebarSection>

          <SidebarSection title="Academic" isOpen={isOpen}>
            <SidebarItem
              icon={<GraduationCap className="text-amber-400" />}
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
              icon={<User className="text-emerald-400" />}
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
              icon={<BookOpen className="text-blue-400" />}
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
              icon={<Medal className="text-amber-400" />}
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
              icon={<HeartPulse className="text-rose-400" />}
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
              icon={<Bus className="text-amber-400" />}
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
              icon={<Utensils className="text-green-400" />}
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
              icon={<DollarSign className="text-emerald-400" />}
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
              icon={<MessageSquareDot className="text-violet-400" />}
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
              icon={<Image className="text-pink-400" />}
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
            <Separator className="bg-slate-800/50" />
          </div>

          <SidebarItem
            icon={<Building className="text-slate-400" />}
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
            icon={<Settings className="text-slate-400" />}
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
            icon={<HelpCircle className="text-slate-400" />}
            label="Help & Support"
            route="/support"
            isOpen={isOpen}
            isActive={pathname === "/support"}
          />
        </nav>

        {/* User Profile & Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-800/30 bg-gradient-to-b from-slate-900/50 to-slate-950 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Avatar className="cursor-pointer border-2 border-slate-700/50 hover:border-sky-400 transition-colors rounded-xl">
                    <AvatarImage
                      src="https://randomuser.me/api/portraits/women/45.jpg"
                      alt="Principal"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl">
                      PS
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-slate-800 text-white border-slate-700"
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
                    <span className="text-xs text-slate-400 truncate">
                      principal@edumanage.edu
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 relative rounded-xl"
                        >
                          <Bell size={16} />
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-xs rounded-full flex items-center justify-center">
                            4
                          </span>
                          <span className="sr-only">Notifications</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-slate-800 text-white border-slate-700"
                      >
                        Notifications
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl"
                        >
                          <MessageSquare size={16} />
                          <span className="sr-only">Messages</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-slate-800 text-white border-slate-700"
                      >
                        Messages
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl"
                          onClick={() => router.push("/logout")}
                        >
                          <LogOut size={16} />
                          <span className="sr-only">Logout</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-slate-800 text-white border-slate-700"
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
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
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
                "flex items-center justify-center p-3 mx-1 my-1.5 rounded-xl relative transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-white shadow-lg ring-1 ring-white/10"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="w-5 h-5">{icon}</div>
              {badge && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500 hover:bg-rose-600 rounded-full">
                  {badge}
                </Badge>
              )}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-slate-800 text-white border-slate-700"
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
              "flex items-center justify-center p-3 mx-1 my-1.5 rounded-xl relative cursor-pointer transition-all duration-200",
              isActive
                ? "bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-white shadow-lg ring-1 ring-white/10"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
            onClick={onSubmenuToggle}
          >
            <div className="w-5 h-5">{icon}</div>
            {badge && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500 hover:bg-rose-600 rounded-full">
                {badge}
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="p-0 bg-slate-800 border-slate-700 overflow-hidden rounded-xl"
        >
          <div className="py-1.5 px-2">
            <p className="font-semibold text-white border-b border-slate-700/50 pb-1.5">
              {label}
            </p>
            <div className="space-y-1 mt-1.5">
              {submenu.map((item, index) => (
                <Link href={item.route} key={index} passHref>
                  <div className="flex items-center gap-2 py-1.5 px-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="h-5 ml-auto bg-rose-500 hover:bg-rose-600">
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

  // Expanded sidebar item view
  return (
    <div className="mb-1">
      <Link
        href={hasSubmenu ? "#" : route || "#"}
        passHref
        onClick={handleItemClick}
      >
        <div
          className={cn(
            "flex items-center justify-between px-3 py-2.5 mx-1 rounded-xl transition-all duration-200 group",
            isActive
              ? "bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-white shadow-lg"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5">{icon}</div>
            <span className="font-medium text-sm">{label}</span>
            {badge && (
              <Badge className="bg-rose-500 hover:bg-rose-600">{badge}</Badge>
            )}
          </div>
          {hasSubmenu && (
            <div
              className={cn(
                "transition-transform duration-200",
                isSubmenuOpen ? "rotate-90" : ""
              )}
            >
              <ChevronRight size={16} className="text-slate-400" />
            </div>
          )}
        </div>
      </Link>

      {/* Submenu */}
      {hasSubmenu && isSubmenuOpen && (
        <div className="mt-1 ml-4 pl-4 border-l border-slate-800/50 space-y-1">
          {submenu.map((item, index) => (
            <Link href={item.route} key={index} passHref>
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                  pathname === item.route
                    ? "bg-sky-500/10 text-sky-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <Badge className="ml-auto bg-rose-500 hover:bg-rose-600">
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
