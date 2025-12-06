"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import {
  getAssignableRoles,
  userRoleConfigs,
  fieldConfigs,
} from "@/lib/utils/userUtils";
import { useAuthStore } from "@/lib/state/stores/authStore";
import { useUserStore } from "@/lib/state/stores/userStore";
import { useToast } from "@/lib/hooks/useToast";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ViewUserModal from "./ViewUserModal";
import { Pagination } from "@/components/common/Pagination";
import { DeleteConfirmationModal } from "@/components/common/DeleteConfirmationModal";
import { Skeleton } from "@/components/ui/skeleton";

const UserCRUD = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isViewUserOpen, setIsViewUserOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { user, isLoading } = useAuthStore();
  const {
    users,
    isLoading: usersLoading,
    fetchUsers,
    create,
    view,
    update,
    delete: deleteUser,
    toggleUserStatus,
  } = useUserStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isLoading && user?.role) {
      setFormData({ role: user.role });
    }
  }, [isLoading, user]);

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    // Reset pagination when search term or role changes
    setCurrentPage(1);
  }, [searchTerm, selectedRole]);

  // Filter users based on search term and selected role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  /**
   * Handles user creation and shows toast notifications for success/failure
   * @returns {Promise<void>}
   */
  const handleAddUser = async () => {
    try {
      // if (!formData.name || !formData.email) {
      //   toast({
      //     title: "Validation Error",
      //     description: "Name and email are required fields",
      //     variant: "destructive",
      //   });
      //   return;
      // }

      const result = await create(formData);

      if (result.success) {
        toast({
          title: "Success",
          description: "User created successfully",
          variant: "default",
        });
        setFormData({ role: user?.role });
        setIsAddUserOpen(false);
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create user",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  /**
   * Handles user edit and shows toast notifications for success/failure
   * @returns {Promise<void>}
   */
  const handleEditUser = async () => {
    console.log("Editing user:", formData);
    try {
      const result = await update(selectedUser._id, formData);

      if (result.success) {
        toast({
          title: "Success",
          description: "User updated successfully",
          variant: "default",
        });
        setFormData({});
        setSelectedUser(null);
        setIsEditUserOpen(false);
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update user",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  /**
   * Deletes a user and shows toast notifications for success/failure
   * @param {string|number} userId - The ID of the user to delete
   * @returns {Promise<void>}
   * @throws {Error} When deletion fails
   */
  const handleDeleteUser = async () => {
    try {
      const result = await deleteUser(showDeleteConfirm.id);

      if (result.success) {
        toast({
          title: "Success",
          description: "User deleted successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete user",
          variant: "destructive",
        });
      }
      setShowDeleteConfirm(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setShowDeleteConfirm(null);
    }
  };

  /**
   * Toggles the status of a user and shows toast notifications for success/failure
   * @param {string|number} userId - The ID of the user whose status to toggle
   */
  const handleToggleUserStatus = async (userId) => {
    try {
      const result = await toggleUserStatus(userId);

      if (result.success) {
        toast({
          title: "Success",
          description: "User status updated successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update user status",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
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

  /**
   * Renders a form field based on the field configuration
   * @param {string} fieldKey - The key of the field to render
   **/
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

  /**
   * Renders the user form based on the selected role
   * @param {boolean} isEdit - Whether the form is for editing an existing user
   * @returns {JSX.Element|null}
   * */
  const renderUserForm = (isEdit = false) => {
    const selectedRole = formData.role;
    if (!selectedRole) return "";

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

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

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
              <AddUserModal
                setIsAddUserOpen={setIsAddUserOpen}
                isAddUserOpen={isAddUserOpen}
                formData={formData}
                setFormData={setFormData}
                renderUserForm={renderUserForm}
                handleAddUser={handleAddUser}
              />
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
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Last Login</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersLoading ? (
                      // Skeleton loading state
                      Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Skeleton className="w-10 h-10 rounded-full" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-[120px]" />
                                <Skeleton className="h-3 w-[160px]" />
                                <Skeleton className="h-3 w-[100px]" />
                              </div>
                            </div>
                          </td>
                          <td className="p-4 space-y-2">
                            <Skeleton className="h-6 w-[80px]" />
                            <Skeleton className="h-3 w-[60px]" />
                          </td>
                          <td className="p-4">
                            <Skeleton className="h-6 w-[60px]" />
                          </td>
                          <td className="p-4">
                            <Skeleton className="h-4 w-[120px]" />
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center gap-2 justify-end">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton
                                  key={i}
                                  className="h-8 w-8 rounded-md"
                                />
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      // Actual data rendering
                      <>
                        {paginatedUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b last:border-b-0"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                                  {user.username?.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium">{user.username}</p>
                                  <p className="text-sm">{user.email}</p>
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
                                  user.isActive
                                    ? "border-green-200 text-green-800 bg-green-50"
                                    : "border-red-200 text-red-800 bg-red-50"
                                }
                              >
                                {user.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </td>
                            <td className="p-4 text-sm">
                              {user.lastLogin
                                ? new Date(user.lastLogin).toLocaleString()
                                : "Never"}
                            </td>
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
                                  onClick={() => {
                                    openEditDialog(user);
                                    view(user._id);
                                  }}
                                  className="hover:bg-gray-100"
                                >
                                  <Edit size={14} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleToggleUserStatus(user.id)
                                  }
                                  className="hover:bg-yellow-50 hover:text-yellow-600 text-xs"
                                >
                                  {user.isActive ? "Deactivate" : "Activate"}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowDeleteConfirm(user)}
                                  className="hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {paginatedUsers.length === 0 && (
                          <tr>
                            <td
                              colSpan="5"
                              className="p-8 text-center text-gray-500"
                            >
                              No users found matching your criteria
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={filteredUsers.length}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </CardContent>
        </Card>

        {/* Edit User Dialog */}
        <EditUserModal
          isOpen={isEditUserOpen}
          onClose={() => {
            setIsEditUserOpen(false);
            setSelectedUser(null);
          }}
          selectedUser={selectedUser}
          formData={formData}
          setFormData={setFormData}
          userRoleConfigs={userRoleConfigs}
          fieldConfigs={fieldConfigs}
          handleEditUser={handleEditUser}
          renderFormField={renderFormField}
        />

        {/* View User Dialog */}
        <ViewUserModal
          isOpen={isViewUserOpen}
          onClose={() => setIsViewUserOpen(false)}
          selectedUser={selectedUser}
          userRoleConfigs={userRoleConfigs}
          fieldConfigs={fieldConfigs}
        />

        <DeleteConfirmationModal
          isOpen={showDeleteConfirm}
          onOpenChange={() => setShowDeleteConfirm(null)}
          onConfirm={handleDeleteUser}
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          confirmButtonVariant="destructive"
        />
      </div>
    </div>
  );
};

export default UserCRUD;
