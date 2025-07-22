"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronRight, Calendar } from "lucide-react";
import { toast } from "sonner";
import ConfirmAddStudentModal from "@/components/students/ConfirmAddStudentModal";
import useAdmissionStore from "@/lib/state/stores/admissionStore";
import FormSections from "@/components/students/FormSections";
import { Card } from "@/components/ui";

export default function ModernAdmissionForm() {
  // const [activeTab, setActiveTab] = useState("personalInfo");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const formSections = FormSections({
    formData,
    handleInputChange,
    handleSwitchChange,
  });

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
    <Card className="min-h-screen px-6">
      <div className="">
        <div className="flex items-center font-semibold text-xl">
          <Calendar className="mr-2 h-6 w-6" /> Student Admission Application
        </div>
        <div className="text-gray-500">
          Complete all sections to apply for admission to our institution
        </div>
      </div>

      {/* Fixed navigation bar - removed form fields from here */}
      <div className="flex border-b border-gray-100 dark:border-gray-900 py-4 overflow-x-auto">
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
                  ? "text-black font-medium dark:text-white"
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

      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="hidden">
            {formSections.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {formSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-0">
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
                    className="rounded-full border-gray-300 dark:border-gray-900 text-gray-600 hover:bg-gray-50"
                  >
                    &larr; Previous
                  </Button>
                )}

                {activeTab !== formSections[formSections.length - 1].id ? (
                  <>
                    <Button
                      variant="outline"
                      className="ml-auto rounded-full border-gray-300 dark:border-gray-900 text-gray-600 hover:bg-gray-50 mr-2"
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

      <ConfirmAddStudentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </Card>
  );
}
