// utils/calendarUtils.js
import { format } from "date-fns";

export const createEventNotification = (
  eventType,
  title,
  startDate,
  eventId
) => {
  return {
    title: `New ${eventType} Added`,
    message: `${title} has been scheduled for ${format(startDate, "PPp")}`,
    relatedEventId: eventId,
  };
};

export const createLeaveNotification = (
  requesterName,
  leaveType,
  startDate,
  endDate,
  eventId
) => {
  return {
    title: "New Leave Request",
    message: `${requesterName} has requested ${leaveType} from ${format(
      startDate,
      "PP"
    )} to ${format(endDate, "PP")}`,
    relatedEventId: eventId,
  };
};

export const createDeleteNotification = (deletedEvent) => {
  return {
    title: "Event Deleted",
    message: `${deletedEvent.title} scheduled for ${format(
      deletedEvent.start,
      "PPp"
    )} has been deleted`,
  };
};

export const createApprovalNotification = (leaveEvent, eventId) => {
  return {
    title: "Leave Request Approved",
    message: `Your leave request from ${format(
      leaveEvent.start,
      "PP"
    )} to ${format(leaveEvent.end, "PP")} has been approved`,
    relatedEventId: eventId,
    forUser: leaveEvent.requester,
  };
};

export const createRejectionNotification = (leaveEvent, eventId) => {
  return {
    title: "Leave Request Rejected",
    message: `Your leave request from ${format(
      leaveEvent.start,
      "PP"
    )} to ${format(leaveEvent.end, "PP")} has been rejected`,
    relatedEventId: eventId,
    forUser: leaveEvent.requester,
  };
};

export const getEventStatusColor = (event) => {
  if (event.type === "LEAVE") {
    switch (event.status) {
      case "approved":
        return "#10B981";
      case "rejected":
        return "#F43F5E";
      default:
        return "#F59E0B";
    }
  }
  return event.color;
};

export const getEventBorderStyle = (event) => {
  if (event.type === "LEAVE") {
    return `4px solid ${getEventStatusColor(event)}`;
  }
  return "";
};

// constants/calendarConstants.js
export const CALENDAR_VIEWS = {
  MONTH: "month",
  WEEK: "week",
  DAY: "day",
};

export const DEFAULT_EVENT_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const MODAL_TYPES = {
  EVENT: "event",
  LEAVE: "leave",
  EVENT_DETAILS: "eventDetails",
  NOTIFICATIONS: "notifications",
};
