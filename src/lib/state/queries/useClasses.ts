'use client';

import { useQuery } from '@tanstack/react-query';
import { classesApi } from '../../api/endpoints';

export function useClasses() {
    return useQuery({
        queryKey: ['classes'],
        queryFn: () => classesApi.getAll(),
    });
}

export function useClass(id: string) {
    return useQuery({
        queryKey: ['classes', id],
        queryFn: () => classesApi.getById(id),
        enabled: !!id,
    });
}

export function useClassStudents(classId: string) {
    return useQuery({
        queryKey: ['classes', classId, 'students'],
        queryFn: () => classesApi.getStudentsByClassId(classId),
        enabled: !!classId,
    });
}