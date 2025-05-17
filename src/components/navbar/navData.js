import {
  AlertTriangle,
  BarChart,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  ClipboardList,
  Clock,
  CreditCard,
  DollarSign,
  FileBarChart,
  FileText,
  HeartPulse,
  Image,
  Library,
  Mail,
  Medal,
  Megaphone,
  MessageSquare,
  School,
  Search,
  Settings,
  Shield,
  User,
  UserPlus,
  Users,
  Video,
} from "lucide-react";

export const studentSubmenu = [
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
];

export const facultySubmenu = [
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
];

export const classSubmenu = [
  {
    label: "All Classes",
    icon: <BookOpen size={16} />,
    route: "/classes",
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
];

export const examSubmenu = [
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
];

export const healthSubmenu = [
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
];

export const transportationSubmenu = [
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
];

export const foodSubmenu = [
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
];

export const financeSubmenu = [
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
];

export const communicationSubmenu = [
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
];

export const mediaSubmenu = [
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
];

export const schoolAdminSubmenu = [
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
];

export const settingsSubmenu = [
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
];
