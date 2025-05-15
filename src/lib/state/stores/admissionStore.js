// src/stores/admissionStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Default form structure that matches both the UI and backend expectations
const initialFormState = {
  personalInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    preferredName: "",
    gender: "",
    dob: "",
    photo: null,
    bloodGroup: "",
    medicalConditions: "",
  },
  contactInfo: {
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyRelation: "",
  },
  familyInfo: {
    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",
    fatherEmail: "",
    motherName: "",
    motherOccupation: "",
    motherPhone: "",
    motherEmail: "",
    siblings: 0,
    siblingsAtSchool: false,
    familyNotes: "",
  },
  academicInfo: {
    appliedClass: "",
    session: "",
    admissionType: "",
    board: "",
    previousSchool: "",
    schoolAddress: "",
    lastClass: "",
    lastGrade: "",
    transferCertificate: false,
    stream: "",
    achievements: "",
  },
  additionalInfo: {
    languages: "",
    transport: false,
    hostel: false,
    activities: "",
    specialNeeds: false,
    hearAbout: "",
    additionalInfo: "",
    termsAccepted: false,
  },
};

const useAdmissionStore = create(
  persist(
    (set, get) => ({
      // Form data
      formData: { ...initialFormState },
      activeTab: "personalInfo",
      lastCompletedSection: null,
      draftId: null,
      isSubmitting: false,
      submissionError: null,
      submissionSuccess: null,
      referenceNumber: null,

      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Update a specific section of the form
      updateFormSection: (section, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [section]: {
              ...state.formData[section],
              ...data,
            },
          },
          lastCompletedSection: section,
        })),

      // Update a specific field in the form
      updateFormField: (section, field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [section]: {
              ...state.formData[section],
              [field]: value,
            },
          },
        })),

      // Reset the form to initial state
      resetForm: () =>
        set({
          formData: { ...initialFormState },
          activeTab: "personalInfo",
          lastCompletedSection: null,
          draftId: null,
          submissionError: null,
          submissionSuccess: null,
          referenceNumber: null,
        }),

      // Save the form as a draft
      saveDraft: async () => {
        try {
          const { formData, lastCompletedSection, draftId } = get();
          const email = formData.contactInfo.email;

          const response = await axios.post(API_BASE_URL + "/admission/draft", {
            draftId,
            formData,
            lastCompletedSection,
            email,
          });

          if (response.data.success) {
            set({ draftId: response.data.draftId });
            return { success: true, message: "Draft saved successfully" };
          }

          return { success: false, message: "Failed to save draft" };
        } catch (error) {
          console.error("Error saving draft:", error);
          return {
            success: false,
            message: error.response?.data?.message || "Failed to save draft",
          };
        }
      },

      // Load a draft by ID
      loadDraft: async (draftId) => {
        try {
          const response = await axios.get(
            API_BASE_URL + `/admission/draft/${draftId}`
          );

          if (response.data.success) {
            const { draft } = response.data;
            set({
              formData: draft.formData,
              lastCompletedSection: draft.lastCompletedSection,
              draftId: draft.draftId,
              activeTab: draft.lastCompletedSection || "personalInfo",
            });
            return { success: true };
          }

          return { success: false, message: "Draft not found" };
        } catch (error) {
          console.error("Error loading draft:", error);
          return {
            success: false,
            message: error.response?.data?.message || "Failed to load draft",
          };
        }
      },

      // Submit the completed application
      submitApplication: async () => {
        set({
          isSubmitting: true,
          submissionError: null,
          submissionSuccess: null,
        });

        try {
          const { formData, draftId } = get();

          const response = await axios.post(
            API_BASE_URL + "/admission/submit",
            {
              formData,
              draftId,
            }
          );

          if (response.data.success) {
            set({
              isSubmitting: false,
              submissionSuccess: true,
              referenceNumber: response.data.referenceNumber,
              formData: { ...initialFormState },
            });
            return {
              success: true,
              referenceNumber: response.data.referenceNumber,
            };
          } else {
            set({
              isSubmitting: false,
              submissionError: response.data.message,
            });
            return { success: false, message: response.data.message };
          }
        } catch (error) {
          console.error("Error submitting application:", error);
          set({
            isSubmitting: false,
            submissionError:
              error.response?.data?.message || "Failed to submit application",
          });
          return {
            success: false,
            message:
              error.response?.data?.message || "Failed to submit application",
          };
        }
      },
    }),
    {
      name: "admission-form-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAdmissionStore;
