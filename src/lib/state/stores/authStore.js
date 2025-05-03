import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authApi } from "../../api/endpoints";

// Cookie utility functions
const setCookie = (name, value, days = 7, secure = true, httpOnly = false) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  let cookieString = `${name}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;

  if (secure) cookieString += "; Secure";
  // Note: httpOnly can only be set by the server

  document.cookie = cookieString;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
};

const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Custom storage adapter using cookies for sensitive data (token)
// and localStorage for non-sensitive data
const customStorage = {
  getItem: (name) => {
    const localData = localStorage.getItem(name);
    if (!localData) return null;

    const parsedData = JSON.parse(localData);

    // Get token from cookie if available
    const token = getCookie("auth-token");
    if (token) {
      parsedData.state.token = token;
    }

    return localData;
  },

  setItem: (name, value) => {
    const parsedValue = JSON.parse(value);

    // Store token in HttpOnly cookie instead of localStorage
    if (parsedValue.state.token) {
      setCookie("auth-token", parsedValue.state.token);
      // Remove token from what gets stored in localStorage
      const { token, ...rest } = parsedValue.state;
      parsedValue.state = rest;
    }

    localStorage.setItem(name, JSON.stringify(parsedValue));
  },

  removeItem: (name) => {
    removeCookie("auth-token");
    localStorage.removeItem(name);
  },
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(username, password);

          if (!response.user || !response.token) {
            throw new Error("Invalid response from server");
          }

          // Set token in cookie
          setCookie("auth-token", response.token);

          set({
            user: response.user,
            token: response.token,
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
          await authApi.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          // Clear token cookie
          removeCookie("auth-token");

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      checkAuth: async () => {
        // Try to get token from cookie first
        const cookieToken = getCookie("auth-token");
        const { token } = get();

        const authToken = cookieToken || token;
        if (!authToken) return;

        set({ isLoading: true });
        try {
          // Use the token from cookie for API calls
          const user = await authApi.me(authToken);
          set({
            user,
            token: authToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Clear token cookie on auth failure
          removeCookie("auth-token");

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "erp-auth-storage",
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({
        // Token is handled by cookie system
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
