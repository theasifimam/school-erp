// hooks/useCalendarEvents.js
import { useState } from "react";
import { isSameDay, addDays } from "date-fns";
import {
  USER_ROLES,
  EVENT_TYPES,
  LEAVE_TYPES,
  classes,
  subjects,
  currentUser,
} from "../../app/calendar/data";

export function useCalendarEvents(initialEvents) {
  const [events, setEvents] = useState(initialEvents);

  const addEvent = (newEvent, currentUser) => {
    const eventColor = EVENT_TYPES[newEvent.type]?.color || "#6366F1";

    const event = {
      id: Math.max(...events.map((e) => e.id), 0) + 1,
      title: newEvent.title,
      type: newEvent.type,
      start: newEvent.start,
      end: newEvent.end,
      audience:
        newEvent.type === "CLASS" || newEvent.type === "EXAM"
          ? "class"
          : newEvent.type === "MEETING"
          ? "staff"
          : "all",
      color: eventColor,
      teacherId: currentUser.id,
      organizer: currentUser.name,
      description: newEvent.description,
      location: newEvent.location,
      class: newEvent.class,
      subject: newEvent.subject,
      recurring: newEvent.recurring,
      recurrencePattern: newEvent.recurrencePattern,
      recurrenceEndDate: newEvent.recurrenceEndDate,
    };

    setEvents((prev) => [...prev, event]);
    return event;
  };

  const addLeaveRequest = (leaveRequest, currentUser) => {
    const isAllDay = isSameDay(leaveRequest.start, leaveRequest.end);
    const leaveEvent = {
      id: Math.max(...events.map((e) => e.id), 0) + 1,
      title: `${currentUser.name} - ${
        LEAVE_TYPES.find((l) => l.value === leaveRequest.type)?.label ||
        leaveRequest.type
      }`,
      start: leaveRequest.start,
      end: leaveRequest.end,
      type: "LEAVE",
      audience: "staff",
      description: leaveRequest.reason,
      location: "N/A",
      organizer: currentUser.name,
      color: EVENT_TYPES.LEAVE.color,
      recurring: false,
      status: "pending",
      reason: leaveRequest.reason,
      requester: currentUser.id,
      requesterName: currentUser.name,
      contactNumber: leaveRequest.contactNumber,
      ...(isAllDay && { allDay: true }),
    };

    setEvents((prev) => [...prev, leaveEvent]);
    return leaveEvent;
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId));
  };

  const updateEvent = (eventId, updates) => {
    setEvents(events.map((e) => (e.id === eventId ? { ...e, ...updates } : e)));
  };

  const getFilteredEvents = (user, filterSettings, search) => {
    let filtered = events.filter((event) => {
      // Basic role-based filtering
      if (user.role === USER_ROLES.ADMIN) return true;
      if (event.audience === "all") return true;
      if (
        event.audience === "staff" &&
        (user.role === USER_ROLES.ADMIN || user.role === USER_ROLES.TEACHER)
      )
        return true;
      if (
        event.audience === "class" &&
        user.role === USER_ROLES.TEACHER &&
        (event.teacherId === user.id || event.class === user.class)
      )
        return true;
      if (
        event.audience === "class" &&
        user.role === USER_ROLES.STUDENT &&
        event.class === user.class
      )
        return true;
      if (
        event.audience === "students" &&
        (user.role === USER_ROLES.STUDENT || user.role === USER_ROLES.PARENT)
      )
        return true;
      return false;
    });

    // Apply type filters
    if (filterSettings.types.length > 0) {
      filtered = filtered.filter((e) => filterSettings.types.includes(e.type));
    }

    // Apply class filters if teacher or admin
    if (
      (user.role === USER_ROLES.TEACHER || user.role === USER_ROLES.ADMIN) &&
      filterSettings.classes.length > 0
    ) {
      filtered = filtered.filter(
        (e) => !e.class || filterSettings.classes.includes(e.class)
      );
    }

    // Apply subject filters
    if (filterSettings.subjects.length > 0) {
      filtered = filtered.filter(
        (e) => !e.subject || filterSettings.subjects.includes(e.subject)
      );
    }

    // Apply search
    if (search && search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(searchLower) ||
          (e.description &&
            e.description.toLowerCase().includes(searchLower)) ||
          (e.location && e.location.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  };

  return {
    events,
    addEvent,
    addLeaveRequest,
    deleteEvent,
    updateEvent,
    getFilteredEvents,
  };
}

// hooks/useNotifications.js
export function useNotifications(initialNotifications) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const addNotification = (notification) => {
    const newNotification = {
      id: Math.max(...notifications.map((n) => n.id), 100) + 1,
      read: false,
      date: new Date(),
      ...notification,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId));
  };

  const markAsRead = (notificationId) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    addNotification,
    markAllAsRead,
    deleteNotification,
    markAsRead,
    unreadCount,
  };
}

// hooks/useCalendarFilters.js
export function useCalendarFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    types: Object.keys(EVENT_TYPES),
    classes: classes.map((c) => c.id),
    subjects: subjects.map((s) => s.id),
  });

  const toggleFilter = (filterType, value) => {
    setFilters((prev) => {
      const currentValues = [...prev[filterType]];
      const index = currentValues.indexOf(value);

      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }

      return {
        ...prev,
        [filterType]: currentValues,
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      types: Object.keys(EVENT_TYPES),
      classes: classes.map((c) => c.id),
      subjects: subjects.map((s) => s.id),
    });
    setSearchTerm("");
  };

  return {
    filters,
    searchTerm,
    setSearchTerm,
    toggleFilter,
    clearFilters,
    showFilters,
    setShowFilters,
  };
}

// hooks/useCalendarModals.js
export function useCalendarModals() {
  const [showEventModal, setShowEventModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [newEvent, setNewEvent] = useState({
    id: undefined,
    title: "",
    type: "CLASS",
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000),
    description: "",
    location: "",
    class: currentUser.class,
    subject: currentUser.subjects?.[0],
    recurring: false,
    recurrencePattern: "weekly",
    recurrenceEndDate: addDays(new Date(), 30),
    notifyStudents: true,
    attachments: [],
  });

  const [leaveRequest, setLeaveRequest] = useState({
    type: "sick",
    start: new Date(),
    end: new Date(),
    reason: "",
    documents: [],
    contactNumber: "",
  });

  const resetNewEvent = () => {
    setNewEvent({
      id: undefined,
      title: "",
      type: "CLASS",
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      description: "",
      location: "",
      class: currentUser.class,
      subject: currentUser.subjects?.[0],
      recurring: false,
      recurrencePattern: "weekly",
      recurrenceEndDate: addDays(new Date(), 30),
      notifyStudents: true,
      attachments: [],
    });
  };

  const resetLeaveRequest = () => {
    setLeaveRequest({
      type: "sick",
      start: new Date(),
      end: new Date(),
      reason: "",
      documents: [],
      contactNumber: "",
    });
  };

  return {
    showEventModal,
    setShowEventModal,
    showLeaveModal,
    setShowLeaveModal,
    showEventDetailsModal,
    setShowEventDetailsModal,
    showNotifications,
    setShowNotifications,
    selectedEvent,
    setSelectedEvent,
    newEvent,
    setNewEvent,
    leaveRequest,
    setLeaveRequest,
    resetNewEvent,
    resetLeaveRequest,
  };
}
