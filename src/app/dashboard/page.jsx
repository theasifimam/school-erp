// ============================================
// 6. app/dashboard/page.js - Updated Dashboard
// ============================================
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SchoolDashboard from "../page";
// import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <SchoolDashboard session={session} />;
}
