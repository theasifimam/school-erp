import { fetcher } from "./apiClient";

export const authApi = {
  login: (username, password) =>
    fetcher("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  logout: () =>
    fetcher("/auth/logout", {
      method: "POST",
    }),
  me: () => fetcher("/auth/me"),
};

export const studentsApi = {
  getAll: (filters) => fetcher(`/students?${new URLSearchParams(filters)}`),
  getById: (id) => fetcher(`/students/${id}`),
  create: (student) =>
    fetcher("/students", {
      method: "POST",
      body: JSON.stringify(student),
    }),
  update: (id, data) =>
    fetcher(`/students/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    fetcher(`/students/${id}`, {
      method: "DELETE",
    }),
};

export const facultyApi = {
  getAll: () => fetcher("/faculty"),
  add: () => fetcher(`/faculty`),
  getById: (id) => fetcher(`/faculty/${id}`),
  update: (id) => fetcher(`/faculty/${id}`),
  delete: (id) => fetcher(`/faculty/${id}`),
};

export const classApi = {
  getAll: () => fetcher("/class"),
  add: () => fetcher(`/class`),
  getById: (id) => fetcher(`/class/${id}`),
  update: (id) => fetcher(`/class/${id}`),
  delete: (id) => fetcher(`/class/${id}`),
};

export const classesApi = {
  getAll: () => fetcher("/classes"),
  getById: (id) => fetcher(`/classes/${id}`),
  getStudentsByClassId: (classId) => fetcher(`/classes/${classId}/students`),
};
