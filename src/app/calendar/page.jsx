"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

import EventDetailsModal from "@/app/calendar/components/EventDetailsModal";
import { CalendarToolbar } from "@/app/calendar/components/CalendarToolbar";
import { EventModal } from "@/app/calendar/components/EventModal";
import { LeaveRequestModal } from "@/app/calendar/components/LeaveRequestModal";
import { CalendarHeader } from "@/app/calendar/components/CalendarHeader";
import { CalendarFilters } from "@/app/calendar/components/CalendarFilters";
import {
  USER_ROLES,
  currentUser,
  classes,
  locations,
  subjects,
  eventsData,
  notificationsData,
  EVENT_TYPES,
  LEAVE_TYPES,
} from "./data";
import {
  useCalendarEvents,
  useCalendarFilters,
  useNotifications,
  useCalendarModals,
} from "@/lib/hooks/useCalendarHooks";

// Setup the localizer with date-fns
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function ModernSchoolCalendar() {
  const [calendarView, setCalendarView] = useState("month");

  // Custom hooks for different concerns
  const { events, addEvent, deleteEvent, updateEvent, getFilteredEvents } =
    useCalendarEvents(eventsData);

  const {
    notifications,
    addNotification,
    markAllAsRead,
    deleteNotification,
    markAsRead,
    unreadCount,
  } = useNotifications(notificationsData);

  const {
    filters,
    searchTerm,
    setSearchTerm,
    toggleFilter,
    clearFilters,
    showFilters,
    setShowFilters,
  } = useCalendarFilters();

  const {
    showEventModal,
    setShowEventModal,
    showLeaveModal,
    setShowLeaveModal,
    showEventDetailsModal,
    setShowEventDetailsModal,
    selectedEvent,
    setSelectedEvent,
    newEvent,
    setNewEvent,
    leaveRequest,
    setLeaveRequest,
    resetNewEvent,
    resetLeaveRequest,
  } = useCalendarModals();

  const filteredEvents = getFilteredEvents(currentUser, filters, searchTerm);

  const handleSelectSlot = (slotInfo) => {
    if (
      currentUser.role === USER_ROLES.STUDENT ||
      currentUser.role === USER_ROLES.PARENT
    ) {
      setLeaveRequest({
        ...leaveRequest,
        start: slotInfo.start,
        end: slotInfo.end,
      });
      setShowLeaveModal(true);
    } else {
      setNewEvent({
        ...newEvent,
        start: slotInfo.start,
        end: slotInfo.end,
      });
      setShowEventModal(true);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventDetailsModal(true);
  };

  const handleAddEvent = () => {
    const event = addEvent(newEvent, currentUser);
    addNotification({
      title: `New ${EVENT_TYPES[newEvent.type]?.label} Added`,
      message: `${newEvent.title} has been scheduled for ${format(
        newEvent.start,
        "PPp"
      )}`,
      relatedEventId: event.id,
    });
    setShowEventModal(false);
    resetNewEvent();
  };

  const handleSubmitLeave = () => {
    const leaveEvent = addLeaveRequest(leaveRequest, currentUser);
    addNotification({
      title: "New Leave Request",
      message: `${currentUser.name} has requested ${
        LEAVE_TYPES.find((l) => l.value === leaveRequest.type)?.label ||
        leaveRequest.type
      } from ${format(leaveRequest.start, "PP")} to ${format(
        leaveRequest.end,
        "PP"
      )}`,
      relatedEventId: leaveEvent.id,
      forRole: USER_ROLES.ADMIN,
    });
    setShowLeaveModal(false);
    resetLeaveRequest();
  };

  const handleDeleteEvent = (eventId) => {
    const deletedEvent = events.find((e) => e.id === eventId);
    deleteEvent(eventId);
    setShowEventDetailsModal(false);

    if (deletedEvent) {
      addNotification({
        title: "Event Deleted",
        message: `${deletedEvent.title} scheduled for ${format(
          deletedEvent.start,
          "PPp"
        )} has been deleted`,
      });
    }
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find((e) => e.id === eventId);
    if (eventToEdit) {
      setNewEvent({
        id: eventToEdit.id,
        title: eventToEdit.title,
        type: eventToEdit.type || "CLASS",
        start: eventToEdit.start,
        end: eventToEdit.end,
        description: eventToEdit.description || "",
        location: eventToEdit.location || "",
        class: eventToEdit.class || currentUser.class,
        subject: eventToEdit.subject || currentUser.subjects?.[0],
        recurring: eventToEdit.recurring || false,
        recurrencePattern: eventToEdit.recurrencePattern || "weekly",
        recurrenceEndDate:
          eventToEdit.recurrenceEndDate || addDays(new Date(), 30),
        notifyStudents: true,
        attachments: [],
      });
      setShowEventDetailsModal(false);
      setShowEventModal(true);
    }
  };

  const handleApproveLeave = (eventId) => {
    updateEvent(eventId, { status: "approved", color: "#10B981" });
    const leaveEvent = events.find((e) => e.id === eventId);

    if (leaveEvent && "requester" in leaveEvent) {
      addNotification({
        title: "Leave Request Approved",
        message: `Your leave request from ${format(
          leaveEvent.start,
          "PP"
        )} to ${format(leaveEvent.end, "PP")} has been approved`,
        relatedEventId: eventId,
        forUser: leaveEvent.requester,
      });
    }
    setShowEventDetailsModal(false);
  };

  const handleRejectLeave = (eventId) => {
    updateEvent(eventId, { status: "rejected", color: "#F43F5E" });
    const leaveEvent = events.find((e) => e.id === eventId);

    if (leaveEvent && "requester" in leaveEvent) {
      addNotification({
        title: "Leave Request Rejected",
        message: `Your leave request from ${format(
          leaveEvent.start,
          "PP"
        )} to ${format(leaveEvent.end, "PP")} has been rejected`,
        relatedEventId: eventId,
        forUser: leaveEvent.requester,
      });
    }
    setShowEventDetailsModal(false);
  };

  const exportCalendar = () => {
    alert(
      "Calendar exported! (This would download an iCal file in a real implementation)"
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <CalendarHeader
          unreadCount={unreadCount}
          setShowFilters={setShowFilters}
          exportCalendar={exportCalendar}
          currentUser={currentUser}
          setShowEventModal={setShowEventModal}
          setShowLeaveModal={setShowLeaveModal}
          setNewEvent={setNewEvent}
          setLeaveRequest={setLeaveRequest}
          notifications={notifications}
          markAllNotificationsAsRead={markAllAsRead}
          deleteNotification={deleteNotification}
          markNotificationAsRead={markAsRead}
          newEvent={newEvent}
          leaveRequest={leaveRequest}
          USER_ROLES={USER_ROLES}
        />

        <CalendarFilters
          showFilters={showFilters}
          filters={filters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          toggleFilter={toggleFilter}
          clearFilters={clearFilters}
          currentUser={currentUser}
          classes={classes}
          EVENT_TYPES={EVENT_TYPES}
          USER_ROLES={USER_ROLES}
        />

        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          views={["month", "week", "day"]}
          view={calendarView}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          components={{
            toolbar: (props) =>
              CalendarToolbar({
                label: props.label,
                onNavigate: props.onNavigate,
                onView: props.onView,
                view: props.view,
                setCalendarView: setCalendarView,
              }),
            eventWrapper: ({ event, children }) => (
              <div
                style={{
                  backgroundColor:
                    event.color || EVENT_TYPES[event.type]?.color,
                  borderLeft:
                    event.type === "LEAVE"
                      ? `4px solid ${
                          event.status === "approved"
                            ? "#10B981"
                            : event.status === "rejected"
                            ? "#F43F5E"
                            : "#F59E0B"
                        }`
                      : "",
                }}
              >
                {children}
              </div>
            ),
          }}
        />
      </div>

      <EventDetailsModal
        selectedEvent={selectedEvent}
        USER_ROLES={USER_ROLES}
        currentUser={currentUser}
        showEventDetailsModal={showEventDetailsModal}
        setShowEventDetailsModal={setShowEventDetailsModal}
        EVENT_TYPES={EVENT_TYPES}
        handleDeleteEvent={handleDeleteEvent}
        handleEditEvent={handleEditEvent}
        handleApproveLeave={handleApproveLeave}
        handleRejectLeave={handleRejectLeave}
      />

      <EventModal
        showEventModal={showEventModal}
        setShowEventModal={setShowEventModal}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        handleAddEvent={handleAddEvent}
        classes={classes}
        subjects={subjects}
        locations={locations}
        EVENT_TYPES={EVENT_TYPES}
      />

      <LeaveRequestModal
        showLeaveModal={showLeaveModal}
        setShowLeaveModal={setShowLeaveModal}
        leaveRequest={leaveRequest}
        setLeaveRequest={setLeaveRequest}
        handleSubmitLeave={handleSubmitLeave}
        LEAVE_TYPES={LEAVE_TYPES}
      />
    </div>
  );
}
