"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Bell, Mail } from "lucide-react";
import Link from "next/link";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import ParentDashboard from "@/components/dashboard/ParentDashboard";
import PrincipalDashboard from "@/components/dashboard/PrincipalDashboard";
import VicePrincipalDashboard from "@/components/dashboard/VicePrincipalDashboard";
import HODDashboard from "@/components/dashboard/HODDashboard";
import LibrarianDashboard from "@/components/dashboard/LibrarianDashboard";
import AccountantDashboard from "@/components/dashboard/AccountantDashboard";
import HRManagerDashboard from "@/components/dashboard/HRManagerDashboard";
import CounselorDashboard from "@/components/dashboard/CounselorDashboard";
import { useAuthStore } from "@/lib/state/stores/authStore";
import DefaultDashboard from "@/components/dashboard/DefaultDashboard";

// Role configuration
const roleConfig = {
  admin: {
    title: "Administrator Dashboard",
    subtitle: "School management overview and analytics",
    avatar: "A",
    component: AdminDashboard,
  },
  principal: {
    title: "Principal Dashboard",
    subtitle: "School leadership and strategic oversight",
    avatar: "P",
    component: PrincipalDashboard,
  },
  vice_principal: {
    title: "Vice Principal Dashboard",
    subtitle: "Academic and administrative coordination",
    avatar: "VP",
    component: VicePrincipalDashboard,
  },
  teacher: {
    title: "Teacher Portal",
    subtitle: "Your classes and teaching resources",
    avatar: "T",
    component: TeacherDashboard,
  },
  faculty: {
    title: "Faculty Portal",
    subtitle: "Your teaching and academic responsibilities",
    avatar: "F",
    component: TeacherDashboard, // Faculty can use same as teacher
  },
  hod: {
    title: "Head of Department Dashboard",
    subtitle: "Department management and faculty coordination",
    avatar: "H",
    component: HODDashboard,
  },
  student: {
    title: "Student Dashboard",
    subtitle: "Your academic progress and schedule",
    avatar: "S",
    component: StudentDashboard,
  },
  parent: {
    title: "Parent Portal",
    subtitle: "Your children's academic information",
    avatar: "P",
    component: ParentDashboard,
  },
  librarian: {
    title: "Librarian Dashboard",
    subtitle: "Library management and book inventory",
    avatar: "L",
    component: LibrarianDashboard,
  },
  accountant: {
    title: "Accountant Dashboard",
    subtitle: "Financial management and fee tracking",
    avatar: "AC",
    component: AccountantDashboard,
  },
  hr_manager: {
    title: "HR Manager Dashboard",
    subtitle: "Human resources and staff management",
    avatar: "HR",
    component: HRManagerDashboard,
  },
  receptionist: {
    title: "Receptionist Dashboard",
    subtitle: "Visitor management and front desk operations",
    avatar: "R",
    component: null, // No component yet
  },
  counselor: {
    title: "Counselor Dashboard",
    subtitle: "Student counseling and guidance services",
    avatar: "C",
    component: CounselorDashboard,
  },
  lab_assistant: {
    title: "Lab Assistant Dashboard",
    subtitle: "Laboratory management and equipment tracking",
    avatar: "LA",
    component: DefaultDashboard,
  },
  transport_incharge: {
    title: "Transport Manager Dashboard",
    subtitle: "Transport operations and route management",
    avatar: "TI",
    component: DefaultDashboard, // No component yet
  },
  driver: {
    title: "Driver Dashboard",
    subtitle: "Route schedule and transport updates",
    avatar: "D",
    component: DefaultDashboard,
  },
  security_guard: {
    title: "Security Dashboard",
    subtitle: "Campus security and visitor monitoring",
    avatar: "SG",
    component: DefaultDashboard,
  },
  maintenance_staff: {
    title: "Maintenance Dashboard",
    subtitle: "Facility maintenance and work orders",
    avatar: "M",
    component: DefaultDashboard,
  },
  vendor: {
    title: "Vendor Portal",
    subtitle: "Supply management and invoicing",
    avatar: "V",
    component: DefaultDashboard,
  },
  guest: {
    title: "Guest Portal",
    subtitle: "Limited access information",
    avatar: "G",
    component: DefaultDashboard,
  },
};

// Placeholder component for roles without specific dashboards
function PlaceholderDashboard({ role }) {
  const config = roleConfig[role] || {};

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <span className="text-4xl font-bold text-primary">
            {config.avatar || "?"}
          </span>
        </div>
        <h2 className="text-2xl font-bold">{config.title || "Dashboard"}</h2>
        <p className="text-muted-foreground max-w-md">
          {config.subtitle || "Dashboard under development"}
        </p>
        <div className="mt-6 p-4 bg-muted rounded-lg max-w-md mx-auto">
          <p className="text-sm text-muted-foreground">
            This dashboard is currently under development. Check back soon for
            updates!
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SchoolDashboard() {
  const { user } = useAuthStore();

  const currentRole = user?.role || "guest";
  const config = roleConfig[currentRole] || roleConfig.guest;
  const DashboardComponent = config.component;

  return (
    <div className={`min-h-screen `}>
      <div className="bg-background text-foreground">
        {/* Header */}
        <header className="border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold">{config.title}</h1>
              <p className="text-sm text-muted-foreground">{config.subtitle}</p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
              <Link href="/calendar">
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  View Calendar
                </Button>
              </Link>
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                {config.avatar}
              </div>
            </div>
          </div>
        </header>

        {/* Role-Specific Dashboard Content */}
        <main className="p-6">
          {DashboardComponent ? (
            <DashboardComponent />
          ) : (
            <PlaceholderDashboard role={currentRole} />
          )}
        </main>
      </div>
    </div>
  );
}
