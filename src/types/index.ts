


// File: src/types/index.ts
export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'teacher' | 'student' | 'parent';
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    lastLogin?: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface Guardian {
    relation: 'father' | 'mother' | 'guardian' | 'brother' | 'sister' | 'uncle' | 'aunt' | 'other';
    name: string;
    occupation?: string;
    contactNumber: string;
    email?: string;
    address?: string;
}

export interface Student {
    _id: string;
    user: string | User;
    admissionNo: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: Date;
    class: string | Class;
    section: string | Section;
    guardians: Guardian[];
    admissionDate: Date;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    address: string;
    phoneNumber?: string;
    rollNumber?: string;
    photo?: string;
    academicYear: string;
    transportRoute?: string | TransportRoute;
    medicalInfo?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Teacher {
    _id?: string;
    user: string | User;
    employeeId: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: Date;
    joiningDate: Date;
    qualification: string;
    experience?: number;
    subjects: string[] | Subject[];
    classes: string[] | Class[];
    contactNumber: string;
    email: string;
    address?: string;
    designation: string;
    department?: string;
    salary?: number;
    isClassTeacher?: boolean;
    classTeacherOf?: string | Class;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Class {
    _id?: string;
    name: string;
    sections: string[] | Section[];
    classTeacher?: string | Teacher;
    academicYear: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Section {
    _id?: string;
    name: string;
    class: string | Class;
    students: string[] | Student[];
    createdAt?: Date;
    updatedAt?: Date;
}



export interface Subject {
    _id?: string;
    name: string;
    code: string;
    description?: string;
    class: string | Class;
    teachers: string[] | Teacher[];
    createdAt?: Date;
    updatedAt?: Date;
    guardians: Guardian[];
    transportRoute?: string;
}



export interface Attendance {
    _id?: string;
    student: string | Student;
    class: string | Class;
    section: string | Section;
    date: Date;
    status: 'present' | 'absent' | 'late' | 'excused';
    remark?: string;
    createdBy: string | User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Exam {
    _id?: string;
    name: string;
    examType: 'quarterly' | 'half-yearly' | 'annual' | 'other';
    startDate: Date;
    endDate: Date;
    classes: string[] | Class[];
    subjects: Array<{
        subject: string | Subject;
        examDate: Date;
        startTime: string;
        endTime: string;
        totalMarks: number;
        passingMarks: number;
    }>;
    academicYear: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ExamResult {
    _id?: string;
    exam: string | Exam;
    student: string | Student;
    class: string | Class;
    section: string | Section;
    results: Array<{
        subject: string | Subject;
        marks: number;
        grade?: string;
        remarks?: string;
    }>;
    totalMarks: number;
    percentage: number;
    grade?: string;
    rank?: number;
    createdBy: string | User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Fee {
    _id?: string;
    student: string | Student;
    feeType: 'tuition' | 'transport' | 'hostel' | 'examination' | 'other';
    amount: number;
    dueDate: Date;
    status: 'paid' | 'unpaid' | 'partial';
    paidAmount?: number;
    paidDate?: Date;
    paymentMethod?: 'cash' | 'cheque' | 'online' | 'other';
    transactionId?: string;
    receipt?: string;
    academicYear: string;
    createdBy: string | User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Timetable {
    _id?: string;
    class: string | Class;
    section: string | Section;
    academicYear: string;
    schedule: Array<{
        day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
        periods: Array<{
            period: number;
            subject: string | Subject;
            teacher: string | Teacher;
            startTime: string;
            endTime: string;
        }>;
    }>;
    createdBy: string | User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Notification {
    _id?: string;
    title: string;
    message: string;
    type: 'general' | 'exam' | 'holiday' | 'fees' | 'event';
    recipients: Array<{
        recipientType: 'all' | 'teachers' | 'students' | 'parents' | 'class' | 'individual';
        recipientId?: string;
    }>;
    isRead?: string[];
    expiryDate?: Date;
    createdBy: string | User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LibraryBook {
    _id?: string;
    title: string;
    author: string;
    isbn: string;
    category: string;
    publisher?: string;
    publishYear?: number;
    edition?: string;
    copies: number;
    availableCopies: number;
    price?: number;
    rack?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BookIssue {
    _id?: string;
    book: string | LibraryBook;
    issuedTo: string | User;
    issuedBy: string | User;
    issueDate: Date;
    dueDate: Date;
    returnDate?: Date;
    status: 'issued' | 'returned' | 'overdue' | 'lost';
    fine?: number;
    remarks?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TransportVehicle {
    _id?: string;
    vehicleNumber: string;
    vehicleType: 'bus' | 'van' | 'other';
    capacity: number;
    driver: {
        name: string;
        licenseNumber: string;
        contactNumber: string;
        address?: string;
    };
    route: string | TransportRoute;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TransportRoute {
    _id?: string;
    name: string;
    description?: string;
    stops: Array<{
        name: string;
        time: string;
        distance?: number;
    }>;
    vehicle: string | TransportVehicle;
    fare: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
