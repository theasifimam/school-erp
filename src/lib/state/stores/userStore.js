import { userApi } from "@/lib/api/endpoints";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// API service functions
const userApiLocal = {
  // async getUsers() {
  //   const response = await fetch(`${API_BASE_URL}/users`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch users");
  //   }
  //   return response.json();
  // },
  // async createUser(userData) {
  //   const response = await fetch(`${API_BASE_URL}/users`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //     body: JSON.stringify(userData),
  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to create user");
  //   }
  //   return response.json();
  // },
  // async updateUser(userId, userData) {
  //   const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //     body: JSON.stringify(userData),
  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to update user");
  //   }
  //   return response.json();
  // },
  // async deleteUser(userId) {
  //   const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to delete user");
  //   }
  //   return response.json();
  // },
  // async toggleUserStatus(userId) {
  //   const response = await fetch(
  //     `${API_BASE_URL}/users/${userId}/toggle-status`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }
  //   );
  //   if (!response.ok) {
  //     throw new Error("Failed to toggle user status");
  //   }
  //   return response.json();
  // },
};

const useUserStore = create()(
  devtools(
    persist(
      (set, get) => ({
        // State
        users: [],
        isLoading: false,
        error: null,
        lastFetch: null,

        // Actions
        fetchUsers: async () => {
          set({ isLoading: true, error: null });

          try {
            const response = await userApi.fetchUsers();
            set({
              users: response.data || response.users || response,
              isLoading: false,
              lastFetch: new Date().toISOString(),
            });
          } catch (error) {
            set({
              error: error.message,
              isLoading: false,
            });
          }
        },

        view: async (userId) => {
          set({ isLoading: true, error: null });
          try {
            const response = await userApi.View(userId);
            if (response.success || response.user) {
              const updatedUser = response.user || response.data;
              set((state) => ({
                users: state.users.map((user) =>
                  user.id === userId ? updatedUser : user
                ),
                isLoading: false,
              }));
              return { success: true, user: updatedUser };
            } else {
              throw new Error(response.message || "Failed to update user");
            }
          } catch (error) {
            set({
              error: error.message,
              isLoading: false,
            });
            return { success: false, message: error.message };
          }
        },

        create: async (userData) => {
          set({ isLoading: true, error: null });

          try {
            const response = await userApi.create(userData);

            if (response.success || response.user) {
              const newUser = response.user || response.data;
              set((state) => ({
                users: [...state.users, newUser],
                isLoading: false,
              }));

              return { success: true, user: newUser };
            } else {
              throw new Error(response.message || "Failed to create user");
            }
          } catch (error) {
            set({
              error: error.message,
              isLoading: false,
            });
            return { success: false, message: error.message };
          }
        },

        update: async (userId, userData) => {
          set({ isLoading: true, error: null });

          try {
            const response = await userApi.update(userId, userData);

            if (response.success || response.user) {
              const updatedUser = response.user || response.data;
              set((state) => ({
                users: state.users.map((user) =>
                  user.id === userId ? { ...user, ...updatedUser } : user
                ),
                isLoading: false,
              }));

              return { success: true, user: updatedUser };
            } else {
              throw new Error(response.message || "Failed to update user");
            }
          } catch (error) {
            set({
              error: error.message,
              isLoading: false,
            });
            return { success: false, message: error.message };
          }
        },

        delete: async (userId) => {
          set({ isLoading: true, error: null });

          try {
            const response = await userApi.delete(userId);

            if (response.success !== false) {
              set((state) => ({
                users: state.users.filter((user) => user.id !== userId),
                isLoading: false,
              }));

              return { success: true };
            } else {
              throw new Error(response.message || "Failed to delete user");
            }
          } catch (error) {
            set({
              error: error.message,
              isLoading: false,
            });
            return { success: false, message: error.message };
          }
        },

        toggleUserStatus: async (userId) => {
          set({ isLoading: true, error: null });

          try {
            const response = await userApi.toggleUserStatus(userId);

            if (response.success || response.user) {
              const updatedUser = response.user || response.data;
              set((state) => ({
                users: state.users.map((user) =>
                  user.id === userId
                    ? {
                        ...user,
                        status:
                          user.status === "active" ? "inactive" : "active",
                      }
                    : user
                ),
                isLoading: false,
              }));

              return { success: true, user: updatedUser };
            } else {
              throw new Error(
                response.message || "Failed to toggle user status"
              );
            }
          } catch (error) {
            set({
              error: error.message,
              isLoading: false,
            });
            return { success: false, message: error.message };
          }
        },

        // Utility actions
        clearError: () => set({ error: null }),

        clearUsers: () => set({ users: [], lastFetch: null }),

        setUsers: (users) => set({ users }),

        getUserById: (userId) => {
          const state = get();
          return state.users.find((user) => user.id === userId);
        },

        getUsersByRole: (role) => {
          const state = get();
          return state.users.filter((user) => user.role === role);
        },

        getActiveUsers: () => {
          const state = get();
          return state.users.filter((user) => user.status === "active");
        },

        // Refresh data if it's stale (older than 5 minutes)
        refreshIfStale: async () => {
          const state = get();
          if (
            !state.lastFetch ||
            Date.now() - new Date(state.lastFetch).getTime() > 5 * 60 * 1000
          ) {
            await state.fetchUsers();
          }
        },
      }),
      {
        name: "user-store",
        partialize: (state) => ({
          users: state.users,
          lastFetch: state.lastFetch,
        }),
      }
    ),
    { name: "UserStore" }
  )
);

export { useUserStore };
