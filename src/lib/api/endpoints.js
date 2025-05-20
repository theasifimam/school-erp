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
  delete: (id) => fetcher(`/classes/${id}`),
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
