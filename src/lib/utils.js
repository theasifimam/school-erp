import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertStudentToFormData(student) {
  if (!student) return studentFormData;
  return {
    personalInfo: {
      firstName: student?.firstName || "",
      middleName: student?.middleName || "",
      lastName: student?.lastName || "",
      preferredName: student?.preferredName || "",
      gender: student?.gender || "",
      dob: student?.dateOfBirth
        ? new Date(student?.dateOfBirth).toISOString().split("T")[0]
        : "",
      bloodGroup: student?.bloodGroup || "",
      medicalConditions: student?.medicalConditions || "",
      photo: student?.photo || "",
    },
    contactInfo: {
      email: student?.email || "",
      phone: student?.phoneNumber || "",
      alternatePhone: student?.alternatePhoneNumber || "",
      address: student?.address?.street || "",
      city: student?.address?.city || "",
      state: student?.address?.state || "",
      country: student?.address?.country || "",
      zipCode: student?.address?.zipCode || "",
      emergencyContactName: student?.emergencyContact?.name || "",
      emergencyContactPhone: student?.emergencyContact?.phone || "",
      emergencyRelation: student?.emergencyContact?.relationship || "",
    },
    familyInfo: {
      fatherName:
        student?.guardians?.find((g) => g.type === "father")?.name || "",
      fatherOccupation:
        student?.guardians?.find((g) => g.type === "father")?.occupation || "",
      fatherPhone:
        student?.guardians?.find((g) => g.type === "father")?.phone || "",
      fatherEmail:
        student?.guardians?.find((g) => g.type === "father")?.email || "",
      motherName:
        student?.guardians?.find((g) => g.type === "mother")?.name || "",
      motherOccupation:
        student?.guardians?.find((g) => g.type === "mother")?.occupation || "",
      motherPhone:
        student?.guardians?.find((g) => g.type === "mother")?.phone || "",
      motherEmail:
        student?.guardians?.find((g) => g.type === "mother")?.email || "",
      siblings: student?.siblings?.count?.toString() || "0",
      siblingsAtSchool: student?.siblings?.atSchool || false,
      familyNotes: student?.familyNotes || "",
    },
    academicInfo: {
      appliedClass: student?.appliedClass || "",
      session: student?.academicSession || "",
      admissionType: student?.admissionType || "",
      board: student?.board || "",
      previousSchool: student?.previousSchool?.name || "",
      schoolAddress: student?.previousSchool?.address || "",
      lastClass: student?.previousSchool?.lastClass || "",
      lastGrade: student?.previousSchool?.lastGrade || "",
      transferCertificate: student?.hasTransferCertificate || false,
      stream: student?.stream || "",
      achievements: student?.achievements || "",
    },
    additionalInfo: {
      languages: student?.languages || "",
      transport: student?.transportRequired || false,
      hostel: student?.hostelRequired || false,
      activities: student?.activities || "",
      specialNeeds: student?.specialNeeds || false,
      hearAbout: student?.hearAbout || "",
      additionalInfo: student?.additionalInfo || "",
      termsAccepted: student?.termsAccepted || false,
    },
  };
}

export const studentFormData = {
  personalInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    preferredName: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    medicalConditions: "",
    photo: "",
  },
  contactInfo: {
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyRelation: "",
  },
  familyInfo: {
    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",
    fatherEmail: "",
    motherName: "",
    motherOccupation: "",
    motherPhone: "",
    motherEmail: "",
    siblings: "0",
    siblingsAtSchool: false,
    familyNotes: "",
  },
  academicInfo: {
    appliedClass: "",
    session: "",
    admissionType: "",
    board: "",
    previousSchool: "",
    schoolAddress: "",
    lastClass: "",
    lastGrade: "",
    transferCertificate: false,
    stream: "",
    achievements: "",
  },
  additionalInfo: {
    languages: "",
    transport: false,
    hostel: false,
    activities: "",
    specialNeeds: false,
    hearAbout: "",
    additionalInfo: "",
    termsAccepted: false,
  },
};

export function formatDateToDDMMYY(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "";
  }

  // Extract day, month, and year components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year

  // Combine in DD-MM-YY format
  return `${day}-${month}-${year}`;
}

export const getRoleDepartment = (role) => {
  const roleDepartments = {
    admin: "Administration",
    super_admin: "Administration",
    principal: "Administration",
    vice_principal: "Administration",
    faculty: "Academic",
    hod: "Academic",
    student: "Student",
    parent: "Parent",
    librarian: "Library",
    accountant: "Finance",
    hr_manager: "Human Resources",
    receptionist: "Front Office",
    counselor: "Student Services",
    lab_assistant: "Laboratory",
    transport_incharge: "Transport",
    driver: "Transport",
    vendor: "External",
    guest: "Visitor",
  };
  return roleDepartments[role] || "General";
};

export const getRoleColor = (role) => {
  const colors = {
    super_admin: "bg-red-100 text-red-800",
    admin: "bg-blue-100 text-blue-800",
    principal: "bg-purple-100 text-purple-800",
    vice_principal: "bg-indigo-100 text-indigo-800",
    faculty: "bg-green-100 text-green-800",
    hod: "bg-yellow-100 text-yellow-800",
    student: "bg-cyan-100 text-cyan-800",
    parent: "bg-pink-100 text-pink-800",
    librarian: "bg-orange-100 text-orange-800",
    accountant: "bg-teal-100 text-teal-800",
    hr_manager: "bg-violet-100 text-violet-800",
    receptionist: "bg-rose-100 text-rose-800",
    counselor: "bg-emerald-100 text-emerald-800",
    lab_assistant: "bg-amber-100 text-amber-800",
    transport_incharge: "bg-lime-100 text-lime-800",
    vendor: "bg-slate-100 text-slate-800",
    guest: "bg-gray-100 text-gray-800",
  };
  return colors[role] || "bg-gray-100 text-gray-800";
};

export const canAssignRole = (assignerRole, targetRole) => {
  const roleHierarchy = {
    super_admin: 10,
    admin: 9,
    principal: 8,
    vice_principal: 7,
    hod: 6,
    teacher: 5,
    faculty: 5,
    librarian: 4,
    accountant: 4,
    hr_manager: 4,
    counselor: 4,
    lab_assistant: 3,
    transport_incharge: 3,
    driver: 3,
    security_guard: 3,
    maintenance_staff: 3,
    receptionist: 2,
    student: 1,
    parent: 1,
    vendor: 1,
    guest: 0,
  };

  return roleHierarchy[assignerRole] > roleHierarchy[targetRole];
};
