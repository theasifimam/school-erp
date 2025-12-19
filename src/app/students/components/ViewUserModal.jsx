"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  School,
  User,
  CalendarDays,
  Droplet,
  Heart,
  GraduationCap,
  BookOpen,
  Bus,
  Home,
  Music,
  Bookmark,
  Edit,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Label } from "recharts";
import { Textarea } from "@/components/ui/textarea";

export default function StudentProfileModal({
  isOpen,
  onClose,
  student,
  onEdit,
  updateStudentStatus,
  onStatusChange,
}) {
  if (!student) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const [selectedStatus, setSelectedStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  // Reset form when modal opens with new student
  useEffect(() => {
    if (isOpen && student) {
      setSelectedStatus(student.status || "");
      setRemarks("");
    }
  }, [isOpen, student]);

  const statusOptions = [
    { value: "submitted", label: "Submitted", icon: FileText, color: "blue" },
    {
      value: "under_review",
      label: "Under Review",
      icon: Clock,
      color: "yellow",
    },
    { value: "accepted", label: "Accepted", icon: CheckCircle, color: "green" },
    { value: "rejected", label: "Rejected", icon: XCircle, color: "red" },
    {
      value: "enrolled",
      label: "Enrolled",
      icon: GraduationCap,
      color: "purple",
    },
  ];

  const getColorClasses = (color, isSelected) => {
    const colors = {
      blue: isSelected
        ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
        : "border-gray-200 bg-white hover:border-blue-300 dark:bg-gray-950 dark:border-gray-800 dark:hover:border-blue-700",
      yellow: isSelected
        ? "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
        : "border-gray-200 bg-white hover:border-yellow-300 dark:bg-gray-950 dark:border-gray-800 dark:hover:border-yellow-700",
      green: isSelected
        ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
        : "border-gray-200 bg-white hover:border-green-300 dark:bg-gray-950 dark:border-gray-800 dark:hover:border-green-700",
      red: isSelected
        ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
        : "border-gray-200 bg-white hover:border-red-300 dark:bg-gray-950 dark:border-gray-800 dark:hover:border-red-700",
      purple: isSelected
        ? "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
        : "border-gray-200 bg-white hover:border-purple-300 dark:bg-gray-950 dark:border-gray-800 dark:hover:border-purple-700",
    };
    return colors[color] || colors.blue;
  };

  if (!student) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-6">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              Student Profile
            </DialogTitle>
            <div className="flex gap-2 mx-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onEdit(student);
                  onClose();
                }}
                className="rounded-full h-8 w-8 p-2"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Profile Header */}
          <div className="flex items-center text-center">
            <Avatar className="w-24 h-24 mb-4 mr-4">
              <AvatarImage src={student.photo} alt={student.firstName} />
              <AvatarFallback className="text-2xl font-medium bg-blue-100 text-blue-600">
                {`${student.firstName.charAt(0)}${student.lastName.charAt(0)}`}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-3xl font-bold">{`${student.firstName} ${student.lastName}`}</h2>
                <Badge
                  variant={
                    student.status === "submitted" ? "secondary" : "outline"
                  }
                  className="rounded-full text-xs"
                >
                  {student.status}
                </Badge>
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className="rounded-full text-xs bg-blue-50"
                >
                  {student.admissionNo}
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full text-xs bg-green-50"
                >
                  {`Class ${student.appliedClass}`}
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full text-xs bg-purple-50"
                >
                  {student.academicSession}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Applied on {formatDate(student.createdAt)}
              </p>
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="flex mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="additional">Additional</TabsTrigger>
              {updateStudentStatus && (
                <TabsTrigger value="action">Action</TabsTrigger>
              )}
            </TabsList>

            <TabsContent
              value="basic"
              className="space-y-4 max-h-64 overflow-y-auto"
            >
              {/* Basic Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  PERSONAL INFORMATION
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-medium">{`${student.firstName} ${
                        student.middleName ? student.middleName + " " : ""
                      }${student.lastName}`}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Preferred Name</p>
                      <p className="font-medium">{student.preferredName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Date of Birth</p>
                      <p className="font-medium">
                        {formatDate(student.dateOfBirth)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="font-medium">
                        {student.gender.charAt(0).toUpperCase() +
                          student.gender.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Droplet className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-xs text-gray-500">Blood Group</p>
                      <p className="font-medium">
                        {student.bloodGroup.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-xs text-gray-500">
                        Medical Conditions
                      </p>
                      <p className="font-medium">
                        {student.medicalConditions || "None"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  CONTACT INFORMATION
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium">{student.phoneNumber}</p>
                    </div>
                  </div>
                  {student.alternatePhoneNumber && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-xs text-gray-500">Alternate Phone</p>
                        <p className="font-medium">
                          {student.alternatePhoneNumber}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Address Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  ADDRESS INFORMATION
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Street</p>
                      <p className="font-medium">{student.address.street}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">City</p>
                      <p className="font-medium">{student.address.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">State</p>
                      <p className="font-medium">{student.address.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Country</p>
                      <p className="font-medium">{student.address.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Zip Code</p>
                      <p className="font-medium">{student.address.zipCode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="academic"
              className="space-y-4 max-h-64 overflow-y-auto"
            >
              {/* Academic Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  ACADEMIC DETAILS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Applied For</p>
                      <p className="font-medium">
                        Class {student.appliedClass}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Academic Session</p>
                      <p className="font-medium">{student.academicSession}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Board</p>
                      <p className="font-medium">
                        {student.board.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {student.stream && student.stream !== "na" && (
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">Stream</p>
                        <p className="font-medium">
                          {student.stream.charAt(0).toUpperCase() +
                            student.stream.slice(1)}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Bookmark className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Admission Type</p>
                      <p className="font-medium">
                        {student.admissionType.charAt(0).toUpperCase() +
                          student.admissionType.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">
                        Transfer Certificate
                      </p>
                      <Badge
                        variant={
                          student.hasTransferCertificate ? "default" : "outline"
                        }
                        className="mt-1"
                      >
                        {student.hasTransferCertificate
                          ? "Available"
                          : "Not Available"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Previous School Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  PREVIOUS SCHOOL INFORMATION
                </h3>
                {student.previousSchool.name ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <School className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">School Name</p>
                        <p className="font-medium">
                          {student.previousSchool.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">School Address</p>
                        <p className="font-medium">
                          {student.previousSchool.address || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">Last Class</p>
                        <p className="font-medium">
                          {student.previousSchool.lastClass || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">
                          Last Grade/Percentage
                        </p>
                        <p className="font-medium">
                          {student.previousSchool.lastGrade || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No previous school information available
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              {/* Requirements */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  REQUIREMENTS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Bus className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">
                        Transport Required
                      </p>
                      <Badge
                        variant={
                          student.transportRequired ? "default" : "outline"
                        }
                        className="mt-1"
                      >
                        {student.transportRequired ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Hostel Required</p>
                      <Badge
                        variant={student.hostelRequired ? "default" : "outline"}
                        className="mt-1"
                      >
                        {student.hostelRequired ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="family"
              className="space-y-4 max-h-64 overflow-y-auto"
            >
              {/* Guardians Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  GUARDIANS
                </h3>
                <div className="space-y-4">
                  {student.guardians.map((guardian, index) => (
                    <div
                      key={guardian.id}
                      className="bg-gray-50 p-4 rounded-3xl"
                    >
                      <h4 className="text-md font-medium mb-2 capitalize">
                        {guardian.type}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-xs text-gray-500">Name</p>
                            <p className="font-medium">{guardian.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Bookmark className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-xs text-gray-500">Occupation</p>
                            <p className="font-medium">{guardian.occupation}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="font-medium">{guardian.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="font-medium">{guardian.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Emergency Contact */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  EMERGENCY CONTACT
                </h3>
                <div className="bg-gray-50 p-4 rounded-3xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="font-medium">
                          {student.emergencyContact.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-medium">
                          {student.emergencyContact.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-xs text-gray-500">Relationship</p>
                        <p className="font-medium">
                          {student.emergencyContact.relationship}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Siblings Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  SIBLINGS
                </h3>
                <div className="bg-gray-50 p-4 rounded-3xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-indigo-500" />
                      <div>
                        <p className="text-xs text-gray-500">
                          Number of Siblings
                        </p>
                        <p className="font-medium">{student.siblings.count}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <School className="h-5 w-5 text-indigo-500" />
                      <div>
                        <p className="text-xs text-gray-500">
                          Siblings at School
                        </p>
                        <Badge
                          variant={
                            student.siblings.atSchool ? "default" : "outline"
                          }
                          className="mt-1"
                        >
                          {student.siblings.atSchool ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {student.familyNotes && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      FAMILY NOTES
                    </h3>
                    <p className="text-sm">{student.familyNotes}</p>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent
              value="additional"
              className="space-y-4 max-h-64 overflow-y-auto"
            >
              {/* Additional Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  ADDITIONAL INFORMATION
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Music className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-xs text-gray-500">Activities</p>
                      <p className="font-medium">
                        {student.activities || "None"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-xs text-gray-500">Languages</p>
                      <p className="font-medium">{student.languages}</p>
                    </div>
                  </div>
                  {student.achievements && (
                    <div className="flex items-center gap-3">
                      <Bookmark className="h-5 w-5 text-teal-500" />
                      <div>
                        <p className="text-xs text-gray-500">Achievements</p>
                        <p className="font-medium">{student.achievements}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-xs text-gray-500">Special Needs</p>
                      <Badge
                        variant={student.specialNeeds ? "default" : "outline"}
                        className="mt-1"
                      >
                        {student.specialNeeds ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-xs text-gray-500">
                        Heard About Us From
                      </p>
                      <p className="font-medium capitalize">
                        {student.hearAbout}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {student.additionalInfo && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      ADDITIONAL NOTES
                    </h3>
                    <p className="text-sm">{student.additionalInfo}</p>
                  </div>
                </>
              )}

              <Separator className="my-4" />

              {/* Account Status */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  APPLICATION STATUS
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <Badge
                        variant={student.isActive ? "default" : "destructive"}
                        className="rounded-full mt-1"
                      >
                        {student.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-xs text-gray-500">
                        Application Status
                      </p>
                      <Badge className="rounded-full mt-1" variant="secondary">
                        {student.status.charAt(0).toUpperCase() +
                          student.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-xs text-gray-500">Applied On</p>
                      <p className="font-medium text-sm">
                        {formatDate(student.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-xs text-gray-500">Last Updated</p>
                      <p className="font-medium text-sm">
                        {formatDate(student.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            {updateStudentStatus && (
              <TabsContent
                value="action"
                className="space-y-4 max-h-64 overflow-y-auto"
              >
                {/* Change Application Status */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Change Application Status of{" "}
                    <b>
                      {student.firstName} {student.lastName}
                    </b>
                  </h3>
                </div>

                <Separator className="my-4" />
                {/* update application status of student from submitted to under review, accepted, rejected */}
                <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
                  {/* Current Status */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-3xl border border-gray-200 dark:border-gray-800">
                    <Label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
                      Current Status
                    </Label>
                    <p className="text-lg font-semibold capitalize">
                      {student.status?.replace("_", " ")}
                    </p>
                  </div>

                  {/* Status Options */}
                  <div>
                    <Label className="block mb-3">Select New Status</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {statusOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = selectedStatus === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setSelectedStatus(option.value)}
                            className={`p-4 rounded-full border-2 transition-all flex items-center gap-3 ${getColorClasses(
                              option.color,
                              isSelected
                            )}`}
                          >
                            <Icon
                              className={`h-5 w-5 ${
                                isSelected
                                  ? ""
                                  : "text-gray-400 dark:text-gray-600"
                              }`}
                            />
                            <span className={`font-medium`}>
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Remarks */}
                  <div>
                    <Label htmlFor="remarks" className="mb-2">
                      Remarks (Optional)
                    </Label>
                    <Textarea
                      id="remarks"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Add any notes about this status change..."
                      className="resize-none"
                      rows={4}
                    />
                  </div>

                  {/* Status Change Info */}
                  {selectedStatus === "accepted" && (
                    <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-3xl p-4">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        💡 After accepting, you can enroll the student from the
                        accepted applications list.
                      </p>
                    </div>
                  )}
                  {selectedStatus === "enrolled" && (
                    <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-3xl p-4">
                      <p className="text-sm text-purple-800 dark:text-purple-300">
                        💡 This will move the student to the "Enrolled Students"
                        section. Make sure to assign a section.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            )}
          </Tabs>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-full px-6"
            >
              Close
            </Button>
            {updateStudentStatus ? (
              <Button
                onClick={() => {
                  if (selectedStatus) {
                    onStatusChange(student._id, selectedStatus, remarks);
                    // onClose();
                    console.log(
                      "Status updated to:",
                      selectedStatus,
                      "student ID:",
                      student._id
                    );
                  }
                }}
                className="rounded-full px-6"
              >
                Update Status
              </Button>
            ) : (
              <Button
                onClick={() => {
                  onEdit(student);
                  onClose();
                }}
                className="rounded-full px-6"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
