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
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-black hover:bg-gray-100 rounded-full"
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

        {/* Badge for notification count near profile */}
        {/* {!isOpen && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2">
            <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs rounded-full">
              12
            </Badge>
          </div>
        )} */}

        {/* Sidebar Navigation */}
        <nav className="flex flex-col mt-2 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent h-[calc(100vh-180px)]">
          <SidebarSection title="Main" isOpen={isOpen}>
            <SidebarItem
              icon={
                <Home
                  className={
                    pathname?.startsWith("/")
                      ? "text-white-600"
                      : "text-gray-600"
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
              submenu={[
                {
                  label: "All Faculty",
                  icon: <Users size={16} />,
                  route: "/faculty/all",
                },
                {
                  label: "Assign Classes",
                  icon: <BookOpen size={16} />,
                  route: "/faculty/assign",
                },
                {
                  label: "Attendance",
                  icon: <ClipboardList size={16} />,
                  route: "/faculty/attendance",
                },
                {
                  label: "Performance Review",
                  icon: <FileBarChart size={16} />,
                  route: "/faculty/performance",
                },
                {
                  label: "Professional Development",
                  icon: <BookOpen size={16} />,
                  route: "/faculty/development",
                },
              ]}
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
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
                "flex items-center justify-center p-3 mx-1 my-1.5 rounded-full relative transition-all duration-200",
                isActive
                  ? "bg-gray-800 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              )}
            >
              <div className="w-5 h-5">{icon}</div>
              {badge && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-600 text-white rounded-full">
                  {badge}
                </Badge>
              )}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-white text-black border-gray-200"
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
              "flex items-center justify-center p-3 mx-1 my-1.5 rounded-full relative cursor-pointer transition-all duration-200",
              isActive
                ? "bg-gray-800 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            )}
            onClick={onSubmenuToggle}
          >
            <div className="w-5 h-5">{icon}</div>
            {badge && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-600 text-white rounded-full">
                {badge}
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="p-0 bg-white border-gray-200 overflow-hidden rounded-xl"
        >
          <div className="py-1.5 px-2">
            <p className="font-semibold text-black border-b border-gray-200 pb-1.5">
              {label}
            </p>
            <div className="space-y-1 mt-1.5">
              {submenu.map((item, index) => (
                <Link href={item.route} key={index} passHref>
                  <div className="flex items-center gap-2 py-1.5 px-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="h-5 ml-auto bg-red-500 hover:bg-red-600 text-white">
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

  // Expanded sidebar view
  return (
    <div className="mb-0.5">
      {/* Main Item */}
      <div
        className={cn(
          "relative flex items-center gap-3 px-3 py-2.5 mx-1.5 my-0.5 rounded-full cursor-pointer group transition-all duration-200",
          isActive
            ? "bg-gray-800 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100 hover:text-black"
        )}
        onClick={handleItemClick}
      >
        {route && !hasSubmenu ? (
          <Link href={route} className="flex items-center gap-3 w-full">
            <div
              className={cn(
                "w-6 h-6 flex-shrink-0",
                isActive ? "text-white" : "text-gray-600 group-hover:text-black"
              )}
            >
              {icon}
            </div>
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ) : (
          <>
            <div
              className={cn(
                "w-6 h-6 flex-shrink-0",
                isActive ? "text-white" : "text-gray-600 group-hover:text-black"
              )}
            >
              {icon}
            </div>
            <span className="text-sm font-medium flex-1">{label}</span>
            {hasSubmenu && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isSubmenuOpen && "transform rotate-180",
                  isActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-black"
                )}
              />
            )}
          </>
        )}
        {badge && (
          <Badge
            className={cn(
              "ml-auto",
              isActive
                ? "bg-white text-gray-800"
                : "bg-red-500 hover:bg-red-600 text-white"
            )}
          >
            {badge}
          </Badge>
        )}
      </div>

      {/* Submenu */}
      {hasSubmenu && isSubmenuOpen && (
        <div className="mt-1 ml-4 pl-4 border-l border-gray-200 space-y-0.5">
          {submenu.map((item, index) => {
            const isItemActive = pathname === item.route;
            return (
              <Link href={item.route} key={index} passHref>
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-full text-sm group transition-colors",
                    isItemActive
                      ? "bg-gray-100 text-black font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-black"
                  )}
                >
                  <div className="w-4 h-4 text-gray-500 group-hover:text-black">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-red-500 hover:bg-red-600 text-white">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
