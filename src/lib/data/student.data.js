import { User, Phone, Home, BookOpen, FileText } from "lucide-react";

export const tabs = [
  "personalInfo",
  "contactInfo",
  "familyInfo",
  "academicInfo",
  "additionalInfo",
];

// Define form sections
export const formSections = [
  {
    id: "personalInfo",
    label: "Personal",
    icon: <User className="h-4 w-4" />,
  },
  {
    id: "contactInfo",
    label: "Contact",
    icon: <Phone className="h-4 w-4" />,
  },
  {
    id: "familyInfo",
    label: "Family",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: "academicInfo",
    label: "Academic",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    id: "additionalInfo",
    label: "Additional",
    icon: <FileText className="h-4 w-4" />,
  },
];

export const familyInfo = [
  "fatherName",
  "fatherOccupation",
  "fatherPhone",
  "fatherEmail",
  "motherName",
  "motherOccupation",
  "motherPhone",
  "motherEmail",
  "siblings",
  "siblingsAtSchool",
  "familyNotes",
];
export const contactInfo = [
  "email",
  "phone",
  "alternatePhone",
  "address",
  "city",
  "state",
  "country",
  "zipCode",
  "emergencyContactName",
  "emergencyContactPhone",
  "emergencyRelation",
];
export const academicInfo = [
  "appliedClass",
  "session",
  "admissionType",
  "board",
  "previousSchool",
  "schoolAddress",
  "lastClass",
  "lastGrade",
  "transferCertificate",
  "stream",
  "achievements",
];
export const additionalInfo = [
  "languages",
  "transport",
  "hostel",
  "activities",
  "specialNeeds",
  "hearAbout",
  "additionalInfo",
  "termsAccepted",
];
