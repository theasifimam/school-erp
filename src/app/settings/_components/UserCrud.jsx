"use Client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, Eye, Filter } from "lucide-react";
import { getAssignableRoles } from "@/lib/utils/userUtils";
import { useAuthStore } from "@/lib/state/stores/authStore";

const UserCRUD = ({ users, setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isViewUserOpen, setIsViewUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { user, isLoading } = useAuthStore();

  // Define user role configurations with specific fields
  const userRoleConfigs = {
    super_admin: {
      title: "Super Admin",
      color: "bg-red-50 border-red-200 text-red-800",
      fields: [
        "name",
        "email",
        "phone",
        "emergency_contact",
        "access_level",
        "department",
      ],
    },
    admin: {
      title: "Admin",
      color: "bg-red-50 border-red-200 text-red-800",
      fields: [
        "name",
        "email",
        "phone",
        "department",
        "access_level",
        "reports_to",
      ],
    },
    principal: {
      title: "Principal",
      color: "bg-purple-50 border-purple-200 text-purple-800",
      fields: [
        "name",
        "email",
        "phone",
        "qualification",
        "experience_years",
        "joining_date",
        "address",
        "emergency_contact",
      ],
    },
    vice_principal: {
      title: "Vice Principal",
      color: "bg-purple-50 border-purple-200 text-purple-800",
      fields: [
        "name",
        "email",
        "phone",
        "qualification",
        "experience_years",
        "specialization",
        "joining_date",
        "reports_to",
      ],
    },
    hod: {
      title: "Head of Department",
      color: "bg-blue-50 border-blue-200 text-blue-800",
      fields: [
        "name",
        "email",
        "phone",
        "department",
        "qualification",
        "specialization",
        "experience_years",
        "joining_date",
        "employee_id",
      ],
    },
    counselor: {
      title: "Counselor",
      color: "bg-green-50 border-green-200 text-green-800",
      fields: [
        "name",
        "email",
        "phone",
        "qualification",
        "specialization",
        "license_number",
        "experience_years",
        "joining_date",
        "consultation_hours",
      ],
    },
    librarian: {
      title: "Librarian",
      color: "bg-indigo-50 border-indigo-200 text-indigo-800",
      fields: [
        "name",
        "email",
        "phone",
        "qualification",
        "library_science_degree",
        "experience_years",
        "joining_date",
        "employee_id",
        "shift_timing",
      ],
    },
    accountant: {
      title: "Accountant",
      color: "bg-yellow-50 border-yellow-200 text-yellow-800",
      fields: [
        "name",
        "email",
        "phone",
        "qualification",
        "certification",
        "experience_years",
        "joining_date",
        "employee_id",
        "department",
      ],
    },
    hr_manager: {
      title: "HR Manager",
      color: "bg-pink-50 border-pink-200 text-pink-800",
      fields: [
        "name",
        "email",
        "phone",
        "qualification",
        "hr_certification",
        "experience_years",
        "joining_date",
        "employee_id",
        "department",
      ],
    },
    receptionist: {
      title: "Receptionist",
      color: "bg-cyan-50 border-cyan-200 text-cyan-800",
      fields: [
        "name",
        "email",
        "phone",
        "qualification",
        "languages_known",
        "joining_date",
        "employee_id",
        "shift_timing",
      ],
    },
    lab_assistant: {
      title: "Lab Assistant",
      color: "bg-orange-50 border-orange-200 text-orange-800",
      fields: [
        "name",
        "email",
        "phone",
        "qualification",
        "lab_specialization",
        "experience_years",
        "joining_date",
        "employee_id",
        "lab_assigned",
      ],
    },
    transport_incharge: {
      title: "Transport In-charge",
      color: "bg-emerald-50 border-emerald-200 text-emerald-800",
      fields: [
        "name",
        "email",
        "phone",
        "driving_license",
        "license_expiry",
        "experience_years",
        "joining_date",
        "employee_id",
        "routes_managed",
      ],
    },
    vendor: {
      title: "Vendor",
      color: "bg-slate-50 border-slate-200 text-slate-800",
      fields: [
        "name",
        "email",
        "phone",
        "company_name",
        "gst_number",
        "services_provided",
        "contract_start",
        "contract_end",
        "address",
      ],
    },
    security_guard: {
      title: "Security Guard",
      color: "bg-slate-50 border-slate-200 text-slate-800",
      fields: ["name", "email", "phone", "address"],
    },
    driver: {
      title: "Driver",
      color: "bg-slate-50 border-slate-200 text-slate-800",
      fields: ["name", "email", "phone", "address"],
    },
    maintenance_staff: {
      title: "Maintenance Staff",
      color: "bg-slate-50 border-slate-200 text-slate-800",
      fields: ["name", "email", "phone", "address"],
    },
    guest: {
      title: "Guest",
      color: "bg-gray-50 border-gray-200 text-gray-800",
      fields: [
        "name",
        "email",
        "phone",
        "purpose_of_visit",
        "visiting_department",
        "visit_date",
        "id_proof_type",
        "id_proof_number",
      ],
    },
    parent: {
      title: "Parent",
      color: "bg-teal-50 border-teal-200 text-teal-800",
      fields: [
        "name",
        "email",
        "phone",
        "occupation",
        "student_name",
        "student_class",
        "relationship",
        "address",
        "emergency_contact",
      ],
    },
  };

  // Field configurations for form rendering
  const fieldConfigs = {
    name: { label: "Full Name", type: "text", required: true },
    email: { label: "Email Address", type: "email", required: true },
    phone: { label: "Phone Number", type: "tel", required: true },
    emergency_contact: {
      label: "Emergency Contact",
      type: "tel",
      required: false,
    },
    access_level: {
      label: "Access Level",
      type: "select",
      options: ["Full", "Limited", "Read Only"],
      required: false,
    },
    department: {
      label: "Department",
      type: "select",
      options: ["Administration", "Academic", "Finance", "HR", "IT"],
      required: false,
    },
    qualification: { label: "Qualification", type: "text", required: false },
    experience_years: {
      label: "Experience (Years)",
      type: "number",
      required: false,
    },
    joining_date: { label: "Joining Date", type: "date", required: false },
    address: { label: "Address", type: "textarea", required: false },
    reports_to: { label: "Reports To", type: "text", required: false },
    specialization: { label: "Specialization", type: "text", required: false },
    employee_id: { label: "Employee ID", type: "text", required: false },
    license_number: { label: "License Number", type: "text", required: false },
    consultation_hours: {
      label: "Consultation Hours",
      type: "text",
      required: false,
    },
    library_science_degree: {
      label: "Library Science Degree",
      type: "text",
      required: false,
    },
    shift_timing: {
      label: "Shift Timing",
      type: "select",
      options: ["Morning", "Evening", "Night", "Rotating"],
      required: false,
    },
    certification: { label: "Certification", type: "text", required: false },
    hr_certification: {
      label: "HR Certification",
      type: "text",
      required: false,
    },
    languages_known: {
      label: "Languages Known",
      type: "text",
      required: false,
    },
    lab_specialization: {
      label: "Lab Specialization",
      type: "select",
      options: ["Physics", "Chemistry", "Biology", "Computer", "General"],
      required: false,
    },
    lab_assigned: { label: "Lab Assigned", type: "text", required: false },
    driving_license: {
      label: "Driving License",
      type: "text",
      required: false,
    },
    license_expiry: { label: "License Expiry", type: "date", required: false },
    routes_managed: {
      label: "Routes Managed",
      type: "textarea",
      required: false,
    },
    company_name: { label: "Company Name", type: "text", required: false },
    gst_number: { label: "GST Number", type: "text", required: false },
    services_provided: {
      label: "Services Provided",
      type: "textarea",
      required: false,
    },
    contract_start: {
      label: "Contract Start Date",
      type: "date",
      required: false,
    },
    contract_end: { label: "Contract End Date", type: "date", required: false },
    purpose_of_visit: {
      label: "Purpose of Visit",
      type: "text",
      required: false,
    },
    visiting_department: {
      label: "Visiting Department",
      type: "text",
      required: false,
    },
    visit_date: { label: "Visit Date", type: "date", required: false },
    id_proof_type: {
      label: "ID Proof Type",
      type: "select",
      options: ["Aadhar", "PAN", "Passport", "Driving License"],
      required: false,
    },
    id_proof_number: {
      label: "ID Proof Number",
      type: "text",
      required: false,
    },
    occupation: { label: "Occupation", type: "text", required: false },
    student_name: { label: "Student Name", type: "text", required: false },
    student_class: { label: "Student Class", type: "text", required: false },
    relationship: {
      label: "Relationship",
      type: "select",
      options: ["Father", "Mother", "Guardian"],
      required: false,
    },
  };

  const [formData, setFormData] = useState({ role: user?.role });

  useEffect(() => {
    !isLoading && setFormData({ role: user?.role });
  }, [isLoading]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const initializeFormData = (role, existingData = {}) => {
    const config = userRoleConfigs[role];
    if (!config) return {};

    const initialData = { role, status: "active" };
    config.fields.forEach((field) => {
      initialData[field] = existingData[field] || "";
    });
    return initialData;
  };

  const handleAddUser = () => {
    if (formData.name && formData.email && formData.role) {
      const newUser = {
        id: users.length + 1,
        ...formData,
        lastLogin: "Never",
      };
      setUsers([...users, newUser]);
      setFormData({});
      setIsAddUserOpen(false);
    }
  };

  const handleEditUser = () => {
    if (selectedUser && formData.name && formData.email) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...formData } : user
        )
      );
      setFormData({});
      setSelectedUser(null);
      setIsEditUserOpen(false);
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
  };

  const openEditDialog = (user) => {
    setSelectedUser(user);
    setFormData(initializeFormData(user.role, user));
    setIsEditUserOpen(true);
  };

  const openViewDialog = (user) => {
    setSelectedUser(user);
    setIsViewUserOpen(true);
  };

  const renderFormField = (fieldKey) => {
    const config = fieldConfigs[fieldKey];
    if (!config) return null;

    const value = formData[fieldKey] || "";

    switch (config.type) {
      case "select":
        return (
          <div key={fieldKey}>
            <Label htmlFor={fieldKey}>
              {config.label} {config.required && "*"}
            </Label>
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, [fieldKey]: val })
              }
              value={value}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${config.label}`} />
              </SelectTrigger>
              <SelectContent>
                {config.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case "textarea":
        return (
          <div key={fieldKey}>
            <Label htmlFor={fieldKey}>
              {config.label} {config.required && "*"}
            </Label>
            <Textarea
              id={fieldKey}
              value={value}
              onChange={(e) =>
                setFormData({ ...formData, [fieldKey]: e.target.value })
              }
              placeholder={`Enter ${config.label}`}
              rows={3}
            />
          </div>
        );
      default:
        return (
          <div key={fieldKey}>
            <Label htmlFor={fieldKey}>
              {config.label} {config.required && "*"}
            </Label>
            <Input
              id={fieldKey}
              type={config.type}
              value={value}
              onChange={(e) =>
                setFormData({ ...formData, [fieldKey]: e.target.value })
              }
              placeholder={`Enter ${config.label}`}
              required={config.required}
            />
          </div>
        );
    }
  };

  const renderUserForm = (isEdit = false) => {
    const selectedRole = formData.role;
    if (!selectedRole) return null;

    const config = userRoleConfigs[selectedRole];
    if (!config) return null;

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {!isEdit && (
          <div>
            <Label htmlFor="role">User Role *</Label>
            <Select
              onValueChange={(value) => setFormData(initializeFormData(value))}
              value={selectedRole}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {getAssignableRoles(user?.role)?.map((role, i) => (
                  <SelectItem key={i} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.fields.map((field) => renderFormField(field))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <CardTitle className="text-2xl">User Management</CardTitle>
                <CardDescription>
                  Manage all system users with role-specific information
                </CardDescription>
              </div>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-black hover:bg-gray-800 text-white">
                    <Plus size={16} className="mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-w-[300px]">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account with role-specific information
                    </DialogDescription>
                  </DialogHeader>

                  {renderUserForm()}
                  <div className="flex gap-2 row justify-end pt-4">
                    <Button onClick={handleAddUser}>Add User</Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddUserOpen(false);
                        setFormData({});
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          {/* Table Section */}
          <CardContent>
            {/* Search and Role Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {Object.entries(userRoleConfigs).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-4xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className=" border-b">
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Last Login</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b last:border-b-0">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                              {user.name?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm ">{user.email}</p>
                              {user.phone && (
                                <p className="text-xs text-gray-500">
                                  {user.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={userRoleConfigs[user.role]?.color}
                          >
                            {userRoleConfigs[user.role]?.title}
                          </Badge>
                          {user.department && (
                            <p className="text-xs text-gray-500 mt-1">
                              {user.department}
                            </p>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={
                              user.status === "active"
                                ? "border-green-200 text-green-800 bg-green-50"
                                : "border-red-200 text-red-800 bg-red-50"
                            }
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm ">{user.lastLogin}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openViewDialog(user)}
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Eye size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(user)}
                              className="hover:bg-gray-100"
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleUserStatus(user.id)}
                              className="hover:bg-yellow-50 hover:text-yellow-600 text-xs"
                            >
                              {user.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td
                          colSpan="5"
                          className="p-8 text-center text-gray-500"
                        >
                          No users found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit User Dialog */}
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit User: {selectedUser?.name}</DialogTitle>
              <DialogDescription>Update user information</DialogDescription>
            </DialogHeader>
            {renderUserForm(true)}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditUserOpen(false);
                  setSelectedUser(null);
                  setFormData({});
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditUser}
                className="bg-black hover:bg-gray-800"
              >
                Update User
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* View User Dialog */}
        <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                  {selectedUser?.name?.charAt(0)}
                </div>
                {selectedUser?.name}
              </DialogTitle>
              <DialogDescription>
                <Badge
                  variant="outline"
                  className={userRoleConfigs[selectedUser?.role]?.color}
                >
                  {userRoleConfigs[selectedUser?.role]?.title}
                </Badge>
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userRoleConfigs[selectedUser.role]?.fields.map((field) => {
                    const config = fieldConfigs[field];
                    const value = selectedUser[field];
                    if (!value) return null;

                    return (
                      <div key={field} className="p-3 bg-gray-50 rounded-lg">
                        <Label className="text-sm font-medium ">
                          {config.label}
                        </Label>
                        <p className="text-sm mt-1 text-gray-900">{value}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 pt-4 border-t">
                  <Badge
                    variant="outline"
                    className={
                      selectedUser.status === "active"
                        ? "border-green-200 text-green-800 bg-green-50"
                        : "border-red-200 text-red-800 bg-red-50"
                    }
                  >
                    Status: {selectedUser.status}
                  </Badge>
                  <p className="text-sm ">
                    Last Login: {selectedUser.lastLogin}
                  </p>
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => setIsViewUserOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserCRUD;
