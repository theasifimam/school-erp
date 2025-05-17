"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Camera,
  User,
  Phone,
  Home,
  BookOpen,
  FileText,
  Calendar,
  Check,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { convertStudentToFormData, studentFormData } from "@/lib/utils";

const familyInfo = [
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
];

const contactInfo = [
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
];
const academicInfo = [
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
];
const additionalInfo = [
  "languages",
  "transport",
  "hostel",
  "activities",
  "specialNeeds",
  "hearAbout",
  "additionalInfo",
  "termsAccepted",
];

// This component combines features from both EditUserModal and ModernAdmissionForm
export default function StudentFormModal({
  isOpen,
  onClose,
  studentData = null,
  mode = "add", // 'add' or 'edit'
}) {
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [formData, setFormData] = useState(studentFormData);

  // Initialize form data if in edit mode
  useEffect(() => {
    if (mode === "edit" && studentData) {
      setFormData(convertStudentToFormData(studentData));
    }
  }, [studentData, mode, isOpen]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    // Determine which section this field belongs to
    const section = getSectionFromFieldId(id);

    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [id]: type === "checkbox" ? checked : value,
      },
    });
  };

  // Helper to determine which section a field belongs to
  const getSectionFromFieldId = (id) => {
    if (familyInfo.includes(id)) return "familyInfo";
    if (contactInfo.includes(id)) return "contactInfo";
    if (academicInfo.includes(id)) return "academicInfo";
    if (additionalInfo.includes(id)) return "additionalInfo";

    // Default to personalInfo
    return "personalInfo";
  };

  // Handle photo upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          photo: imageUrl,
        },
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (id, value) => {
    const section = getSectionFromFieldId(id);
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [id]: value,
      },
    });
  };

  // Handle switch changes
  const handleSwitchChange = (id, checked) => {
    const section = getSectionFromFieldId(id);
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [id]: checked,
      },
    });
  };

  // Form submit handler
  const handleSubmit = () => {
    // Validate form data before submission
    const requiredFields = validateRequiredFields();

    if (requiredFields.length > 0) {
      toast.error("Please fill in all required fields", {
        description: `Missing: ${requiredFields.join(", ")}`,
        duration: 5000,
      });
      return;
    }

    try {
      // Show success message
      if (mode === "add") {
        toast.success("Student Added Successfully", {
          duration: 3000,
        });
      } else {
        toast.success("Student Updated Successfully", {
          duration: 3000,
        });
      }

      // Close the modal
      onClose(formData);
    } catch (error) {
      toast.error("Submission Failed", {
        description: error.message,
        duration: 5000,
      });
    }
  };

  // Basic validation
  const validateRequiredFields = () => {
    const missingFields = [];

    // Check personal info
    if (!formData.personalInfo.firstName) missingFields.push("First Name");
    if (!formData.personalInfo.lastName) missingFields.push("Last Name");
    if (!formData.personalInfo.gender) missingFields.push("Gender");
    if (!formData.personalInfo.dob) missingFields.push("Date of Birth");

    // Check contact info
    if (!formData.contactInfo.email) missingFields.push("Email");
    if (!formData.contactInfo.phone) missingFields.push("Phone Number");
    if (!formData.contactInfo.address) missingFields.push("Address");
    if (!formData.contactInfo.city) missingFields.push("City");
    if (!formData.contactInfo.state) missingFields.push("State");
    if (!formData.contactInfo.country) missingFields.push("Country");
    if (!formData.contactInfo.zipCode) missingFields.push("ZIP Code");

    // Academic info required fields
    if (!formData.academicInfo.appliedClass)
      missingFields.push("Applied Class");
    if (!formData.academicInfo.session) missingFields.push("Academic Session");
    if (!formData.academicInfo.admissionType)
      missingFields.push("Admission Type");

    return missingFields;
  };

  // Next tab handler
  const nextTab = () => {
    const tabs = [
      "personalInfo",
      "contactInfo",
      "familyInfo",
      "academicInfo",
      "additionalInfo",
    ];
    const currentIndex = tabs.indexOf(activeTab);

    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  // Previous tab handler
  const prevTab = () => {
    const tabs = [
      "personalInfo",
      "contactInfo",
      "familyInfo",
      "academicInfo",
      "additionalInfo",
    ];
    const currentIndex = tabs.indexOf(activeTab);

    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  // Define form sections
  const formSections = [
    {
      id: "personalInfo",
      label: "Personal",
      icon: <User className="h-4 w-4" />,
    },
    {
      id: "contactInfo",
      label: "Contact",
      icon: <Phone className="h-4 w-4" />,
    },
    {
      id: "familyInfo",
      label: "Family",
      icon: <Home className="h-4 w-4" />,
    },
    {
      id: "academicInfo",
      label: "Academic",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "additionalInfo",
      label: "Additional",
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] p-0 rounded-3xl overflow-hidden h-[90vh] flex flex-col">
        <DialogHeader className="px-6 py-4 bg-black text-white">
          <DialogTitle className="text-lg font-semibold flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            {mode === "add" ? "Add New Student" : "Edit Student Information"}
          </DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex flex-wrap bg-white border-b border-gray-100 p-4 justify-center">
          {formSections.map((section, index) => (
            <div
              key={section.id}
              className={`flex items-center ${
                index > 0 ? "ml-8" : ""
              } flex-shrink-0 cursor-pointer`}
              onClick={() => setActiveTab(section.id)}
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
                  section.icon
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

        {/* Form Content with Tabs */}
        <div className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Personal Information Tab */}
            <TabsContent value="personalInfo" className="mt-0 space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  <Avatar className="w-20 h-20 rounded-full border-2 border-gray-100">
                    <AvatarImage
                      src={
                        formData.personalInfo?.photo || "/default-avatar.png"
                      }
                      className="rounded-full"
                      alt="Profile"
                    />
                    <AvatarFallback className="rounded-full bg-gray-50 text-gray-600">
                      {formData.personalInfo.firstName
                        ? formData.personalInfo.firstName[0]
                        : "S"}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    className="absolute -bottom-2 -right-2 bg-white border border-gray-200 text-gray-700 p-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Upload student photo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name*
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.personalInfo.firstName}
                    onChange={handleInputChange}
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
                    value={formData.personalInfo.middleName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name*
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.personalInfo.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="preferredName"
                    className="text-sm font-medium"
                  >
                    Preferred Name/Nickname
                  </Label>
                  <Input
                    id="preferredName"
                    placeholder="Nickname"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.personalInfo.preferredName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="gender" className="text-sm font-medium">
                    Gender*
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("gender", value)
                    }
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
                    value={formData.personalInfo.dob}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="bloodGroup" className="text-sm font-medium">
                    Blood Group
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("bloodGroup", value)
                    }
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
                  <Label
                    htmlFor="medicalConditions"
                    className="text-sm font-medium"
                  >
                    Any Medical Conditions or Allergies
                  </Label>
                  <Textarea
                    id="medicalConditions"
                    placeholder="Please list any medical conditions, allergies, or special needs"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-2xl h-24"
                    value={formData.personalInfo.medicalConditions}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Contact Information Tab */}
            <TabsContent value="contactInfo" className="mt-0 space-y-6">
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
                    value={formData.contactInfo.email}
                    onChange={handleInputChange}
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
                    value={formData.contactInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="alternatePhone"
                    className="text-sm font-medium"
                  >
                    Alternate Phone Number
                  </Label>
                  <Input
                    id="alternatePhone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.contactInfo.alternatePhone}
                    onChange={handleInputChange}
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
                    value={formData.contactInfo.emergencyContactName}
                    onChange={handleInputChange}
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
                    value={formData.contactInfo.emergencyContactPhone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="emergencyRelation"
                    className="text-sm font-medium"
                  >
                    Relationship to Student
                  </Label>
                  <Input
                    id="emergencyRelation"
                    placeholder="Parent/Guardian/Relative"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.contactInfo.emergencyRelation}
                    onChange={handleInputChange}
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
                    value={formData.contactInfo.address}
                    onChange={handleInputChange}
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
                    value={formData.contactInfo.city}
                    onChange={handleInputChange}
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
                    value={formData.contactInfo.state}
                    onChange={handleInputChange}
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
                    value={formData.contactInfo.country}
                    onChange={handleInputChange}
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
                    value={formData.contactInfo.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Family Information Tab */}
            <TabsContent value="familyInfo" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fatherName" className="text-sm font-medium">
                    Father&apos;s/Guardian 1 Full Name
                  </Label>
                  <Input
                    id="fatherName"
                    placeholder="John Doe Sr."
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.familyInfo.fatherName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="fatherOccupation"
                    className="text-sm font-medium"
                  >
                    Occupation
                  </Label>
                  <Input
                    id="fatherOccupation"
                    placeholder="Engineer"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.familyInfo.fatherOccupation}
                    onChange={handleInputChange}
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
                    value={formData.familyInfo.fatherPhone}
                    onChange={handleInputChange}
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
                    value={formData.familyInfo.fatherEmail}
                    onChange={handleInputChange}
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
                    value={formData.familyInfo.motherName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="motherOccupation"
                    className="text-sm font-medium"
                  >
                    Occupation
                  </Label>
                  <Input
                    id="motherOccupation"
                    placeholder="Doctor"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.familyInfo.motherOccupation}
                    onChange={handleInputChange}
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
                    value={formData.familyInfo.motherPhone}
                    onChange={handleInputChange}
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
                    value={formData.familyInfo.motherEmail}
                    onChange={handleInputChange}
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
                    value={formData.familyInfo.siblings}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="siblingsAtSchool"
                    className="text-sm font-medium"
                  >
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
                    value={formData.familyInfo.familyNotes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Academic Information Tab */}
            <TabsContent value="academicInfo" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="appliedClass" className="text-sm font-medium">
                    Class Applied For*
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
                      <SelectItem value="lkg">LKG</SelectItem>
                      <SelectItem value="ukg">UKG</SelectItem>
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
                    onValueChange={(value) =>
                      handleSelectChange("session", value)
                    }
                    value={formData.academicInfo.session}
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                      <SelectValue placeholder="Select Session" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2025-2026">2025-2026</SelectItem>
                      <SelectItem value="2026-2027">2026-2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="admissionType"
                    className="text-sm font-medium"
                  >
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
                      <SelectItem value="rte">RTE Quota</SelectItem>
                      <SelectItem value="scholarship">Scholarship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="board" className="text-sm font-medium">
                    Board
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("board", value)
                    }
                    value={formData.academicInfo.board}
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                      <SelectValue placeholder="Select Board" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cbse">CBSE</SelectItem>
                      <SelectItem value="icse">ICSE</SelectItem>
                      <SelectItem value="state">State Board</SelectItem>
                      <SelectItem value="igcse">IGCSE</SelectItem>
                      <SelectItem value="ib">IB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="previousSchool"
                    className="text-sm font-medium"
                  >
                    Previous School
                  </Label>
                  <Input
                    id="previousSchool"
                    placeholder="Previous School Name"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.academicInfo.previousSchool}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="schoolAddress"
                    className="text-sm font-medium"
                  >
                    School Address
                  </Label>
                  <Input
                    id="schoolAddress"
                    placeholder="Previous School Address"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.academicInfo.schoolAddress}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="lastClass" className="text-sm font-medium">
                    Last Class Attended
                  </Label>
                  <Input
                    id="lastClass"
                    placeholder="Class 5"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.academicInfo.lastClass}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="lastGrade" className="text-sm font-medium">
                    Last Grade/Percentage
                  </Label>
                  <Input
                    id="lastGrade"
                    placeholder="85%"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.academicInfo.lastGrade}
                    onChange={handleInputChange}
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
                      checked={formData.academicInfo.transferCertificate}
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
                    Stream (For Class 11-12)
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("stream", value)
                    }
                    value={formData.academicInfo.stream}
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                      <SelectValue placeholder="Select Stream" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="arts">Arts/Humanities</SelectItem>
                      <SelectItem value="vocational">Vocational</SelectItem>
                      <SelectItem value="na">Not Applicable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="achievements" className="text-sm font-medium">
                    Academic/Co-curricular Achievements
                  </Label>
                  <Textarea
                    id="achievements"
                    placeholder="List any significant achievements or awards"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-2xl h-24"
                    value={formData.academicInfo.achievements}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Additional Information Tab */}
            <TabsContent value="additionalInfo" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="languages" className="text-sm font-medium">
                    Languages Spoken
                  </Label>
                  <Input
                    id="languages"
                    placeholder="English, Hindi, etc."
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
                    value={formData.additionalInfo.languages}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="hearAbout" className="text-sm font-medium">
                    How did you hear about us?
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("hearAbout", value)
                    }
                    value={formData.additionalInfo.hearAbout}
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-300 w-full rounded-full">
                      <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">School Website</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="friends">Friends/Family</SelectItem>
                      <SelectItem value="newspaper">Newspaper</SelectItem>
                      <SelectItem value="billboard">Billboard</SelectItem>
                      <SelectItem value="event">School Event</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="transport" className="text-sm font-medium">
                    School Transport Required
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
                  <Label htmlFor="specialNeeds" className="text-sm font-medium">
                    Special Educational Needs
                  </Label>
                  <div className="flex items-center space-x-2 mt-3">
                    <Switch
                      id="specialNeeds"
                      checked={formData.additionalInfo.specialNeeds}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("specialNeeds", checked)
                      }
                    />
                    <Label htmlFor="specialNeeds" className="text-sm">
                      Yes
                    </Label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="activities" className="text-sm font-medium">
                    Extra-Curricular Activities Interest
                  </Label>
                  <Textarea
                    id="activities"
                    placeholder="List any sports, arts, music, or other activities the student is interested in"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-2xl h-24"
                    value={formData.additionalInfo.activities}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="additionalInfo"
                    className="text-sm font-medium"
                  >
                    Additional Information
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any other information you would like to provide"
                    className="mt-1 bg-white border-gray-300 focus:ring-black rounded-2xl h-24"
                    value={formData.additionalInfo.additionalInfo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-3 mt-4">
                    <Switch
                      id="termsAccepted"
                      checked={formData.additionalInfo.termsAccepted}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("termsAccepted", checked)
                      }
                    />
                    <Label htmlFor="termsAccepted" className="text-sm">
                      I confirm that all the information provided is accurate
                      and complete. I understand that providing false
                      information may result in the cancellation of admission.
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Action Buttons */}
        <div className="border-t p-4 flex justify-between bg-gray-50">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={prevTab}
              className="border-gray-300 hover:bg-gray-100 text-gray-600 rounded-full"
              disabled={activeTab === "personalInfo"}
            >
              Previous
            </Button>
            {activeTab !== "additionalInfo" && (
              <Button
                onClick={nextTab}
                className="bg-black hover:bg-gray-800 text-white rounded-full"
              >
                Next
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 hover:bg-gray-100 text-gray-600 rounded-full"
            >
              Cancel
            </Button>
            {activeTab === "additionalInfo" && (
              <Button
                onClick={handleSubmit}
                className="bg-black hover:bg-gray-800 text-white rounded-full"
              >
                {mode === "add" ? "Submit Application" : "Save Changes"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
