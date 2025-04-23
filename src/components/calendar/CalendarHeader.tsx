import { Button } from "@/components/ui/button";
import { Bell, Filter, Download, Plus } from "lucide-react";
import { NotificationsPanel } from "./NotificationsPanel";

export const CalendarHeader = ({
  unreadCount,
  showNotifications,
  setShowNotifications,
  setShowFilters,
  exportCalendar,
  currentUser,
  setShowEventModal,
  setShowLeaveModal,
  setNewEvent,
  setLeaveRequest,
  notifications,
  markAllNotificationsAsRead,
  deleteNotification,
  markNotificationAsRead,
  USER_ROLES,
  showFilters,
  newEvent,
  leaveRequest,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">School Calendar</h1>
        <p className="text-gray-500">
          Manage classes, events, and leave requests
        </p>
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="relative rounded-full"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>

          {showNotifications && (
            <NotificationsPanel
              {...{
                unreadCount,
                showNotifications,
                setShowNotifications,
                notifications,
                markAllNotificationsAsRead,
                deleteNotification,
                markNotificationAsRead,
              }}
            />
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-1" /> Filter
        </Button>

        <Button
          variant="outline"
          className="rounded-full"
          size="sm"
          onClick={exportCalendar}
        >
          <Download className="h-4 w-4 mr-1" /> Export
        </Button>

        {(currentUser.role === USER_ROLES.ADMIN ||
          currentUser.role === USER_ROLES.TEACHER) && (
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => {
              setNewEvent({
                ...newEvent,
                start: new Date(),
                end: new Date(new Date().getTime() + 60 * 60 * 1000),
              });
              setShowEventModal(true);
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Event
          </Button>
        )}

        {(currentUser.role === USER_ROLES.STUDENT ||
          currentUser.role === USER_ROLES.PARENT) && (
          <Button
            size="sm"
            onClick={() => {
              setLeaveRequest({
                ...leaveRequest,
                start: new Date(),
                end: new Date(),
              });
              setShowLeaveModal(true);
            }}
          >
            <Plus className="h-4 w-4 mr-1" /> Request Leave
          </Button>
        )}
      </div>
    </div>
  );
};
