import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { studentsApi } from "../../api/endpoints";

export const useStudentStore = create(
  persist(
    (set, get) => ({
      students: [],
      currentStudent: null,
      isLoading: false,
      error: null,
      successMessage: null,

      // Fetch all students
      fetchStudents: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await studentsApi.getAll();
          set({ students: data, isLoading: false });
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
              error: error.info?.message || "Failed to fetch students",
              isLoading: false,
            });
          }
        }
      },

      // Fetch single student by ID
      fetchStudentById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await studentsApi.getById(id);
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
      createStudent: async (studentData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await studentsApi.create(studentData);
          set((state) => ({
            students: [...state.students, response.data],
            isLoading: false,
            successMessage: "Student created successfully!",
          }));
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
      updateStudent: async (id, studentData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await studentsApi.update(id, studentData);
          set((state) => ({
            students: state.students.map((student) =>
              student._id === id ? response.data : student
            ),
            currentStudent: response.data,
            isLoading: false,
            successMessage: "Student updated successfully!",
          }));
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to update student",
            isLoading: false,
          });
          throw error;
        }
      },

      // Delete student
      deleteStudent: async (id) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          await studentsApi.delete(id);
          set((state) => ({
            students: state.students.filter((student) => student._id !== id),
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

      // Clear current student
      clearCurrentStudent: () => {
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
        students: state.students,
        currentStudent: state.currentStudent,
      }),
    }
  )
);

// Utility functions for easier access
export const useStudents = () => useStudentStore((state) => state.students);
export const useCurrentStudent = () =>
  useStudentStore((state) => state.currentStudent);
export const useStudentLoading = () =>
  useStudentStore((state) => state.isLoading);
export const useStudentError = () => useStudentStore((state) => state.error);
export const useStudentSuccess = () =>
  useStudentStore((state) => state.successMessage);
