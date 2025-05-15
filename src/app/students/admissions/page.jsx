"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  ChevronRight,
  User,
  BookOpen,
  Home,
  Phone,
  FileText,
  ImagePlus,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import ConfirmAddStudentModal from "@/components/students/ConfirmAddStudentModal";
import useAdmissionStore from "@/lib/state/stores/admissionStore";

export default function ModernAdmissionForm() {
  // const [activeTab, setActiveTab] = useState("personalInfo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siblingsAtSchool, setSiblingsAtSchool] = useState(false);
  const [isTCAvailable, setIsTCAvailable] = useState(false);
  const [transportRequired, setTransportRequired] = useState(false);
  const [hostelRequired, setHostelRequired] = useState(false);
  const [specialEducationNeed, setSpecialEducationNeed] = useState(false);
  const [acceptTC, setAcceptTC] = useState(false);
  // const [formData, setFormData] = useState({});

  // Use the store
  const {
    formData,
    activeTab: storeActiveTab,
    setActiveTab,
    updateFormField,
    submitApplication,
    saveDraft,
    loadDraft,
  } = useAdmissionStore();

  // We'll keep local activeTab for UI, but sync with store
  const [activeTab, setLocalActiveTab] = useState("personalInfo");

  // Update both local state and store when tab changes
  const handleTabChange = (tab) => {
    setLocalActiveTab(tab);
    setActiveTab(tab);
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    // Determine which section this field belongs to
    const section = getSectionFromFieldId(id);

    // Update the field in the store
    updateFormField(section, id, type === "checkbox" ? checked : value);
  };

  const handleSwitchChange = (id, checked) => {
    const section = getSectionFromFieldId(id);
    updateFormField(section, id, checked);
  };

  // Helper to determine which section a field belongs to
  const getSectionFromFieldId = (id) => {
    // This is a simplified example - you'll need to map all fields to their sections
    if (
      [
        "fatherName",
        "fatherOccupation",
        "fatherPhone",
        "fatherEmail",
        "motherName",
        "motherOccupation",
        "motherPhone",
        "motherEmail",
        "siblings",
        "siblingsAtSchool",
        "familyNotes",
      ].includes(id)
    )
      return "familyInfo";
    if (
      [
        "email",
        "phone",
        "alternatePhone",
        "address",
        "city",
        "state",
        "country",
        "zipCode",
        "emergencyContactName",
        "emergencyContactPhone",
        "emergencyRelation",
      ].includes(id)
    )
      return "contactInfo";
    if (
      [
        "appliedClass",
        "session",
        "admissionType",
        "board",
        "previousSchool",
        "schoolAddress",
        "lastClass",
        "lastGrade",
        "transferCertificate",
        "stream",
        "achievements",
      ].includes(id)
    )
      return "academicInfo";
    if (
      [
        "languages",
        "transport",
        "hostel",
        "activities",
        "specialNeeds",
        "hearAbout",
        "additionalInfo",
        "termsAccepted",
      ].includes(id)
    )
      return "additionalInfo";

    // Default to personalInfo
    return "personalInfo";
  };

  // Handle select changes
  const handleSelectChange = (id, value) => {
    const section = getSectionFromFieldId(id);
    updateFormField(section, id, value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const result = await submitApplication();

    if (result.success) {
      toast.success("Application Submitted Successfully", {
        description: `Your reference number: ${result.referenceNumber}`,
        duration: 5000,
      });
    } else {
      toast.error("Submission Failed", {
        description: result.message,
        duration: 5000,
      });
    }

    setIsModalOpen(false);
  };

  // Save current progress as draft
  const handleSaveDraft = async () => {
    const result = await saveDraft();

    if (result.success) {
      toast.success("Draft Saved", {
        description: "You can continue this application later",
        duration: 3000,
      });
    } else {
      toast.error("Failed to Save Draft", {
        description: result.message,
        duration: 3000,
      });
    }
  };

  // Add this somewhere in your UI
  const handleLoadDraft = async (draftId) => {
    const result = await loadDraft(draftId);

    if (result.success) {
      toast.success("Draft Loaded", {
        description: "Continue your application",
        duration: 3000,
      });
    } else {
      toast.error("Failed to Load Draft", {
        description: result.message,
        duration: 3000,
      });
    }
  };

  const formSections = [
    {
      id: "personalInfo",
      label: "Personal",
      icon: <User className="mr-2 h-4 w-4" />,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name*
            </Label>
            <Input
              id="firstName"
              placeholder="First name"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.personalInfo.firstName}
            />
          </div>
          <div>
            <Label htmlFor="middleName" className="text-sm font-medium">
              Middle Name
            </Label>
            <Input
              id="middleName"
              placeholder="Middle name"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.personalInfo.middleName}
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name*
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.personalInfo.lastName}
            />
          </div>
          <div>
            <Label htmlFor="preferredName" className="text-sm font-medium">
              Preferred Name/Nickname
            </Label>
            <Input
              id="preferredName"
              placeholder="Johnny"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.personalInfo.preferredName}
            />
          </div>
          <div>
            <Label htmlFor="gender" className="text-sm font-medium">
              Gender*
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("gender", value)}
              value={formData.personalInfo.gender}
            >
              <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="nonbinary">Non-Binary</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefernottosay">
                  Prefer Not to Say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dob" className="text-sm font-medium">
              Date of Birth*
            </Label>
            <Input
              id="dob"
              type="date"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.personalInfo.dob}
            />
          </div>
          <div>
            <Label
              htmlFor="photo"
              className="text-sm font-medium flex items-center"
            >
              Photo Upload
              <span className="text-xs text-gray-500 ml-2">
                (JPG/PNG, max 2MB)
              </span>
            </Label>
            <div className="mt-1 flex items-center">
              <Button
                variant="outline"
                className="border-dashed border-gray-300 bg-white hover:bg-gray-50 rounded-full w-full flex items-center justify-center py-5"
              >
                <ImagePlus className="mr-2 h-4 w-4" /> Upload Photo
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="bloodGroup" className="text-sm font-medium">
              Blood Group
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("bloodGroup", value)}
              value={formData.personalInfo.bloodGroup}
            >
              <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                <SelectValue placeholder="Select Blood Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a+">A+</SelectItem>
                <SelectItem value="a-">A-</SelectItem>
                <SelectItem value="b+">B+</SelectItem>
                <SelectItem value="b-">B-</SelectItem>
                <SelectItem value="ab+">AB+</SelectItem>
                <SelectItem value="ab-">AB-</SelectItem>
                <SelectItem value="o+">O+</SelectItem>
                <SelectItem value="o-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="medicalConditions" className="text-sm font-medium">
              Any Medical Conditions or Allergies
            </Label>
            <Textarea
              id="medicalConditions"
              placeholder="Please list any medical conditions, allergies, or special needs"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-2xl h-24"
              onChange={handleInputChange}
              value={formData.personalInfo.medicalConditions}
            />
          </div>
        </div>
      ),
    },
    {
      id: "contactInfo",
      label: "Contact",
      icon: <Phone className="mr-2 h-4 w-4" />,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address*
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="student@example.com"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.email}
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number*
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.phone}
            />
          </div>
          <div>
            <Label htmlFor="alternatePhone" className="text-sm font-medium">
              Alternate Phone Number
            </Label>
            <Input
              id="alternatePhone"
              type="tel"
              placeholder="(123) 456-7890"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.alternatePhone}
            />
          </div>
          <div>
            <Label
              htmlFor="emergencyContactName"
              className="text-sm font-medium"
            >
              Emergency Contact Name
            </Label>
            <Input
              id="emergencyContactName"
              placeholder="Jane Doe"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.emergencyContactName}
            />
          </div>
          <div>
            <Label
              htmlFor="emergencyContactPhone"
              className="text-sm font-medium"
            >
              Emergency Contact Phone
            </Label>
            <Input
              id="emergencyContactPhone"
              type="tel"
              placeholder="(123) 456-7890"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.emergencyContactPhone}
            />
          </div>
          <div>
            <Label htmlFor="emergencyRelation" className="text-sm font-medium">
              Relationship to Student
            </Label>
            <Input
              id="emergencyRelation"
              placeholder="Parent/Guardian/Relative"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.emergencyRelation}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Current Address*
            </Label>
            <Input
              id="address"
              placeholder="123 Main St"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.address}
            />
          </div>
          <div>
            <Label htmlFor="city" className="text-sm font-medium">
              City*
            </Label>
            <Input
              id="city"
              placeholder="New York"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.city}
            />
          </div>
          <div>
            <Label htmlFor="state" className="text-sm font-medium">
              State/Province*
            </Label>
            <Input
              id="state"
              placeholder="NY"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.state}
            />
          </div>
          <div>
            <Label htmlFor="country" className="text-sm font-medium">
              Country*
            </Label>
            <Input
              id="country"
              placeholder="United States"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.country}
            />
          </div>
          <div>
            <Label htmlFor="zipCode" className="text-sm font-medium">
              Zip/Postal Code*
            </Label>
            <Input
              id="zipCode"
              placeholder="10001"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.zipCode}
            />
          </div>
        </div>
      ),
    },
    {
      id: "familyInfo",
      label: "Family",
      icon: <Home className="mr-2 h-4 w-4" />,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fatherName" className="text-sm font-medium">
              Father&apos;s/Guardian 1 Full Name
            </Label>
            <Input
              id="fatherName"
              placeholder="John Doe Sr."
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.familyInfo.fatherName}
            />
          </div>
          <div>
            <Label htmlFor="fatherOccupation" className="text-sm font-medium">
              Occupation
            </Label>
            <Input
              id="fatherOccupation"
              placeholder="Engineer"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.familyInfo.fatherOccupation}
            />
          </div>
          <div>
            <Label htmlFor="fatherPhone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="fatherPhone"
              type="tel"
              placeholder="(123) 456-7890"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.familyInfo.fatherPhone}
            />
          </div>
          <div>
            <Label htmlFor="fatherEmail" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="fatherEmail"
              type="email"
              placeholder="father@example.com"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.familyInfo.fatherEmail}
            />
          </div>
          <div className="h-px bg-gray-200 md:col-span-2 my-2" />
          <div>
            <Label htmlFor="motherName" className="text-sm font-medium">
              Mother&apos;s/Guardian 2 Full Name
            </Label>
            <Input
              id="motherName"
              placeholder="Jane Doe"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.familyInfo.motherName}
            />
          </div>
          <div>
            <Label htmlFor="motherOccupation" className="text-sm font-medium">
              Occupation
            </Label>
            <Input
              id="motherOccupation"
              placeholder="Doctor"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.familyInfo.motherOccupation}
            />
          </div>
          <div>
            <Label htmlFor="motherPhone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="motherPhone"
              type="tel"
              placeholder="(123) 456-7890"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.familyInfo.motherPhone}
            />
          </div>
          <div>
            <Label htmlFor="motherEmail" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="motherEmail"
              type="email"
              placeholder="mother@example.com"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.familyInfo.motherEmail}
            />
          </div>
          <div className="h-px bg-gray-200 md:col-span-2 my-2" />
          <div>
            <Label htmlFor="siblings" className="text-sm font-medium">
              Number of Siblings
            </Label>
            <Input
              id="siblings"
              type="number"
              placeholder="0"
              min="0"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.familyInfo.siblings}
            />
          </div>
          <div>
            <Label htmlFor="siblingsAtSchool" className="text-sm font-medium">
              Siblings at this School
            </Label>
            <div className="flex items-center space-x-2 mt-3">
              <Switch
                id="siblingsAtSchool"
                checked={formData.familyInfo.siblingsAtSchool}
                onCheckedChange={(checked) =>
                  handleSwitchChange("siblingsAtSchool", checked)
                }
              />
              <Label htmlFor="siblingsAtSchool" className="text-sm">
                Yes
              </Label>
            </div>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="familyNotes" className="text-sm font-medium">
              Additional Family Information
            </Label>
            <Textarea
              id="familyNotes"
              placeholder="Any additional information about family circumstances that the school should be aware of"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-2xl h-24"
              onChange={handleInputChange}
              value={formData.familyInfo.familyNotes}
            />
          </div>
        </div>
      ),
    },
    {
      id: "academicInfo",
      label: "Academic",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="appliedClass" className="text-sm font-medium">
              Applying for Class*
            </Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("appliedClass", value)
              }
              value={formData.academicInfo.appliedClass}
            >
              <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nursery">Nursery</SelectItem>
                <SelectItem value="kg">Kindergarten</SelectItem>
                <SelectItem value="1">Class 1</SelectItem>
                <SelectItem value="2">Class 2</SelectItem>
                <SelectItem value="3">Class 3</SelectItem>
                <SelectItem value="4">Class 4</SelectItem>
                <SelectItem value="5">Class 5</SelectItem>
                <SelectItem value="6">Class 6</SelectItem>
                <SelectItem value="7">Class 7</SelectItem>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="session" className="text-sm font-medium">
              Academic Session*
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("session", value)}
              value={formData.academicInfo.session}
            >
              <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                <SelectValue placeholder="Select Session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-2026">2025-2026</SelectItem>
                <SelectItem value="2026-2027">2026-2027</SelectItem>
                <SelectItem value="2027-2028">2027-2028</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="admissionType" className="text-sm font-medium">
              Admission Type*
            </Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("admissionType", value)
              }
              value={formData.academicInfo.admissionType}
            >
              <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Admission</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="readmission">Re-Admission</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="board" className="text-sm font-medium">
              Board/Curriculum Preference
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("board", value)}
              value={formData.academicInfo.board}
            >
              <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                <SelectValue placeholder="Select Board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cbse">CBSE</SelectItem>
                <SelectItem value="icse">ICSE</SelectItem>
                <SelectItem value="state">State Board</SelectItem>
                <SelectItem value="ib">International Baccalaureate</SelectItem>
                <SelectItem value="igcse">Cambridge IGCSE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="previousSchool" className="text-sm font-medium">
              Previous School (if any)
            </Label>
            <Input
              id="previousSchool"
              placeholder="ABC School"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.medicalConditions}
            />
          </div>
          <div>
            <Label htmlFor="schoolAddress" className="text-sm font-medium">
              Previous School Address
            </Label>
            <Input
              id="schoolAddress"
              placeholder="123 School St, City"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.medicalConditions}
            />
          </div>
          <div>
            <Label htmlFor="lastClass" className="text-sm font-medium">
              Last Class Attended
            </Label>
            <Input
              id="lastClass"
              placeholder="e.g. Class 5"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.medicalConditions}
            />
          </div>
          <div>
            <Label htmlFor="lastGrade" className="text-sm font-medium">
              Last Grade/Percentage
            </Label>
            <Input
              id="lastGrade"
              placeholder="e.g. A / 85%"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.contactInfo.medicalConditions}
            />
          </div>
          <div>
            <Label
              htmlFor="transferCertificate"
              className="text-sm font-medium"
            >
              Transfer Certificate Available
            </Label>
            <div className="flex items-center space-x-2 mt-3">
              <Switch
                id="transferCertificate"
                checked={formData.contactInfo.transferCertificate}
                onCheckedChange={(checked) =>
                  handleSwitchChange("transferCertificate", checked)
                }
              />
              <Label htmlFor="transferCertificate" className="text-sm">
                Yes
              </Label>
            </div>
          </div>
          <div>
            <Label htmlFor="stream" className="text-sm font-medium">
              Stream (for Class 11-12)
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("stream", value)}
              value={formData.academicInfo.stream}
            >
              <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                <SelectValue placeholder="Select Stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="arts">Arts/Humanities</SelectItem>
                <SelectItem value="na">Not Applicable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="achievements" className="text-sm font-medium">
              Academic/Extra-curricular Achievements
            </Label>
            <Textarea
              id="achievements"
              placeholder="List any notable achievements or awards"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-2xl h-24"
              onChange={handleInputChange}
              value={formData.contactInfo.medicalConditions}
            />
          </div>
        </div>
      ),
    },
    {
      id: "additionalInfo",
      label: "Additional",
      icon: <FileText className="mr-2 h-4 w-4" />,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="languages" className="text-sm font-medium">
              Languages Known
            </Label>
            <Input
              id="languages"
              placeholder="e.g. English, Spanish, Hindi"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              onChange={handleInputChange}
              value={formData.additionalInfo.languages}
            />
          </div>
          <div>
            <Label htmlFor="transport" className="text-sm font-medium">
              Transportation Required
            </Label>
            <div className="flex items-center space-x-2 mt-3">
              <Switch
                id="transport"
                checked={formData.additionalInfo.transport}
                onCheckedChange={(checked) =>
                  handleSwitchChange("transport", checked)
                }
              />
              <Label htmlFor="transport" className="text-sm">
                Yes
              </Label>
            </div>
          </div>
          <div>
            <Label htmlFor="hostel" className="text-sm font-medium">
              Hostel Accommodation Required
            </Label>
            <div className="flex items-center space-x-2 mt-3">
              <Switch
                id="hostel"
                checked={formData.additionalInfo.hostel}
                onCheckedChange={(checked) =>
                  handleSwitchChange("hostel", checked)
                }
              />
              <Label htmlFor="hostel" className="text-sm">
                Yes
              </Label>
            </div>
          </div>
          <div>
            <Label htmlFor="activities" className="text-sm font-medium">
              Extra-curricular Interests
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("activities", value)}
              value={formData.academicInfo.activities}
            >
              <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                <SelectValue placeholder="Select Interests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="dance">Dance</SelectItem>
                <SelectItem value="art">Art & Craft</SelectItem>
                <SelectItem value="debate">Debate & Speech</SelectItem>
                <SelectItem value="science">Science Club</SelectItem>
                <SelectItem value="coding">Coding & Robotics</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="specialNeeds" className="text-sm font-medium">
              Special Educational Needs
            </Label>
            <div className="flex items-center space-x-2 mt-3">
              <Switch
                id="specialNeeds"
                checked={formData.academicInfo.specialNeeds}
                onCheckedChange={(checked) =>
                  handleSwitchChange("specialNeeds", checked)
                }
              />
              <Label htmlFor="specialNeeds" className="text-sm">
                Yes
              </Label>
            </div>
          </div>
          <div>
            <Label htmlFor="hearAbout" className="text-sm font-medium">
              How did you hear about us?
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("hearAbout", value)}
              value={formData.additionalInfo.hearAbout}
            >
              <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">School Website</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="newspaper">Newspaper/Magazine</SelectItem>
                <SelectItem value="friend">Friend/Family</SelectItem>
                <SelectItem value="event">School Event</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="additionalInfo" className="text-sm font-medium">
              Any Additional Information
            </Label>
            <Textarea
              id="additionalInfo"
              placeholder="Share any additional information that might be relevant to your application"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-2xl h-24"
              onChange={handleInputChange}
              value={formData.additionalInfo.medicalConditions}
            />
          </div>
          <div className="md:col-span-2 mt-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="termsAccepted"
                checked={formData.additionalInfo.termsAccepted}
                onCheckedChange={(checked) =>
                  handleSwitchChange("termsAccepted", checked)
                }
              />
              <Label htmlFor="termsAccepted" className="text-sm">
                I confirm that all information provided is accurate and
                complete. I agree to the school's terms and conditions.
              </Label>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextTab = () => {
    const currentIndex = formSections.findIndex(
      (section) => section.id === activeTab
    );
    if (currentIndex < formSections.length - 1) {
      setLocalActiveTab(formSections[currentIndex + 1].id);
      setActiveTab(formSections[currentIndex + 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <Card className="overflow-hidden border border-gray-100 pt-0 shadow-md rounded-3xl">
          <CardHeader className="border-b border-gray-100 bg-black text-white p-6 rounded-t-3xl">
            <CardTitle className="flex items-center text-2xl">
              <Calendar className="mr-2 h-6 w-6" /> Student Admission
              Application
            </CardTitle>
            <CardDescription className="text-gray-300">
              Complete all sections to apply for admission to our institution
            </CardDescription>
          </CardHeader>

          {/* Fixed navigation bar - removed form fields from here */}
          <div className="flex bg-white border-b border-gray-100 p-4 overflow-x-auto">
            {formSections.map((section, index) => (
              <div
                key={section.id}
                className={`flex items-center ${
                  index > 0 ? "ml-8" : ""
                } flex-shrink-0`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full mr-2 ${
                    activeTab === section.id
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {activeTab === section.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-sm ${
                    activeTab === section.id
                      ? "text-black font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {section.label}
                </span>
                {index < formSections.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-300 ml-2" />
                )}
              </div>
            ))}
          </div>

          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="hidden">
                {formSections.map((section) => (
                  <TabsTrigger key={section.id} value={section.id}>
                    {section.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {formSections.map((section) => (
                <TabsContent
                  key={section.id}
                  value={section.id}
                  className="mt-0"
                >
                  {/* Form fields are rendered here */}
                  {section.fields}

                  <div className="flex items-center justify-between mt-8">
                    {activeTab !== formSections[0].id && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          const currentIndex = formSections.findIndex(
                            (section) => section.id === activeTab
                          );
                          if (currentIndex > 0) {
                            setActiveTab(formSections[currentIndex - 1].id);
                          }
                        }}
                        className="rounded-full border-gray-300 text-gray-600 hover:bg-gray-50"
                      >
                        &larr; Previous
                      </Button>
                    )}

                    {activeTab !== formSections[formSections.length - 1].id ? (
                      <>
                        <Button
                          variant="outline"
                          className="ml-auto rounded-full border-gray-300 text-gray-600 hover:bg-gray-50 mr-2"
                          onClick={handleSaveDraft}
                        >
                          Save draft
                        </Button>
                        <Button
                          onClick={nextTab}
                          className="rounded-full bg-black text-white hover:bg-gray-800"
                        >
                          Next &rarr;
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        className="ml-auto rounded-full bg-black text-white hover:bg-gray-800"
                      >
                        Submit Application
                      </Button>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Card>
      </div>

      <ConfirmAddStudentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </div>
  );
}
