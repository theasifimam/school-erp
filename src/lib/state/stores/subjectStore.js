import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { subjectApi } from "../../api/endpoints";
import { toast } from "sonner";

export const useSubjectStore = create(
  persist(
    (set, get) => ({
      subjects: [],
      currentFaculty: null,
      isLoading: false,
      error: null,
      successMessage: null,

      // Fetch all subjects
      fetchSubjects: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await subjectApi.getAll();

          set({ subjects: data.data, isLoading: false });
        } catch (error) {
          if (error.status === 401) {
            // Handle unauthorized (token expired or invalid)
            set({
              error: "Session expired. Please login again.",
              isLoading: false,
            });
            // Optionally trigger logout here
          } else {
            set({
              error: error.info?.message || "Failed to fetch subjects",
              isLoading: false,
            });
          }
        }
      },

      // Fetch single Subject by ID
      fetchSubject: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await subjectApi.getById(id);
          set({
            currentSubject: response.data,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to fetch Subject",
            isLoading: false,
          });
        }
      },

      // Create new Subject
      createSubject: async (subjectData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await subjectApi.create(subjectData);
          set((state) => ({
            subjects: [...state.subjects, response.data],
            isLoading: false,
            successMessage: "Subject created successfully!",
          }));
          toast("Subject information added!", {
            description: "Subject has been added successfully.",
            action: {
              label: "X",
              onClick: () => console.log("remove"),
            },
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to create Subject",
            isLoading: false,
          });
          throw error;
        }
      },

      // Update existing Subject
      updateSubject: async (id, subjectData) => {
        set({ isLoading: true, error: null, successMessage: null });
        console.log("Updating faculty with ID:", id);
        console.log("New faculty data:", subjectData);
        try {
          const response = await subjectApi.update(id, subjectData);
          set((state) => ({
            subjects: state.subjects.map((Subject) =>
              Subject._id === id ? response.data : Subject
            ),
            currentSubject: response.data,
            isLoading: false,
            successMessage: "Subject updated successfully!",
          }));
          toast("Subject information updated!", {
            description: "Subject information has been updated successfully.",
            action: {
              label: "X",
              onClick: () => console.log("remove"),
            },
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to update Subject",
            isLoading: false,
          });
          throw error;
        }
      },

      // Delete Subject
      deleteSubject: async (id) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          await subjectApi.delete(id);
          set((state) => ({
            subjects: state.subjects.filter((Subject) => Subject._id !== id),
            currentSubject: null,
            isLoading: false,
            successMessage: "Subject deleted successfully!",
          }));
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to delete Subject",
            isLoading: false,
          });
          throw error;
        }
      },

      setCurrentSubject: (subject) => {
        set({ currentSubject: subject });
      },

      setSubjects: (subjects) => {
        set({ subjects });
      },

      // Clear current Subject
      clearCurrentSubject: () => {
        set({ currentSubject: null });
      },

      // Clear messages
      clearMessages: () => {
        set({ error: null, successMessage: null });
      },
    }),

    {
      name: "Subject-store",
      storage: createJSONStorage(() => sessionStorage), // Using sessionStorage instead of localStorage
      partialize: (state) => ({
        subjects: state.subjects,
        currentSubject: state.currentSubject,
      }),
    }
  )
);

// Utility functions for easier access
export const usesubjects = () => useSubjectStore((state) => state.subjects);

export const useCurrentSubject = () =>
  useSubjectStore((state) => state.currentSubject);

export const useFacultyLoading = () =>
  useSubjectStore((state) => state.isLoading);

export const useFacultyError = () => useSubjectStore((state) => state.error);

export const useFacultySuccess = () =>
  useSubjectStore((state) => state.successMessage);
