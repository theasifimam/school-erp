"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Calendar, Save, Loader2 } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { convertStudentToFormData, studentFormData } from "@/lib/utils";
import { tabs } from "@/lib/data/student.data";

import {
  getSectionFromFieldId,
  validateRequiredFields,
  PhotoUpload,
  FormSection,
  ActionButtons,
  ProgressBarNavigation,
} from "@/lib/services/student.services";
import { useStudentStore } from "@/lib/state/stores/studentStore";

// Main component
export default function StudentFormModal({
  isOpen,
  onClose,
  studentData = null,
  mode = "add",
  enableDraftSaving = true,
}) {
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [formData, setFormData] = useState(studentFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const createStudent = useStudentStore((state) => state.createStudent);

  // localStorage keys
  const DRAFT_KEY = "student-form-draft";
  const ACTIVE_TAB_KEY = "student-form-active-tab";
  const LAST_SAVED_KEY = "student-form-last-saved";

  // Utility function to check if form has any data
  const hasFormData = (data) => {
    return Object.values(data).some((section) =>
      Object.values(section).some((value) => {
        if (typeof value === "string") return value.trim() !== "";
        if (typeof value === "boolean") return value !== false;
        if (typeof value === "number") return value !== 0;
        return value !== null && value !== undefined;
      })
    );
  };

  // Save to localStorage
  const saveDraftToStorage = (data, tab) => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      localStorage.setItem(ACTIVE_TAB_KEY, tab);
      localStorage.setItem(LAST_SAVED_KEY, new Date().toISOString());
      setLastSaved(new Date());
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  };

  // Load from localStorage
  const loadDraftFromStorage = () => {
    try {
      const savedData = localStorage.getItem(DRAFT_KEY);
      const savedTab = localStorage.getItem(ACTIVE_TAB_KEY);
      const savedTime = localStorage.getItem(LAST_SAVED_KEY);

      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        setActiveTab(savedTab || "personalInfo");
        setLastSaved(savedTime ? new Date(savedTime) : null);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return false;
    }
  };

  // Clear localStorage
  const clearDraftFromStorage = () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
      localStorage.removeItem(ACTIVE_TAB_KEY);
      localStorage.removeItem(LAST_SAVED_KEY);
      setLastSaved(null);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  // Initialize form data on modal open
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && studentData) {
        // Load student data for editing
        const convertedData = convertStudentToFormData(studentData);
        setFormData(convertedData);
        setActiveTab("personalInfo");
      } else if (mode === "add") {
        // Try to load draft for add mode
        const draftLoaded = loadDraftFromStorage();
        if (!draftLoaded) {
          // No draft found, start with empty form
          setFormData(studentFormData);
          setActiveTab("personalInfo");
        }
      }
    }
  }, [isOpen, studentData, mode]);

  // Auto-save functionality
  useEffect(() => {
    if (!enableDraftSaving || !isOpen || mode !== "add") return;

    const autoSaveInterval = setInterval(() => {
      if (hasFormData(formData)) {
        const saved = saveDraftToStorage(formData, activeTab);
        if (saved) {
          console.log("Auto-saved draft at", new Date().toLocaleTimeString());
        }
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [enableDraftSaving, isOpen, mode, formData, activeTab]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const section = getSectionFromFieldId(id);
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [id]: fieldValue,
      },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          photo: imageUrl,
        },
      }));
    }
  };

  const handleSelectChange = (id, value) => {
    const section = getSectionFromFieldId(id);
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [id]: value,
      },
    }));
  };

  const handleSwitchChange = (id, checked) => {
    const section = getSectionFromFieldId(id);
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [id]: checked,
      },
    }));
  };

  const handleSaveDraft = () => {
    if (!enableDraftSaving) {
      toast.warning("Draft saving is not enabled");
      return;
    }

    if (!hasFormData(formData)) {
      toast.warning("No data to save");
      return;
    }

    const saved = saveDraftToStorage(formData, activeTab);
    if (saved) {
      toast.success("Draft saved successfully");
    } else {
      toast.error("Failed to save draft");
    }
  };

  const handleSubmit = async () => {
    const requiredFields = validateRequiredFields(formData);

    if (requiredFields.length > 0) {
      toast.error("Please fill in all required fields", {
        description: `Missing: ${requiredFields.join(", ")}`,
        duration: 5000,
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (mode === "add") {
        // For add mode, generate a reference number
        createStudent({ ...formData });
        // const referenceNumber = `REF-${Date.now()}`;
        // toast.success("Application submitted successfully!", {
        //   description: `Reference Number: ${referenceNumber}`,
        //   duration: 5000,
        // });

        // Clear draft after successful submission
        clearDraftFromStorage();

        onClose({
          ...formData,
          // referenceNumber,
          submitted: true,
        });
      } else {
        toast.success("Student updated successfully!", {
          duration: 3000,
        });
        onClose(formData);
      }

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Submission Failed", {
        description: error.message,
        duration: 5000,
      });
    }
  };

  const nextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      const nextTabName = tabs[currentIndex + 1];
      setActiveTab(nextTabName);

      // Save progress when moving to next tab
      if (enableDraftSaving && mode === "add") {
        saveDraftToStorage(formData, nextTabName);
      }
    }
  };

  const prevTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      const prevTabName = tabs[currentIndex - 1];
      setActiveTab(prevTabName);

      // Save progress when moving to previous tab
      if (enableDraftSaving && mode === "add") {
        saveDraftToStorage(formData, prevTabName);
      }
    }
  };

  const handleClose = () => {
    // Save draft before closing if in add mode
    if (enableDraftSaving && mode === "add" && hasFormData(formData)) {
      saveDraftToStorage(formData, activeTab);
    }
    onClose();
  };

  const handleClearForm = () => {
    setShowClearConfirm(true);
  };

  const confirmClearForm = () => {
    setFormData(studentFormData);
    setActiveTab("personalInfo");
    clearDraftFromStorage();
    toast.success("Form cleared successfully");
    setShowClearConfirm(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[600px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex flex-col items-left justify-between">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              {mode === "add" ? "Add New Student" : "Edit Student Information"}
            </div>
            <div className="flex items-center justify-end mt-2 gap-2 w-full">
              {enableDraftSaving && mode === "add" && hasFormData(formData) && (
                <Button variant="secondary" size="sm" disabled>
                  {lastSaved
                    ? `Saved ${lastSaved.toLocaleTimeString()}`
                    : "Draft Available"}
                </Button>
              )}
              {enableDraftSaving && mode === "add" && hasFormData(formData) && (
                <Button
                  variant="destructive"
                  onClick={handleClearForm}
                  disabled={isSubmitting}
                  size="sm"
                >
                  Clear Form
                </Button>
              )}
              {enableDraftSaving && mode === "add" && (
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  size="sm"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <ProgressBarNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="flex-1 overflow-y-auto p-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="personalInfo" className="mt-0 space-y-6">
              <PhotoUpload
                photo={formData.personalInfo?.photo}
                firstName={formData.personalInfo?.firstName}
                onFileChange={handleFileChange}
                fileInputRef={fileInputRef}
              />
            </TabsContent>

            {tabs.map((sectionKey) => (
              <TabsContent
                key={sectionKey}
                value={sectionKey}
                className="mt-0 space-y-6"
              >
                <FormSection
                  sectionKey={sectionKey}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                  handleSwitchChange={handleSwitchChange}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <ActionButtons
          activeTab={activeTab}
          onClose={handleClose}
          prevTab={prevTab}
          nextTab={nextTab}
          handleSubmit={handleSubmit}
          mode={mode}
          isSubmitting={isSubmitting}
        />

        {/* Loading overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>
                {mode === "add"
                  ? "Submitting application..."
                  : "Updating student..."}
              </span>
            </div>
          </div>
        )}
      </DialogContent>

      {/* Clear form confirmation dialog */}
      <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Clear Form Data?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to clear all form data? This action cannot be
            undone and will remove the saved draft.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowClearConfirm(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmClearForm}>
              Clear Form
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
