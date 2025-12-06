"use client";

import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Shield,
  Building,
  Contact,
  UserCheck,
} from "lucide-react";
import { useAuthStore } from "@/lib/state/stores/authStore";
import { getRoleColor, getRoleDepartment } from "@/lib/utils";
import UpdateUserForm from "@/components/common/UpdateUserProfile";

const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative">
                <Skeleton className="h-24 w-24 rounded-full" />
              </div>
              <Skeleton className="h-6 w-20 mt-3 rounded-full" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-9 w-28" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef(null);

  const { user, getMe, error, updateMe, isLoading } = useAuthStore();

  // Role options for the select dropdown
  const roleOptions = [
    "super_admin",
    "admin",
    "principal",
    "vice_principal",
    "teacher",
    "faculty",
    "hod",
    "student",
    "parent",
    "librarian",
    "accountant",
    "hr_manager",
    "receptionist",
    "counselor",
    "lab_assistant",
    "transport_incharge",
    "driver",
    "security_guard",
    "maintenance_staff",
    "vendor",
    "guest",
  ];

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (user && !error) {
      const mappedUserData = {
        id: user?.id,
        fullName:
          user?.fullName ||
          `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        username: user?.username,
        email: user?.email,
        phoneNumber: user?.phoneNumber || "",
        role: user?.role,
        employeeId: user?.employeeId || "",
        studentId: user?.studentId || "",
        department: user?.department || getRoleDepartment(user?.role),
        profilePicture: user?.profilePicture,
        address: user?.address || {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "India",
        },
        emergencyContact: user?.emergencyContact || {
          name: "",
          relationship: "",
          phone: "",
        },
        isActive: user?.isActive,
        lastLogin: user?.lastLogin,
        createdAt: user?.createdAt,
        loginAttempts: user?.loginAttempts || 0,
        // Admin specific info
        specialInfo:
          user?.role === "admin" || user?.role === "super_admin"
            ? {
                systemAccess: "Administrative Access",
                managedDepartments: 5,
                activeTickets: 8,
              }
            : null,
        permissions:
          user?.role === "admin" || user?.role === "super_admin"
            ? ["User Management", "Reports", "Academic Records"]
            : null,
      };

      setUserData(mappedUserData);
      setEditFormData(mappedUserData);
    }
  }, [user, error]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSaveProfile = async (editFormData, profilePicture) => {
    setIsUpdating(true);
    try {
      const formData = new FormData();

      // Basic fields
      formData.append("firstName", editFormData.firstName || "");
      formData.append("lastName", editFormData.lastName || "");
      formData.append("phoneNumber", editFormData.phoneNumber || "");
      formData.append(
        "fullName",
        `${editFormData.firstName || ""} ${editFormData.lastName || ""}`.trim()
      );

      // Employee/Student IDs
      if (editFormData.employeeId) {
        formData.append("employeeId", editFormData.employeeId);
      }
      if (editFormData.studentId) {
        formData.append("studentId", editFormData.studentId);
      }

      // Address fields
      if (editFormData.address) {
        Object.entries(editFormData.address).forEach(([key, value]) => {
          formData.append(`address[${key}]`, value || "");
        });
      }

      // Emergency contact
      if (editFormData.emergencyContact) {
        Object.entries(editFormData.emergencyContact).forEach(
          ([key, value]) => {
            formData.append(`emergencyContact[${key}]`, value || "");
          }
        );
      }

      // Profile image
      if (profilePicture instanceof File) {
        formData.append("profilePicture", profilePicture);
      }

      await updateMe(formData);

      setIsDialogOpen(false);
      await getMe();
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatRoleName = (role) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getDisplayName = () => {
    if (userData?.fullName && userData.fullName.trim()) {
      return userData.fullName;
    }
    if (userData?.firstName || userData?.lastName) {
      return `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
    }
    return userData?.username || "N/A";
  };

  const getFullAddress = () => {
    if (!userData?.address) return "Not provided";
    const { street, city, state, zipCode, country } = userData.address;
    const parts = [street, city, state, zipCode, country].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "Not provided";
  };

  const renderRoleSpecificContent = () => {
    if (!userData) return null;

    const isAdmin =
      userData.role === "admin" || userData.role === "super_admin";

    if (isAdmin) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Administrative Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="ml-0 text-sm font-medium">
                  System Access Level
                </Label>
                <p className="text-sm text-muted-foreground">
                  {userData.specialInfo?.systemAccess ||
                    "Administrative Access"}
                </p>
              </div>
              <div>
                <Label className="ml-0 text-sm font-medium">
                  Login Attempts
                </Label>
                <p className="text-sm text-muted-foreground">
                  {userData.loginAttempts || 0}
                </p>
              </div>
              <div>
                <Label className="ml-0 text-sm font-medium">Last Login</Label>
                <p className="text-sm text-muted-foreground">
                  {userData.lastLogin
                    ? new Date(userData.lastLogin).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <Label className="ml-0 text-sm font-medium">
                  Account Status
                </Label>
                <Badge
                  variant={userData.isActive ? "secondary" : "destructive"}
                >
                  {userData.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            {userData.permissions && (
              <div>
                <Label className="ml-0 text-sm font-medium">Permissions</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.permissions.map((permission, index) => (
                    <Badge key={index} variant="outline">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="ml-0 text-sm font-medium">Last Login</Label>
              <p className="text-sm text-muted-foreground">
                {userData.lastLogin
                  ? new Date(userData.lastLogin).toLocaleString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <Label className="ml-0 text-sm font-medium">Account Status</Label>
              <Badge variant={userData.isActive ? "secondary" : "destructive"}>
                {userData.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div>
              <Label className="ml-0 text-sm font-medium">Login Attempts</Label>
              <p className="text-sm text-muted-foreground">
                {userData.loginAttempts || 0}
              </p>
            </div>
            <div>
              <Label className="ml-0 text-sm font-medium">Member Since</Label>
              <p className="text-sm text-muted-foreground">
                {userData.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading || !userData) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={
                    userData?.profilePicture?.url || "/placeholder-avatar.jpg"
                  }
                  alt={getDisplayName()}
                />
                <AvatarFallback className="text-lg">
                  {getDisplayName()
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Badge className={`mt-3 ${getRoleColor(userData.role)}`}>
                {formatRoleName(userData.role)}
              </Badge>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{getDisplayName()}</h1>
                  <p className="text-muted-foreground">
                    {userData.department || "N/A"}
                  </p>
                </div>

                <UpdateUserForm
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  userData={userData}
                  onSave={handleSaveProfile}
                  isUpdating={isUpdating}
                />
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.email || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {userData.phoneNumber || "Not provided"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{getFullAddress()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Joined:{" "}
                    {userData.createdAt
                      ? new Date(userData.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="contact">Contact & Emergency</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="ml-0 text-sm font-medium">Full Name</Label>
                  <p className="text-sm text-muted-foreground">
                    {getDisplayName()}
                  </p>
                </div>
                <div>
                  <Label className="ml-0 text-sm font-medium">Username</Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.username}
                  </p>
                </div>
                <div>
                  <Label className="ml-0 text-sm font-medium">Department</Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.department}
                  </p>
                </div>
                <div>
                  <Label className="ml-0 text-sm font-medium">Role</Label>
                  <p className="text-sm text-muted-foreground">
                    {formatRoleName(userData.role)}
                  </p>
                </div>
                {userData.employeeId && (
                  <div>
                    <Label className="ml-0 text-sm font-medium">
                      Employee ID
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.employeeId}
                    </p>
                  </div>
                )}
                {userData.studentId && (
                  <div>
                    <Label className="ml-0 text-sm font-medium">
                      Student ID
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.studentId}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Role-Specific Content */}
          {renderRoleSpecificContent()}
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Additional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="ml-0 text-sm font-medium">
                    Account Created
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.createdAt
                      ? new Date(userData.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="ml-0 text-sm font-medium">Last Login</Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.lastLogin
                      ? new Date(userData.lastLogin).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="ml-0 text-sm font-medium">
                    Account Status
                  </Label>
                  <Badge
                    variant={userData.isActive ? "secondary" : "destructive"}
                  >
                    {userData.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div>
                  <Label className="ml-0 text-sm font-medium">
                    Login Attempts
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.loginAttempts || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Contact className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="ml-0 text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.email}
                    </p>
                  </div>
                  <div>
                    <Label className="ml-0 text-sm font-medium">
                      Phone Number
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.phoneNumber || "Not provided"}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="ml-0 text-sm font-medium">Address</Label>
                  <p className="text-sm text-muted-foreground">
                    {getFullAddress()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.emergencyContact?.name ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="ml-0 text-sm font-medium">
                        Relationship
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {userData.emergencyContact.relationship}
                      </p>
                    </div>
                    <div>
                      <Label className="ml-0 text-sm font-medium">Phone</Label>
                      <p className="text-sm text-muted-foreground">
                        {userData.emergencyContact.phone}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No emergency contact information provided
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
