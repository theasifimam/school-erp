import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertStudentToFormData(student) {
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
