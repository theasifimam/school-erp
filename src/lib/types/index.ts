// /src/lib/types/index.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student' | 'parent';
    permissions: string[];
}

export interface Student {
    id: string;
    name: string;
    email: string;
    enrollmentNumber: string;
    grade: string;
    section: string;
    parentId: string;
    attendancePercentage: number;
    fees: {
        paid: number;
        pending: number;
        dueDate: string;
    };
}

export interface Teacher {
    id: string;
    name: string;
    email: string;
    employeeId: string;
    subjects: string[];
    classTeacherOf?: string;
}

export interface Class {
    id: string;
    name: string;
    grade: string;
    section: string;
    teacherId: string;
    studentCount: number;
    subjects: string[];
}

export interface ApiError {
    message: string;
    code: string;
    status: number;
}
