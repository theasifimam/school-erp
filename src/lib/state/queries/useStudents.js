"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentsApi } from "../../api/endpoints";

export function useStudents(filters) {
  return useQuery({
    queryKey: ["students", filters],
    queryFn: () => studentsApi.getAll(filters),
  });
}

export function useStudent(id) {
  return useQuery({
    queryKey: ["students", id],
    queryFn: () => studentsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (student) => studentsApi.create(student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => studentsApi.update(id, data),
    onSuccess: (updatedStudent) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({
        queryKey: ["students", updatedStudent.id],
      });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => studentsApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.removeQueries({ queryKey: ["students", id] });
    },
  });
}
