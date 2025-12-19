// ============================================
// 1. auth.config.js - Auth configuration
// ============================================

// ============================================
// 2. auth.js - Main auth setup with your backend
// ============================================

// ============================================
// 3. middleware.js - Protect routes (ROOT LEVEL)
// ============================================

// ============================================
// 4. app/api/auth/[...nextauth]/route.js
// ============================================


// ============================================
// 5. app/login/page.js - Updated Login Page
// ============================================

// ============================================
// 6. app/dashboard/page.js - Updated Dashboard
// ============================================
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <DashboardContent session={session} />;
}

// ============================================
// 7. components/DashboardContent.jsx - Client Component
// ============================================
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
import DefaultDashboard from "@/components/dashboard/DefaultDashboard";
import { signOut } from "next-auth/react";

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
    component: TeacherDashboard,
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
    component: DefaultDashboard,
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
    component: DefaultDashboard,
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
      </div>
    </div>
  );
}

export default function DashboardContent({ session }) {
  const currentRole = session?.user?.role || "guest";
  const config = roleConfig[currentRole] || roleConfig.guest;
  const DashboardComponent = config.component;

  return (
    <div className="min-h-screen">
      <div className="bg-background text-foreground">
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                Sign Out
              </Button>
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                {config.avatar}
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {DashboardComponent ? (
            <DashboardComponent user={session.user} />
          ) : (
            <PlaceholderDashboard role={currentRole} />
          )}
        </main>
      </div>
    </div>
  );
}



// ============================================
// 9. .env.local - Environment variables
// ============================================
/*
AUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
*/

// ============================================
// 10. Installation & Setup
// ============================================
/*
1. Install dependencies:
npm install next-auth@beta

2. Generate AUTH_SECRET:
openssl rand -base64 32

3. Add to .env.local:
AUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000

4. File structure:
project/
├── auth.js
├── auth.config.js
├── middleware.js
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.js
│   ├── login/
│   │   └── page.js
│   └── dashboard/
│       └── page.js
├── components/
│   ├── DashboardContent.jsx
│   └── dashboard/
│       ├── AdminDashboard.jsx
│       ├── TeacherDashboard.jsx
│       └── ... (all your role dashboards)
└── lib/
    └── api.js

5. Remove Zustand auth store - no longer needed!

6. Your backend stays exactly the same - no changes needed!
*/