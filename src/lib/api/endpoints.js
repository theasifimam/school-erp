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
      headers: {
        "Content-Type": "application/json",
      },
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
      method: "PUT",
      body: data,
    }),
  updateStatus: (id, statusData) =>
    fetcher(`/students/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(statusData),
    }),
  delete: (id) =>
    fetcher(`/students/${id}`, {
      method: "DELETE",
    }),
};

export const facultyApi = {
  getAll: (filters) => fetcher(`/faculty?${new URLSearchParams(filters)}`),
  getById: (id) => fetcher(`/faculty/${id}`),
  create: (student) =>
    fetcher("/faculty", {
      method: "POST",
      body: JSON.stringify(student),
    }),
  update: (id, data) =>
    fetcher(`/faculty/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    fetcher(`/faculty/${id}`, {
      method: "DELETE",
    }),
};

export const subjectApi = {
  getAll: (filters) => fetcher(`/subjects?${new URLSearchParams(filters)}`),
  getById: (id) => fetcher(`/subjects/${id}`),
  create: (subject) =>
    fetcher("/subjects", {
      method: "POST",
      body: JSON.stringify(subject),
    }),
  update: (id, data) =>
    fetcher(`/subjects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    fetcher(`/subjects/${id}`, {
      method: "DELETE",
    }),
};

export const classApi = {
  getAll: () => fetcher("/classes"),
  add: () => fetcher(`/classes`),
  create: (classData) =>
    fetcher("/classes", {
      method: "POST",
      body: JSON.stringify(classData),
    }),
  getById: (id) => fetcher(`/classes/${id}`),
  update: (id, data) =>
    fetcher(`/classes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => fetcher(`/classes/${id}`, { method: "DELETE" }),
};

export const sectionsApi = {
  getAll: () => fetcher("/sections", { method: "GET" }),
  add: () => fetcher(`/sections`, { method: "POST" }),
  create: (classData) =>
    fetcher("/sections", {
      method: "POST",
      body: JSON.stringify(classData),
    }),
  getById: (id) => fetcher(`/sections/${id}`),
  update: (id, data) =>
    fetcher(`/sections/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => fetcher(`/sections/${id}`, { method: "DELETE" }),
};

export const booksApi = {
  getAll: (filters) => fetcher(`/books?${new URLSearchParams(filters)}`),
  searchBooks: (filter) => fetcher(`/books/search?query=${filter}`),
  getById: (id) => fetcher(`/books/${id}`),
  create: (book) =>
    fetcher("/books", {
      method: "POST",
      body: JSON.stringify(book),
    }),
  update: (id, data) =>
    fetcher(`/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    fetcher(`/books/${id}`, {
      method: "DELETE",
    }),
};

export const issueBookApi = {
  getAll: (filters) => fetcher(`/issues?${new URLSearchParams(filters)}`),
  searchIssuedBooks: (filter) => fetcher(`/issues/search?query=${filter}`),
  getById: (id) => fetcher(`/issues/${id}`),
  issueBook: (issueBookData) =>
    fetcher("/issues", {
      method: "POST",
      body: JSON.stringify(issueBookData),
    }),

  returnBook: (id, issueBookData) =>
    fetcher(`/issues/${id}/return`, {
      method: "POST",
      body: JSON.stringify(issueBookData),
    }),

  getReturnedBooks: () => fetcher(`/issues/returned`),

  update: (id, data) =>
    fetcher(`/issues/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    fetcher(`/issues/${id}`, {
      method: "DELETE",
    }),
};

export const userApi = {
  // Operations on Self
  updateMe: (data) =>
    fetcher("/users/update-me", { method: "POST", body: data }),
  getMe: () => fetcher("/users/me"),
  updatePassword: (data) =>
    fetcher("/users/update-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Operations on others
  fetchUsers: () => fetcher("/users"),
  create: (userData) =>
    fetcher("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  View: (id) => fetcher(`/users/${id}`),
  update: (id, data) =>
    fetcher(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => fetcher(`/users/${id}`, { method: "DELETE" }),
  toggleUserStatus: (id) => fetcher(`/users/${id}`, { method: "PATCH" }),
};
