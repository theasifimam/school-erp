import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authApi, userApi } from "../../api/endpoints";

// This store uses a split authentication approach:
// 1. The auth token is never stored in the frontend for security
// 2. Only non-sensitive user data is kept in localStorage
// 3. The token is handled by HttpOnly cookies set by the server

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          // Modified API call - backend should set HttpOnly cookie with token
          // We expect this endpoint to set the auth token as an HttpOnly cookie on successful login
          const response = await authApi.login(username, password);

          if (!response.user) {
            throw new Error("Invalid response from server");
          }

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return true; // Indicate success
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || error.message || "Failed to login";
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw new Error(errorMessage); // Re-throw for component to catch
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          // This API call should clear the HttpOnly cookie on the server
          await authApi.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });

          // Clear localStorage manually since Zustand might persist
          localStorage.removeItem("erp-auth-storage");

          // Redirect to login page if requested
          window.location.href = "/login";
        }
      },

      checkAuth: async () => {
        // No need to check for token in localStorage - the browser will automatically
        // send the HttpOnly cookie with requests to your domain
        set({ isLoading: true });
        try {
          // The cookie is automatically sent with this request
          const user = await authApi.me();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      getMe: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await userApi.getMe();
          set({
            user: response.data,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to fetch user",
            isLoading: false,
          });
        }
      },

      updateMe: async (userData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await userApi.updateMe(userData);
          set((state) => ({
            user: response.data,
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

      updatePassword: async (passwords) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await userApi.updatePassword(passwords);
          set((state) => ({
            isLoading: false,
            successMessage: "User updated successfully!",
          }));
          toast("User password updated!", {
            description: "User password has been updated successfully.",
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
    }),
    {
      name: "erp-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // No token stored in localStorage at all
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
