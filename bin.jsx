// First, let's create a new store for admission-related state
// /src/lib/state/stores/admissionStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Student } from "../../types";

export interface AdmissionFormData {
  // Personal Info
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredName?: string;
  gender?: string;
  dob?: string;
  photoUrl?: string;
  bloodGroup?: string;
  medicalConditions?: string;

  // Contact Info
  email: string;
  phone: string;
  alternatePhone?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyRelation?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  // Family Info
  fatherName?: string;
  fatherOccupation?: string;
  fatherPhone?: string;
  fatherEmail?: string;
  motherName?: string;
  motherOccupation?: string;
  motherPhone?: string;
  motherEmail?: string;
  siblings?: number;
  siblingsAtSchool?: boolean;
  familyNotes?: string;

  // Academic Info
  appliedClass: string;
  session: string;
  admissionType: string;
  board?: string;
  previousSchool?: string;
  schoolAddress?: string;
  lastClass?: string;
  lastGrade?: string;
  transferCertificate?: boolean;
  stream?: string;
  achievements?: string;

  // Additional Info
  languages?: string;
  transport?: boolean;
  hostel?: boolean;
  activities?: string;
  specialNeeds?: boolean;
  hearAbout?: string;
  additionalInfo?: string;
  termsAccepted: boolean;
}

interface AdmissionState {
  formData: Partial<AdmissionFormData>;
  activeTab: string;
  isComplete: boolean;
  referenceNumber: string | null;
  updateFormData: (data: Partial<AdmissionFormData>) => void;
  setActiveTab: (tabId: string) => void;
  resetForm: () => void;
  setReferenceNumber: (number: string) => void;
}

export const useAdmissionStore = create<AdmissionState>()(
  persist(
    (set) => ({
      formData: {},
      activeTab: "personalInfo",
      isComplete: false,
      referenceNumber: null,

      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      setActiveTab: (tabId) => set({ activeTab: tabId }),

      resetForm: () =>
        set({
          formData: {},
          activeTab: "personalInfo",
          isComplete: false,
          referenceNumber: null,
        }),

      setReferenceNumber: (number) =>
        set({
          referenceNumber: number,
          isComplete: true,
        }),
    }),
    {
      name: "erp-admission-storage",
      partialize: (state) => ({
        formData: state.formData,
        activeTab: state.activeTab,
      }),
    }
  )
);

// Now let's create API endpoints for admissions
// /src/lib/api/endpoints.ts (add the following to your existing endpoints file)

export const admissionApi = {
  submit: (formData: Partial<AdmissionFormData>) =>
    fetcher<{ success: boolean; referenceNumber: string }>("/admissions", {
      method: "POST",
      body: JSON.stringify(formData),
    }),

  getStatus: (referenceNumber: string) =>
    fetcher<{ status: string; stage: string; nextSteps: string }>(
      `/admissions/${referenceNumber}/status`
    ),

  uploadDocument: (
    referenceNumber: string,
    documentType: string,
    file: File
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetcher<{ success: boolean; fileUrl: string }>(
      `/admissions/${referenceNumber}/documents/${documentType}`,
      {
        method: "POST",
        body: formData,
        headers: {}, // Let the browser set the content type for FormData
      }
    );
  },
};

// Let's create query hooks for admission
// /src/lib/state/queries/useAdmission.ts
("use client");

import { useMutation } from "@tanstack/react-query";
import { admissionApi } from "../../api/endpoints";
import { AdmissionFormData } from "../stores/admissionStore";

export function useSubmitAdmission() {
  return useMutation({
    mutationFn: (formData: Partial<AdmissionFormData>) =>
      admissionApi.submit(formData),
  });
}

export function useUploadDocument() {
  return useMutation({
    mutationFn: ({
      referenceNumber,
      documentType,
      file,
    }: {
      referenceNumber: string;
      documentType: string;
      file: File;
    }) => admissionApi.uploadDocument(referenceNumber, documentType, file),
  });
}

// Now let's modify the admission form component to use our state management
// /src/app/admission/page.tsx (or wherever your form component is located)
("use client");

import { useState, useRef, ChangeEvent } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Check,
  ChevronRight,
  User,
  BookOpen,
  Home,
  Phone,
  Briefcase,
  FileText,
  Medal,
  ImagePlus,
  Calendar,
  HeartPulse,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

// Import our store and hooks
import {
  useAdmissionStore,
  AdmissionFormData,
} from "@/lib/state/stores/admissionStore";
import {
  useSubmitAdmission,
  useUploadDocument,
} from "@/lib/state/queries/useAdmission";

export default function ModernAdmissionForm() {
  // Replace useState with our Zustand store
  const {
    formData,
    activeTab,
    referenceNumber,
    updateFormData,
    setActiveTab,
    setReferenceNumber,
  } = useAdmissionStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use TanStack Query mutations
  const submitAdmission = useSubmitAdmission();
  const uploadDocument = useUploadDocument();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    updateFormData({ [id]: value });
  };

  const handleSelectChange = (id: string, value: string) => {
    updateFormData({ [id]: value });
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    updateFormData({ [id]: checked });
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    updateFormData({ photoUrl: objectUrl });

    // We'll handle the actual upload when the form is submitted
    // For now just store the file reference
    setPhotoFile(file);
  };

  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      // Submit the form data
      const result = await submitAdmission.mutateAsync(
        formData as AdmissionFormData
      );

      // Store the reference number
      setReferenceNumber(result.referenceNumber);

      // If we have a photo to upload, do that now
      if (photoFile && result.referenceNumber) {
        await uploadDocument.mutateAsync({
          referenceNumber: result.referenceNumber,
          documentType: "photo",
          file: photoFile,
        });
      }

      toast.success("Application Submitted Successfully", {
        description: `Your reference number: ${result.referenceNumber}`,
        duration: 5000,
      });

      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to submit application", {
        description: "Please try again later or contact support",
        duration: 5000,
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
              placeholder="John"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              value={formData.firstName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="middleName" className="text-sm font-medium">
              Middle Name
            </Label>
            <Input
              id="middleName"
              placeholder="William"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              value={formData.middleName || ""}
              onChange={handleInputChange}
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
              value={formData.lastName || ""}
              onChange={handleInputChange}
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
              value={formData.preferredName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="gender" className="text-sm font-medium">
              Gender*
            </Label>
            <Select
              value={formData.gender || ""}
              onValueChange={(value) => handleSelectChange("gender", value)}
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
              value={formData.dob || ""}
              onChange={handleInputChange}
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
              <input
                type="file"
                id="photo"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/png"
                onChange={handlePhotoUpload}
              />
              <Button
                variant="outline"
                className="border-dashed border-gray-300 bg-white hover:bg-gray-50 rounded-full w-full flex items-center justify-center py-5"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="mr-2 h-4 w-4" /> Upload Photo
              </Button>
            </div>
            {formData.photoUrl && (
              <div className="mt-2 relative w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={formData.photoUrl}
                  alt="Student Photo"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="bloodGroup" className="text-sm font-medium">
              Blood Group
            </Label>
            <Select
              value={formData.bloodGroup || ""}
              onValueChange={(value) => handleSelectChange("bloodGroup", value)}
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
              value={formData.medicalConditions || ""}
              onChange={handleInputChange}
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
              value={formData.email || ""}
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
              value={formData.phone || ""}
              onChange={handleInputChange}
            />
          </div>
          {/* Remaining contact fields */}
          <div>
            <Label htmlFor="alternatePhone" className="text-sm font-medium">
              Alternate Phone Number
            </Label>
            <Input
              id="alternatePhone"
              type="tel"
              placeholder="(123) 456-7890"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              value={formData.alternatePhone || ""}
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
              value={formData.emergencyContactName || ""}
              onChange={handleInputChange}
            />
          </div>
          {/* More contact fields omitted for brevity - add all fields from original form */}
          <div className="md:col-span-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Current Address*
            </Label>
            <Input
              id="address"
              placeholder="123 Main St"
              className="mt-1 bg-white border-gray-300 focus:ring-black rounded-full"
              value={formData.address || ""}
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
              value={formData.city || ""}
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
              value={formData.state || ""}
              onChange={handleInputChange}
            />
          </div>
          {/* Additional fields would be added here following the same pattern */}
        </div>
      ),
    },
    // Include other sections similar to the original, but updating to use our state management
    // Family, Academic, Additional sections
    // I'll show one more example section:
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
              value={formData.appliedClass || ""}
              onValueChange={(value) =>
                handleSelectChange("appliedClass", value)
              }
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
              value={formData.session || ""}
              onValueChange={(value) => handleSelectChange("session", value)}
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
          {/* Add other fields similarly */}
        </div>
      ),
    },
    // Add other sections from the original form, following the same pattern
  ];

  const nextTab = () => {
    const currentIndex = formSections.findIndex(
      (section) => section.id === activeTab
    );
    if (currentIndex < formSections.length - 1) {
      setActiveTab(formSections[currentIndex + 1].id);
    }
  };

  // Page Version
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

          {/* Fixed navigation bar */}
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
                      <Button
                        onClick={nextTab}
                        className="ml-auto rounded-full bg-black text-white hover:bg-gray-800"
                      >
                        Next &rarr;
                      </Button>
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Confirm Submission
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center space-y-2">
              <HeartPulse className="mx-auto h-12 w-12 text-red-500" />
              <p>
                Please ensure all information provided is accurate before
                submitting. Once submitted, you cannot make changes to your
                application.
              </p>
            </div>
            <div className="flex items-center space-x-2 border-t border-b border-gray-100 py-3">
              <Medal className="h-5 w-5 text-amber-500" />
              <p className="text-sm">
                Your application will be reviewed by our admissions team. We aim
                to respond within 5-7 working days.
              </p>
            </div>
          </div>
          <div className="flex justify-between space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 rounded-full border-gray-300"
              disabled={submitAdmission.isPending}
            >
              Go Back
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 rounded-full bg-black text-white hover:bg-gray-800"
              disabled={submitAdmission.isPending}
            >
              {submitAdmission.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                "Confirm & Submit"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog - could be shown after successful submission */}
      {referenceNumber && (
        <Dialog open={!!referenceNumber} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-semibold">
                Application Submitted!
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4 text-center">
              <Check className="mx-auto h-12 w-12 text-green-500" />
              <p className="font-medium">
                Your application has been submitted successfully.
              </p>
              <p>
                Your reference number:{" "}
                <span className="font-bold">{referenceNumber}</span>
              </p>
              <p className="text-sm text-gray-500">
                Please save this reference number for future correspondence.
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                className="rounded-full bg-black text-white hover:bg-gray-800"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Return to Dashboard
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
