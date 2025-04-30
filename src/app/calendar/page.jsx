"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  isSameDay,
  addDays,
  subDays,
} from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw } from "lucide-react";
import EventDetailsModal from "@/components/calendar/EventDetailsModal";
import { CalendarToolbar } from "@/components/calendar/CalendarToolbar";
import { EventModal } from "@/components/calendar/EventModal";
import { LeaveRequestModal } from "@/components/calendar/LeaveRequestModal";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import {
  USER_ROLES,
  EVENT_TYPES,
  LEAVE_TYPES,
  currentUser,
  classes,
  locations,
  subjects,
  eventsData,
  notificationsData,
  Event,
  Notification,
  User,
  NewEvent,
  LeaveRequest,
  Filters,
} from "./data";

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
  const [events, setEvents] = useState(eventsData);
  const [notifications, setNotifications] = useState(notificationsData);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarView, setCalendarView] = useState("month");
  const [filters, setFilters] = useState({
    types: Object.keys(EVENT_TYPES),
    classes: classes.map((c) => c.id),
    subjects: subjects.map((s) => s.id),
  });

  const [newEvent, setNewEvent] =
    useState <
    NewEvent >
    {
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
    };

  const [leaveRequest, setLeaveRequest] = useState({
    type: "sick",
    start: new Date(),
    end: new Date(),
    reason: "",
    documents: [],
    contactNumber: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Filter events based on user role and filters
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

    // Add new notification
    const newNotification = {
      id: Math.max(...notifications.map((n) => n.id), 100) + 1,
      title: `New ${EVENT_TYPES[newEvent.type]?.label} Added`,
      message: `${newEvent.title} has been scheduled for ${format(
        newEvent.start,
        "PPp"
      )}`,
      read: false,
      date: new Date(),
      relatedEventId: event.id,
    };

    setEvents([...events, event]);
    setNotifications([newNotification, ...notifications]);
    setShowEventModal(false);
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

  const handleSubmitLeave = () => {
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

    // Add new notification for admins/teachers
    const newNotification = {
      id: Math.max(...notifications.map((n) => n.id), 100) + 1,
      title: "New Leave Request",
      message: `${currentUser.name} has requested ${
        LEAVE_TYPES.find((l) => l.value === leaveRequest.type)?.label ||
        leaveRequest.type
      } from ${format(leaveRequest.start, "PP")} to ${format(
        leaveRequest.end,
        "PP"
      )}`,
      read: false,
      date: new Date(),
      relatedEventId: leaveEvent.id,
      forRole: USER_ROLES.ADMIN,
    };

    setEvents([...events, leaveEvent]);
    setNotifications([newNotification, ...notifications]);
    setShowLeaveModal(false);
    setLeaveRequest({
      type: "sick",
      start: new Date(),
      end: new Date(),
      reason: "",
      documents: [],
      contactNumber: "",
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId));
    setShowEventDetailsModal(false);

    // Add deletion notification
    const deletedEvent = events.find((e) => e.id === eventId);
    if (deletedEvent) {
      const newNotification = {
        id: Math.max(...notifications.map((n) => n.id), 100) + 1,
        title: "Event Deleted",
        message: `${deletedEvent.title} scheduled for ${format(
          deletedEvent.start,
          "PPp"
        )} has been deleted`,
        read: false,
        date: new Date(),
      };
      setNotifications([newNotification, ...notifications]);
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
    setEvents(
      events.map((e) =>
        e.id === eventId ? { ...e, status: "approved", color: "#10B981" } : e
      )
    );

    const leaveEvent = events.find((e) => e.id === eventId);
    if (leaveEvent && "requester" in leaveEvent) {
      // Add approval notification
      const newNotification = {
        id: Math.max(...notifications.map((n) => n.id), 100) + 1,
        title: "Leave Request Approved",
        message: `Your leave request from ${format(
          leaveEvent.start,
          "PP"
        )} to ${format(leaveEvent.end, "PP")} has been approved`,
        read: false,
        date: new Date(),
        relatedEventId: eventId,
        forUser: leaveEvent.requester,
      };
      setNotifications([newNotification, ...notifications]);
    }

    setShowEventDetailsModal(false);
  };

  const handleRejectLeave = (eventId) => {
    setEvents(
      events.map((e) =>
        e.id === eventId ? { ...e, status: "rejected", color: "#F43F5E" } : e
      )
    );

    const leaveEvent = events.find((e) => e.id === eventId);
    if (leaveEvent && "requester" in leaveEvent) {
      // Add rejection notification
      const newNotification = {
        id: Math.max(...notifications.map((n) => n.id), 100) + 1,
        title: "Leave Request Rejected",
        message: `Your leave request from ${format(
          leaveEvent.start,
          "PP"
        )} to ${format(leaveEvent.end, "PP")} has been rejected`,
        read: false,
        date: new Date(),
        relatedEventId: eventId,
        forUser: leaveEvent.requester,
      };
      setNotifications([newNotification, ...notifications]);
    }

    setShowEventDetailsModal(false);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId));
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

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

  const exportCalendar = () => {
    // This would typically generate an iCal file
    alert(
      "Calendar exported! (This would download an iCal file in a real implementation)"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <CalendarHeader
          unreadCount={unreadCount}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          setShowFilters={setShowFilters}
          exportCalendar={exportCalendar}
          currentUser={currentUser}
          setShowEventModal={setShowEventModal}
          setShowLeaveModal={setShowLeaveModal}
          setNewEvent={setNewEvent}
          setLeaveRequest={setLeaveRequest}
          notifications={notifications}
          markAllNotificationsAsRead={markAllNotificationsAsRead}
          deleteNotification={deleteNotification}
          markNotificationAsRead={markNotificationAsRead}
          USER_ROLES={USER_ROLES}
          showFilters={showFilters}
          newEvent={newEvent}
          leaveRequest={leaveRequest}
        />

        {showFilters && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <Label className="text-xs text-gray-500 mb-2 block">
                    Search
                  </Label>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search events..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <Label className="text-xs text-gray-500 mb-2 block">
                    Event Types
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(EVENT_TYPES).map(([type, details]) => (
                      <Badge
                        key={type}
                        variant={
                          filters.types.includes(type) ? "default" : "outline"
                        }
                        className="cursor-pointer"
                        style={{
                          backgroundColor: filters.types.includes(type)
                            ? details.color
                            : "transparent",
                          color: filters.types.includes(type)
                            ? "white"
                            : details.color,
                          borderColor: details.color,
                        }}
                        onClick={() => toggleFilter("types", type)}
                      >
                        {details.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {(currentUser.role === USER_ROLES.ADMIN ||
                  currentUser.role === USER_ROLES.TEACHER) && (
                  <div className="flex-1">
                    <Label className="text-xs text-gray-500 mb-2 block">
                      Classes
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {classes.map((cls) => (
                        <Badge
                          key={cls.id}
                          variant={
                            filters.classes.includes(cls.id)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleFilter("classes", cls.id)}
                        >
                          {cls.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  <RefreshCw className="h-3 w-3 mr-1" /> Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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

      {/* Event Details Modal */}
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

      {/* Add Event Modal */}
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

      {/* Request Leave Modal */}
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
