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
import { transformStudent } from "@/lib/utils/student.utils";
import { useClassStore } from "@/lib/state/stores/classStore";

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
  const [formData, setFormData] = useState(transformStudent(studentData));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [photoFile, setPhotoFile] = useState(null); // Store actual file

  const createStudent = useStudentStore((state) => state.createStudent);
  const updateStudent = useStudentStore((state) => state.updateStudent);
  const classes = useClassStore((state) => state.classes);

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

  // Save to localStorage (excluding photo blob)
  const saveDraftToStorage = (data, tab) => {
    try {
      // Create a copy without the photo blob URL
      const dataToSave = {
        ...data,
        personalInfo: {
          ...data.personalInfo,
          photo: data.personalInfo?.photo?.startsWith("blob:")
            ? "" // Don't save blob URLs
            : data.personalInfo?.photo,
        },
      };

      localStorage.setItem(DRAFT_KEY, JSON.stringify(dataToSave));
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
        const convertedData = convertStudentToFormData(studentData);
        setFormData(convertedData);
        setActiveTab("personalInfo");
        setPhotoFile(studentData?.photo?.url);
      } else if (mode === "add") {
        const draftLoaded = loadDraftFromStorage();
        if (!draftLoaded) {
          setFormData(studentFormData);
          setActiveTab("personalInfo");
        }
        setPhotoFile(null);
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
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [enableDraftSaving, isOpen, mode, formData, activeTab]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (formData.personalInfo?.photo?.startsWith("blob:")) {
        URL.revokeObjectURL(formData.personalInfo.photo);
      }
    };
  }, [formData.personalInfo?.photo]);

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
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Please upload JPG, PNG, or GIF images only."
        );
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        toast.error(
          "File size too large. Please upload an image smaller than 5MB."
        );
        return;
      }

      // Revoke previous blob URL if exists
      if (formData.personalInfo?.photo?.startsWith("blob:")) {
        URL.revokeObjectURL(formData.personalInfo.photo);
      }

      // Create blob URL for preview
      const imageUrl = URL.createObjectURL(file);

      // Store the actual file
      setPhotoFile(file);

      // Update form data with preview URL
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

  // Helper function to upload image to server
  // const uploadImage = async (file) => {
  //   const formData = new FormData();
  //   formData.append("photo", file);

  //   try {
  //     const response = await fetch("/api/upload/student-photo", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Image upload failed");
  //     }

  //     const data = await response.json();
  //     return data.imageUrl; // Server should return the uploaded image URL
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     throw error;
  //   }
  // };

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

      // Prepare student data
      const studentPayload = {
        ...formData.academicInfo,
        ...formData.additionalInfo,
        ...formData.contactInfo,
        ...formData.familyInfo,
        ...formData.personalInfo,
      };

      // Handle photo upload
      if (photoFile) {
        try {
          // Option 1: Upload to server and get URL
          // const imageUrl = await uploadImage(photoFile);
          studentPayload.photo = photoFile;
          console.log("Photo file to upload:", photoFile);

          // Option 2: Convert to base64 if your API accepts it
          // const base64Image = await fileToBase64(photoFile);
          // studentPayload.photo = base64Image;
        } catch (error) {
          toast.error("Failed to upload photo", {
            description: "Continuing without photo. You can add it later.",
          });
          // Remove the blob URL from payload
          delete studentPayload.photo;
        }
      } else {
        // If no new photo file, handle existing photo URL
        if (studentPayload.photo?.startsWith("blob:")) {
          delete studentPayload.photo; // Don't send blob URLs to server
        }
      }

      const formDataWithDP = new FormData();
      Object.entries(studentPayload).forEach(([key, value]) => {
        formDataWithDP.append(key, value);
      });

      if (mode === "add") {
        await createStudent(formDataWithDP);
        toast.success("Student application submitted successfully!", {
          duration: 3000,
        });
      } else {
        await updateStudent(studentData._id, formDataWithDP);
        // Update existing student
        toast.success("Student updated successfully!", {
          duration: 3000,
        });
        onClose(studentPayload);
      }

      // Clear draft after successful submission
      clearDraftFromStorage();
      setPhotoFile(null);

      // Revoke blob URL
      if (formData.personalInfo?.photo?.startsWith("blob:")) {
        URL.revokeObjectURL(formData.personalInfo.photo);
      }

      onClose({
        submitted: true,
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission Failed", {
        description: error.message || "Please try again later",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      const nextTabName = tabs[currentIndex + 1];
      setActiveTab(nextTabName);

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

      if (enableDraftSaving && mode === "add") {
        saveDraftToStorage(formData, prevTabName);
      }
    }
  };

  const handleClose = () => {
    if (enableDraftSaving && mode === "add" && hasFormData(formData)) {
      saveDraftToStorage(formData, activeTab);
    }
    onClose();
  };

  const handleClearForm = () => {
    setShowClearConfirm(true);
  };

  const confirmClearForm = () => {
    // Revoke blob URL before clearing
    if (formData.personalInfo?.photo?.startsWith("blob:")) {
      URL.revokeObjectURL(formData.personalInfo.photo);
    }

    setFormData(studentFormData);
    setPhotoFile(null);
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
                  dynamicOptions={{
                    appliedClass: classes.map((c) => ({
                      label: c.name,
                      value: c._id,
                    })),
                  }}
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
