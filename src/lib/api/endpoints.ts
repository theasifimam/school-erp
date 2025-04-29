import { fetcher } from './apiClient';
import { User, Student, Teacher, Class } from '../types';

export const authApi = {
  login: (email: string, password: string) =>
    fetcher<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () =>
    fetcher<{ success: boolean }>('/auth/logout', {
      method: 'POST',
    }),
  me: () =>
    fetcher<User>('/auth/me'),
};

export const studentsApi = {
  getAll: (filters?: { grade?: string, section?: string }) =>
    fetcher<Student[]>(`/students?${new URLSearchParams(filters as Record<string, string>)}`),
  getById: (id: string) =>
    fetcher<Student>(`/students/${id}`),
  create: (student: Omit<Student, 'id'>) =>
    fetcher<Student>('/students', {
      method: 'POST',
      body: JSON.stringify(student),
    }),
  update: (id: string, data: Partial<Student>) =>
    fetcher<Student>(`/students/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetcher<{ success: boolean }>(`/students/${id}`, {
      method: 'DELETE',
    }),
};

export const teachersApi = {
  getAll: () =>
    fetcher<Teacher[]>('/teachers'),
  getById: (id: string) =>
    fetcher<Teacher>(`/teachers/${id}`),
};

export const classesApi = {
  getAll: () =>
    fetcher<Class[]>('/classes'),
  getById: (id: string) =>
    fetcher<Class>(`/classes/${id}`),
  getStudentsByClassId: (classId: string) =>
    fetcher<Student[]>(`/classes/${classId}/students`),
};
