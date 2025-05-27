"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Award,
  Building,
  GraduationCap,
  UserCheck,
  Settings,
  Edit,
  Save,
  X,
} from "lucide-react";

// Mock user data for different roles
const mockUserData = {
  super_admin: {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Admin Street, City, State 12345",
    role: "super_admin",
    employeeId: "SA001",
    department: "Administration",
    joinDate: "2020-01-15",
    permissions: [
      "All System Access",
      "User Management",
      "System Configuration",
    ],
    specialInfo: {
      systemAccess: "Full Administrative Access",
      managedUsers: 156,
      lastLogin: "2024-05-27 09:30 AM",
    },
  },
  admin: {
    name: "Michael Chen",
    email: "michael.chen@school.edu",
    phone: "+1 (555) 234-5678",
    address: "456 Admin Avenue, City, State 12345",
    role: "admin",
    employeeId: "AD001",
    department: "Administration",
    joinDate: "2021-03-10",
    permissions: ["User Management", "Reports", "Academic Records"],
    specialInfo: {
      systemAccess: "Administrative Access",
      managedDepartments: 8,
      activeTickets: 12,
    },
  },
  principal: {
    name: "Dr. Robert Williams",
    email: "robert.williams@school.edu",
    phone: "+1 (555) 345-6789",
    address: "789 Principal Lane, City, State 12345",
    role: "principal",
    employeeId: "PR001",
    department: "Administration",
    joinDate: "2018-07-01",
    qualifications: ["Ph.D. in Education", "M.Ed. Educational Leadership"],
    specialInfo: {
      yearsInEducation: 25,
      studentsUnderCare: 1200,
      schoolRating: "A+",
      achievements: [
        "Excellence in Leadership Award 2023",
        "Best Principal Award 2022",
      ],
    },
  },
  faculty: {
    name: "Prof. Emily Davis",
    email: "emily.davis@school.edu",
    phone: "+1 (555) 456-7890",
    address: "321 Faculty Road, City, State 12345",
    role: "faculty",
    employeeId: "FC001",
    department: "Mathematics",
    joinDate: "2019-08-15",
    qualifications: ["M.Sc. Mathematics", "B.Ed."],
    specialInfo: {
      subject: "Advanced Mathematics",
      classes: ["Grade 11 Math", "Grade 12 Calculus", "AP Statistics"],
      studentsTeaching: 85,
      yearsExperience: 8,
      publications: 3,
    },
  },
  student: {
    name: "Alex Thompson",
    email: "alex.thompson@student.school.edu",
    phone: "+1 (555) 567-8901",
    address: "654 Student Street, City, State 12345",
    role: "student",
    studentId: "ST2024001",
    grade: "Grade 11",
    section: "A",
    rollNumber: "11A001",
    admissionDate: "2022-06-01",
    specialInfo: {
      gpa: 3.8,
      attendance: "95%",
      subjects: ["Mathematics", "Physics", "Chemistry", "English", "History"],
      extracurricular: ["Basketball Team", "Science Club", "Debate Society"],
      parentName: "John Thompson",
      parentPhone: "+1 (555) 678-9012",
    },
  },
  parent: {
    name: "John Thompson",
    email: "john.thompson@email.com",
    phone: "+1 (555) 678-9012",
    address: "654 Student Street, City, State 12345",
    role: "parent",
    parentId: "PT001",
    occupation: "Software Engineer",
    specialInfo: {
      children: [
        { name: "Alex Thompson", grade: "Grade 11", section: "A" },
        { name: "Emma Thompson", grade: "Grade 8", section: "B" },
      ],
      emergencyContact: true,
      ptaMember: true,
    },
  },
};

const ProfilePage = () => {
  const [currentRole, setCurrentRole] = useState("faculty");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUserData[currentRole]);

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    setUserData(mockUserData[role]);
    setIsEditing(false);
  };

  const getRoleColor = (role) => {
    const colors = {
      super_admin: "bg-red-100 text-red-800",
      admin: "bg-blue-100 text-blue-800",
      principal: "bg-purple-100 text-purple-800",
      vice_principal: "bg-indigo-100 text-indigo-800",
      faculty: "bg-green-100 text-green-800",
      hod: "bg-yellow-100 text-yellow-800",
      student: "bg-cyan-100 text-cyan-800",
      parent: "bg-pink-100 text-pink-800",
      librarian: "bg-orange-100 text-orange-800",
      accountant: "bg-teal-100 text-teal-800",
      hr_manager: "bg-violet-100 text-violet-800",
      receptionist: "bg-rose-100 text-rose-800",
      counselor: "bg-emerald-100 text-emerald-800",
      lab_assistant: "bg-amber-100 text-amber-800",
      transport_incharge: "bg-lime-100 text-lime-800",
      vendor: "bg-slate-100 text-slate-800",
      guest: "bg-gray-100 text-gray-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const formatRoleName = (role) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderRoleSpecificContent = () => {
    if (!userData || !userData.specialInfo) return null;

    switch (currentRole) {
      case "super_admin":
      case "admin":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">
                    System Access Level
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.specialInfo.systemAccess}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    {currentRole === "super_admin"
                      ? "Managed Users"
                      : "Managed Departments"}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {currentRole === "super_admin"
                      ? userData.specialInfo.managedUsers
                      : userData.specialInfo.managedDepartments}
                  </p>
                </div>
              </div>
              {userData.permissions && (
                <div>
                  <Label className="text-sm font-medium">Permissions</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.permissions.map((permission, index) => (
                      <Badge key={index} variant="secondary">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "principal":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Leadership Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Years in Education
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.specialInfo.yearsInEducation} years
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Students Under Care
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.specialInfo.studentsUnderCare}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">School Rating</Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.specialInfo.schoolRating}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {userData.specialInfo.achievements.map(
                    (achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "faculty":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Teaching Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">
                    Subject Specialization
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.specialInfo.subject}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Students Teaching
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.specialInfo.studentsTeaching}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Years of Experience
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.specialInfo.yearsExperience} years
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Publications</Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.specialInfo.publications}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Classes Teaching</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.specialInfo.classes.map((classItem, index) => (
                    <Badge key={index} variant="outline">
                      {classItem}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "student":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Current GPA</Label>
                    <p className="text-lg font-semibold text-green-600">
                      {userData.specialInfo.gpa}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Attendance</Label>
                    <p className="text-lg font-semibold text-blue-600">
                      {userData.specialInfo.attendance}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Grade & Section
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.grade} - {userData.section}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Subjects</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.specialInfo.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Extracurricular Activities
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.specialInfo.extracurricular.map(
                      (activity, index) => (
                        <Badge key={index} variant="outline">
                          {activity}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Parent Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Parent Name</Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.specialInfo.parentName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Parent Phone</Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.specialInfo.parentPhone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "parent":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Children Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {userData.specialInfo.children.map((child, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{child.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {child.grade} - Section {child.section}
                      </p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">
                    Emergency Contact
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.specialInfo.emergencyContact ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">PTA Member</Label>
                  <p className="text-sm text-muted-foreground">
                    {userData.specialInfo.ptaMember ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Role-Specific Information</CardTitle>
              <CardDescription>
                Specialized information for {formatRoleName(currentRole)} role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Role-specific content for {formatRoleName(currentRole)} will be
                displayed here.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  if (!userData) return null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Role Selector (for demo purposes) */}
      <Card>
        <CardHeader>
          <CardTitle>Demo: Select User Role</CardTitle>
          <CardDescription>
            Choose a role to see different profile views
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.keys(mockUserData).map((role) => (
              <Button
                key={role}
                variant={currentRole === role ? "default" : "outline"}
                size="sm"
                onClick={() => handleRoleChange(role)}
              >
                {formatRoleName(role)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="/placeholder-avatar.jpg"
                  alt={userData.name}
                />
                <AvatarFallback className="text-lg">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Badge className={`mt-3 ${getRoleColor(userData.role)}`}>
                {formatRoleName(userData.role)}
              </Badge>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-muted-foreground">{userData.department}</p>
                </div>
                <Button
                  variant={isEditing ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <X className="h-4 w-4 mr-2" />
                  ) : (
                    <Edit className="h-4 w-4 mr-2" />
                  )}
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Joined:{" "}
                    {new Date(
                      userData.joinDate || userData.admissionDate
                    ).toLocaleDateString()}
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
          {userData.qualifications && (
            <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          )}
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
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userData.name} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userData.email}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={userData.phone} />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue={userData.department} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue={userData.address} />
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <Button size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      {userData.employeeId
                        ? "Employee ID"
                        : userData.studentId
                        ? "Student ID"
                        : "Parent ID"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.employeeId ||
                        userData.studentId ||
                        userData.parentId}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Department</Label>
                    <p className="text-sm text-muted-foreground">
                      {userData.department || userData.grade || "Parent"}
                    </p>
                  </div>
                  {userData.rollNumber && (
                    <div>
                      <Label className="text-sm font-medium">Roll Number</Label>
                      <p className="text-sm text-muted-foreground">
                        {userData.rollNumber}
                      </p>
                    </div>
                  )}
                  {userData.occupation && (
                    <div>
                      <Label className="text-sm font-medium">Occupation</Label>
                      <p className="text-sm text-muted-foreground">
                        {userData.occupation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Role-Specific Content */}
          {renderRoleSpecificContent()}
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>
                Detailed information and settings for your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Additional profile details and settings would be displayed here
                based on the user role and requirements.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {userData.qualifications && (
          <TabsContent value="qualifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {userData.qualifications.map((qualification, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{qualification}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ProfilePage;
