import { addDays, subDays } from "date-fns";

interface NewEvent {
  id?: number;
  title: string;
  type: keyof typeof EVENT_TYPES;
  start: Date;
  end: Date;
  description: string;
  location: string;
  class?: string;
  subject?: string;
  recurring: boolean;
  recurrencePattern?: string;
  recurrenceEndDate?: Date;
  notifyStudents: boolean;
  attachments: string[];
}

interface LeaveRequest {
  type: string;
  start: Date;
  end: Date;
  reason: string;
  documents: string[];
  contactNumber: string;
}

interface Filters {
  types: (keyof typeof EVENT_TYPES)[];
  classes: string[];
  subjects: string[];
}

// Define types for our data structures
type UserRole = "admin" | "teacher" | "student" | "parent";

interface EventType {
  label: string;
  color: string;
}

interface LeaveType {
  value: string;
  label: string;
}

interface User {
  id: string;
  name: string;
  role: UserRole;
  class?: string;
  subjects?: string[];
  email?: string;
  avatar?: string;
}

interface Class {
  id: string;
  name: string;
}

interface Location {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  date: Date;
  relatedEventId?: number;
  forRole?: string;
  forUser?: string;
}

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type: keyof typeof EVENT_TYPES;
  audience: "all" | "class" | "staff" | "students" | "parents";
  location?: string;
  description: string;
  organizer?: string;
  color: string;
  recurring: boolean;
  class?: string;
  subject?: string;
  teacherId?: string;
  recurrencePattern?: string;
  recurrenceEndDate?: Date;
  allDay?: boolean;
  status?: string; // For event status (e.g., "completed", "pending")
  reason?: string; // For leave events
  requester?: string; // For leave events
  requesterName?: string; // For leave events
  contactNumber?: string; // For leave events
}

// User roles
const USER_ROLES: Record<string, UserRole> = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
};

// Event types with modern colors
const EVENT_TYPES: Record<string, EventType> = {
  CLASS: { label: "Class", color: "#6366F1" }, // Indigo
  EXAM: { label: "Exam", color: "#F43F5E" }, // Rose
  EVENT: { label: "Event", color: "#3B82F6" }, // Blue
  LEAVE: { label: "Leave", color: "#F59E0B" }, // Amber
  HOLIDAY: { label: "Holiday", color: "#10B981" }, // Emerald
  MEETING: { label: "Meeting", color: "#8B5CF6" }, // Violet
  DEADLINE: { label: "Deadline", color: "#64748B" }, // Slate
};

// Leave types
const LEAVE_TYPES: LeaveType[] = [
  { value: "sick", label: "Sick Leave" },
  { value: "personal", label: "Personal Leave" },
  { value: "family", label: "Family Emergency" },
  { value: "medical", label: "Medical Appointment" },
];

// Current user (mock for demo)
const currentUser: User = {
  role: USER_ROLES.TEACHER,
  name: "Mr. Johnson",
  id: "t123",
  class: "Grade 10-A",
  subjects: ["Mathematics", "Physics"],
  email: "mjohnson@school.edu",
  avatar: "/api/placeholder/40/40",
};

// Sample users for notifications
const users: User[] = [
  {
    id: "t124",
    name: "Ms. Thompson",
    role: USER_ROLES.TEACHER,
    class: "Grade 10-B",
  },
  {
    id: "t125",
    name: "Mr. Davis",
    role: USER_ROLES.TEACHER,
    class: "Grade 11-A",
  },
  { id: "a101", name: "Principal Wilson", role: USER_ROLES.ADMIN },
  {
    id: "s101",
    name: "Alex Smith",
    role: USER_ROLES.STUDENT,
    class: "Grade 10-A",
  },
  {
    id: "s102",
    name: "Jamie Lee",
    role: USER_ROLES.STUDENT,
    class: "Grade 10-A",
  },
];

// Sample classes
const classes: Class[] = [
  { id: "g10a", name: "Grade 10-A" },
  { id: "g10b", name: "Grade 10-B" },
  { id: "g11a", name: "Grade 11-A" },
  { id: "g11b", name: "Grade 11-B" },
  { id: "g12a", name: "Grade 12-A" },
];

// Sample locations
const locations: Location[] = [
  { id: "r101", name: "Room 101" },
  { id: "r102", name: "Room 102" },
  { id: "lab1", name: "Science Lab" },
  { id: "lib", name: "Library" },
  { id: "aud", name: "Auditorium" },
  { id: "gym", name: "Gymnasium" },
  { id: "fld", name: "Sports Field" },
];

// Sample subjects
const subjects: Subject[] = [
  { id: "math", name: "Mathematics" },
  { id: "eng", name: "English" },
  { id: "sci", name: "Science" },
  { id: "phys", name: "Physics" },
  { id: "chem", name: "Chemistry" },
  { id: "bio", name: "Biology" },
  { id: "hist", name: "History" },
  { id: "geo", name: "Geography" },
  { id: "art", name: "Art" },
  { id: "music", name: "Music" },
  { id: "pe", name: "Physical Education" },
];

// Generate sample notifications
const notifications: Notification[] = [
  {
    id: 101,
    title: "Math Midterm Reminder",
    message: "Don't forget to prepare for the Math Midterm next week",
    read: false,
    date: new Date(),
    relatedEventId: 2,
  },
  {
    id: 102,
    title: "Leave Request Approved",
    message: "Your leave request for May 5th has been approved",
    read: true,
    date: subDays(new Date(), 2),
  },
  {
    id: 103,
    title: "New Event Added",
    message: "Sports Day has been added to the calendar",
    read: false,
    date: subDays(new Date(), 1),
    relatedEventId: 1,
  },
];

// Generate events
const generateEvents = (): {
  events: Event[];
  notifications: Notification[];
} => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const baseEvents: Event[] = [
    {
      id: 1,
      title: "Sports Day",
      start: new Date(currentYear, currentMonth, 15, 9, 0),
      end: new Date(currentYear, currentMonth, 15, 15, 0),
      type: "EVENT",
      audience: "all",
      location: "School Grounds",
      description: "Annual sports competition between houses",
      organizer: "Sports Department",
      color: EVENT_TYPES.EVENT.color,
      recurring: false,
    },
    {
      id: 2,
      title: "Math Midterm",
      start: new Date(currentYear, currentMonth, 18, 10, 0),
      end: new Date(currentYear, currentMonth, 18, 11, 30),
      type: "EXAM",
      audience: "class",
      class: "Grade 10-A",
      subject: "Mathematics",
      teacherId: "t123",
      location: "Room 101",
      description: "Covers chapters 5-8",
      color: EVENT_TYPES.EXAM.color,
      recurring: false,
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      start: new Date(currentYear, currentMonth, 20, 16, 0),
      end: new Date(currentYear, currentMonth, 20, 18, 0),
      type: "MEETING",
      audience: "staff",
      location: "School Auditorium",
      description: "End of term progress updates",
      color: EVENT_TYPES.MEETING.color,
      recurring: false,
    },
    {
      id: 4,
      title: "English Class",
      start: new Date(currentYear, currentMonth, 19, 9, 0),
      end: new Date(currentYear, currentMonth, 19, 10, 0),
      type: "CLASS",
      audience: "class",
      class: "Grade 10-A",
      subject: "English",
      teacherId: "t124",
      location: "Room 102",
      description: "Shakespeare's Macbeth",
      color: EVENT_TYPES.CLASS.color,
      recurring: true,
      recurrencePattern: "weekly",
      recurrenceEndDate: addDays(today, 60),
    },
    {
      id: 5,
      title: "Science Project Deadline",
      start: new Date(currentYear, currentMonth, 22, 23, 59),
      end: new Date(currentYear, currentMonth, 22, 23, 59),
      type: "DEADLINE",
      audience: "class",
      class: "Grade 10-A",
      subject: "Science",
      teacherId: "t123",
      description: "Submit final research papers",
      color: EVENT_TYPES.DEADLINE.color,
      recurring: false,
    },
    {
      id: 6,
      title: "School Holiday - Founder's Day",
      start: new Date(currentYear, currentMonth, 25),
      end: new Date(currentYear, currentMonth, 25),
      type: "HOLIDAY",
      audience: "all",
      description: "Annual celebration of school's founding",
      allDay: true,
      color: EVENT_TYPES.HOLIDAY.color,
      recurring: false,
    },
    {
      id: 7,
      title: "Math Class",
      start: new Date(currentYear, currentMonth, today.getDate() + 1, 11, 0),
      end: new Date(currentYear, currentMonth, today.getDate() + 1, 12, 0),
      type: "CLASS",
      audience: "class",
      class: "Grade 10-A",
      subject: "Mathematics",
      teacherId: "t123",
      location: "Room 101",
      description: "Quadratic equations",
      color: EVENT_TYPES.CLASS.color,
      recurring: true,
      recurrencePattern: "weekly",
      recurrenceEndDate: addDays(today, 60),
    },
    {
      id: 8,
      title: "Physics Lab",
      start: new Date(currentYear, currentMonth, today.getDate() + 2, 14, 0),
      end: new Date(currentYear, currentMonth, today.getDate() + 2, 15, 30),
      type: "CLASS",
      audience: "class",
      class: "Grade 10-A",
      subject: "Physics",
      teacherId: "t123",
      location: "Science Lab",
      description: "Pendulum experiments",
      color: EVENT_TYPES.CLASS.color,
      recurring: true,
      recurrencePattern: "weekly",
      recurrenceEndDate: addDays(today, 60),
    },
  ];

  return { events: baseEvents, notifications: notifications };
};

const { events: eventsData, notifications: notificationsData } =
  generateEvents();

export {
  USER_ROLES,
  EVENT_TYPES,
  LEAVE_TYPES,
  currentUser,
  users,
  classes,
  locations,
  subjects,
  eventsData,
  notificationsData,
};

// Export the types for use in other files
export type {
  UserRole,
  EventType,
  LeaveType,
  User,
  Class,
  Location,
  Subject,
  Notification,
  Event,
  NewEvent,
  LeaveRequest,
  Filters,
};
