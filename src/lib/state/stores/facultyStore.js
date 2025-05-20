import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { facultyApi } from "../../api/endpoints";
import { toast } from "sonner";

export const useFacultyStore = create(
  persist(
    (set, get) => ({
      faculties: [],
      currentFaculty: null,
      isLoading: false,
      error: null,
      successMessage: null,

      // Fetch all faculties
      fetchFaculties: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await facultyApi.getAll();

          set({ faculties: data.data, isLoading: false });
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
              error: error.info?.message || "Failed to fetch faculties",
              isLoading: false,
            });
          }
        }
      },

      // Fetch single student by ID
      fetchFacultyById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await facultyApi.getById(id);
          set({
            currentStudent: response.data,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to fetch student",
            isLoading: false,
          });
        }
      },

      // Create new student
      createFaculty: async (studentData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await facultyApi.create(studentData);
          set((state) => ({
            faculties: [...state.faculties, response.data],
            isLoading: false,
            successMessage: "Student created successfully!",
          }));
          toast("Faculty information added!", {
            description: "Faculty has been added successfully.",
            action: {
              label: "X",
              onClick: () => console.log("remove"),
            },
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to create student",
            isLoading: false,
          });
          throw error;
        }
      },

      // Update existing student
      updateFaculty: async (id, studentData) => {
        set({ isLoading: true, error: null, successMessage: null });
        console.log("Updating faculty with ID:", id);
        console.log("New faculty data:", studentData);
        try {
          const response = await facultyApi.update(id, studentData);
          set((state) => ({
            faculties: state.faculties.map((student) =>
              student._id === id ? response.data : student
            ),
            currentStudent: response.data,
            isLoading: false,
            successMessage: "Faculty updated successfully!",
          }));
          toast("Faculty information updated!", {
            description: "Faculty information has been updated successfully.",
            action: {
              label: "X",
              onClick: () => console.log("remove"),
            },
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to update student",
            isLoading: false,
          });
          throw error;
        }
      },

      // Delete student
      deleteFaculty: async (id) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          await facultyApi.delete(id);
          set((state) => ({
            faculties: state.faculties.filter((student) => student._id !== id),
            currentStudent: null,
            isLoading: false,
            successMessage: "Student deleted successfully!",
          }));
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to delete student",
            isLoading: false,
          });
          throw error;
        }
      },

      setFaculties: (faculties) => {
        set({ faculties });
      },

      // Clear current student
      clearCurrentFaculty: () => {
        set({ currentStudent: null });
      },

      // Clear messages
      clearMessages: () => {
        set({ error: null, successMessage: null });
      },
    }),
    {
      name: "student-store",
      storage: createJSONStorage(() => sessionStorage), // Using sessionStorage instead of localStorage
      partialize: (state) => ({
        faculties: state.faculties,
        currentStudent: state.currentStudent,
      }),
    }
  )
);

// Utility functions for easier access
export const useFaculties = () => useFacultyStore((state) => state.faculties);
export const useCurrentStudent = () =>
  useFacultyStore((state) => state.currentStudent);
export const useFacultyLoading = () =>
  useFacultyStore((state) => state.isLoading);
export const useFacultyError = () => useFacultyStore((state) => state.error);
export const useFacultySuccess = () =>
  useFacultyStore((state) => state.successMessage);
