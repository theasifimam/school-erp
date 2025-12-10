import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { sectionsApi } from "../../api/endpoints";
import { toast } from "sonner";

export const useSectionStore = create(
  persist(
    (set, get) => ({
      sections: [],
      currentSection: null,
      isLoading: false,
      error: null,
      successMessage: null,

      // Fetch all Sections
      fetchSections: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await sectionsApi.getAll();

          set({ sections: data.data, isLoading: false });
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
              error: error.info?.message || "Failed to fetch Sections",
              isLoading: false,
            });
          }
        }
      },

      // Fetch single class by ID
      fetchSection: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await sectionsApi.getById(id);
          set({
            currentSection: response.data,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to fetch Class",
            isLoading: false,
          });
        }
      },

      // Create new Class
      createSection: async (classData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await sectionsApi.create(classData);
          set((state) => ({
            sections: [...state.sections, response.data],
            isLoading: false,
            successMessage: "Class created successfully!",
          }));
          toast("Class information added!", {
            description: "Class has been added successfully.",
            action: {
              label: "X",
              onClick: () => console.log("remove"),
            },
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to create Class",
            isLoading: false,
          });
          throw error;
        }
      },

      // Update existing Class
      updateSection: async (id, classData) => {
        set({ isLoading: true, error: null, successMessage: null });
        console.log("Updating class with ID:", id);
        console.log("New Class data:", classData);
        try {
          const response = await sectionsApi.update(id, classData);
          set((state) => ({
            sections: state.sections.map((c) =>
              c._id === id ? response.data : c
            ),
            currentSection: response.data,
            isLoading: false,
            successMessage: "Class updated successfully!",
          }));
          toast("Class information updated!", {
            description: "Class information has been updated successfully.",
            action: {
              label: "X",
              onClick: () => console.log("remove"),
            },
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to update Class",
            isLoading: false,
          });
          throw error;
        }
      },

      // Delete Class
      deleteSection: async (id) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          await sectionsApi.delete(id);
          set((state) => ({
            sections: state.sections.filter((c) => c._id !== id),
            currentSection: null,
            isLoading: false,
            successMessage: "Class deleted successfully!",
          }));
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to delete Class",
            isLoading: false,
          });
          throw error;
        }
      },

      setCurrentSection: (c) => {
        set({ currentSection: c });
      },

      setSections: (Sections) => {
        set({ Sections });
      },

      // Clear current section
      clearCurrentSection: () => {
        set({ currentSection: null });
      },

      // Clear messages
      clearMessages: () => {
        set({ error: null, successMessage: null });
      },
    }),

    {
      name: "section-store",
      storage: createJSONStorage(() => sessionStorage), // Using sessionStorage instead of localStorage
      partialize: (state) => ({
        Sections: state.Sections,
        currentSection: state.currentSection,
      }),
    }
  )
);

// Utility functions for easier access
export const useSections = () => useClassStore((state) => state.sections);

export const usecurrentSection = () =>
  useClassStore((state) => state.currentSection);

export const useClassLoading = () => useClassStore((state) => state.isLoading);

export const useClassError = () => useClassStore((state) => state.error);

export const useClassSuccess = () =>
  useClassStore((state) => state.successMessage);
