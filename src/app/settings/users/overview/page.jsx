import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge, BookOpen, Car, Package, Shield, Users } from "lucide-react";

// Sample user data
export const users = [
  {
    id: 1,
    role: "principal",
    status: "active",
    lastLogin: "2024-01-15",
    name: "Dr. John Smith",
    email: "john.smith@school.edu",
    phone: "+91-9876543210",
    qualification: "PhD in Education",
    experience_years: 15,
    joining_date: "2020-01-15",
    address: "123 School Street, City",
    emergency_contact: "+91-9876543211",
  },
  {
    id: 2,
    role: "hod",
    status: "active",
    lastLogin: "2024-01-14",
    name: "Dr. Sarah Johnson",
    email: "sarah.j@school.edu",
    phone: "+91-9876543220",
    department: "Mathematics",
    qualification: "PhD in Mathematics",
    specialization: "Applied Mathematics",
    experience_years: 12,
    joining_date: "2021-06-01",
    employee_id: "EMP001",
  },
  {
    id: 3,
    role: "transport_incharge",
    status: "active",
    lastLogin: "2024-01-13",
    name: "Ms. Emily Davis",
    email: "emily.d@school.edu",
    phone: "+91-9876543230",
    qualification: "Masters in Library Science",
    library_science_degree: "MLIS",
    experience_years: 8,
    joining_date: "2022-03-15",
    employee_id: "LIB001",
    shift_timing: "Morning",
  },
  {
    id: 4,
    role: "librarian",
    status: "active",
    lastLogin: "2024-01-13",
    name: "Ms. Emily Davis",
    email: "emily.d@school.edu",
    phone: "+91-9876543230",
    qualification: "Masters in Library Science",
    library_science_degree: "MLIS",
    experience_years: 8,
    joining_date: "2022-03-15",
    employee_id: "LIB001",
    shift_timing: "Morning",
  },
  {
    id: 5,
    role: "admin",
    status: "active",
    lastLogin: "2024-01-13",
    name: "Ms. Emily Davis",
    email: "emily.d@school.edu",
    phone: "+91-9876543230",
    qualification: "Masters in Library Science",
    library_science_degree: "MLIS",
    experience_years: 8,
    joining_date: "2022-03-15",
    employee_id: "LIB001",
    shift_timing: "Morning",
  },
  {
    id: 6,
    role: "faculty",
    status: "active",
    lastLogin: "2024-01-13",
    name: "Ms. Emily Davis",
    email: "emily.d@school.edu",
    phone: "+91-9876543230",
    qualification: "Masters in Library Science",
    library_science_degree: "MLIS",
    experience_years: 8,
    joining_date: "2022-03-15",
    employee_id: "LIB001",
    shift_timing: "Morning",
  },
  {
    id: 7,
    role: "librarian",
    status: "active",
    lastLogin: "2024-01-13",
    name: "Ms. Emily Davis",
    email: "emily.d@school.edu",
    phone: "+91-9876543230",
    qualification: "Masters in Library Science",
    library_science_degree: "MLIS",
    experience_years: 8,
    joining_date: "2022-03-15",
    employee_id: "LIB001",
    shift_timing: "Morning",
  },
  {
    id: 8,
    role: "parent",
    status: "inactive",
    lastLogin: "2024-01-13",
    name: "Ms. Emily Davis",
    email: "emily.d@school.edu",
    phone: "+91-9876543230",
    qualification: "Masters in Library Science",
    library_science_degree: "MLIS",
    experience_years: 8,
    joining_date: "2022-03-15",
    employee_id: "LIB001",
    shift_timing: "Morning",
  },
  {
    id: 9,
    role: "librarian",
    status: "active",
    lastLogin: "2024-01-13",
    name: "Ms. Emily Davis",
    email: "emily.d@school.edu",
    phone: "+91-9876543230",
    qualification: "Masters in Library Science",
    library_science_degree: "MLIS",
    experience_years: 8,
    joining_date: "2022-03-15",
    employee_id: "LIB001",
    shift_timing: "Morning",
  },
];

export const roleDisplayNames = {
  super_admin: "Super Admin",
  admin: "Admin",
  principal: "Principal",
  vice_principal: "Vice Principal",
  hod: "Head of Department",
  counselor: "Counselor",
  librarian: "Librarian",
  accountant: "Accountant",
  hr_manager: "HR Manager",
  receptionist: "Receptionist",
  lab_assistant: "Lab Assistant",
  transport_incharge: "Transport In-charge",
  vendor: "Vendor",
  guest: "Guest",
  parent: "Parent",
};
// User categories for better organization
export const userCategories = {
  administration: {
    title: "Administration",
    icon: Shield,
    roles: ["super_admin", "admin", "principal", "vice_principal"],
    color: "bg-red-50 border-red-200 text-red-800",
  },
  academic: {
    title: "Academic Staff",
    icon: BookOpen,
    roles: ["hod", "counselor"],
    color: "bg-blue-50 border-blue-200 text-blue-800",
  },
  support: {
    title: "Support Staff",
    icon: Users,
    roles: [
      "librarian",
      "accountant",
      "hr_manager",
      "receptionist",
      "lab_assistant",
    ],
    color: "bg-green-50 border-green-200 text-green-800",
  },
  services: {
    title: "Services",
    icon: Car,
    roles: ["transport_incharge"],
    color: "bg-purple-50 border-purple-200 text-purple-800",
  },
  external: {
    title: "External",
    icon: Package,
    roles: ["vendor", "guest", "parent"],
    color: "bg-orange-50 border-orange-200 text-orange-800",
  },
};

export default function UsersOverviewPage() {
  const UserCategoryCard = ({ category, categoryKey }) => {
    const Icon = category.icon;
    const categoryUsers = users.filter((user) =>
      category.roles.includes(user.role)
    );

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-black text-white">
              <Icon size={20} />
            </div>
            <div>
              <CardTitle className="text-lg">{category.title}</CardTitle>
              <CardDescription>{categoryUsers.length} users</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categoryUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-full border bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-600">
                      {roleDisplayNames[user.role]}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    user.status === "active"
                      ? "border-green-200 text-green-800 bg-green-50"
                      : "border-red-200 text-red-800 bg-red-50"
                  }`}
                >
                  {user.status}
                </Badge>
              </div>
            ))}
            {categoryUsers.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No users in this category
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  // User categories for better organization
  const userCategories = {
    administration: {
      title: "Administration",
      icon: Shield,
      roles: ["super_admin", "admin", "principal", "vice_principal"],
      color: "bg-red-50 border-red-200 text-red-800",
    },
    academic: {
      title: "Academic Staff",
      icon: BookOpen,
      roles: ["hod", "counselor"],
      color: "bg-blue-50 border-blue-200 text-blue-800",
    },
    support: {
      title: "Support Staff",
      icon: Users,
      roles: [
        "librarian",
        "accountant",
        "hr_manager",
        "receptionist",
        "lab_assistant",
      ],
      color: "bg-green-50 border-green-200 text-green-800",
    },
    services: {
      title: "Services",
      icon: Car,
      roles: ["transport_incharge"],
      color: "bg-purple-50 border-purple-200 text-purple-800",
    },
    external: {
      title: "External",
      icon: Package,
      roles: ["vendor", "guest", "parent"],
      color: "bg-orange-50 border-orange-200 text-orange-800",
    },
  };

  return (
    <div value="overview" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(userCategories).map(([key, category]) => (
          <UserCategoryCard key={key} category={category} categoryKey={key} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-full bg-green-50 border border-green-200">
              <div className="text-2xl font-bold text-green-800">
                {users.filter((u) => u.status === "active").length}
              </div>
              <div className="text-sm text-green-600">Active Users</div>
            </div>
            <div className="text-center p-4 rounded-full bg-red-50 border border-red-200">
              <div className="text-2xl font-bold text-red-800">
                {users.filter((u) => u.status === "inactive").length}
              </div>
              <div className="text-sm text-red-600">Inactive Users</div>
            </div>
            <div className="text-center p-4 rounded-full bg-blue-50 border border-blue-200">
              <div className="text-2xl font-bold text-blue-800">
                {users.length}
              </div>
              <div className="text-sm text-blue-600">Total Users</div>
            </div>
            <div className="text-center p-4 rounded-full bg-purple-50 border border-purple-200">
              <div className="text-2xl font-bold text-purple-800">
                {Object.keys(userCategories).length}
              </div>
              <div className="text-sm text-purple-600">User Categories</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
