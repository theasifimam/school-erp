// services/calendarService.js
import { isSameDay, addDays } from "date-fns";
import { USER_ROLES, EVENT_TYPES, LEAVE_TYPES } from "../data";

export class CalendarService {
  static generateEventId(existingEvents) {
    return Math.max(...existingEvents.map((e) => e.id), 0) + 1;
  }

  static generateNotificationId(existingNotifications) {
    return Math.max(...existingNotifications.map((n) => n.id), 100) + 1;
  }

  static createEvent(newEvent, currentUser) {
    const eventColor = EVENT_TYPES[newEvent.type]?.color || "#6366F1";

    return {
      id: this.generateEventId([]), // This would be passed from the hook
      title: newEvent.title,
      type: newEvent.type,
      start: newEvent.start,
      end: newEvent.end,
      audience: this.determineEventAudience(newEvent.type),
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
  }

  static createLeaveRequest(leaveRequest, currentUser) {
    const isAllDay = isSameDay(leaveRequest.start, leaveRequest.end);
    const leaveTypeLabel =
      LEAVE_TYPES.find((l) => l.value === leaveRequest.type)?.label ||
      leaveRequest.type;

    return {
      id: this.generateEventId([]), // This would be passed from the hook
      title: `${currentUser.name} - ${leaveTypeLabel}`,
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
  }

  static determineEventAudience(eventType) {
    switch (eventType) {
      case "CLASS":
      case "EXAM":
        return "class";
      case "MEETING":
        return "staff";
      default:
        return "all";
    }
  }

  static filterEventsByRole(events, user) {
    return events.filter((event) => {
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
  }

  static applyFilters(events, filterSettings, user) {
    let filtered = events;

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

    return filtered;
  }

  static applySearch(events, searchTerm) {
    if (!searchTerm || searchTerm.trim() === "") return events;

    const searchLower = searchTerm.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(searchLower) ||
        (e.description && e.description.toLowerCase().includes(searchLower)) ||
        (e.location && e.location.toLowerCase().includes(searchLower))
    );
  }

  static getFilteredEvents(events, user, filterSettings, searchTerm) {
    let filtered = this.filterEventsByRole(events, user);
    filtered = this.applyFilters(filtered, filterSettings, user);
    filtered = this.applySearch(filtered, searchTerm);
    return filtered;
  }

  static canUserCreateEvents(user) {
    return user.role !== USER_ROLES.STUDENT && user.role !== USER_ROLES.PARENT;
  }

  static canUserManageLeave(user) {
    return user.role === USER_ROLES.ADMIN || user.role === USER_ROLES.TEACHER;
  }

  static exportToICal(events, filename = "calendar.ics") {
    // This would implement actual iCal export functionality
    // For now, it's just a placeholder
    const icalContent = this.generateICalContent(events);
    this.downloadFile(icalContent, filename, "text/calendar");
  }

  static generateICalContent(events) {
    // Placeholder for iCal generation
    return "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//School Calendar//EN\nEND:VCALENDAR";
  }

  static downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// services/notificationService.js
export class NotificationService {
  static createEventNotification(eventType, title, startDate, eventId) {
    return {
      title: `New ${EVENT_TYPES[eventType]?.label || eventType} Added`,
      message: `${title} has been scheduled for ${format(startDate, "PPp")}`,
      relatedEventId: eventId,
    };
  }

  static createLeaveNotification(
    requesterName,
    leaveType,
    startDate,
    endDate,
    eventId,
    forRole
  ) {
    const leaveTypeLabel =
      LEAVE_TYPES.find((l) => l.value === leaveType)?.label || leaveType;

    return {
      title: "New Leave Request",
      message: `${requesterName} has requested ${leaveTypeLabel} from ${format(
        startDate,
        "PP"
      )} to ${format(endDate, "PP")}`,
      relatedEventId: eventId,
      forRole,
    };
  }

  static createDeleteNotification(deletedEvent) {
    return {
      title: "Event Deleted",
      message: `${deletedEvent.title} scheduled for ${format(
        deletedEvent.start,
        "PPp"
      )} has been deleted`,
    };
  }

  static createApprovalNotification(leaveEvent, eventId) {
    return {
      title: "Leave Request Approved",
      message: `Your leave request from ${format(
        leaveEvent.start,
        "PP"
      )} to ${format(leaveEvent.end, "PP")} has been approved`,
      relatedEventId: eventId,
      forUser: leaveEvent.requester,
    };
  }

  static createRejectionNotification(leaveEvent, eventId) {
    return {
      title: "Leave Request Rejected",
      message: `Your leave request from ${format(
        leaveEvent.start,
        "PP"
      )} to ${format(leaveEvent.end, "PP")} has been rejected`,
      relatedEventId: eventId,
      forUser: leaveEvent.requester,
    };
  }

  static filterNotificationsByUser(notifications, user) {
    return notifications.filter((notification) => {
      // Show all notifications to admins
      if (user.role === USER_ROLES.ADMIN) return true;

      // Show notifications targeted to specific users
      if (notification.forUser && notification.forUser === user.id) return true;

      // Show notifications targeted to specific roles
      if (notification.forRole && notification.forRole === user.role)
        return true;

      // Show general notifications (no specific targeting)
      if (!notification.forUser && !notification.forRole) return true;

      return false;
    });
  }
}
