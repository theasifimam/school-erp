import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { userApi } from "../../api/endpoints";
import { toast } from "sonner";

export const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isLoading: false,
      error: null,
      successMessage: null,

      // Fetch all Users
      fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await userApi.getAll();

          set({ Users: data.data, isLoading: false });
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
              error: error.info?.message || "Failed to fetch Users",
              isLoading: false,
            });
          }
        }
      },

      // Fetch single user by ID
      fetchUser: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await userApi.getById(id);
          set({
            currentUser: response.data,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to fetch user",
            isLoading: false,
          });
        }
      },

      // Create new user
      createUser: async (userData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await userApi.create(userData);
          set((state) => ({
            users: [...state.users, response.data],
            isLoading: false,
            successMessage: "user created successfully!",
          }));
          toast("user information added!", {
            description: "user has been added successfully.",
            action: {
              label: "X",
              onClick: () => console.log("remove"),
            },
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to create user",
            isLoading: false,
          });
          throw error;
        }
      },

      // Update existing user
      updateUser: async (id, userData) => {
        set({ isLoading: true, error: null, successMessage: null });
        console.log("Updating user with ID:", id);
        console.log("New user data:", userData);
        try {
          const response = await userApi.update(id, userData);
          set((state) => ({
            users: state.users.map((c) => (c._id === id ? response.data : c)),
            currentUser: response.data,
            isLoading: false,
            successMessage: "User updated successfully!",
          }));
          toast("User information updated!", {
            description: "User information has been updated successfully.",
            action: {
              label: "X",
              onClick: () => console.log("remove"),
            },
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to update user",
            isLoading: false,
          });
          throw error;
        }
      },

      // Delete User
      deleteUser: async (id) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          await userApi.delete(id);
          set((state) => ({
            users: state.users.filter((c) => c._id !== id),
            currentUser: null,
            isLoading: false,
            successMessage: "user deleted successfully!",
          }));
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to delete user",
            isLoading: false,
          });
          throw error;
        }
      },

      setCurrentUser: (c) => {
        set({ currentUser: c });
      },

      setUsers: (users) => {
        set({ users });
      },

      // Clear current user
      clearCurrentUser: () => {
        set({ currentUser: null });
      },

      // Clear messages
      clearMessages: () => {
        set({ error: null, successMessage: null });
      },
    }),

    {
      name: "user-store",
      storage: createJSONStorage(() => sessionStorage), // Using sessionStorage instead of localStorage
      partialize: (state) => ({
        users: state.users,
        currentUser: state.currentUser,
      }),
    }
  )
);

// Utility functions for easier access
export const useUsers = () => useUserStore((state) => state.users);

export const useCurrentUser = () => useUserStore((state) => state.currentUser);

export const useUserLoading = () => useUserStore((state) => state.isLoading);

export const useUserError = () => useUserStore((state) => state.error);

export const useUserSuccess = () =>
  useUserStore((state) => state.successMessage);
