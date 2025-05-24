import {
  Users,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "total",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Enrolled",
    value: "active",
    icon: GraduationCap,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Pending",
    value: "pending",
    icon: Clock,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Accepted",
    value: "accepted",
    icon: CheckCircle,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Rejected",
    value: "rejected",
    icon: XCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Drafts",
    value: "draft",
    icon: FileText,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
];

export function StatsCards({
  overviewStats = {
    total: "23K",
    active: "12.6K",
    pending: "5.4K",
    accepted: "3.8K",
    rejected: "1.1K",
    draft: "2K",
  },
}) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4`}
    >
      {stats.map((stat) => (
        <div key={stat.value} className="p-3 rounded-full shadow-xs border">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 ${stat.iconBg} rounded-full flex items-center justify-center`}
            >
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 truncate">{stat.title}</p>
              <h3 className="text-lg font-semibold truncate">
                {overviewStats[stat.value]}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
