import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { classApi } from "../../api/endpoints";
import { toast } from "sonner";

export const useClassStore = create(
  persist(
    (set, get) => ({
      classes: [],
      currentClass: null,
      isLoading: false,
      error: null,
      successMessage: null,

      // Fetch all classes
      fetchClasses: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await classApi.getAll();

          set({ classes: data.data, isLoading: false });
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
              error: error.info?.message || "Failed to fetch classes",
              isLoading: false,
            });
          }
        }
      },

      // Fetch single class by ID
      fetchClass: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await classApi.getById(id);
          set({
            currentClass: response.data,
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
      createClass: async (classData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await classApi.create(classData);
          set((state) => ({
            classes: [...state.classes, response.data],
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
      updateClass: async (id, classData) => {
        set({ isLoading: true, error: null, successMessage: null });
        console.log("Updating class with ID:", id);
        console.log("New Class data:", classData);
        try {
          const response = await classApi.update(id, classData);
          set((state) => ({
            classes: state.classes.map((c) =>
              c._id === id ? response.data : c
            ),
            currentClass: response.data,
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
      deleteClass: async (id) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          await classApi.delete(id);
          set((state) => ({
            classes: state.classes.filter((c) => c._id !== id),
            currentClass: null,
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

      setCurrentClass: (c) => {
        set({ currentClass: c });
      },

      setclasses: (classes) => {
        set({ classes });
      },

      // Clear current Class
      clearCurrentClass: () => {
        set({ currentClass: null });
      },

      // Clear messages
      clearMessages: () => {
        set({ error: null, successMessage: null });
      },
    }),

    {
      name: "class-store",
      storage: createJSONStorage(() => sessionStorage), // Using sessionStorage instead of localStorage
      partialize: (state) => ({
        classes: state.classes,
        currentClass: state.currentClass,
      }),
    }
  )
);

// Utility functions for easier access
export const useclasses = () => useClassStore((state) => state.classes);

export const useCurrentClass = () =>
  useClassStore((state) => state.currentClass);

export const useClassLoading = () => useClassStore((state) => state.isLoading);

export const useClassError = () => useClassStore((state) => state.error);

export const useClassSuccess = () =>
  useClassStore((state) => state.successMessage);
